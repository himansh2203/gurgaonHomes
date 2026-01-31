import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="gh-footer">
      <div className="gh-footer-inner">
        <div className="gh-footer-brand">
          <div className="gh-logo-small">
            <svg viewBox="0 0 24 24" width="36" height="36" aria-hidden>
              <rect x="2" y="7" width="20" height="12" rx="2" fill="#0B5FFF" />
            </svg>
            <div>
              <div className="gh-title">Gurgaon Homes</div>
              <div className="gh-muted">
                Premium property listings in Gurgaon
              </div>
            </div>
          </div>
        </div>

        <div className="gh-footer-links">
          <div>
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/properties">Properties</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div>
            <h4>Contact</h4>
            <a href="mailto:info@gurgaonhomes.example">
              info@gurgaonhomes.example
            </a>
            <a href="tel:+911234567890">+91 12345 67890</a>
          </div>

          <div>
            <h4>Legal</h4>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
          </div>
        </div>
      </div>

      <div className="gh-footer-bottom">
        <div className="gh-copy">
          © {new Date().getFullYear()} Gurgaon Homes. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
