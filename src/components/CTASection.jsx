import React from "react";
import "../styles/CTA.css";

export default function CTASection() {
  return (
    <section className="gh-cta-section">
      <div className="gh-container gh-cta-wrap">
        <div className="cta-content">
          <div className="cta-icon">❤️</div>
          <h2>Ready to Find Your Dream Property?</h2>
          <p>
            Contact Gurgaon Homes today and let our expert team help you find
            the perfect home or investment.
          </p>
          <div className="cta-actions">
            <a className="btn btn-primary" href="tel:+911234567890">
              Call Us Now
            </a>
            <a
              className="btn btn-outline"
              href="mailto:info@gurgaonhomes.example"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
