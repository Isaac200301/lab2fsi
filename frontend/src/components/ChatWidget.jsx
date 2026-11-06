import { useEffect, useRef, useState } from 'react';
import Icon from './Icons.jsx';

const ENV_URL = import.meta.env.VITE_N8N_WEBHOOK_URL ?? '';
const URL_KEY = 'aerovirtual.n8nWebhookUrl';
const TIMEOUT_MS = 60_000;

const GREETING = '¡Hola! Soy el asistente de IA del CRM de AeroVirtual. Veo los mismos datos y filtros que usted en el dashboard. Pregúnteme por ingresos, reservas, pasajeros, vuelos, el equipo de ventas o las reglas de negocio.';
const SUGGESTIONS = [
  '¿Cómo van los ingresos frente al periodo anterior?',
  '¿Qué reservas están en riesgo de no cerrarse?',
  '¿Qué agente va mejor frente a su cuota?',
  '¿Qué reglas se activan más y por qué?',
];

const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k, v) => { try { v ? localStorage.setItem(k, v) : localStorage.removeItem(k); } catch { /* sin almacenamiento */ } };
const newSessionId = () => (globalThis.crypto?.randomUUID?.() ?? `s-${Date.now()}-${Math.random().toString(36).slice(2)}`);

/** Convierte **negrita** de Markdown en <strong> sin usar innerHTML. */
function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => (part.startsWith('**') && part.endsWith('**') && part.length > 4 ? <strong key={i}>{part.slice(2, -2)}</strong> : part));
}

/** Traduce un fallo de red/HTTP a una pista accionable para el estudiante. */
function explain(err) {
  if (err.name === 'AbortError') return 'El agente tardó más de 60 segundos. Revise en n8n > Executions si el modelo respondió.';
  if (err.status === 404) return 'n8n no encontró el webhook (404). Verifique que publicó el workflow y que usa la Production URL (contiene /webhook/, no /webhook-test/).';
  if (err.status >= 500) return `n8n respondió con un error ${err.status}. Abra Executions en n8n: suele ser la API key de Gemini, el nombre del modelo o una expresión mal escrita.`;
  if (err.code === 'STARTED') return 'El Webhook está en modo "Immediately". Cambie "Respond" a "Using \'Respond to Webhook\' node" y publique de nuevo.';
  if (err.code === 'SHAPE') return 'La respuesta de n8n no trae el campo "response". Revise el cuerpo del nodo Respond to Webhook.';
  if (err instanceof TypeError) return 'No se pudo conectar con n8n (red o CORS). Revise la URL y que la opción Allowed Origins (CORS) del Webhook sea * o incluya este sitio.';
  return err.message || 'Error desconocido.';
}

/**
 * Chat flotante conectado al agente de IA de n8n.
 * Envía { message, sessionId, context }: `context` es un resumen de lo que muestra el dashboard con
 * los filtros activos, así el agente responde con los mismos números que ve el usuario.
 */
export default function ChatWidget({ context }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(() => read(URL_KEY) || ENV_URL);
  const [editing, setEditing] = useState(false);
  const [draftUrl, setDraftUrl] = useState('');
  const [messages, setMessages] = useState([{ role: 'bot', text: GREETING }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const sessionId = useRef(newSessionId());
  const contextRef = useRef(context);
  const bodyRef = useRef(null);
  contextRef.current = context;

  useEffect(() => { bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight }); }, [messages, busy, open]);

  async function send(text) {
    const message = text.trim();
    if (!message || busy) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text: message }]);
    if (!url) { setEditing(true); setMessages((m) => [...m, { role: 'bot', error: true, text: 'Falta la URL del webhook de n8n. Péguela en la configuración (engranaje).' }]); return; }

    setBusy(true);
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, sessionId: sessionId.current, context: contextRef.current }),
        signal: ctrl.signal,
      });
      const raw = await res.text();
      if (!res.ok) throw Object.assign(new Error(`HTTP ${res.status}`), { status: res.status });
      let data = null;
      try { data = JSON.parse(raw); } catch { /* respuesta no JSON */ }
      if (data?.message === 'Workflow was started') throw Object.assign(new Error('started'), { code: 'STARTED' });
      const answer = data?.response ?? data?.output;
      if (typeof answer !== 'string' || !answer.trim()) throw Object.assign(new Error('shape'), { code: 'SHAPE' });
      setMessages((m) => [...m, { role: 'bot', text: answer.trim() }]);
    } catch (err) {
      setMessages((m) => [...m, { role: 'bot', error: true, text: explain(err) }]);
    } finally {
      clearTimeout(timer);
      setBusy(false);
    }
  }

  function saveUrl() {
    const clean = draftUrl.trim();
    write(URL_KEY, clean);
    setUrl(clean || ENV_URL);
    setEditing(false);
  }

  return (
    <>
      {open && (
        <section className="chat-panel" aria-label="Asistente de IA">
          <header className="chat-head">
            <span className="chat-avatar"><Icon name="plane" size={20} /></span>
            <div className="grow">
              <strong>Asistente IA</strong>
              <span className={`chat-status ${url ? '' : 'off'}`}>{url ? '● En línea (n8n)' : '○ Sin configurar'}</span>
            </div>
            <button className="icon-btn" aria-label="Configurar webhook" onClick={() => { setDraftUrl(url); setEditing((e) => !e); }}><Icon name="gear" /></button>
            <button className="icon-btn" aria-label="Cerrar chat" onClick={() => setOpen(false)}><Icon name="close" /></button>
          </header>

          {editing && (
            <div className="chat-config">
              <label htmlFor="wh">Production URL del Webhook de n8n</label>
              <input id="wh" value={draftUrl} placeholder="https://<dominio>.app.n8n.cloud/webhook/<id>" onChange={(e) => setDraftUrl(e.target.value)} />
              <div className="row">
                <button className="btn" onClick={saveUrl}>Guardar</button>
                <button className="btn secondary" onClick={() => setEditing(false)}>Cancelar</button>
              </div>
            </div>
          )}

          <div className="chat-body" ref={bodyRef} aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}${m.error ? ' error' : ''}`}>{renderInline(m.text)}</div>
            ))}
            {busy && <div className="typing">El asistente está analizando los datos…</div>}
          </div>

          {messages.length === 1 && (
            <div className="suggestions">
              {SUGGESTIONS.map((s) => <button key={s} onClick={() => send(s)}>{s}</button>)}
            </div>
          )}

          <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe un mensaje…" aria-label="Mensaje" />
            <button className="send-btn" type="submit" disabled={busy || !input.trim()} aria-label="Enviar"><Icon name="send" /></button>
          </form>
        </section>
      )}
      <button className="chat-fab" aria-label={open ? 'Cerrar asistente' : 'Abrir asistente de IA'} onClick={() => setOpen((o) => !o)}>
        <Icon name={open ? 'close' : 'chat'} size={24} />
      </button>
    </>
  );
}
