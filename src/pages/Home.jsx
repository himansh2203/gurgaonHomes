import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import PropertyCard from "../components/PropertyCard";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { useProperties } from "../hooks/useProperties";
import { propertyService } from "../services/api";
import "../styles/Home.css";
import TrustAndExc from "../components/TrustAndExc";
import AboutSection from "../components/AboutSection";
import ExploreProperties from "../components/ExploreProperties";

export default function Home() {
  const { properties, loading, error } = useProperties();
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc =
      document
        .querySelector("meta[name=description]")
        ?.getAttribute("content") || null;
    document.title = "Gurgaon Homes — Find premium properties in Gurgaon";
    let meta = document.querySelector("meta[name=description]");
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content =
      "Search curated real estate listings in Gurgaon. Villas, apartments, and premium residences.";
    return () => {
      document.title = prevTitle;
      if (prevDesc !== null)
        document.querySelector("meta[name=description]").content = prevDesc;
    };
  }, []);

  useEffect(() => {
    propertyService
      .getCategories()
      .then((r) => setCategories(["all", ...(r.data || [])]))
      .catch(() => setCategories(["all"]));
  }, []);

  const filteredProperties = properties.filter((p) => {
    const matchesText =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesText && matchesCategory;
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-page">
      <Hero
        searchValue={search}
        onSearchChange={setSearch}
        propertiesCount={properties.length}
      />
      <TrustAndExc />
      <AboutSection />
      <ExploreProperties />
      <div className="container filters-bar">
        <label className="category-label">Filter by category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <main className="properties-section">
        <div className="container">
          {" "}
          {filteredProperties.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="properties-grid">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
