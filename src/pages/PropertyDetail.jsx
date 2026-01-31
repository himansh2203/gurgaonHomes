import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { propertyService, SERVER_ORIGIN } from "../services/api";
import { io } from "socket.io-client";
import { Helmet } from "react-helmet-async";
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
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const res = await propertyService
          .getPropertyById(propertyId)
          .catch(() => null);
        if (res && !cancelled) {
          setProperty(res.data);
          setLoading(false);
          return;
        }

        // Fallback to list search
        const r = await propertyService.getProperties();
        const found = (r.data || []).find(
          (p) =>
            (p._id || p.id || "").toString() === propertyId ||
            (p.slug || "").includes(propertyId),
        );
        if (!cancelled) {
          if (found) {
            setProperty(found);
            setError(null);
          } else {
            setError("Property not found");
          }
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          console.error(e);
          setError("Failed to load property");
          setLoading(false);
        }
      }
    };

    load();

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

    return () => {
      cancelled = true;
      socket.disconnect();
    };
  }, [propertyId]);

  // SEO handled via Helmet (react-helmet-async)
  // Keep previous manual DOM manipulation as fallback, but prefer Helmet for clean SSR-friendly meta.

  if (loading) return <div className="loading">Loading property...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!property) return <div>Property not found</div>;

  const fallback = `https://source.unsplash.com/1200x800/?${encodeURIComponent(
    (property?.category || property?.type || "property")
      .toString()
      .toLowerCase(),
  )}`;

  const ogImage =
    property.images && property.images[0]
      ? property.images[0].startsWith("http")
        ? property.images[0]
        : `${SERVER_ORIGIN}${property.images[0]}`
      : `https://source.unsplash.com/1200x800/?property`;

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Place",
    name: property.title,
    description: (property.description || "").slice(0, 300),
    image: ogImage,
    geo: { "@type": "GeoCoordinates", address: property.location || "" },
  });

  // Helmet meta
  const helmetBlock = (
    <Helmet>
      <title>{`${property.title} — Gurgaon Homes`}</title>
      <meta
        name="description"
        content={(property.description || "").slice(0, 160)}
      />
      <meta property="og:title" content={property.title} />
      <meta
        property="og:description"
        content={(property.description || "").slice(0, 160)}
      />
      <meta property="og:image" content={ogImage} />
      <link rel="canonical" href={window.location.href} />
      <script type="application/ld+json">{jsonLd}</script>
    </Helmet>
  );

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
      {helmetBlock}
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
