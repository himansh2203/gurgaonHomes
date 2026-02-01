import React, { useEffect, useState } from "react";
import { useProperties } from "../hooks/useProperties";
import PropertyCard from "../components/PropertyCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import "../styles/Properties.css";

export default function Properties() {
  const { properties, loading, error, params, setParams, total, pages } =
    useProperties();
  // Single smart search input
  const [query, setQuery] = useState("");
  const [typing, setTyping] = useState(false);

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

  const parseSearchQuery = (text) => {
    const out = {};
    if (!text) return out;
    let s = text.toLowerCase();

    const parseCurrency = (v) => {
      v = v.toString().replace(/,/g, "").trim();
      const re =
        /([0-9]+(?:\.[0-9]+)?)(\s*)(k|kh|l|lak|lakh|lakh?s|cr|crore|m)?/i;
      const m = v.match(re);
      if (!m) return parseFloat(v) || undefined;
      const num = parseFloat(m[1]);
      const suf = (m[3] || "").toLowerCase();
      if (suf.startsWith("cr") || suf === "crore")
        return Math.round(num * 10000000);
      if (suf.startsWith("l") || suf.startsWith("lak"))
        return Math.round(num * 100000);
      if (suf === "k" || suf === "kh") return Math.round(num * 1000);
      if (suf === "m") return Math.round(num * 1000000);
      return Math.round(num);
    };

    // price ranges like '1cr-2cr' or '500000-2000000'
    const priceRange = s.match(
      /([0-9.,]+\s*(?:k|kh|l|lak|lakh|cr|crore|m)?)[\s-]+([0-9.,]+\s*(?:k|kh|l|lak|lakh|cr|crore|m)?)/i,
    );
    if (priceRange) {
      out.minPrice = parseCurrency(priceRange[1]);
      out.maxPrice = parseCurrency(priceRange[2]);
      s = s.replace(priceRange[0], "");
    }

    // area ranges like '800-1200 sqft' or '1500 sqft'
    const areaRange = s.match(
      /([0-9]+)\s*(?:-\s*([0-9]+))?\s*(sqft|sq\.?ft|sq yd|sqyd|sq|sqft\.?)/i,
    );
    if (areaRange) {
      out.minArea = parseFloat(areaRange[1]);
      if (areaRange[2]) out.maxArea = parseFloat(areaRange[2]);
      s = s.replace(areaRange[0], "");
    }

    // bedrooms like '2bhk' or '3 bhk'
    const bhk = s.match(/(\d+)\s*bhk/);
    if (bhk) {
      out.bedrooms = parseInt(bhk[1], 10);
      s = s.replace(bhk[0], "");
    }

    // bathrooms like '2bath' or '2 bath'
    const bath = s.match(/(\d+)\s*(bath|baths|bathroom|bathrooms)/);
    if (bath) {
      out.bathrooms = parseInt(bath[1], 10);
      s = s.replace(bath[0], "");
    }

    // status words
    const statusMatch = s.match(/\b(active|sold|pending|available)\b/);
    if (statusMatch) {
      out.status = statusMatch[1];
      s = s.replace(statusMatch[0], "");
    }

    // category
    const categoryMatch = s.match(/\b(villa|flat|apartment|penthouse|house)\b/);
    if (categoryMatch) {
      out.category = categoryMatch[1];
      s = s.replace(categoryMatch[0], "");
    }

    // single numeric price like '28000000' or '85L'
    const singlePrice = s.match(
      /([0-9.,]+\s*(?:k|kh|l|lak|lakh|cr|crore|m)?)(?=\s|$)/i,
    );
    if (singlePrice && !out.minPrice && !out.maxPrice) {
      const val = parseCurrency(singlePrice[1]);
      if (val) out.minPrice = val; // treat as minPrice
      s = s.replace(singlePrice[0], "");
    }

    // leftover text becomes free-text query
    const leftover = s.replace(/[\-]/g, " ").replace(/\s+/g, " ").trim();
    if (leftover) out.q = leftover;

    return out;
  };

  // const submitSearch = (e, overrideQuery) => {
  //   e && e.preventDefault();
  //   setTyping(false);
  //   const raw = overrideQuery !== undefined ? overrideQuery : query;
  //   const parsed = parseSearchQuery(raw);
  //   setParams({ ...parsed, page: 1 });
  // };

  // // debounce live-search when user types
  // useEffect(() => {
  //   if (!query) return;
  //   setTyping(true);
  //   const t = setTimeout(() => submitSearch(null, query), 600);
  //   return () => clearTimeout(t);
  // }, [query]);

  // const resetSearch = () => {
  //   setQuery("");
  //   setParams({ page: 1, limit: params.limit });
  // };

  const submitSearch = (e, overrideQuery) => {
    if (e) e.preventDefault();
    setTyping(false);

    const raw = overrideQuery ?? query;
    const parsed = parseSearchQuery(raw);

    setParams((prev) => ({ ...prev, ...parsed, page: 1 }));
  };

  useEffect(() => {
    if (!query.trim()) return;

    setTyping(true);
    const timer = setTimeout(() => {
      const parsed = parseSearchQuery(query);
      setParams((prev) => ({ ...prev, ...parsed, page: 1 }));
      setTyping(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const resetSearch = () => {
    setQuery("");
    setParams((prev) => ({ page: 1, limit: prev.limit }));
  };

  const changePage = (newPage) => {
    setParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="properties-page container">
      <header className="properties-header">
        <h1>Properties</h1>
        <p className="muted">Browse all available listings in Gurgaon</p>
      </header>

      <form className="properties-search single-search" onSubmit={submitSearch}>
        <div className="single-search-row">
          <input
            className="single-search-input"
            placeholder="Search (e.g. '3bhk Gurgaon', '2-4bhk', '1cr-2cr', '1000-2000 sqft', 'villa', 'sold')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search properties"
          />

          <div className="single-actions">
            <button type="submit" className="btn-primary">
              Search
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={resetSearch}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="search-hints">
          <small>
            Try: <em>"2.8cr 4bhk"</em>, <em>"85L sector 47"</em>,{" "}
            <em>"1000-2000 sqft"</em>, <em>"sold"</em>
            {typing ? " — searching..." : ""}
          </small>
        </div>
      </form>

      <div className="properties-grid">
        {properties.length === 0 ? (
          <EmptyState />
        ) : (
          properties.map((p) => (
            <PropertyCard key={p._id || p.id} property={p} />
          ))
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => changePage(Math.max(1, params.page - 1))}
          disabled={params.page <= 1}
        >
          Prev
        </button>
        <span>
          Page {params.page} of {pages}
        </span>
        <button
          onClick={() => changePage(Math.min(pages, params.page + 1))}
          disabled={params.page >= pages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
