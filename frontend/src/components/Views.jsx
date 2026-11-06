import { delayLabel, longDate, money, num, pct, shortDate } from '../lib/format.js';
import { QuotaChart } from './Charts.jsx';

const memChip = (m) => (m === 'Platinum' ? 'blue' : m === 'Gold' ? 'amber' : '');

/** CRM de clientes: valor de cada pasajero en el periodo filtrado. */
export function PassengersView({ rows }) {
  return (
    <div className="card">
      <h3>Pasajeros</h3>
      <p className="sub">{rows.length} pasajeros con reservas en el periodo, ordenados por ingresos.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Pasajero</th><th>Membresía</th><th>Ciudad</th><th className="num">Edad</th><th className="num">Reservas</th><th className="num">Viajes</th><th className="num">Abiertas</th><th className="num">Puntos extra</th><th className="num">Ingresos</th></tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td><div className="cell-title">{p.full_name}</div><div className="cell-sub">{p.email}</div></td>
                <td><span className={`chip ${memChip(p.membership_status)}`}>{p.membership_status}</span></td>
                <td>{p.city}</td>
                <td className="num">{p.age}</td>
                <td className="num">{p.bookings}</td>
                <td className="num">{p.trips}</td>
                <td className="num">{p.open}</td>
                <td className="num">{num(p.points)}</td>
                <td className="num"><strong>{money(p.revenue)}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="empty">No hay pasajeros con estos filtros.</p>}
      </div>
    </div>
  );
}

/** Operación: vuelos con retrasos, puntualidad y compensaciones. */
export function FlightsView({ rows, today }) {
  return (
    <div className="card">
      <h3>Vuelos</h3>
      <p className="sub">{rows.length} vuelos con reservas en el periodo. La puntualidad usa el umbral de 15 minutos.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Vuelo</th><th>Ruta</th><th>Fecha</th><th className="num">Duración</th><th>Puntualidad</th><th className="num">Reservas</th><th className="num">Ingresos</th><th className="num">Compensaciones</th></tr>
          </thead>
          <tbody>
            {rows.map((f) => {
              const future = f.departure_date > today;
              const tone = future ? '' : f.delay_minutes > 180 ? 'red' : f.delay_minutes > 60 ? 'amber' : f.onTime ? 'green' : 'blue';
              return (
                <tr key={f.id}>
                  <td className="cell-title">{f.flight_number}</td>
                  <td>{f.origin} → {f.destination}</td>
                  <td>{longDate(f.departure_date)}</td>
                  <td className="num">{f.duration_hours} h</td>
                  <td><span className={`chip ${tone}`}>{future ? 'Programado' : delayLabel(f.delay_minutes)}</span></td>
                  <td className="num">{f.bookings}</td>
                  <td className="num">{money(f.revenue)}</td>
                  <td className="num">{f.compensation ? money(f.compensation) : '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && <p className="empty">No hay vuelos con estos filtros.</p>}
      </div>
    </div>
  );
}

/** Rendimiento del equipo de ventas contra su cuota. */
export function TeamView({ rows }) {
  return (
    <>
      <div className="card" style={{ marginBottom: 16 }}>
        <h3>Ingresos vs. cuota por agente</h3>
        <p className="sub">La cuota mensual se prorratea a la duración del periodo seleccionado.</p>
        <QuotaChart rows={rows} />
      </div>
      <div className="card">
        <h3>Detalle del equipo</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Agente</th><th>Equipo</th><th className="num">Ingresos</th><th className="num">Cuota</th><th>Cumplimiento</th><th className="num">Completadas</th><th className="num">Abiertas</th><th className="num">Tasa de cierre</th></tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.id}>
                  <td><div className="cell-title">{t.name}</div><div className="cell-sub">{t.role === 'manager' ? 'Gerente' : 'Asesor comercial'}</div></td>
                  <td>{t.team}</td>
                  <td className="num"><strong>{money(t.revenue)}</strong></td>
                  <td className="num">{money(t.quota)}</td>
                  <td>
                    <div className="progress"><i className={t.attainment >= 100 ? 'good' : ''} style={{ width: `${Math.min(t.attainment ?? 0, 100)}%` }} /></div>
                    <span className="cell-sub">{pct(t.attainment)}</span>
                  </td>
                  <td className="num">{t.won}</td>
                  <td className="num">{t.open}</td>
                  <td className="num">{pct(t.winRate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
