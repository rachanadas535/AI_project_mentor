// A single summary statistic card for the dashboard.

export default function StatCard({ label, value, icon, color }) {
  return (
    <div className="card stat-card">
      <div className="stat-card-body">
        <div className="stat-card-info">
          <span className="stat-card-label">{label}</span>
          <span className="stat-card-value">{value}</span>
        </div>
        <div className="stat-card-icon" style={{ background: `${color}15`, color }}>
          {icon}
        </div>
      </div>
    </div>
  )
}
