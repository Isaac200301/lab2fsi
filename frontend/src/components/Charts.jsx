import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { money, shortDate } from '../lib/format.js';

export const COLORS = { coral: '#f2694a', green: '#2e9e6b', blue: '#3b82c4', red: '#d64545', grid: '#efe8da', axis: '#8a8174' };
const STAGE_COLOR = { open: COLORS.coral, won: COLORS.green, lost: COLORS.red };
const MEMBERSHIP_COLOR = { Basic: '#c9bfae', Silver: '#8fa6bf', Gold: '#e8a838', Platinum: COLORS.blue };

const tooltipStyle = { borderRadius: 12, border: '1px solid #ece5d8', boxShadow: '0 6px 20px rgba(0,0,0,.08)', fontSize: 13 };
const axisProps = { stroke: COLORS.axis, tickLine: false, axisLine: false, fontSize: 12 };

/** Barras: ingresos (precio final) por etapa del pipeline. Verde = completado, rojo = cancelado. */
export function RevenueByStageChart({ rows }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke={COLORS.grid} />
        <XAxis dataKey="stage" {...axisProps} interval={0} />
        <YAxis {...axisProps} tickFormatter={(v) => (v >= 1000 ? `$${v / 1000}k` : `$${v}`)} width={48} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#f8f3e8' }}
          formatter={(v, _n, item) => [`${money(v)} · ${item.payload.count} reservas`, 'Ingresos']} />
        <Bar dataKey="revenue" radius={[10, 10, 4, 4]} maxBarSize={56}>
          {rows.map((r) => <Cell key={r.stage} fill={STAGE_COLOR[r.type]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Línea: ingresos y compensaciones por semana. */
export function SalesTrendChart({ rows }) {
  const data = rows.map((r) => ({ ...r, label: shortDate(r.week) }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke={COLORS.grid} />
        <XAxis dataKey="label" {...axisProps} minTickGap={18} />
        <YAxis {...axisProps} tickFormatter={(v) => (v >= 1000 ? `$${v / 1000}k` : `$${v}`)} width={48} />
        <Tooltip contentStyle={tooltipStyle} labelFormatter={(l, p) => `Semana del ${l}${p?.[0] ? ` · ${p[0].payload.flights} vuelos` : ''}`} formatter={(v) => money(v)} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="revenue" name="Ingresos" stroke={COLORS.coral} strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="compensation" name="Compensaciones" stroke={COLORS.blue} strokeWidth={2} strokeDasharray="5 4" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

/** Barras horizontales: cuántas veces se activó cada regla de negocio de Drools. */
export function RulesChart({ rows }) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(280, rows.length * 30)}>
      <BarChart data={rows} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid horizontal={false} stroke={COLORS.grid} />
        <XAxis type="number" {...axisProps} allowDecimals={false} />
        <YAxis type="category" dataKey="label" {...axisProps} width={170} interval={0} fontSize={11.5} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#f8f3e8' }} formatter={(v) => [`${v} reservas`, 'Activaciones']} />
        <Bar dataKey="count" fill={COLORS.blue} radius={[0, 8, 8, 0]} maxBarSize={18} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Dona: reservas por nivel de membresía. */
export function MembershipChart({ rows }) {
  const data = rows.filter((r) => r.bookings > 0);
  return (
    <>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="bookings" nameKey="name" innerRadius={55} outerRadius={88} paddingAngle={3} stroke="none">
            {data.map((r) => <Cell key={r.name} fill={MEMBERSHIP_COLOR[r.name]} />)}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={(v, n, item) => [`${v} reservas · ${money(item.payload.revenue)}`, n]} />
        </PieChart>
      </ResponsiveContainer>
      <div className="legend">
        {rows.map((r) => <span key={r.name}><i style={{ background: MEMBERSHIP_COLOR[r.name] }} />{r.name} ({r.bookings})</span>)}
      </div>
    </>
  );
}

/** Barras agrupadas: ingresos reales vs. cuota del periodo por agente. */
export function QuotaChart({ rows }) {
  const data = rows.map((r) => ({ ...r, short: r.name.split(' ')[0] }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke={COLORS.grid} />
        <XAxis dataKey="short" {...axisProps} />
        <YAxis {...axisProps} tickFormatter={(v) => `$${v / 1000}k`} width={44} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => money(v)} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="quota" name="Cuota del periodo" fill="#e4dccb" radius={[8, 8, 3, 3]} maxBarSize={30} />
        <Bar dataKey="revenue" name="Ingresos" fill={COLORS.coral} radius={[8, 8, 3, 3]} maxBarSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
}
