import "../styles/Hero.css";
import SearchBar from "../components/SearchBar";
import StatsCard from "./StatsCard";

export default function Hero({ searchValue, onSearchChange, propertiesCount }) {
  const stats = [
    {
      icon: "🏠",
      value: propertiesCount,
      title: "Total Properties",
      gradient: "emerald",
    },
    { icon: "📈", value: "9%+", title: "Avg ROI", gradient: "purple" },
    {
      icon: "📍",
      value: "Gurgaon Wide",
      title: "Coverage",
      gradient: "indigo",
    },
  ];

  return (
    <section className="hero-section">
      {/* Background video: replace /gurgaon-hero.mp4 in public with your premium Gurgaon video */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-poster.jpg"
      >
        <source src="/hero-720.webm" type="video/webm" />
        <source src="/hero-720.mp4" type="video/mp4" />
        <source src="/gurgaon-hero.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-title">
          Premium Properties<span className="highlight"></span>
        </h1>
        <p className="hero-subtitle">
          Discover exclusive curated properties across Gurgaon's most desirable
          locations
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
