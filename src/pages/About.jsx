import React, { useEffect } from "react";
import { FaHome, FaMapMarkedAlt, FaHandshake, FaStar } from "react-icons/fa";
import "../styles/About.css";

export default function About() {
  useEffect(() => {
    const prev = document.title;
    document.title = "About — Gurgaon Homes";
    return () => (document.title = prev);
  }, []);

  return (
    <div className="about-page container">
      {/* HERO SECTION */}
      <section className="about-hero">
        <h1>Gurgaon Homes</h1>
        <p className="lead">
          Discover premium homes, luxury apartments, and elite investment
          opportunities across Gurgaon’s most prestigious neighborhoods.
        </p>
      </section>

      {/* CONTENT */}
      <section className="about-content">
        <h3>Our Vision</h3>
        <p>
          At Gurgaon Homes, we curate an exclusive portfolio of premium
          properties and deliver a seamless property discovery experience for
          buyers, investors, and homeowners. We believe in trust, transparency,
          and exceptional service.
        </p>

        <h3>Why Choose Gurgaon Homes</h3>

        <div className="about-cards">
          <div className="about-card">
            <FaHome />
            <h4>Luxury Properties</h4>
            <p>Handpicked premium homes and elite apartments.</p>
          </div>

          <div className="about-card">
            <FaMapMarkedAlt />
            <h4>Prime Locations</h4>
            <p>Properties in Gurgaon’s top gated communities.</p>
          </div>

          <div className="about-card">
            <FaHandshake />
            <h4>Trusted Experts</h4>
            <p>Verified listings with trusted real estate consultants.</p>
          </div>

          <div className="about-card">
            <FaStar />
            <h4>Premium Experience</h4>
            <p>Personalized site visits and priority client support.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
