const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const int = new Intl.NumberFormat('es-CO');

/** $1,234 */
export const money = (n) => (n === null || n === undefined ? '—' : usd.format(n));
export const num = (n) => (n === null || n === undefined ? '—' : int.format(Math.round(n)));
export const pct = (n, digits = 0) => (n === null || n === undefined ? '—' : `${n.toFixed(digits)}%`);

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
/** '2026-11-05' -> '5 nov' (sin conversión de zona horaria) */
export function shortDate(day) {
  if (!day) return '—';
  const [, m, d] = day.slice(0, 10).split('-');
  return `${Number(d)} ${MONTHS[Number(m) - 1]}`;
}
/** '2026-11-05' -> '5 nov 2026' */
export const longDate = (day) => (day ? `${shortDate(day)} ${day.slice(0, 4)}` : '—');

export function delayLabel(minutes) {
  if (minutes <= 15) return 'A tiempo';
  if (minutes < 60) return `${minutes} min`;
  return `${Math.floor(minutes / 60)} h ${minutes % 60} min`;
}
