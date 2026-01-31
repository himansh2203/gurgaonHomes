import React from "react";
import "../styles/Testimonials.css";

const TESTIMONIALS = [
  {
    quote:
      "Outstanding service! The team went above and beyond to ensure I found the perfect investment property.",
    name: "Emma Thompson",
    meta: "2BR Apartment • Golf Course Road",
  },
  {
    quote:
      "Professional, efficient, and results-driven. Gurgaon Homes helped me secure an amazing property with excellent ROI.",
    name: "David Chen",
    meta: "3BR Penthouse • DLF Phase 5",
  },
  {
    quote:
      "Exceptional service throughout. Their expertise in luxury properties is unmatched.",
    name: "Fatima Al Zahra",
    meta: "4BR Villa • Sector 56",
  },
];

export default function Testimonials() {
  return (
    <section className="gh-testimonials" aria-labelledby="testimonials-title">
      <div className="gh-container">
        <div className="gh-section-head center">
          <div className="gh-kicker">Client Stories</div>
          <h2 id="testimonials-title">What Our Clients Say</h2>
          <p className="gh-lead">
            Don't just take our word for it — hear from satisfied clients.
          </p>
        </div>

        <div className="gh-test-grid">
          {TESTIMONIALS.map((t, idx) => (
            <blockquote key={idx} className="gh-test-card">
              <div className="stars">★★★★★</div>
              <p className="quote">"{t.quote}"</p>
              <footer className="who">
                <div className="avatar">{t.name.charAt(0)}</div>
                <div>
                  <div className="who-name">{t.name}</div>
                  <div className="who-meta">{t.meta}</div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
