import Icon from './Icons.jsx';

export const VIEWS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'bookings', label: 'Reservas', icon: 'ticket' },
  { id: 'passengers', label: 'Pasajeros', icon: 'users' },
  { id: 'flights', label: 'Vuelos', icon: 'route' },
  { id: 'team', label: 'Equipo de ventas', icon: 'team' },
];

export default function Sidebar({ view, onChange }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark"><Icon name="plane" size={20} /></span>
        AeroVirtual CRM
      </div>
      {VIEWS.map((v) => (
        <button key={v.id} className={`nav-item ${view === v.id ? 'active' : ''}`} onClick={() => onChange(v.id)}>
          <Icon name={v.icon} /> {v.label}
        </button>
      ))}
      <div className="sidebar-foot">Lab 3 · Fundamentos de Sistemas de Información · Universidad de Antioquia</div>
    </aside>
  );
}
