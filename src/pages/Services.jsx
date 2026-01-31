import React from "react";
import { Helmet } from "react-helmet-async";
import ServicesSection from "../components/ServicesSection";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";

export default function Services() {
  return (
    <div className="services-page">
      <Helmet>
        <title>Services — Gurgaon Homes</title>
        <meta
          name="description"
          content="Explore services from Gurgaon Homes: property sales, investments, off-plan projects, and full-service property management across Gurgaon."
        />
        <link rel="canonical" href="https://yourdomain.example/services" />
      </Helmet>

      <ServicesSection />
      <Testimonials />
      <CTASection />
    </div>
  );
}
