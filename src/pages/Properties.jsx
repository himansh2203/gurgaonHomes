import React, { useEffect } from "react";
import { useProperties } from "../hooks/useProperties";
import PropertyCard from "../components/PropertyCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import "../styles/Properties.css";

export default function Properties() {
  const { properties, loading, error } = useProperties();

  useEffect(() => {
    const prev = document.title;
    document.title = "Properties — Gurgaon Homes";
    let meta = document.querySelector("meta[name=description]");
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content =
      "Browse all property listings in Gurgaon. Filter by category and find your perfect home.";
    return () => (document.title = prev);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="properties-page container">
      <header className="properties-header">
        <h1>Properties</h1>
        <p className="muted">Browse all available listings in Gurgaon</p>
      </header>

      <div className="properties-grid">
        {properties.length === 0 ? (
          <EmptyState />
        ) : (
          properties.map((p) => <PropertyCard key={p.id} property={p} />)
        )}
      </div>
    </div>
  );
}
