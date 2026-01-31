import React from "react";
import ServiceCard from "./ServiceCard";
import "../styles/Services.css";

const SERVICES = [
  {
    icon: <div className="icon-badge">🏠</div>,
    title: "Property Sales",
    description:
      "Find your perfect home or investment property across Gurgaon’s most desirable neighbourhoods.",
    points: ["Luxury Apartments", "Exclusive Villas", "Premium Penthouses"],
  },
  {
    icon: <div className="icon-badge">🏗️</div>,
    title: "Off-Plan Projects",
    description:
      "Access curated off-plan opportunities with high ROI potential and flexible payment plans.",
    points: [
      "Flexible Payment Plans",
      "High ROI Potential",
      "Developer Partnerships",
    ],
  },
  {
    icon: <div className="icon-badge">📈</div>,
    title: "Property Investment",
    description:
      "Expert guidance on property investment, portfolio building and yield optimisation.",
    points: ["Market Analysis", "ROI Calculations", "Portfolio Management"],
  },
  {
    icon: <div className="icon-badge">📍</div>,
    title: "Prime Locations",
    description:
      "Handpicked properties across Gurgaon’s premium localities like Golf Course Road and DLF Phase.",
    points: ["Waterfront Properties", "City Center", "Exclusive Communities"],
  },
  {
    icon: <div className="icon-badge">🛠️</div>,
    title: "Property Management",
    description:
      "Comprehensive services for landlords, maintenance and rent collection.",
    points: ["Tenant Management", "Maintenance", "Rent Collection"],
  },
  {
    icon: <div className="icon-badge">⚡</div>,
    title: "Quick Transactions",
    description:
      "Fast, reliable transaction handling with priority support for verified buyers and sellers.",
    points: ["24-Hour Response", "Express Service", "Priority Support"],
  },
];

export default function ServicesSection() {
  return (
    <section className="gh-services" aria-labelledby="services-title">
      <div className="gh-container">
        <div className="gh-section-head">
          <div className="gh-kicker">What We Offer</div>
          <h2 id="services-title">Our Services</h2>
          <p className="gh-lead">
            Comprehensive real estate solutions tailored to your needs — sales,
            investment, and end-to-end property services in Gurgaon.
          </p>
        </div>

        <div className="gh-services-grid">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
