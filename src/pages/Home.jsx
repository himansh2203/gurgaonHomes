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
      <ServicesSection />
      <Testimonials />
      <CTASection />
    </div>
  );
}
