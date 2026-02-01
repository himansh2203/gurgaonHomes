import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { propertyService, SERVER_ORIGIN } from "../services/api";
import { Helmet } from "react-helmet-async";
import "../styles/PropertyDetail.css";

// Lightweight Error Boundary to prevent the entire app from going blank if rendering fails
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("PropertyDetail rendering error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="property-detail-error">
          <h2>Something went wrong</h2>
          <p>
            We couldn't display this property right now. Please try again later.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function PropertyDetail() {
  const { id } = useParams();
  // Route uses "/properties/:id" where id can be either an ObjectId ("<id>-<slug>") or a slug ("penthouse-with-city-view").
  // If the first segment looks like a Mongo ObjectId, use that; otherwise use the whole param as a slug.
  const propertyParam = id;
  const idToQuery = propertyParam
    ? /^[0-9a-fA-F]{24}$/.test(propertyParam.split("-")[0])
      ? propertyParam.split("-")[0]
      : propertyParam
    : null;

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enquiry, setEnquiry] = useState({ name: "", email: "", message: "" });
  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // keep a ref for the currently loaded property id (for safe socket checks)
  const propertyIdRef = React.useRef(null);

  // Selected gallery item index
  const [selected, setSelected] = useState(0);

  // A themed fallback image URL built from the property's category/type (kept near top so helpers can reference it)
  const fallback = `https://source.unsplash.com/1200x800/?${encodeURIComponent(
    (property?.category || property?.type || "property")
      .toString()
      .toLowerCase(),
  )}`;

  // Helper to turn stored image paths into fully-qualified URLs
  const imageUrl = React.useCallback(
    (img) => {
      if (!img) return fallback;
      if (img.startsWith("http")) return img;
      if (img.startsWith("/")) return `${SERVER_ORIGIN}${img}`;
      return `${SERVER_ORIGIN}/uploads/${img}`;
    },
    [fallback],
  );

  // Build gallery items (images + optional video). Use useMemo so it only recalculates when the property changes.
  const galleryItems = React.useMemo(() => {
    const items = [];
    try {
      if (Array.isArray(property?.images) && property.images.length) {
        property.images.forEach((img) =>
          items.push({ type: "image", src: imageUrl(img) }),
        );
      }
      if (property?.video) {
        const vid = property.video.startsWith("http")
          ? property.video
          : `${SERVER_ORIGIN}${property.video}`;
        items.push({ type: "video", src: vid });
      }
    } catch (err) {
      console.warn("Gallery build error", err);
    }
    const fallback = `https://source.unsplash.com/1200x800/?property`;
    return items.length ? items : [{ type: "image", src: fallback }];
  }, [property, imageUrl]);

  const mainDisplay = galleryItems[selected] || galleryItems[0];

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try direct fetch by id or slug
        const res = await propertyService
          .getPropertyById(idToQuery)
          .catch(() => null);
        if (res && !cancelled && res.data) {
          setProperty(res.data);
          propertyIdRef.current =
            (res.data && (res.data._id || res.data.id)) || null;
          setLoading(false);
          return;
        }

        // Fallback: fetch list and try to find by slug or id if direct fetch failed
        const r = await propertyService.getProperties();
        const list = r.data || [];
        const found = list.find((p) => {
          const pid = (p._id || p.id || "").toString();
          const slug = (p.slug || "").toString();
          return (
            pid === idToQuery || slug === idToQuery || slug.includes(idToQuery)
          );
        });

        if (!cancelled) {
          if (found) {
            setProperty(found);
            propertyIdRef.current = found._id || found.id || null;
            setError(null);
          } else {
            setProperty(null);
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

    // do not auto-connect sockets here — we'll connect later when a property is loaded
    return () => {
      cancelled = true;
    };
  }, [idToQuery]);

  // SEO handled via Helmet (react-helmet-async)
  // Keep previous manual DOM manipulation as fallback, but prefer Helmet for clean SSR-friendly meta.

  if (loading) return <div className="loading">Loading property...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!property) return <div className="error">Property not found</div>;

  const ogImage =
    property.images && property.images[0]
      ? property.images[0].startsWith("http")
        ? property.images[0]
        : `${SERVER_ORIGIN}${property.images[0]}`
      : `https://source.unsplash.com/1200x800/?property`;

  // Structured data (Schema.org) for the property
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Residence",
    name: property.title,
    description: (property.description || "").slice(0, 300),
    image: ogImage,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location || "",
    },
    numberOfRooms: property.bedrooms || undefined,
    floorSize: property.area
      ? { "@type": "QuantitativeValue", value: property.area, unitText: "SQFT" }
      : undefined,
    offers: property.price
      ? {
          "@type": "Offer",
          price: property.priceValue || undefined,
          priceCurrency: "INR",
        }
      : undefined,
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
      <link
        rel="canonical"
        href={typeof window !== "undefined" ? window.location.href : ""}
      />
      <meta name="robots" content="index, follow" />
      <script type="application/ld+json">{jsonLd}</script>
    </Helmet>
  );

  const submitEnquiry = async (e) => {
    e.preventDefault();
    setMessage(null);
    setErrorMsg(null);
    try {
      const idForEnquiry = property && (property._id || property.id);
      if (!idForEnquiry) throw new Error("Missing property id");
      await propertyService.createEnquiry(idForEnquiry, enquiry);
      setMessage("Enquiry submitted. We'll contact you soon.");
      setEnquiry({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setErrorMsg("Error sending enquiry. Please try again later.");
    }
  };

  return (
    <ErrorBoundary>
      <div className="property-detail container">
        {helmetBlock}
        <Link to="/" className="back-link">
          ← Back to listings
        </Link>

        <div className="detail-grid">
          <div className="gallery">
            <div className="gallery-main">
              {mainDisplay.type === "image" ? (
                <img
                  src={mainDisplay.src}
                  alt={property.title}
                  loading="lazy"
                />
              ) : (
                <video
                  key={mainDisplay.src}
                  controls
                  playsInline
                  controlsList="nodownload"
                  preload="metadata"
                  poster={
                    property.images && property.images[0]
                      ? imageUrl(property.images[0])
                      : ""
                  }
                >
                  <source src={mainDisplay.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            <div className="gallery-thumbs">
              {galleryItems.map((it, i) => (
                <button
                  key={i}
                  className={`thumb ${i === selected ? "active" : ""}`}
                  onClick={() => setSelected(i)}
                  aria-pressed={i === selected}
                  aria-label={`Show ${it.type} ${i + 1}`}
                >
                  {it.type === "image" ? (
                    <img src={it.src} alt={`thumb-${i}`} loading="lazy" />
                  ) : (
                    <div className="video-thumb">►</div>
                  )}
                </button>
              ))}
            </div>
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
              {message && <div className="notice success">{message}</div>}
              {errorMsg && <div className="notice error">{errorMsg}</div>}
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
    </ErrorBoundary>
  );
}
