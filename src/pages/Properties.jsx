import React from "react";
import { useProperties } from "../hooks/useProperties";
import PropertyCard from "../components/PropertyCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import "../styles/Properties.css";

export default function Properties() {
  const { properties, loading, error } = useProperties();

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
