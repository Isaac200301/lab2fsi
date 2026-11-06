# Laboratorio 3 · Integración de n8n con agentes de IA · AeroVirtual CRM

Dashboard de ventas y operación para la aerolínea del Laboratorio 2 (Spring Boot + Drools) con un chatbot de IA
conectado a un workflow de **n8n** (Webhook → AI Agent + Gemini + memoria → Respond to Webhook).

## Estructura

```
src/                      Backend Laboratorio 2 (Spring Boot 3.5, Drools 10, Spring AI) - sin cambios
frontend/                 Aplicación web del Laboratorio 3 (React 18 + Vite + Recharts)
  src/data/mockData.js    Datos generados con las reglas reales de Drools (130 reservas)
  src/lib/metrics.js      Funciones puras de KPIs, filtros y contexto del chatbot
  src/components/         Dashboard, tablas, vistas, modal de nueva reserva y ChatWidget
  tests/metrics.test.js   13 pruebas de las métricas
  schema.json             JSON Schema de las entidades
  estructura_datos.md     Descripción del modelo de datos y fórmulas de KPIs
n8n/airline-crm-agent.workflow.json   Workflow exportable de n8n
docs/capturas/            Capturas reales de la aplicación
docs/LAB3.md             Este archivo
```

## Ejecución local

```bash
# 1. Backend (puerto 8080) - necesario para "Nueva reserva" y para regenerar datos
export GROQ_API_KEY=...            # solo si usa el chat de Groq del Lab 2
./mvnw spring-boot:run

# 2. Frontend
cd frontend
npm install
cp .env.example .env               # y complete VITE_N8N_WEBHOOK_URL (ver abajo)
npm run dev                        # http://localhost:5173
npm test                           # 13 pruebas
npm run build                      # genera dist/
npm run generate:data              # (opcional) regenera mockData.js con el backend activo
```

## Puesta en marcha de n8n (paso a paso)

1. Cree una cuenta en <https://n8n.io> (n8n Cloud, prueba gratuita) o ejecute n8n local.
2. **Workflows → Create workflow → ⋯ → Import from file** y seleccione `n8n/airline-crm-agent.workflow.json`.
3. Abra el nodo **Google Gemini Chat Model → Credential → Create new** y pegue su API key de Google AI Studio
   (<https://aistudio.google.com/apikey>). **No suba la clave al repositorio ni la muestre en capturas.**
4. Abra el nodo **Webhook**, pestaña *Production URL*, y copie la URL (`https://<dominio>.app.n8n.cloud/webhook/aerovirtual-crm-chat`).
5. Pulse **Publish** (arriba a la derecha). La *Production URL* solo responde con el workflow publicado; la *Test URL*
   solo responde mientras está escuchando un evento de prueba.
6. En `frontend/.env` escriba `VITE_N8N_WEBHOOK_URL=<Production URL>` y reinicie `npm run dev`
   (o pegue la URL desde el engranaje del chat; se guarda en el navegador).
7. Pregunte en el chat, por ejemplo: «¿Cómo van los ingresos frente al periodo anterior?». Cambie un filtro y repita:
   la respuesta debe cambiar porque el contexto del dashboard viaja en cada mensaje.
8. Revise **Executions** en n8n para ver cada ejecución y los datos que entraron al agente.

### Contrato de la petición

`POST <webhook>` con `Content-Type: application/json`:

```json
{ "message": "¿Qué agente va mejor frente a su cuota?",
  "sessionId": "av-1730800000000-ab12cd",
  "context": { "fecha_actual": "2026-11-05", "filtros_activos": {…}, "kpis": {…}, "agentes": […], "alertas": […] } }
```

Respuesta: `{ "response": "texto del agente" }`.

| Nodo | Configuración clave |
|---|---|
| Webhook | POST, ruta `aerovirtual-crm-chat`, *Respond* = «Using Respond to Webhook Node», Allowed Origins = `*` |
| AI Agent | *Source for Prompt* = Define below, texto `{{ $json.body.message }}`; System Message con las reglas del negocio y `{{ JSON.stringify($('Webhook').item.json.body.context) }}` |
| Google Gemini Chat Model | `models/gemini-3-flash-preview`, temperatura 0.3 |
| Simple Memory | Session ID = Custom Key `{{ $('Webhook').item.json.body.sessionId }}`, ventana de 10 mensajes |
| Respond to Webhook | Texto `{{ JSON.stringify({ response: $json.output }) }}` |

El contexto va en el *system message* (no en el mensaje del usuario) para que no se guarde en la memoria de la conversación
y el agente siempre vea las cifras del filtro actual.

## Problemas frecuentes

| Síntoma en el chat | Causa y solución |
|---|---|
| «n8n no encontró el webhook (404)» | Usó la *Test URL* o el workflow no está publicado. Use la *Production URL* y pulse Publish. |
| Error de red / CORS | Revise que la URL sea completa (https) y que *Allowed Origins* sea `*` o incluya el origen de la app. |
| «Workflow was started» | El nodo Respond to Webhook no está conectado o el Webhook no tiene *Respond = Using Respond to Webhook Node*. |
| Respuesta vacía | El campo de respuesta debe llamarse `response` (o `output`). Revise el nodo Respond to Webhook. |
| «n8n respondió con un error 5xx» | Falló el nodo del modelo: clave de Gemini inválida o cuota agotada. Mire la ejecución en *Executions*. |
| «Nueva reserva» falla | El backend de Spring Boot no está corriendo en el puerto 8080. |
