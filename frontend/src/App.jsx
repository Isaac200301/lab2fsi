import { useMemo, useState } from 'react';
import * as seed from './data/mockData.js';
import {
  DEFAULT_FILTERS, applyStage, buildAlerts, buildChatContext, computeKpis, countNewThisWeek, filterBookings,
  flightSummary, membershipMix, passengerSummary, pctChange, previousRange, resolveRange, revenueByStage,
  ruleActivations, salesOverTime, teamPerformance,
} from './lib/metrics.js';
import { money, num, pct } from './lib/format.js';
import Sidebar, { VIEWS } from './components/Sidebar.jsx';
import FilterBar from './components/FilterBar.jsx';
import KpiCard from './components/KpiCard.jsx';
import Icon from './components/Icons.jsx';
import BookingsTable from './components/BookingsTable.jsx';
import NewBookingModal from './components/NewBookingModal.jsx';
import ChatWidget from './components/ChatWidget.jsx';
import { FlightsView, PassengersView, TeamView } from './components/Views.jsx';
import { MembershipChart, RevenueByStageChart, RulesChart, SalesTrendChart } from './components/Charts.jsx';

const TODAY = seed.REFERENCE_DATE;
const byId = (rows) => Object.fromEntries(rows.map((r) => [r.id, r]));
const TEAMS = [...new Set(seed.users.map((u) => u.team))];
const MEMBERSHIPS = ['Basic', 'Silver', 'Gold', 'Platinum'];

const lookup = {
  usersById: byId(seed.users),
  passengersById: byId(seed.passengers),
  flightsById: byId(seed.flights),
  stagesById: byId(seed.stages),
};
const ctx = { ...lookup, stages: [...seed.stages].sort((a, b) => a.display_order - b.display_order) };

export default function App() {
  // Las reservas viven en el estado: al cambiar una etapa o crear una reserva, todo se recalcula.
  const [bookings, setBookings] = useState(seed.bookings);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [view, setView] = useState('dashboard');
  const [creating, setCreating] = useState(false);

  const range = useMemo(() => resolveRange(filters.preset, filters.custom, TODAY), [filters.preset, filters.custom]);
  const filtered = useMemo(() => filterBookings(bookings, lookup, filters, range), [bookings, filters, range]);
  const prevRange = useMemo(() => previousRange(range), [range]);
  const prevFiltered = useMemo(() => (prevRange ? filterBookings(bookings, lookup, filters, prevRange) : null), [bookings, filters, prevRange]);

  const kpis = useMemo(() => computeKpis(filtered, lookup.flightsById), [filtered]);
  const prevKpis = useMemo(() => (prevFiltered ? computeKpis(prevFiltered, lookup.flightsById) : null), [prevFiltered]);

  const stageRows = useMemo(() => revenueByStage(filtered, seed.stages), [filtered]);
  const trend = useMemo(() => salesOverTime(filtered, range, TODAY), [filtered, range]);
  const rules = useMemo(() => ruleActivations(filtered), [filtered]);
  const membership = useMemo(() => membershipMix(filtered, lookup.passengersById), [filtered]);
  const team = useMemo(() => teamPerformance(filtered, seed.users, range, TODAY), [filtered, range]);
  const flightRows = useMemo(() => flightSummary(filtered, seed.flights), [filtered]);
  const passengerRows = useMemo(() => passengerSummary(filtered, seed.passengers), [filtered]);
  const alerts = useMemo(() => buildAlerts(filtered, lookup.flightsById, lookup.passengersById, kpis, TODAY), [filtered, kpis]);
  const newThisWeek = useMemo(() => countNewThisWeek(filtered, TODAY), [filtered]);

  const topBookings = useMemo(
    () => [...filtered].filter((b) => b.status !== 'lost').sort((a, b) => b.evaluation.finalPrice - a.evaluation.finalPrice).slice(0, 6),
    [filtered],
  );

  // Contexto que se envía al agente de n8n en cada mensaje del chat.
  const chatContext = useMemo(() => buildChatContext({
    filters, range, kpis, prevKpis, stageRows, rules, team, membership,
    flights: flightRows, passengers: passengerRows, alerts, today: TODAY,
    topBookings: topBookings.map((b) => ({
      ...b,
      passengerName: lookup.passengersById[b.passenger_id]?.full_name,
      stageName: lookup.stagesById[b.stage_id]?.name,
    })),
  }), [filters, range, kpis, prevKpis, stageRows, rules, team, membership, flightRows, passengerRows, alerts, topBookings]);

  function changeStage(bookingId, stageId) {
    const stage = lookup.stagesById[stageId];
    setBookings((all) => all.map((b) => (b.id === bookingId ? applyStage(b, stage, TODAY, lookup.flightsById) : b)));
  }

  function addBooking(fields) {
    setBookings((all) => {
      const next = Math.max(...all.map((b) => Number(b.id.slice(1)))) + 1;
      return [...all, { ...fields, id: `b${String(next).padStart(3, '0')}`, created_at: `${TODAY}T12:00:00.000Z` }];
    });
    setCreating(false);
  }

  const delta = (cur, prev) => (prevKpis ? pctChange(cur, prev) : undefined);
  const deltaPts = (cur, prev) => (prevKpis && cur !== null && prev !== null ? cur - prev : prevKpis ? null : undefined);
  const current = VIEWS.find((v) => v.id === view);

  return (
    <div className="app">
      <Sidebar view={view} onChange={setView} />

      <main className="main">
        <header className="page-head">
          <div>
            <h1>{current.id === 'dashboard' ? 'Panel de operación y ventas' : current.label}</h1>
            <p>Reservas, pasajeros y vuelos de AeroVirtual · datos simulados al {TODAY}</p>
          </div>
          <button className="btn" onClick={() => setCreating(true)}><span style={{ verticalAlign: 'middle', marginRight: 6 }}><Icon name="plus" size={15} /></span>Nueva reserva</button>
        </header>

        <FilterBar filters={filters} onChange={setFilters} teams={TEAMS} memberships={MEMBERSHIPS} range={range} />

        {view === 'dashboard' && (
          <>
            <h2 className="section-title">Ventas</h2>
            <div className="grid kpis">
              <KpiCard label="Ingresos totales" tone="coral" value={money(kpis.totalRevenue)}
                delta={delta(kpis.totalRevenue, prevKpis?.totalRevenue)}
                foot={<span>{kpis.wonCount} vuelos completados · {money(kpis.discountsGiven)} en descuentos</span>}
                hint="Suma del precio final (con descuentos de las reglas) de las reservas completadas." />
              <KpiCard label="Reservas activas" tone="blue" value={num(kpis.activeDeals)}
                foot={<><span className="chip blue">+{newThisWeek} nuevas esta semana</span><span>{money(kpis.pipelineValue)} en pipeline</span></>}
                hint="Reservas con estado abierto: Cotización, Reserva, Check-in o Abordaje." />
              <KpiCard label="Tasa de cierre" tone="green" value={pct(kpis.winRate, 1)}
                delta={deltaPts(kpis.winRate, prevKpis?.winRate)} unit="pts"
                foot={<span>{kpis.wonCount} completadas · {kpis.lostCount} canceladas</span>}
                hint="Completadas sobre el total de reservas cerradas (completadas + canceladas)." />
              <KpiCard label="Ticket promedio" tone="coral" value={money(kpis.avgDealSize)}
                delta={delta(kpis.avgDealSize, prevKpis?.avgDealSize)}
                foot={<span>por reserva completada</span>}
                hint="Ingresos totales divididos entre las reservas completadas." />
            </div>

            <h2 className="section-title">Operación y reglas de negocio</h2>
            <div className="grid kpis">
              <KpiCard label="Puntualidad" tone="green" value={pct(kpis.onTimeRate, 1)}
                delta={deltaPts(kpis.onTimeRate, prevKpis?.onTimeRate)} unit="pts"
                foot={<span>retraso promedio {kpis.avgDelay === null ? '—' : `${kpis.avgDelay.toFixed(0)} min`}</span>}
                hint="Pasajeros de vuelos completados con 15 minutos o menos de retraso." />
              <KpiCard label="Compensaciones pagadas" tone="red" value={money(kpis.compensations)}
                delta={delta(kpis.compensations, prevKpis?.compensations)} invert
                foot={<span>Regla 6 · retrasos de más de 3 h</span>}
                hint="Suma de las compensaciones de $200 de la Regla 6." />
              <KpiCard label="Ascensos a ejecutiva" tone="blue" value={num(kpis.upgrades)}
                delta={delta(kpis.upgrades, prevKpis?.upgrades)}
                foot={<span>Regla 1 · Gold/Platinum con retraso</span>}
                hint="Pasajeros que subieron de clase por retraso (si la Regla 4 no lo bloqueó)." />
              <KpiCard label="Puntos de lealtad extra" tone="coral" value={num(kpis.loyaltyPoints)}
                delta={delta(kpis.loyaltyPoints, prevKpis?.loyaltyPoints)}
                foot={<span>Regla 7 · vuelos de más de 5 h</span>}
                hint="500 puntos por vuelo largo para membresías distintas a Basic." />
            </div>

            <div className="grid two" style={{ marginTop: 16 }}>
              <section className="card">
                <h3>Ingresos por etapa del pipeline</h3>
                <p className="sub">Precio final acumulado por etapa. Naranja: en proceso · verde: completado · rojo: cancelado.</p>
                <RevenueByStageChart rows={stageRows} />
              </section>
              <section className="card">
                <h3>Decisiones sugeridas</h3>
                <p className="sub">Qué acción tomar con lo que muestran los datos.</p>
                <div className="alerts">
                  {alerts.length === 0 && <p className="empty">Sin alertas para este filtro.</p>}
                  {alerts.map((a) => (
                    <div key={a.text} className={`alert ${a.level}`}>
                      <span className="alert-mark">{a.level === 'warn' ? '!' : a.level === 'ok' ? '✓' : 'i'}</span>
                      <span>{a.text}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="grid two">
              <section className="card">
                <h3>Evolución de ventas</h3>
                <p className="sub">Ingresos de vuelos completados y compensaciones pagadas, por semana.</p>
                <SalesTrendChart rows={trend} />
              </section>
              <section className="card">
                <h3>Reservas por membresía</h3>
                <p className="sub">Distribución del periodo filtrado.</p>
                <MembershipChart rows={membership} />
              </section>
            </div>

            <div className="grid even">
              <section className="card">
                <h3>Reglas de negocio activadas (Drools)</h3>
                <p className="sub">Cuántas reservas dispararon cada una de las 10 reglas del Laboratorio 2.</p>
                <RulesChart rows={rules} />
              </section>
              <section className="card">
                <h3>Top reservas</h3>
                <p className="sub">Las de mayor valor del periodo. Clic en una fila para ver las reglas aplicadas.</p>
                <BookingsTable bookings={topBookings} ctx={ctx} compact pageSize={6} />
              </section>
            </div>
          </>
        )}

        {view === 'bookings' && (
          <section className="card">
            <h3>Reservas</h3>
            <p className="sub">Cambie la etapa de una reserva y los KPIs del dashboard se recalculan al instante. Clic en una fila para ver la decisión de las reglas.</p>
            <BookingsTable bookings={filtered} ctx={ctx} onStageChange={changeStage} />
          </section>
        )}
        {view === 'passengers' && <PassengersView rows={passengerRows} />}
        {view === 'flights' && <FlightsView rows={flightRows} today={TODAY} />}
        {view === 'team' && <TeamView rows={team} />}
      </main>

      <ChatWidget context={chatContext} />

      {creating && (
        <NewBookingModal passengers={seed.passengers} flights={seed.flights} users={seed.users} bookings={bookings}
          today={TODAY} onCreate={addBooking} onClose={() => setCreating(false)} />
      )}
    </div>
  );
}
