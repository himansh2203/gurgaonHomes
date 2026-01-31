import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { propertyService, SERVER_ORIGIN } from "../services/api";
import { io } from "socket.io-client";
import "../styles/PropertyDetail.css";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enquiry, setEnquiry] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    setLoading(true);
    propertyService
      .getPropertyById(id)
      .then((res) => {
        setProperty(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load property");
        setLoading(false);
      });

    const socket = io(SERVER_ORIGIN);
    const handler = (payload) => {
      if (
        payload?.propertyId &&
        payload.propertyId.toString() === (id.split("-")[0] || id)
      ) {
        propertyService
          .getPropertyById(id)
          .then((r) => setProperty(r.data))
          .catch(() => {});
      }
    };
    socket.on("propertiesUpdated", handler);

    return () => socket.disconnect();
  }, [id]);

  if (loading) return <div className="loading">Loading property...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!property) return <div>Property not found</div>;

  const fallback = `https://source.unsplash.com/1200x800/?${encodeURIComponent(
    (property?.category || property?.type || "property")
      .toString()
      .toLowerCase(),
  )}`;

  const imageUrl = (img) => {
    if (!img) return fallback;
    if (img.startsWith("http")) return img;
    if (img.startsWith("/")) return `${SERVER_ORIGIN}${img}`;
    return `${SERVER_ORIGIN}/uploads/${img}`;
  };

  const submitEnquiry = async (e) => {
    e.preventDefault();
    try {
      await propertyService.createEnquiry(id.split("-")[0], enquiry);
      alert("✅ Enquiry submitted");
      setEnquiry({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Error sending enquiry");
    }
  };

  return (
    <div className="property-detail container">
      <Link to="/" className="back-link">
        ← Back to listings
      </Link>

      <div className="detail-grid">
        <div className="gallery">
          {property.images && property.images.length > 0 ? (
            property.images.map((img, i) => (
              <img
                key={i}
                src={imageUrl(img)}
                alt={`${property.title} ${i}`}
                onError={(e) => (e.target.src = fallback)}
              />
            ))
          ) : (
            <img
              src={fallback}
              alt="placeholder"
              onError={(e) => (e.target.src = fallback)}
            />
          )}
        </div>

        <div className="detail-info">
          <h1>{property.title}</h1>
          <p className="location">📍 {property.location}</p>
          <p className="price">{property.price}</p>
          <div className="meta">
            <span>{property.bedrooms} BHK</span>
            <span>{property.area} sqft</span>
            <span className={`status ${property.status}`}>
              {property.status}
            </span>
          </div>

          <section className="description">
            <h3>Description</h3>
            <p>{property.description}</p>
          </section>

          <section className="actions">
            <form onSubmit={submitEnquiry} className="enquiry-form">
              <h4>Enquire about this property</h4>
              <input
                placeholder="Your name"
                value={enquiry.name}
                onChange={(e) =>
                  setEnquiry({ ...enquiry, name: e.target.value })
                }
                required
              />
              <input
                placeholder="Email"
                value={enquiry.email}
                onChange={(e) =>
                  setEnquiry({ ...enquiry, email: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Message"
                value={enquiry.message}
                onChange={(e) =>
                  setEnquiry({ ...enquiry, message: e.target.value })
                }
                required
              />
              <button type="submit" className="btn-enquire">
                Send Enquiry
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
