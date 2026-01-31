import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { AiFillInstagram, AiFillFacebook, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="gh-footer" role="contentinfo">
      <div className="gh-footer-inner">
        <div className="gh-col gh-brand">
          <div className="gh-logo-row">
            <div className="gh-logo-badge" aria-hidden>
              <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden>
                <rect
                  x="3"
                  y="7"
                  width="18"
                  height="10"
                  rx="2"
                  fill="var(--gold)"
                />
              </svg>
            </div>
            <div>
              <div className="gh-title">Gurgaon Homes</div>
              <div className="gh-muted">
                Premium property listings in Gurgaon
              </div>
            </div>
          </div>
        </div>

        <div className="gh-col gh-sitemap">
          <h4>Sitemap</h4>
          <nav aria-label="Footer sitemap">
            <Link to="/">Home</Link>
            <Link to="/properties">Properties</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>

        <div className="gh-col gh-contact">
          <h4>Contact</h4>
          <address>
            <div className="contact-row">
              <span className="icon-wrap" aria-hidden>
                <FiMapPin className="icon" />
              </span>
              <span className="contact-text">Silver Tower, Gurgaon</span>
            </div>

            <div className="contact-row">
              <span className="icon-wrap" aria-hidden>
                <FiPhone className="icon" />
              </span>
              <span className="contact-text">
                <a href="tel:+911234567890">+91 12345 67890</a>
              </span>
            </div>

            <div className="contact-row">
              <span className="icon-wrap" aria-hidden>
                <FiMail className="icon" />
              </span>
              <span className="contact-text">
                <a href="mailto:info@gurgaonhomes.example">info@gurgaonhomes.example</a>
              </span>
            </div>
          </address>
        </div>

        <div className="gh-col gh-about">
          <h4>Follow Us</h4>
          <div className="social-row" aria-label="Social links">
            <a
              className="social"
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillInstagram />
            </a>
            <a
              className="social"
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillFacebook />
            </a>
            <a
              className="social"
              href="https://youtube.com"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillYoutube />
            </a>
          </div>

          <h4 className="about-heading">About Us</h4>
          <p className="about-text">
            Gurgaon Homes curates premium properties and provides full-service
            real estate expertise across Gurgaon.
          </p>
        </div>
      </div>

      {/* <div className="gh-footer-links-row">
        <nav className="policy-nav" aria-label="Legal">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/cookie">Cookie Policy</Link>
          <Link to="/disclaimer">Disclaimer</Link>
        </nav>
      </div> */}

      <div className="gh-footer-bottom">
        <div className="gh-copy-left">
          <div className="gh-logo-badge small" aria-hidden>
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
              <rect
                x="3"
                y="7"
                width="18"
                height="10"
                rx="2"
                fill="var(--gold)"
              />
            </svg>
          </div>
          <div>
            © {new Date().getFullYear()} Gurgaon Homes. All Rights Reserved.
          </div>
        </div>

        <div className="gh-copy-right">
          Delivering premium Gurgaon properties with trust & excellence
        </div>
      </div>
    </footer>
  );
};

export default Footer;
