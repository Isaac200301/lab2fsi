/**
 * Cálculo de métricas del dashboard.
 *
 * Todas las funciones son puras: reciben los datos y devuelven resultados, sin tocar React ni el
 * DOM. Por eso los KPIs NO son texto fijo: se recalculan desde el arreglo de reservas cada vez que
 * cambia un estado, un filtro o se agrega una reserva.
 *
 * Convenciones:
 *  - Ingresos = suma de `evaluation.finalPrice` (precio ya con descuentos de las reglas) de las
 *    reservas con status 'won' (vuelo completado).
 *  - Fecha de referencia de una reserva = `closed_at` si ya cerró (vuelo realizado o cancelación),
 *    y `created_at` si sigue abierta. Es la fecha que usan el filtro de periodo y las gráficas.
 */

export const DAY_MS = 86_400_000;

/** Umbral de puntualidad estándar de la industria: salida con 15 minutos o menos de retraso. */
export const ON_TIME_MINUTES = 15;

export const RULE_LABELS = {
  UpgradeToBusinessClassForFrequentFlyersWithDelays: 'R1 Ascenso a ejecutiva',
  PriorityCheckInForSeniors: 'R2 Check-in prioritario',
  DiscountForLightLuggage: 'R3 Descuento equipaje liviano',
  DenyUpgradeForOverweightLuggage: 'R4 Sin ascenso por sobrepeso',
  AssignEmergencyExitSeatToYoungAdults: 'R5 Salida de emergencia',
  CompensationForExtremeDelays: 'R6 Compensación por retraso',
  ExtraLoyaltyPointsForLongFlights: 'R7 Puntos extra vuelo largo',
  RestrictLuggageOnShortFlights: 'R8 Equipaje restringido',
  VipLoungeAccessForPlatinumMembers: 'R9 Salón VIP',
  PreferentialSeatForFamilies: 'R10 Asiento familiar',
};

// ---------- Fechas ----------
const toMs = (day) => Date.parse(`${day}T00:00:00Z`);
const toDay = (ms) => new Date(ms).toISOString().slice(0, 10);

/** Fecha (YYYY-MM-DD) que usa una reserva para los filtros y las series de tiempo. */
export function refDay(booking) {
  return (booking.closed_at ?? booking.created_at).slice(0, 10);
}

export function addDays(day, n) {
  return toDay(toMs(day) + n * DAY_MS);
}

export function daysBetween(from, to) {
  return Math.round((toMs(to) - toMs(from)) / DAY_MS) + 1;
}

/** Lunes de la semana a la que pertenece `day`. */
export function weekStart(day) {
  const ms = toMs(day);
  const dow = new Date(ms).getUTCDay(); // 0 = domingo
  return toDay(ms - ((dow + 6) % 7) * DAY_MS);
}

/**
 * Convierte un preset de periodo en un rango {from, to}. `all` devuelve rango abierto.
 * @param {'7'|'30'|'90'|'all'|'custom'} preset
 * @param {{from?: string, to?: string}} custom rango manual (solo si preset = 'custom')
 * @param {string} today fecha de "hoy" (YYYY-MM-DD)
 */
export function resolveRange(preset, custom, today) {
  if (preset === 'all') return { from: null, to: null };
  if (preset === 'custom') return { from: custom?.from || null, to: custom?.to || null };
  const n = Number(preset);
  return { from: addDays(today, -(n - 1)), to: today };
}

/** Periodo inmediatamente anterior y de igual duración. `null` si el rango está abierto. */
export function previousRange({ from, to }) {
  if (!from || !to) return null;
  const len = daysBetween(from, to);
  const prevTo = addDays(from, -1);
  return { from: addDays(prevTo, -(len - 1)), to: prevTo };
}

// ---------- Filtros ----------
export const DEFAULT_FILTERS = { preset: '30', custom: { from: '', to: '' }, team: 'all', membership: 'all' };

function inRange(booking, { from, to }) {
  const d = refDay(booking);
  return (!from || d >= from) && (!to || d <= to);
}

/**
 * Aplica periodo, equipo de ventas y membresía.
 * @param {object[]} bookings todas las reservas
 * @param {{usersById: object, passengersById: object}} lookup
 * @param {{team: string, membership: string}} filters
 * @param {{from: ?string, to: ?string}} range periodo ya resuelto
 */
export function filterBookings(bookings, lookup, filters, range) {
  return bookings.filter((b) => {
    if (!inRange(b, range)) return false;
    if (filters.team !== 'all' && lookup.usersById[b.owner_id]?.team !== filters.team) return false;
    if (filters.membership !== 'all' && lookup.passengersById[b.passenger_id]?.membership_status !== filters.membership) return false;
    return true;
  });
}

// ---------- Cambios de estado ----------
/**
 * Mueve una reserva a otra etapa y deja `status` y `closed_at` coherentes con ella.
 * Es lo que hace que los KPIs cambien al pasar una reserva a "Vuelo completado".
 */
export function applyStage(booking, stage, today, flightsById) {
  const next = { ...booking, stage_id: stage.id, status: stage.type };
  if (stage.type === 'open') {
    next.closed_at = null;
    next.loss_reason = null;
  } else if (stage.type === 'won') {
    const departure = flightsById?.[booking.flight_id]?.departure_date ?? today;
    const day = departure <= today ? departure : today;
    next.closed_at = `${day}T12:00:00.000Z`;
    next.loss_reason = null;
  } else {
    next.closed_at = `${today}T12:00:00.000Z`;
    next.loss_reason = booking.loss_reason ?? 'Cancelación del pasajero';
  }
  return next;
}

// ---------- KPIs ----------
const sum = (arr, fn) => arr.reduce((s, x) => s + fn(x), 0);

/**
 * KPIs de un conjunto (ya filtrado) de reservas.
 * @returns {object} ver los campos en el cuerpo; los porcentajes son 0-100 o null si no hay datos
 */
export function computeKpis(bookings, flightsById) {
  const won = bookings.filter((b) => b.status === 'won');
  const open = bookings.filter((b) => b.status === 'open');
  const lost = bookings.filter((b) => b.status === 'lost');
  const closed = won.length + lost.length;

  const totalRevenue = sum(won, (b) => b.evaluation.finalPrice);
  const delays = won.map((b) => flightsById[b.flight_id]?.delay_minutes ?? 0);

  return {
    totalRevenue,
    wonCount: won.length,
    activeDeals: open.length,
    pipelineValue: sum(open, (b) => b.evaluation.finalPrice),
    lostCount: lost.length,
    winRate: closed ? (won.length / closed) * 100 : null,
    avgDealSize: won.length ? totalRevenue / won.length : null,
    discountsGiven: sum(won, (b) => b.amount - b.evaluation.finalPrice),
    compensations: sum(won, (b) => b.evaluation.compensation),
    upgrades: won.filter((b) => b.evaluation.seatClass === 'Ejecutiva').length,
    loyaltyPoints: sum(won, (b) => b.evaluation.extraLoyaltyPoints),
    onTimeRate: won.length ? (delays.filter((m) => m <= ON_TIME_MINUTES).length / won.length) * 100 : null,
    avgDelay: won.length ? delays.reduce((s, m) => s + m, 0) / won.length : null,
  };
}

/** Reservas creadas en los 7 días anteriores a `today` (para el "+N nuevas esta semana"). */
export function countNewThisWeek(bookings, today) {
  const from = addDays(today, -6);
  return bookings.filter((b) => b.created_at.slice(0, 10) >= from && b.created_at.slice(0, 10) <= today).length;
}

/** Variación porcentual; `null` si no hay base de comparación. */
export function pctChange(current, previous) {
  if (previous === null || previous === undefined || previous === 0) return null;
  return ((current - previous) / previous) * 100;
}

// ---------- Series para las gráficas ----------
/** Ingresos y cantidad de reservas por etapa del pipeline, en el orden de las etapas. */
export function revenueByStage(bookings, stages) {
  return [...stages]
    .sort((a, b) => a.display_order - b.display_order)
    .map((stage) => {
      const rows = bookings.filter((b) => b.stage_id === stage.id);
      return { stage: stage.name, type: stage.type, revenue: Math.round(sum(rows, (b) => b.evaluation.finalPrice)), count: rows.length };
    });
}

/**
 * Ingresos (vuelos completados) y compensaciones pagadas, agrupados por semana.
 * Incluye las semanas sin ventas para que la línea sea continua.
 */
export function salesOverTime(bookings, range, today) {
  const won = bookings.filter((b) => b.status === 'won');
  const days = won.map(refDay).sort();
  const from = range.from ?? days[0];
  const to = range.to ?? today;
  if (!from) return [];

  const buckets = new Map();
  for (let w = weekStart(from); w <= to; w = addDays(w, 7)) {
    buckets.set(w, { week: w, revenue: 0, compensation: 0, flights: 0 });
  }
  for (const b of won) {
    const bucket = buckets.get(weekStart(refDay(b)));
    if (!bucket) continue;
    bucket.revenue += b.evaluation.finalPrice;
    bucket.compensation += b.evaluation.compensation;
    bucket.flights += 1;
  }
  return [...buckets.values()].map((r) => ({ ...r, revenue: Math.round(r.revenue) }));
}

/** Cuántas veces se activó cada regla de Drools (reservas no canceladas). */
export function ruleActivations(bookings) {
  const counts = {};
  for (const b of bookings) {
    if (b.status === 'lost') continue;
    for (const rule of b.evaluation.appliedRules) counts[rule] = (counts[rule] ?? 0) + 1;
  }
  return Object.entries(RULE_LABELS)
    .map(([rule, label]) => ({ rule, label, count: counts[rule] ?? 0 }))
    .sort((a, b) => b.count - a.count);
}

export function membershipMix(bookings, passengersById) {
  const order = ['Basic', 'Silver', 'Gold', 'Platinum'];
  return order.map((name) => {
    const rows = bookings.filter((b) => passengersById[b.passenger_id]?.membership_status === name);
    const won = rows.filter((b) => b.status === 'won');
    return { name, bookings: rows.length, revenue: Math.round(sum(won, (b) => b.evaluation.finalPrice)) };
  });
}

/** Rendimiento por agente: ingresos vs cuota mensual prorrateada al periodo analizado. */
export function teamPerformance(bookings, users, range, today) {
  const refDays = bookings.map(refDay).sort();
  const from = range.from ?? refDays[0] ?? today;
  const to = range.to ?? today;
  const months = Math.max(daysBetween(from, to), 1) / 30;
  return users.map((u) => {
    const mine = bookings.filter((b) => b.owner_id === u.id);
    const won = mine.filter((b) => b.status === 'won');
    const lost = mine.filter((b) => b.status === 'lost');
    const revenue = sum(won, (b) => b.evaluation.finalPrice);
    const quota = u.quota_amount * months;
    return {
      id: u.id,
      name: u.full_name,
      team: u.team,
      role: u.role,
      revenue: Math.round(revenue),
      quota: Math.round(quota),
      attainment: quota ? (revenue / quota) * 100 : null,
      won: won.length,
      open: mine.filter((b) => b.status === 'open').length,
      winRate: won.length + lost.length ? (won.length / (won.length + lost.length)) * 100 : null,
    };
  });
}

/** Vuelos con su ocupación comercial y retrasos, calculados desde las reservas filtradas. */
export function flightSummary(bookings, flights) {
  const byFlight = {};
  for (const b of bookings) (byFlight[b.flight_id] ??= []).push(b);
  return flights
    .filter((f) => byFlight[f.id])
    .map((f) => {
      const rows = byFlight[f.id];
      const won = rows.filter((b) => b.status === 'won');
      return {
        ...f,
        bookings: rows.length,
        revenue: Math.round(sum(won, (b) => b.evaluation.finalPrice)),
        compensation: sum(won, (b) => b.evaluation.compensation),
        onTime: f.delay_minutes <= ON_TIME_MINUTES,
      };
    })
    .sort((a, b) => b.departure_date.localeCompare(a.departure_date));
}

/** Valor del cliente: reservas, ingresos y puntos acumulados por pasajero. */
export function passengerSummary(bookings, passengers) {
  const byPassenger = {};
  for (const b of bookings) (byPassenger[b.passenger_id] ??= []).push(b);
  return passengers
    .filter((p) => byPassenger[p.id])
    .map((p) => {
      const rows = byPassenger[p.id];
      const won = rows.filter((b) => b.status === 'won');
      return {
        ...p,
        bookings: rows.length,
        trips: won.length,
        revenue: Math.round(sum(won, (b) => b.evaluation.finalPrice)),
        points: sum(won, (b) => b.evaluation.extraLoyaltyPoints),
        open: rows.filter((b) => b.status === 'open').length,
      };
    })
    .sort((a, b) => b.revenue - a.revenue);
}

// ---------- Alertas accionables ----------
/**
 * Alertas que responden a la pregunta "¿qué decisión tomo al ver estos datos?".
 * @returns {{level: 'warn'|'info'|'ok', text: string}[]}
 */
export function buildAlerts(bookings, flightsById, passengersById, kpis, today) {
  const alerts = [];
  const soon = addDays(today, 3);

  const atRisk = bookings.filter((b) => {
    if (b.status !== 'open' || !['s1', 's2'].includes(b.stage_id)) return false;
    const dep = flightsById[b.flight_id]?.departure_date;
    return dep && dep <= soon;
  });
  if (atRisk.length) {
    const value = Math.round(sum(atRisk, (b) => b.evaluation.finalPrice));
    alerts.push({ level: 'warn', text: `${atRisk.length} ${atRisk.length === 1 ? 'reserva con salida' : 'reservas con salida'} en 3 días o menos ${atRisk.length === 1 ? 'sigue' : 'siguen'} en Cotización o Reserva ($${value.toLocaleString('en-US')}). Conviene contactar ${atRisk.length === 1 ? 'al pasajero' : 'a los pasajeros'} hoy.` });
  }

  const longDelays = bookings.filter((b) => b.status === 'won' && (flightsById[b.flight_id]?.delay_minutes ?? 0) > 180);
  if (longDelays.length) {
    alerts.push({ level: 'warn', text: `${longDelays.length} ${longDelays.length === 1 ? 'pasajero viajó' : 'pasajeros viajaron'} con retrasos de más de 3 horas y ${longDelays.length === 1 ? 'generó' : 'generaron'} $${kpis.compensations.toLocaleString('en-US')} en compensaciones (Regla 6). Revise las rutas con más retrasos.` });
  }

  if (kpis.onTimeRate !== null && kpis.onTimeRate < 70) {
    alerts.push({ level: 'warn', text: `La puntualidad del periodo es ${kpis.onTimeRate.toFixed(0)}%, por debajo de la meta de 70%.` });
  } else if (kpis.onTimeRate !== null) {
    alerts.push({ level: 'ok', text: `Puntualidad de ${kpis.onTimeRate.toFixed(0)}%: cumple la meta de 70%.` });
  }

  const blockedUpgrades = bookings.filter(
    (b) => b.evaluation.appliedRules.includes('DenyUpgradeForOverweightLuggage')
      && ['Gold', 'Platinum'].includes(passengersById[b.passenger_id]?.membership_status),
  );
  if (blockedUpgrades.length) alerts.push({ level: 'info', text: `${blockedUpgrades.length} ${blockedUpgrades.length === 1 ? 'socio Gold/Platinum perdió' : 'socios Gold/Platinum perdieron'} el ascenso por sobrepeso de equipaje (Regla 4).` });

  return alerts;
}

// ---------- Contexto para el chatbot ----------
/**
 * Resumen compacto de lo que muestra el dashboard, para que el agente de n8n responda con los
 * mismos números que ve el usuario. Se envía en cada mensaje (no se guarda en la memoria del chat).
 */
export function buildChatContext({ filters, range, kpis, prevKpis, stageRows, rules, team, membership, flights, passengers, topBookings, alerts, today }) {
  const round = (n, d = 0) => (n === null || n === undefined ? null : Number(n.toFixed(d)));
  return {
    fecha_actual: today,
    moneda: 'USD',
    filtros_activos: { periodo: range.from ? `${range.from} a ${range.to}` : 'todo el historial', equipo: filters.team, membresia: filters.membership },
    kpis: {
      ingresos_totales: round(kpis.totalRevenue),
      ingresos_periodo_anterior: prevKpis ? round(prevKpis.totalRevenue) : null,
      reservas_activas: kpis.activeDeals,
      valor_pipeline_abierto: round(kpis.pipelineValue),
      tasa_de_cierre_pct: round(kpis.winRate, 1),
      ticket_promedio: round(kpis.avgDealSize, 1),
      puntualidad_pct: round(kpis.onTimeRate, 1),
      retraso_promedio_min: round(kpis.avgDelay, 1),
      compensaciones_pagadas: round(kpis.compensations),
      descuentos_otorgados: round(kpis.discountsGiven),
      ascensos_a_ejecutiva: kpis.upgrades,
      puntos_lealtad_extra: kpis.loyaltyPoints,
      vuelos_completados: kpis.wonCount,
      reservas_canceladas: kpis.lostCount,
    },
    ingresos_por_etapa: stageRows.map((r) => ({ etapa: r.stage, reservas: r.count, ingresos: r.revenue })),
    reglas_mas_activadas: rules.filter((r) => r.count > 0).slice(0, 10).map((r) => ({ regla: r.label, veces: r.count })),
    agentes: team.map((t) => ({ nombre: t.name, equipo: t.team, ingresos: t.revenue, cuota_periodo: t.quota, cumplimiento_pct: round(t.attainment, 0), abiertas: t.open })),
    membresias: membership.map((m) => ({ nivel: m.name, reservas: m.bookings, ingresos: m.revenue })),
    vuelos_con_mas_retraso: [...flights].sort((a, b) => b.delay_minutes - a.delay_minutes).slice(0, 5).map((f) => ({ vuelo: f.flight_number, ruta: `${f.origin}-${f.destination}`, fecha: f.departure_date, retraso_min: f.delay_minutes })),
    mejores_pasajeros: passengers.slice(0, 5).map((p) => ({ nombre: p.full_name, membresia: p.membership_status, viajes: p.trips, ingresos: p.revenue })),
    reservas_destacadas: topBookings.map((b) => ({ id: b.id, vuelo: b.title, pasajero: b.passengerName, etapa: b.stageName, estado: b.status, precio_final: b.evaluation.finalPrice })),
    alertas: alerts.map((a) => a.text),
  };
}
