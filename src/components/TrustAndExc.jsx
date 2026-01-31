import React, { useEffect, useState } from "react";
import "../styles/TrustAndExc.css";
import { FaShieldAlt, FaAward, FaUsers, FaCheckCircle } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const CountUp = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += Math.ceil(target / 50);
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setCount(start);
    }, 80);
  }, [target]);

  return <span>{count}+</span>;
};

const TrustAndExc = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="trust-container">
      <p className="trust-tag">TRUST & EXCELLENCE</p>

      <div className="trust-header">
        <h1>Why Clients Trust Gurgaon Homes</h1>
        <p>
          We are committed to providing exceptional service and building lasting
          relationships with our clients.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue" data-aos="fade-up">
          <div className="icon">
            <FaShieldAlt />
          </div>
          <h3 className="stat-value">100%</h3>
          <p>Trusted Deals</p>
        </div>

        <div
          className="stat-card orange"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="icon">
            <FaAward />
          </div>
          <h3 className="stat-value">5+</h3>
          <p>Awards Won</p>
        </div>

        <div
          className="stat-card green"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="icon">
            <FaUsers />
          </div>
          <h3 className="stat-value">
            <CountUp target={500} />
          </h3>
          <p>Happy Clients</p>
        </div>

        <div
          className="stat-card purple"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="icon">
            <FaCheckCircle />
          </div>
          <h3 className="stat-value">100%</h3>
          <p>Verified Properties</p>
        </div>
      </div>
    </section>
  );
};

export default TrustAndExc;
