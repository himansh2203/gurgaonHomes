import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { propertyService, SERVER_ORIGIN } from "../services/api";
import { io } from "socket.io-client";
import "../styles/PropertyDetail.css";

export default function PropertyDetail() {
  const { id } = useParams();
  // Route uses "/properties/:id" where id can be "<id>-<slug>". Use only the id portion for API calls.
  const propertyId = id ? id.split("-")[0] : id;
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enquiry, setEnquiry] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    setLoading(true);

    // Primary attempt: fetch by id
    propertyService
      .getPropertyById(propertyId)
      .then((res) => {
        setProperty(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // Fallback: try fetching list and find matching property by id or slug
        console.warn("getPropertyById failed, falling back to list:", err);
        propertyService
          .getProperties()
          .then((r) => {
            const found = (r.data || []).find(
              (p) =>
                (p._id || p.id || "").toString() === propertyId ||
                (p.slug || "").includes(propertyId),
            );
            if (found) {
              setProperty(found);
              setError(null);
            } else {
              setError("Property not found");
            }
            setLoading(false);
          })
          .catch((e) => {
            console.error(e);
            setError("Failed to load property");
            setLoading(false);
          });
      });

    const socket = io(SERVER_ORIGIN);
    const handler = (payload) => {
      if (payload?.propertyId && payload.propertyId.toString() === propertyId) {
        propertyService
          .getPropertyById(propertyId)
          .then((r) => setProperty(r.data))
          .catch(() => {});
      }
    };
    socket.on("propertiesUpdated", handler);

    return () => socket.disconnect();
  }, [propertyId]);

  // SEO: update title & meta when property is loaded
  useEffect(() => {
    if (!property) return;
    const prevTitle = document.title;
    const prevDesc =
      document
        .querySelector("meta[name=description]")
        ?.getAttribute("content") || null;

    document.title = `${property.title} — Gurgaon Homes`;
    let meta = document.querySelector("meta[name=description]");
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = (
      property.description || "Premium property listing in Gurgaon."
    ).slice(0, 160);

    // Open Graph
    const ogTitle =
      document.querySelector("meta[property='og:title']") ||
      (function () {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:title");
        document.head.appendChild(m);
        return m;
      })();
    ogTitle.content = property.title;
    const ogDesc =
      document.querySelector("meta[property='og:description']") ||
      (function () {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:description");
        document.head.appendChild(m);
        return m;
      })();
    ogDesc.content = (property.description || "").slice(0, 160);

    const ogImage =
      document.querySelector("meta[property='og:image']") ||
      (function () {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:image");
        document.head.appendChild(m);
        return m;
      })();
    ogImage.content =
      property.images && property.images[0]
        ? property.images[0].startsWith("http")
          ? property.images[0]
          : `${SERVER_ORIGIN}${property.images[0]}`
        : `https://source.unsplash.com/1200x800/?property`;

    // JSON-LD structured data for a real estate listing (basic)
    const jsonLdId = "gh-property-jsonld";
    let existing = document.getElementById(jsonLdId);
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = jsonLdId;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Place",
      name: property.title,
      description: (property.description || "").slice(0, 300),
      image: ogImage.content,
      geo: { "@type": "GeoCoordinates", address: property.location || "" },
    });
    document.head.appendChild(script);

    // canonical link for SEO
    let canonical = document.querySelector("link[rel=canonical]");
    const prevCanonical = canonical ? canonical.href : null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;

    return () => {
      document.title = prevTitle;
      if (prevDesc !== null)
        document.querySelector("meta[name=description]").content = prevDesc;
      // remove JSON-LD
      const e = document.getElementById(jsonLdId);
      if (e) e.remove();
      // restore canonical
      if (prevCanonical) canonical.href = prevCanonical;
    };
  }, [property]);

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
      await propertyService.createEnquiry(propertyId, enquiry);
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
                loading="lazy"
                onError={(e) => (e.target.src = fallback)}
              />
            ))
          ) : (
            <img
              src={fallback}
              alt="placeholder"
              loading="lazy"
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
