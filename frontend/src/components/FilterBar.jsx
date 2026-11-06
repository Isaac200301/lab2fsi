import { DEFAULT_FILTERS } from '../lib/metrics.js';

const PRESETS = [
  ['7', '7 días'],
  ['30', '30 días'],
  ['90', '90 días'],
  ['all', 'Todo'],
  ['custom', 'Personalizado'],
];

/**
 * Filtros globales: periodo, equipo de ventas y membresía. Los cambios actualizan todo el dashboard
 * y también el contexto que recibe el chatbot.
 */
export default function FilterBar({ filters, onChange, teams, memberships, range }) {
  const set = (patch) => onChange({ ...filters, ...patch });
  const changed = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);

  return (
    <section className="filters" aria-label="Filtros">
      <div className="field">
        <span>Periodo</span>
        <div className="segmented" role="group" aria-label="Periodo">
          {PRESETS.map(([id, label]) => (
            <button key={id} className={filters.preset === id ? 'on' : ''} onClick={() => set({ preset: id })}>{label}</button>
          ))}
        </div>
      </div>

      {filters.preset === 'custom' && (
        <>
          <div className="field">
            <label htmlFor="f-from">Desde</label>
            <input id="f-from" type="date" value={filters.custom.from} max={filters.custom.to || undefined}
              onChange={(e) => set({ custom: { ...filters.custom, from: e.target.value } })} />
          </div>
          <div className="field">
            <label htmlFor="f-to">Hasta</label>
            <input id="f-to" type="date" value={filters.custom.to} min={filters.custom.from || undefined}
              onChange={(e) => set({ custom: { ...filters.custom, to: e.target.value } })} />
          </div>
        </>
      )}

      <div className="field">
        <label htmlFor="f-team">Equipo de ventas</label>
        <select id="f-team" value={filters.team} onChange={(e) => set({ team: e.target.value })}>
          <option value="all">Todos los equipos</option>
          {teams.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="field">
        <label htmlFor="f-mem">Membresía</label>
        <select id="f-mem" value={filters.membership} onChange={(e) => set({ membership: e.target.value })}>
          <option value="all">Todas</option>
          {memberships.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div className="spacer" />
      <p className="filter-note">
        {range.from ? `Mostrando ${range.from} a ${range.to}.` : 'Mostrando todo el historial.'} La fecha de cada reserva es la de
        cierre (vuelo o cancelación) o la de creación si sigue abierta.
      </p>
      {changed && <button className="btn secondary" onClick={() => onChange(DEFAULT_FILTERS)}>Restablecer</button>}
    </section>
  );
}
