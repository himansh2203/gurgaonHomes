import React from "react";
import "../styles/AboutSection.css";
import aboutImg from "../assets/dlf.jfif"; // apni image path
import { Link } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaBuilding,
} from "react-icons/fa";

const AboutSection = () => {
  return (
    <section className="about-container">
      <div className="about-left">
        <span className="about-tag">ABOUT US</span>

        <h1 className="about-title">Gurgaon Homes</h1>
        <h2 className="about-subtitle">Your Real Estate Partner</h2>

        <p>
          Gurgaon Homes is a premier real estate agency based in Gurgaon, India,
          specializing in luxury properties and exceptional service. With our
          deep knowledge of the Gurgaon real estate market, we connect
          discerning clients with exceptional properties in the most prestigious
          locations.
        </p>

        <p>
          Our team of experienced professionals is dedicated to understanding
          your unique needs and providing personalized solutions. Whether you're
          looking to buy, sell, or invest, we're here to guide you every step of
          the way with transparency, integrity, and excellence.
        </p>

        {/* Company Info Card */}
        <div className="company-card">
          <div className="company-header">
            <div className="company-icon">
              <FaBuilding />
            </div>
            <h3>Company Information</h3>
          </div>

          <div className="company-item">
            <FaMapMarkerAlt />
            <span>
              C-1527, Vyapar Kendra Rd, Block C, Sushant Lok Phase I, Sector 43,
              Gurugram, Haryana 122009
            </span>
          </div>

          <div className="company-item">
            <FaPhoneAlt />
            <span>+91 97180 69177</span>
          </div>

          <div className="company-item">
            <FaEnvelope />
            <span>gurgaonhomes@gmail.com</span>
          </div>
        </div>

        <button className="about-btn">
          <Link to="/properties">Explore Properties</Link>
        </button>
      </div>

      <div className="about-right">
        <img src={aboutImg} alt="About Gurgaon Homes" />
      </div>
    </section>
  );
};

export default AboutSection;
