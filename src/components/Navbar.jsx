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
            <img src="/logo.ico" alt="Gurgaon Homes Logo" />
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
            <li>
              <NavLink
                to="/properties"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                Properties
              </NavLink>
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
