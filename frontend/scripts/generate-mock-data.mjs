#!/usr/bin/env node
/**
 * Generador de datos simulados (mock data) del dashboard CRM de la aerolínea.
 *
 * Qué hace:
 *   1. Crea agentes, pasajeros, vuelos y reservas con una semilla fija (resultado reproducible).
 *   2. Para CADA reserva llama al motor de reglas real del Laboratorio 2
 *      (POST /airline/api/evaluate de Spring Boot + Drools) y guarda la decisión que tomaron
 *      las 10 reglas: ascenso, descuento, compensación, puntos, asiento, etc.
 *   3. Escribe src/data/mockData.js, que es el archivo que usa la aplicación.
 *
 * Uso (con el backend del Lab 2 corriendo en el puerto 8080):
 *   npm run generate:data
 *   API_URL=http://localhost:8080 npm run generate:data
 *
 * No hace falta ejecutarlo para usar el dashboard: mockData.js ya viene generado y se puede
 * editar a mano. Solo se vuelve a correr si se quiere regenerar el conjunto completo.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const API_URL = process.env.API_URL ?? 'http://localhost:8080';
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/mockData.js');

/** "Hoy" fijo para que el dashboard sea determinista (las fechas de los datos dependen de él). */
const TODAY = '2026-11-05';
const DAY = 86_400_000;
const todayMs = Date.parse(`${TODAY}T12:00:00Z`);

// ---------- Generador pseudoaleatorio con semilla (mulberry32) ----------
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/** Semilla fija: mismo resultado en cada ejecución. Se puede cambiar con SEED=<número>. */
const SEED = Number(process.env.SEED ?? 555);
const rand = mulberry32(SEED);
const int = (min, max) => Math.floor(rand() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const chance = (p) => rand() < p;
function weighted(options) {
  const total = options.reduce((s, [, w]) => s + w, 0);
  let r = rand() * total;
  for (const [value, w] of options) {
    r -= w;
    if (r <= 0) return value;
  }
  return options[options.length - 1][0];
}
const iso = (ms) => new Date(ms).toISOString();
const dateOnly = (ms) => iso(ms).slice(0, 10);
const pad = (n, w = 3) => String(n).padStart(w, '0');

// ---------- Entidades base ----------
const users = [
  { id: 'u1', full_name: 'Ana García', email: 'ana.garcia@aerovirtual.co', role: 'sales_rep', team: 'Ventas Online', quota_amount: 1800, status: 'active' },
  { id: 'u2', full_name: 'Luis Herrera', email: 'luis.herrera@aerovirtual.co', role: 'sales_rep', team: 'Ventas Online', quota_amount: 1600, status: 'active' },
  { id: 'u3', full_name: 'Marta Ospina', email: 'marta.ospina@aerovirtual.co', role: 'manager', team: 'Call Center', quota_amount: 1700, status: 'active' },
  { id: 'u4', full_name: 'Camilo Restrepo', email: 'camilo.restrepo@aerovirtual.co', role: 'sales_rep', team: 'Call Center', quota_amount: 1400, status: 'active' },
  { id: 'u5', full_name: 'Valentina Ruiz', email: 'valentina.ruiz@aerovirtual.co', role: 'sales_rep', team: 'Aeropuerto', quota_amount: 1500, status: 'active' },
  { id: 'u6', full_name: 'Andrés Mejía', email: 'andres.mejia@aerovirtual.co', role: 'sales_rep', team: 'Aeropuerto', quota_amount: 1300, status: 'active' },
].map((u) => ({ ...u, avatar_url: `https://i.pravatar.cc/80?u=${u.id}` }));

const stages = [
  { id: 's1', name: 'Cotización', display_order: 1, win_probability: 10, type: 'open' },
  { id: 's2', name: 'Reserva', display_order: 2, win_probability: 30, type: 'open' },
  { id: 's3', name: 'Check-in', display_order: 3, win_probability: 60, type: 'open' },
  { id: 's4', name: 'Abordaje', display_order: 4, win_probability: 85, type: 'open' },
  { id: 's5', name: 'Vuelo completado', display_order: 5, win_probability: 100, type: 'won' },
  { id: 's6', name: 'Cancelado', display_order: 6, win_probability: 0, type: 'lost' },
];

const firstNames = ['Sofía', 'Mateo', 'Valeria', 'Santiago', 'Isabella', 'Samuel', 'Camila', 'Daniel', 'Mariana', 'Sebastián', 'Luciana', 'Nicolás', 'Gabriela', 'Emmanuel', 'Juliana', 'Tomás', 'Antonia', 'Felipe', 'Rosa', 'Jorge', 'Carmen', 'Álvaro', 'Paula', 'Esteban', 'Natalia', 'Julián', 'Laura', 'Cristian', 'Diana', 'Alejandro'];
const lastNames = ['Ramírez', 'Mendoza', 'Gómez', 'Castaño', 'Vélez', 'Arango', 'Zapata', 'Londoño', 'Giraldo', 'Cardona', 'Pérez', 'Torres', 'Moreno', 'Quintero', 'Salazar', 'Agudelo', 'Montoya', 'Duque', 'Henao', 'Ocampo'];
const cities = ['Medellín', 'Bogotá', 'Cali', 'Cartagena', 'Barranquilla', 'Bucaramanga', 'Pereira', 'Bello'];

const passengers = [];
const usedNames = new Set();
while (passengers.length < 48) {
  const name = `${pick(firstNames)} ${pick(lastNames)} ${pick(lastNames)}`;
  if (usedNames.has(name)) continue;
  usedNames.add(name);
  const membership = weighted([['Basic', 46], ['Silver', 26], ['Gold', 18], ['Platinum', 10]]);
  const seniorBias = chance(0.14);
  const age = seniorBias ? int(66, 82) : int(19, 64);
  const id = `p${pad(passengers.length + 1, 2)}`;
  const slug = name.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]+/g, '.');
  passengers.push({
    id,
    full_name: name,
    email: `${slug}@correo.co`,
    phone: `+57 3${int(0, 2)}${int(0, 9)} ${int(100, 999)} ${int(1000, 9999)}`,
    city: pick(cities),
    age,
    membership_status: membership,
    created_at: iso(todayMs - int(120, 900) * DAY),
  });
}

// Rutas: [origen, destino, duración (h), precio base (USD)]
const routes = [
  ['MDE', 'BOG', 0.9, 95],
  ['BOG', 'CTG', 1.6, 125],
  ['MDE', 'CTG', 1.3, 110],
  ['BOG', 'CLO', 1.0, 90],
  ['BOG', 'BAQ', 1.5, 120],
  ['MDE', 'MIA', 3.7, 340],
  ['BOG', 'MEX', 5.2, 450],
  ['BOG', 'JFK', 5.8, 640],
  ['MDE', 'MAD', 9.8, 920],
  ['BOG', 'MAD', 10.3, 980],
];

// ---------- Vuelos (instancias de un vuelo en una fecha) ----------
const flights = [];
for (let i = 0; i < 80; i++) {
  const route = pick(routes);
  const isPast = chance(0.64);
  const offsetDays = isPast ? -int(1, 96) : chance(0.4) ? int(0, 4) : int(5, 45);
  const departureMs = todayMs + offsetDays * DAY;
  const delayMinutes = isPast
    ? weighted([
        [() => int(0, 15), 64],
        [() => int(16, 60), 14],
        [() => int(61, 180), 14],
        [() => int(181, 330), 8],
      ])()
    : 0;
  flights.push({
    id: `f${pad(i + 1, 3)}`,
    flight_number: `UD${100 + routes.indexOf(route) * 10 + int(0, 9)}`,
    origin: route[0],
    destination: route[1],
    departure_date: dateOnly(departureMs),
    delay_minutes: delayMinutes,
    duration_hours: route[2],
    emergency_exit_seat_available: chance(0.75),
    base_price: route[3],
  });
}
flights.sort((a, b) => a.departure_date.localeCompare(b.departure_date));
flights.forEach((f, i) => (f.id = `f${pad(i + 1, 3)}`));

// ---------- Reservas (deals) ----------
const LOSS_REASONS = ['Cancelación del pasajero', 'No-show (no se presentó)', 'Cambio de itinerario', 'Precio', 'Cambio a la competencia'];
const draft = [];
const BOOKINGS = 130;
for (let i = 0; i < BOOKINGS; i++) {
  const flight = pick(flights);
  const passenger = pick(passengers);
  const owner = pick(users);
  const departureMs = Date.parse(`${flight.departure_date}T12:00:00Z`);
  const isPast = departureMs < todayMs;

  const lead = int(3, 50);
  let createdMs = departureMs - lead * DAY - int(0, 8) * 3_600_000;
  if (createdMs > todayMs - 3_600_000) createdMs = todayMs - int(1, 9) * DAY;
  createdMs = Math.max(createdMs, todayMs - 110 * DAY);

  let status;
  let stageId;
  let closedMs = null;
  let lossReason = null;
  if (isPast) {
    if (chance(0.9)) {
      status = 'won';
      stageId = 's5';
      closedMs = departureMs + int(1, 5) * 3_600_000 + delayMinutesMs(flight);
    } else {
      status = 'lost';
      stageId = 's6';
      closedMs = createdMs + Math.max(1, int(1, Math.max(1, lead - 1))) * DAY;
      lossReason = pick(LOSS_REASONS);
    }
  } else if (chance(0.06)) {
    status = 'lost';
    stageId = 's6';
    closedMs = Math.min(todayMs, createdMs + int(1, 6) * DAY);
    lossReason = pick(LOSS_REASONS);
  } else {
    status = 'open';
    const d = Math.round((departureMs - todayMs) / DAY);
    // Cuanto más cerca la salida, más avanzada la etapa: Cotización -> Reserva -> Check-in -> Abordaje.
    if (d <= 0) stageId = 's4';
    else if (d <= 1) stageId = chance(0.6) ? 's4' : 's3';
    else if (d <= 3) stageId = chance(0.75) ? 's3' : 's2';
    else if (d <= 5) stageId = chance(0.4) ? 's3' : 's2';
    else if (d <= 21) stageId = chance(0.8) ? 's2' : 's1';
    else stageId = chance(0.55) ? 's1' : 's2';
  }

  const seatPreference = weighted([['Any', 52], ['Window', 30], ['Aisle', 18]]);
  const travelingWithChildren = passenger.age >= 25 && passenger.age <= 55 && chance(0.26);
  const luggageWeight = Math.round(weighted([
    [() => rand() * 9.5, 22], // liviano (< 10 kg)
    [() => 10 + rand() * 5, 26], // normal
    [() => 15 + rand() * 8, 30], // medio-alto
    [() => 23.5 + rand() * 8, 22], // sobrepeso (> 23 kg)
  ])() * 10) / 10;
  const ticketPrice = Math.round(flight.base_price * (0.85 + rand() * 0.35));

  draft.push({
    createdMs, closedMs, status, stageId, lossReason, flight, passenger, owner,
    seatPreference, travelingWithChildren, luggageWeight, ticketPrice, departureMs,
  });
}
function delayMinutesMs(flight) {
  return flight.delay_minutes * 60_000;
}

// Orden cronológico: el asiento de salida de emergencia es único por vuelo (la Regla 5 lo marca ocupado).
draft.sort((a, b) => a.createdMs - b.createdMs);
const exitSeatTaken = new Set();

async function evaluate(body) {
  const res = await fetch(`${API_URL}/airline/api/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`El backend respondió ${res.status}: ${await res.text()}`);
  return res.json();
}

try {
  const probe = await fetch(`${API_URL}/airline/form`).catch(() => null);
  if (!probe || !probe.ok) throw new Error('sin conexión');
} catch {
  console.error(`No se pudo conectar con el backend en ${API_URL}.`);
  console.error('Arranque el Laboratorio 2 primero:  mvn spring-boot:run   (desde la raíz del repositorio)');
  process.exit(1);
}

const bookings = [];
for (const [i, d] of draft.entries()) {
  const exitAvailable = d.flight.emergency_exit_seat_available && !exitSeatTaken.has(d.flight.id);
  const evaluation = await evaluate({
    passenger: {
      name: d.passenger.full_name,
      age: d.passenger.age,
      membershipStatus: d.passenger.membership_status,
      seatPreference: d.seatPreference,
      travelingWithChildren: d.travelingWithChildren,
      luggageWeight: d.luggageWeight,
    },
    flight: {
      flightNumber: d.flight.flight_number,
      delayMinutes: d.flight.delay_minutes,
      durationHours: d.flight.duration_hours,
      emergencyExitSeatAvailable: exitAvailable,
      ticketPrice: d.ticketPrice,
    },
  });
  if (evaluation.assignedSeat === 'Salida de emergencia' && d.status !== 'lost') exitSeatTaken.add(d.flight.id);

  bookings.push({
    id: `b${pad(i + 1)}`,
    title: `${d.flight.flight_number} · ${d.flight.origin} → ${d.flight.destination}`,
    passenger_id: d.passenger.id,
    flight_id: d.flight.id,
    owner_id: d.owner.id,
    stage_id: d.stageId,
    amount: d.ticketPrice,
    currency: 'USD',
    status: d.status,
    seat_preference: d.seatPreference,
    traveling_with_children: d.travelingWithChildren,
    luggage_weight: d.luggageWeight,
    created_at: iso(d.createdMs),
    expected_close_date: d.flight.departure_date,
    closed_at: d.closedMs ? iso(d.closedMs) : null,
    loss_reason: d.lossReason,
    evaluation,
  });
}
bookings.sort((a, b) => a.created_at.localeCompare(b.created_at));
bookings.forEach((b, i) => (b.id = `b${pad(i + 1)}`));

// ---------- Escritura del archivo ----------
const header = `/**
 * DATOS SIMULADOS del dashboard CRM de la aerolínea (Laboratorio 3).
 *
 * Este es el único archivo de datos de la aplicación y se puede editar a mano. Por ejemplo, cambie
 * el \`status\` y el \`stage_id\` de una reserva a 'won' / 's5' y los KPIs se recalculan solos.
 *
 * Generado con scripts/generate-mock-data.mjs: cada \`evaluation\` es la respuesta real del motor
 * de reglas Drools del Laboratorio 2 (POST /airline/api/evaluate) para esa reserva.
 *
 * Relaciones:
 *   1 agente (users)     gestiona N reservas (bookings.owner_id)
 *   1 pasajero           tiene N reservas   (bookings.passenger_id)
 *   1 vuelo              tiene N reservas   (bookings.flight_id)
 *   1 etapa (stages)     agrupa N reservas  (bookings.stage_id)
 */

/** Fecha "de hoy" de la demo. Se fija para que los filtros por periodo sean reproducibles. */
export const REFERENCE_DATE = '${TODAY}';

`;
const body = [
  ['users', users],
  ['stages', stages],
  ['passengers', passengers],
  ['flights', flights],
  ['bookings', bookings],
].map(([name, data]) => `export const ${name} = ${JSON.stringify(data, null, 2)};\n`).join('\n');

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, header + body, 'utf8');

const won = bookings.filter((b) => b.status === 'won').length;
const open = bookings.filter((b) => b.status === 'open').length;
const lost = bookings.filter((b) => b.status === 'lost').length;
console.log(`mockData.js escrito en ${OUT}`);
console.log(`${users.length} agentes, ${passengers.length} pasajeros, ${flights.length} vuelos, ${bookings.length} reservas (won ${won}, open ${open}, lost ${lost}).`);
