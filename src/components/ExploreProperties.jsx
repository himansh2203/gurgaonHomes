import React from "react";
import "../styles/ExploreProperties.css";

const properties = [
  {
    tag: "Apartments",
    title: "Luxury Apartments",
    desc: "Gurgaon's finest apartments in DLF Cyber City, Golf Course Road, and more",
    img: "/images/apartment.jpg",
  },
  {
    tag: "Villas",
    title: "Exclusive Villas",
    desc: "Spacious villas in prime locations like Sushant Lok and Sector 56",
    img: "/images/villa.jpg",
  },
  {
    tag: "Off-Plan",
    title: "Off-Plan Projects",
    desc: "Invest in upcoming premium developments in Gurgaon",
    img: "/images/offplan.jpg",
  },
];

export default function ExploreProperties() {
  return (
    <section className="explore-section">
      <p className="explore-tag">EXPLORE PROPERTIES</p>
      <h2 className="explore-title">Gurgaon's Finest Properties</h2>
      <p className="explore-subtitle">
        Explore our curated selection of luxury properties in Gurgaon's most
        prestigious locations
      </p>

      <div className="property-grid">
        {properties.map((item, i) => (
          <div className="property-card" key={i}>
            <div className="property-image">
              <img src={item.img} alt={item.title} />
              <span className="property-badge">{item.tag}</span>
            </div>

            <div className="property-content">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
