import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as data from '../src/data/mockData.js';
import {
  DEFAULT_FILTERS, applyStage, computeKpis, filterBookings, membershipMix, pctChange, previousRange,
  resolveRange, revenueByStage, ruleActivations, salesOverTime, teamPerformance, weekStart,
} from '../src/lib/metrics.js';

const today = data.REFERENCE_DATE;
const byId = (rows) => Object.fromEntries(rows.map((r) => [r.id, r]));
const flightsById = byId(data.flights);
const passengersById = byId(data.passengers);
const usersById = byId(data.users);
const stagesById = byId(data.stages);
const lookup = { usersById, passengersById };
const close = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) <= tol, `${a} != ${b}`);

test('hay al menos 20-30 reservas y todas las etapas tienen datos', () => {
  assert.ok(data.bookings.length >= 30);
  for (const s of data.stages) assert.ok(data.bookings.some((b) => b.stage_id === s.id), `sin reservas en ${s.name}`);
});

test('los ingresos totales son la suma real de las reservas ganadas', () => {
  const expected = data.bookings.filter((b) => b.status === 'won').reduce((s, b) => s + b.evaluation.finalPrice, 0);
  close(computeKpis(data.bookings, flightsById).totalRevenue, expected);
});

test('cambiar una reserva abierta a "Vuelo completado" actualiza ingresos y reservas activas', () => {
  const before = computeKpis(data.bookings, flightsById);
  const target = data.bookings.find((b) => b.status === 'open' && stagesById[b.stage_id].type === 'open');
  const moved = applyStage(target, stagesById.s5, today, flightsById);
  const after = computeKpis(data.bookings.map((b) => (b.id === target.id ? moved : b)), flightsById);

  assert.equal(moved.status, 'won');
  assert.ok(moved.closed_at);
  close(after.totalRevenue, before.totalRevenue + target.evaluation.finalPrice);
  assert.equal(after.activeDeals, before.activeDeals - 1);
  assert.equal(after.wonCount, before.wonCount + 1);
});

test('cancelar una reserva baja la tasa de cierre y reabrirla limpia la fecha de cierre', () => {
  const target = data.bookings.find((b) => b.status === 'won');
  const lost = applyStage(target, stagesById.s6, today, flightsById);
  assert.equal(lost.status, 'lost');
  assert.ok(lost.loss_reason);
  const before = computeKpis(data.bookings, flightsById).winRate;
  const after = computeKpis(data.bookings.map((b) => (b.id === target.id ? lost : b)), flightsById).winRate;
  assert.ok(after < before);
  const reopened = applyStage(lost, stagesById.s2, today, flightsById);
  assert.equal(reopened.status, 'open');
  assert.equal(reopened.closed_at, null);
});

test('el periodo anterior es contiguo y de igual duración', () => {
  const range = resolveRange('30', {}, today);
  assert.deepEqual(range, { from: '2026-10-07', to: '2026-11-05' });
  assert.deepEqual(previousRange(range), { from: '2026-09-07', to: '2026-10-06' });
  assert.equal(previousRange(resolveRange('all', {}, today)), null);
});

test('el filtro por equipo solo deja reservas de agentes de ese equipo', () => {
  const range = resolveRange('all', {}, today);
  const rows = filterBookings(data.bookings, lookup, { ...DEFAULT_FILTERS, team: 'Call Center' }, range);
  assert.ok(rows.length > 0 && rows.length < data.bookings.length);
  assert.ok(rows.every((b) => usersById[b.owner_id].team === 'Call Center'));
});

test('el filtro por fecha y por membresía recorta los datos', () => {
  const range = resolveRange('30', {}, today);
  const rows = filterBookings(data.bookings, lookup, { ...DEFAULT_FILTERS, membership: 'Gold' }, range);
  assert.ok(rows.every((b) => passengersById[b.passenger_id].membership_status === 'Gold'));
  assert.ok(rows.every((b) => (b.closed_at ?? b.created_at).slice(0, 10) >= range.from));
});

test('las gráficas suman lo mismo que los KPIs', () => {
  const range = resolveRange('90', {}, today);
  const rows = filterBookings(data.bookings, lookup, DEFAULT_FILTERS, range);
  const kpis = computeKpis(rows, flightsById);

  const trend = salesOverTime(rows, range, today);
  close(trend.reduce((s, w) => s + w.revenue, 0), kpis.totalRevenue, trend.length);

  const stageRows = revenueByStage(rows, data.stages);
  assert.equal(stageRows.reduce((s, r) => s + r.count, 0), rows.length);
  const won = stageRows.find((r) => r.type === 'won');
  close(won.revenue, kpis.totalRevenue, 1);

  assert.equal(membershipMix(rows, passengersById).reduce((s, m) => s + m.bookings, 0), rows.length);
});

test('el rendimiento por agente suma los ingresos del conjunto filtrado', () => {
  const range = resolveRange('all', {}, today);
  const perf = teamPerformance(data.bookings, data.users, range, today);
  const total = computeKpis(data.bookings, flightsById).totalRevenue;
  close(perf.reduce((s, p) => s + p.revenue, 0), total, perf.length);
});

test('las 10 reglas de Drools aparecen activadas en los datos', () => {
  const rules = ruleActivations(data.bookings);
  assert.equal(rules.length, 10);
  assert.ok(rules.every((r) => r.count > 0), 'alguna regla nunca se activó: ' + rules.filter((r) => !r.count).map((r) => r.rule));
});

test('coherencia de las decisiones de Drools guardadas en los datos', () => {
  for (const b of data.bookings) {
    const e = b.evaluation;
    if (e.appliedRules.includes('DiscountForLightLuggage')) close(e.finalPrice, b.amount * 0.9, 1e-6);
    else assert.equal(e.finalPrice, b.amount);
    if (e.appliedRules.includes('CompensationForExtremeDelays')) assert.ok(flightsById[b.flight_id].delay_minutes > 180);
    if (e.appliedRules.includes('UpgradeToBusinessClassForFrequentFlyersWithDelays')) {
      assert.equal(e.seatClass, 'Ejecutiva');
      assert.ok(b.luggage_weight <= 23, 'ascenso con sobrepeso: Regla 4 debía bloquearlo');
    }
    if (e.appliedRules.includes('DenyUpgradeForOverweightLuggage')) assert.equal(e.upgradeEligible, false);
    assert.equal(e.vipLoungeAccess, passengersById[b.passenger_id].membership_status === 'Platinum');
  }
});

test('un asiento de salida de emergencia no se asigna dos veces en el mismo vuelo', () => {
  const seen = new Map();
  for (const b of data.bookings) {
    if (b.status === 'lost' || b.evaluation.assignedSeat !== 'Salida de emergencia') continue;
    assert.ok(!seen.has(b.flight_id), `vuelo ${b.flight_id} con dos asientos de emergencia`);
    seen.set(b.flight_id, b.id);
  }
});

test('utilidades de fecha y variación', () => {
  assert.equal(weekStart('2026-11-05'), '2026-11-02'); // jueves -> lunes
  assert.equal(weekStart('2026-11-08'), '2026-11-02'); // domingo -> lunes anterior
  assert.equal(pctChange(150, 100), 50);
  assert.equal(pctChange(10, 0), null);
});
