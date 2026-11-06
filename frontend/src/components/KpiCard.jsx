/**
 * Tarjeta de indicador.
 * @param {number|null} delta variación % frente al periodo anterior (null = sin comparación)
 * @param {'%'|'pts'} unit '%' para variación relativa, 'pts' para diferencia en puntos porcentuales
 * @param {boolean} invert true si subir es malo (por ejemplo, compensaciones)
 */
export default function KpiCard({ label, value, tone = 'coral', delta, unit = '%', invert = false, foot, hint }) {
  let deltaChip = null;
  if (delta !== undefined) {
    if (delta === null) {
      deltaChip = <span className="chip">sin base de comparación</span>;
    } else {
      const good = invert ? delta <= 0 : delta >= 0;
      deltaChip = <span className={`chip ${good ? 'up' : 'down'}`}>{delta >= 0 ? '▲' : '▼'} {Math.abs(delta).toFixed(1)}{unit === 'pts' ? ' pts' : '%'} vs. periodo anterior</span>;
    }
  }
  return (
    <article className="card kpi" title={hint}>
      <div className="kpi-label"><span className={`kpi-dot ${tone}`} />{label}</div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-foot">{deltaChip}{foot}</div>
    </article>
  );
}
