import React from "react";
import "../styles/About.css";

export default function About() {
  return (
    <div className="about-page container">
      <section className="about-hero">
        <h1>About Gurgaon Homes</h1>
        <p className="lead">
          We bring you premium curated properties from across Gurgaon.
        </p>
      </section>

      <section className="about-content">
        <h3>Our mission</h3>
        <p>
          At Gurgaon Homes we prioritise high-quality listings and a delightful
          experience for both buyers and sellers. Our team verifies each listing
          and provides personalized support.
        </p>

        <h3>Why choose us</h3>
        <ul>
          <li>Curated, verified properties</li>
          <li>Trusted local agents</li>
          <li>Fast support and visits</li>
        </ul>
      </section>
    </div>
  );
}
