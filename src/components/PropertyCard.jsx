import "../styles/PropertyCard.css";
import { Link } from "react-router-dom";
import { SERVER_ORIGIN } from "../services/api";

const slugify = (s = "") =>
  s
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export default function PropertyCard({ property }) {
  const {
    images = [],
    title,
    location,
    price,
    status = "active",
    type,
  } = property;

  const id = property._id || property.id;
  const slug = property.slug || slugify(title);

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-emerald-500",
      pending: "bg-amber-500",
      sold: "bg-gray-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const getImageSrc = () => {
    const img = images?.[0];
    const categoryKey = (property.category || type || "property")
      .toString()
      .toLowerCase();
    const fallback = `https://source.unsplash.com/600x400/?${encodeURIComponent(categoryKey)}`;

    if (!img) return fallback;
    if (img.startsWith("http")) return img;
    if (img.startsWith("/")) return `${SERVER_ORIGIN}${img}`;
    // assume filename stored in uploads
    return `${SERVER_ORIGIN}/uploads/${img}`;
  };

  return (
    <article className="property-card">
      <div className="property-image-wrapper">
        <img
          src={getImageSrc()}
          alt={title}
          loading="lazy"
          className="property-image"
          onError={(e) => {
            e.target.src = `https://source.unsplash.com/600x400/?property`;
          }}
        />
        <span className={`status-badge ${getStatusColor(status)}`}>
          {status?.toUpperCase()}
        </span>
        <span className="developer-badge">Premium Developer</span>
      </div>

      <div className="property-content">
        <h3 className="property-title">{title}</h3>

        <div className="property-location">
          <i className="location-icon">📍</i>
          <span>{location}</span>
        </div>

        <div className="property-price-section">
          <div className="price-container">
            <i className="price-icon">💰</i>
            <div>
              <div className="price">
                AED {price?.toLocaleString() || "POA"}
              </div>
              <div className="price-label">Starting From</div>
            </div>
          </div>
          <div className="property-type">
            <i className="type-icon">🏢</i>
            <span>{type || "Luxury Residence"}</span>
          </div>
        </div>

        <div className="property-actions">
          <button className="btn-enquire">
            <i>📱</i> Enquire Now
          </button>
          <Link to={`/properties/${id}-${slug}`} className="btn-details">
            <i>👁️</i> View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
