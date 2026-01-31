import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import PropertyCard from "../components/PropertyCard";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { useProperties } from "../hooks/useProperties";
import { propertyService } from "../services/api";
import "../styles/Home.css";
import { Helmet } from "react-helmet-async";
import ServicesSection from "../components/ServicesSection";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import TrustAndExc from "../components/TrustAndExc";
import AboutSection from "../components/AboutSection";
import ExploreProperties from "../components/ExploreProperties";

export default function Home() {
  const { properties, loading, error } = useProperties();
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");

  // SEO: use Helmet (react-helmet-async)
  // Title & meta are now handled declaratively in the component render via <Helmet />

  useEffect(() => {
    propertyService
      .getCategories()
      .then((r) => setCategories(["all", ...(r.data || [])]))
      .catch(() => setCategories(["all"]));
  }, []);

  const filteredProperties = properties.filter((p) => {
    const matchesText =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesText && matchesCategory;
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-page">
      <Helmet>
        <title>Gurgaon Homes — Find premium properties in Gurgaon</title>
        <meta
          name="description"
          content="Search curated real estate listings in Gurgaon. Villas, apartments, and premium residences."
        />
        <link rel="canonical" href="https://yourdomain.example/" />
      </Helmet>

      <Hero
        searchValue={search}
        onSearchChange={setSearch}
        propertiesCount={properties.length}
      />

      <TrustAndExc />
      <AboutSection />
      <ExploreProperties />

      {/* Services + Testimonials + CTA (Gurgaon Homes content) */}
      <ServicesSection />
      <Testimonials />
      <CTASection />
      {/* <div className="container filters-bar">
        <label className="category-label">Filter by category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <main className="properties-section">
        <div className="container">
          {" "}
          {filteredProperties.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="properties-grid">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </main> */}
    </div>
  );
}
