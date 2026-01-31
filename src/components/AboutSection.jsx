import React from "react";
import "../styles/AboutSection.css";
import aboutImg from "../assets/dlf.jfif"; // apni image path

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
              Silver Tower - Business Bay - Dubai - United Arab Emirates
            </span>
          </div>

          <div className="company-item">
            <FaPhoneAlt />
            <span>+971 54 739 9300</span>
          </div>

          <div className="company-item">
            <FaEnvelope />
            <span>info@rafazproperties.com</span>
          </div>
        </div>

        <button className="about-btn">Explore Properties</button>
      </div>

      <div className="about-right">
        <img src={aboutImg} alt="Dubai Property" />
      </div>
    </section>
  );
};

export default AboutSection;
