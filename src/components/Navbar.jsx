import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const categories = ["All", "2 BHK", "3 BHK", "Apartment", "Villa", "Studio"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <header className="gh-navbar">
      <div className="gh-container">
        <div className="gh-brand">
          <Link to="/" className="gh-logo">
            <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden>
              <rect
                x="2"
                y="7"
                width="20"
                height="12"
                rx="2"
                fill="var(--gold)"
              />
              <path
                d="M6 7V4h12v3"
                stroke="#fff"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span className="gh-title">Gurgaon Homes</span>
          </Link>
          <button
            className={"gh-burger" + (menuOpen ? " open" : "")}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((s) => !s)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav className={"gh-nav" + (menuOpen ? " open" : "")}>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li
              className="gh-dropdown"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <button
                className="gh-dropbtn"
                onClick={() => setCatOpen((s) => !s)}
                aria-expanded={catOpen}
              >
                Properties
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="var(--gold)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className={"gh-dropdown-menu" + (catOpen ? " open" : "")}>
                <Link
                  to="/properties"
                  onClick={() => {
                    setMenuOpen(false);
                    setCatOpen(false);
                  }}
                  className="all"
                >
                  All Properties
                </Link>
                {categories.map((c) => (
                  <Link
                    key={c}
                    to={`/properties?category=${encodeURIComponent(c)}`}
                    onClick={() => {
                      setMenuOpen(false);
                      setCatOpen(false);
                    }}
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="gh-cta">
          <Link
            to="/properties"
            className="gh-btn"
            onClick={() => setMenuOpen(false)}
          >
            Explore
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
