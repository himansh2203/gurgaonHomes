import React from "react";
import PropertyCard from "./PropertyCard";

export default function PropertiesTab({
  properties,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  onEdit,
  onDelete,
}) {
  return (
    <div className="properties-tab">
      <div className="header">
        <div className="title">
          <h2>Properties ({properties.length})</h2>
        </div>
        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="filters">
        {["all", "active", "pending"].map((status) => (
          <button
            key={status}
            className={filterStatus === status ? "active" : ""}
            onClick={() => setFilterStatus(status)}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="properties-grid">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
