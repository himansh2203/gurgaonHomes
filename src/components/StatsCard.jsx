import "../styles/Hero.css";

export default function StatsCard({ icon, title, value, gradient }) {
  return (
    <div className={`stats-card ${gradient}`}>
      <div className="stats-icon">
        <span>{icon}</span>
      </div>
      <div className="stats-content">
        <div className="stats-value">{value}</div>
        <div className="stats-label">{title}</div>
      </div>
    </div>
  );
}
