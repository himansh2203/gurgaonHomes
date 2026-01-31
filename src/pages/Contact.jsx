import React, { useEffect } from "react";
import "../styles/Contact.css";

export default function Contact() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Contact — Gurgaon Homes";

    let meta = document.querySelector("meta[name=description]");
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content =
      "Contact Gurgaon Homes for property enquiries, visits and support. We're here to help you find your perfect home in Gurgaon.";

    return () => (document.title = prev);
  }, []);

  return (
    <main className="ct-root">
      {/* HERO SECTION */}
      <section className="ct-hero">
        <h1 className="ct-title">Get in Touch</h1>
        <p className="ct-sub">
          We’d love to hear from you! Whether you have a question, feedback, or
          need support — feel free to reach out.
        </p>
      </section>

      {/* CONTACT WRAPPER */}
      <section className="ct-container">
        {/* FORM CARD */}
        <div className="ct-card ct-form-card">
          <h2 className="ct-form-title">Send us a Message</h2>

          <form
            className="ct-form"
            action="https://formsubmit.co/333himansusingh@gmail.com"
            method="POST"
          >
            {/* Redirect after submit */}
            <input
              type="hidden"
              name="_next"
              value="https://gurgaonhomes.vercel.app/"
            />
            {/* Disable captcha */}
            <input type="hidden" name="_captcha" value="false" />

            <div className="ct-group">
              <label className="ct-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="ct-input"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="ct-group">
              <label className="ct-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="ct-input"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="ct-group">
              <label className="ct-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="ct-input"
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="ct-group">
              <label className="ct-label">Message</label>
              <textarea
                name="message"
                className="ct-textarea"
                rows="5"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

            <button type="submit" className="ct-btn ct-primary-btn">
              Send Message
            </button>
          </form>
        </div>

        {/* CONTACT INFO CARD */}
        <div className="ct-card ct-info-card">
          <h2 className="ct-info-title">Contact Information</h2>

          <div className="ct-info-item">
            <span className="ct-info-heading">Email:</span>
            <p className="ct-info-text">gurgaonhomes@gmail.com</p>
          </div>

          <div className="ct-info-item">
            <span className="ct-info-heading">Phone:</span>
            <p className="ct-info-text">+91 9711155417</p>
          </div>

          <div className="ct-info-item">
            <span className="ct-info-heading">Address:</span>
            <p className="ct-info-text">
              WZ-56 Sharbati Complex, Jwalaheri, New Delhi, India 110056
            </p>
          </div>

          <div className="ct-map">
            <iframe
              className="ct-map-iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.7120087650787!2d77.10040977375431!3d28.668340582456835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03878d2ae1d5%3A0x730969cd6cff28ee!2sSharbati%20Complex%2C%20Jwalaheri%20Village%2C%20Paschim%20Vihar%2C%20Delhi%2C%20110063!5e0!3m2!1sen!2sin!4v1765395917741!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
