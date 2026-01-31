import React from "react";
import { MapPin } from "lucide-react";

export default function PropertyCard({ property, onEdit, onDelete }) {
  return (
    <div className="property-card">
      <div className="property-image">
        <img src={property.imageUrl} alt={property.title} />
        <span className={`status-badge ${property.status}`}>
          {property.status}
        </span>
      </div>
      <h3>{property.title}</h3>
      <p className="location">
        <MapPin size={16} />
        {property.location}
      </p>
      <p className="description">{property.description}</p>
      <div className="property-price">{property.price}</div>
      <div className="property-meta">
        <span>👁️ {property.views}</span>
        <span>📞 {property.leads}</span>
      </div>
      <div className="property-actions">
        <button className="btn-edit" onClick={() => onEdit(property)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(property.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
