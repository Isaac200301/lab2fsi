import { useState } from 'react';
import { money, shortDate } from '../lib/format.js';

/** Base de la API del Laboratorio 2. Vacía en desarrollo porque Vite reenvía /airline al puerto 8080. */
const API_BASE = import.meta.env.VITE_API_URL ?? '';

/**
 * Crea una reserva nueva. La decisión (ascensos, descuentos, asiento, etc.) la toma el motor de
 * reglas Drools del Laboratorio 2 vía POST /airline/api/evaluate; este formulario no replica ninguna regla.
 */
export default function NewBookingModal({ passengers, flights, users, bookings, today, onCreate, onClose }) {
  const upcoming = flights.filter((f) => f.departure_date >= today);
  const [form, setForm] = useState({
    passengerId: passengers[0]?.id ?? '',
    flightId: upcoming[0]?.id ?? '',
    ownerId: users[0]?.id ?? '',
    seatPreference: 'Any',
    travelingWithChildren: false,
    luggageWeight: 12,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const flight = upcoming.find((f) => f.id === form.flightId);
  const passenger = passengers.find((p) => p.id === form.passengerId);
  const [price, setPrice] = useState(flight?.base_price ?? 0);

  async function submit(ev) {
    ev.preventDefault();
    if (!flight || !passenger) return;
    setBusy(true);
    setError('');
    // El asiento de salida de emergencia es único por vuelo: si ya lo tomó otra reserva, ya no está disponible.
    const exitTaken = bookings.some((b) => b.flight_id === flight.id && b.status !== 'lost' && b.evaluation.assignedSeat === 'Salida de emergencia');
    const body = {
      passenger: {
        name: passenger.full_name,
        age: passenger.age,
        membershipStatus: passenger.membership_status,
        seatPreference: form.seatPreference,
        travelingWithChildren: form.travelingWithChildren,
        luggageWeight: Number(form.luggageWeight),
      },
      flight: {
        flightNumber: flight.flight_number,
        delayMinutes: flight.delay_minutes,
        durationHours: flight.duration_hours,
        emergencyExitSeatAvailable: flight.emergency_exit_seat_available && !exitTaken,
        ticketPrice: Number(price),
      },
    };
    try {
      const res = await fetch(`${API_BASE}/airline/api/evaluate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setError(json?.errors?.join(' · ') ?? `El backend respondió ${res.status}.`);
        return;
      }
      onCreate({
        title: `${flight.flight_number} · ${flight.origin} → ${flight.destination}`,
        passenger_id: passenger.id,
        flight_id: flight.id,
        owner_id: form.ownerId,
        stage_id: 's2',
        amount: Number(price),
        currency: 'USD',
        status: 'open',
        seat_preference: form.seatPreference,
        traveling_with_children: form.travelingWithChildren,
        luggage_weight: Number(form.luggageWeight),
        expected_close_date: flight.departure_date,
        closed_at: null,
        loss_reason: null,
        evaluation: json,
      });
    } catch {
      setError('No se pudo conectar con el backend del Laboratorio 2. Arránquelo con "mvn spring-boot:run" en la raíz del repositorio (puerto 8080) y vuelva a intentar.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Nueva reserva" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h2>Nueva reserva</h2>
        <p className="cell-sub">Las reglas de negocio de Drools deciden asiento, descuento, puntos y beneficios al guardar.</p>

        <div className="form-grid">
          <div className="field full">
            <label htmlFor="nb-pass">Pasajero</label>
            <select id="nb-pass" value={form.passengerId} onChange={(e) => set({ passengerId: e.target.value })}>
              {passengers.map((p) => <option key={p.id} value={p.id}>{p.full_name} · {p.membership_status} · {p.age} años</option>)}
            </select>
          </div>
          <div className="field full">
            <label htmlFor="nb-flight">Vuelo</label>
            <select id="nb-flight" value={form.flightId} onChange={(e) => { const f = upcoming.find((x) => x.id === e.target.value); set({ flightId: e.target.value }); setPrice(f?.base_price ?? 0); }}>
              {upcoming.map((f) => <option key={f.id} value={f.id}>{f.flight_number} · {f.origin}→{f.destination} · {shortDate(f.departure_date)} · {f.duration_hours} h</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="nb-price">Precio del tiquete (USD)</label>
            <input id="nb-price" type="number" min="0" step="1" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="nb-lug">Equipaje (kg)</label>
            <input id="nb-lug" type="number" min="0" step="0.5" value={form.luggageWeight} onChange={(e) => set({ luggageWeight: e.target.value })} required />
          </div>
          <div className="field">
            <label htmlFor="nb-seat">Preferencia de asiento</label>
            <select id="nb-seat" value={form.seatPreference} onChange={(e) => set({ seatPreference: e.target.value })}>
              <option value="Any">Sin preferencia</option>
              <option value="Window">Ventana</option>
              <option value="Aisle">Pasillo</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="nb-owner">Agente</label>
            <select id="nb-owner" value={form.ownerId} onChange={(e) => set({ ownerId: e.target.value })}>
              {users.map((u) => <option key={u.id} value={u.id}>{u.full_name} · {u.team}</option>)}
            </select>
          </div>
          <label className="check full"><input type="checkbox" checked={form.travelingWithChildren} onChange={(e) => set({ travelingWithChildren: e.target.checked })} /> Viaja con niños</label>
        </div>

        {flight && <p className="cell-sub" style={{ marginBottom: 10 }}>Precio base de la ruta: {money(flight.base_price)}.</p>}
        {error && <div className="form-error" role="alert">{error}</div>}
        <div className="modal-actions">
          <button type="button" className="btn secondary" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn" disabled={busy || !flight}>{busy ? 'Evaluando…' : 'Evaluar y guardar'}</button>
        </div>
      </form>
    </div>
  );
}
