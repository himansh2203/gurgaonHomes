import React from "react";
import PropTypes from "prop-types";
import "../styles/Services.css";

export default function ServiceCard({ icon, title, description, points }) {
  return (
    <article className="gh-service-card">
      <div className="gh-service-icon" aria-hidden>
        {icon}
      </div>
      <h3 className="gh-service-title">{title}</h3>
      <p className="gh-service-desc">{description}</p>
      {points && points.length > 0 && (
        <ul className="gh-service-list">
          {points.map((p, i) => (
            <li key={i}>
              <span className="check">✓</span>
              <span className="text">{p}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

ServiceCard.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  points: PropTypes.arrayOf(PropTypes.string),
};
