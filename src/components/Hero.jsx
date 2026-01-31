import "../styles/Hero.css";
import SearchBar from "../components/SearchBar";
import StatsCard from "./StatsCard";
import { useProperties } from "../hooks/useProperties"; // ✅ Fixed!

export default function Hero({ searchValue, onSearchChange, propertiesCount }) {
  const stats = [
    {
      icon: "🏠",
      value: propertiesCount,
      title: "Total Properties",
      gradient: "emerald",
    },
    { icon: "📈", value: "9%+", title: "Avg ROI", gradient: "purple" },
    { icon: "📍", value: "Dubai Wide", title: "Coverage", gradient: "indigo" },
  ];

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Premium <span className="highlight">Properties</span>
        </h1>
        <p className="hero-subtitle">
          Discover exclusive off-plan developments across Dubai&apos;s most
          desirable locations
        </p>

        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search properties by name or location..."
        />

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
