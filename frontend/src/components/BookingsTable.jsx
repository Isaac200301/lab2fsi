import { Fragment, useMemo, useState } from 'react';
import { money, shortDate } from '../lib/format.js';
import { refDay, RULE_LABELS } from '../lib/metrics.js';

const STATUS = { open: ['coral', 'Abierta'], won: ['green', 'Completada'], lost: ['red', 'Cancelada'] };

/** Resultados notables de la decisión de Drools, como etiquetas cortas. */
function outcomeTags(e) {
  const tags = [];
  if (e.seatClass === 'Ejecutiva') tags.push(['green', 'Ejecutiva']);
  if (e.vipLoungeAccess) tags.push(['blue', 'Salón VIP']);
  if (e.priorityCheckIn) tags.push(['blue', 'Check-in prioritario']);
  if (e.discountPercentage > 0) tags.push(['green', `-${e.discountPercentage}%`]);
  if (e.compensation > 0) tags.push(['amber', `Compensación $${e.compensation}`]);
  if (e.extraLoyaltyPoints > 0) tags.push(['coral', `+${e.extraLoyaltyPoints} pts`]);
  if (!e.luggageAllowed) tags.push(['red', 'Equipaje no permitido']);
  if (e.assignedSeat === 'Salida de emergencia') tags.push(['', 'Salida emerg.']);
  if (e.assignedSeat.startsWith('Asiento preferencial')) tags.push(['', 'Asiento familiar']);
  return tags;
}

/**
 * Tabla de reservas ("deals").
 * - Con `onStageChange` se puede mover una reserva de etapa; los KPIs se recalculan.
 * - Al hacer clic en una fila se muestran las reglas de Drools que se activaron y por qué.
 */
export default function BookingsTable({ bookings, ctx, onStageChange, compact = false, pageSize = 12 }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [limit, setLimit] = useState(pageSize);
  const [expanded, setExpanded] = useState(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings
      .filter((b) => status === 'all' || b.status === status)
      .filter((b) => {
        if (!q) return true;
        const p = ctx.passengersById[b.passenger_id];
        return `${b.id} ${b.title} ${p?.full_name ?? ''}`.toLowerCase().includes(q);
      })
      .sort((a, b) => refDay(b).localeCompare(refDay(a)) || b.id.localeCompare(a.id));
  }, [bookings, query, status, ctx]);

  const shown = compact ? rows.slice(0, pageSize) : rows.slice(0, limit);

  return (
    <div>
      {!compact && (
        <div className="table-tools">
          <input type="search" placeholder="Buscar por pasajero, vuelo o ID…" value={query} onChange={(e) => { setQuery(e.target.value); setLimit(pageSize); }} aria-label="Buscar reservas" />
          <select value={status} onChange={(e) => { setStatus(e.target.value); setLimit(pageSize); }} aria-label="Estado">
            <option value="all">Todos los estados</option>
            <option value="open">Abiertas</option>
            <option value="won">Completadas</option>
            <option value="lost">Canceladas</option>
          </select>
          <span className="cell-sub">{rows.length} reservas</span>
        </div>
      )}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Reserva</th>
              <th>Pasajero</th>
              {!compact && <th>Agente</th>}
              <th>Etapa</th>
              <th className="num">Precio final</th>
              {!compact && <th>Decisión de las reglas</th>}
            </tr>
          </thead>
          <tbody>
            {shown.map((b) => {
              const p = ctx.passengersById[b.passenger_id];
              const flight = ctx.flightsById[b.flight_id];
              const [tone, statusLabel] = STATUS[b.status];
              const e = b.evaluation;
              const isOpen = expanded === b.id;
              return (
                <Fragment key={b.id}>
                  <tr className="clickable" onClick={() => setExpanded(isOpen ? null : b.id)}>
                    <td>
                      <div className="cell-title">{b.title}</div>
                      <div className="cell-sub">{b.id} · {b.status === 'open' ? 'sale' : 'voló'} {shortDate(flight?.departure_date)}</div>
                    </td>
                    <td>
                      <div className="cell-title">{p?.full_name}</div>
                      <span className={`chip ${p?.membership_status === 'Platinum' ? 'blue' : p?.membership_status === 'Gold' ? 'amber' : ''}`}>{p?.membership_status}</span>
                    </td>
                    {!compact && <td>{ctx.usersById[b.owner_id]?.full_name}</td>}
                    <td onClick={(ev) => ev.stopPropagation()}>
                      {onStageChange && !compact ? (
                        <select className="stage-select" value={b.stage_id} aria-label={`Etapa de ${b.id}`} onChange={(ev) => onStageChange(b.id, ev.target.value)}>
                          {ctx.stages.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                      ) : (
                        <span className={`chip ${tone}`}>{ctx.stagesById[b.stage_id]?.name}</span>
                      )}
                      {!compact && <div className="cell-sub" style={{ marginTop: 3 }}>{statusLabel}</div>}
                    </td>
                    <td className="num">
                      {e.finalPrice !== b.amount && <span className="strike">{money(b.amount)}</span>}
                      <strong>{money(e.finalPrice)}</strong>
                    </td>
                    {!compact && (
                      <td><div className="tags">{outcomeTags(e).map(([t, label]) => <span key={label} className={`chip ${t}`}>{label}</span>)}</div></td>
                    )}
                  </tr>
                  {isOpen && (
                    <tr className="detail-row">
                      <td colSpan={compact ? 4 : 6}>
                        <strong>Reglas de Drools activadas ({e.appliedRules.length})</strong>
                        {e.appliedRules.length === 0 ? (
                          <p className="cell-sub">Ninguna regla aplicó a esta reserva: asiento estándar y precio sin cambios.</p>
                        ) : (
                          <ul className="detail-list">
                            {e.appliedRules.map((rule, i) => <li key={rule}><b>{RULE_LABELS[rule] ?? rule}:</b> {e.messages[i]}</li>)}
                          </ul>
                        )}
                        <p className="cell-sub" style={{ marginTop: 6 }}>
                          Equipaje {b.luggage_weight} kg · asiento: {e.assignedSeat} · clase {e.seatClass}
                          {b.loss_reason ? ` · motivo de cancelación: ${b.loss_reason}` : ''}
                        </p>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
        {shown.length === 0 && <p className="empty">No hay reservas con estos filtros.</p>}
      </div>

      {!compact && rows.length > shown.length && (
        <div className="more"><button className="btn secondary" onClick={() => setLimit(limit + pageSize)}>Ver más ({rows.length - shown.length})</button></div>
      )}
    </div>
  );
}
