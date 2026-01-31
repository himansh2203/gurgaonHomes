import React from "react";
import "../styles/Contact.css";

const handleSubmit = (e) => {
  e.preventDefault(); // page reload rokhne ke liye
  alert("Your form has been submitted!");

  // Formsubmit.co pe form submit karna
  e.target.submit();

  // Redirect to another website after submission
  window.location.href = "https://gurgaonHomes.vercel.app/"; // replace with your desired URL
};

export default function Contact() {
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
        <div className="ct-card ct-form-card">
          <h2 className="ct-form-title">Send us a Message</h2>

          {/* CONTACT FORM */}
          <form
            className="ct-form"
            action="https://formsubmit.co/333himansusingh@gmail.com"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="ct-group">
              <label className="ct-label">Full Name</label>
              <input
                type="text"
                className="ct-input"
                placeholder="Enter your name"
              />
            </div>

            <div className="ct-group">
              <label className="ct-label">Email Address</label>
              <input
                type="email"
                className="ct-input"
                placeholder="your@email.com"
              />
            </div>

            <div className="ct-group">
              <label className="ct-label">Phone Number</label>
              <input
                type="tel"
                className="ct-input"
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="ct-group">
              <label className="ct-label">Message</label>
              <textarea
                className="ct-textarea"
                rows="5"
                placeholder="Write your message here..."
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
              wz-56 Sharbati complex Jwaha Heri, New Delhi, India ,110056
            </p>
          </div>

          <div className="ct-map">
            <iframe
              className="ct-map-iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.7120087650787!2d77.10040977375431!3d28.668340582456835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03878d2ae1d5%3A0x730969cd6cff28ee!2sSharbati%20Complex%2C%20Jwalaheri%20Village%2C%20Paschim%20Vihar%2C%20Delhi%2C%20110063!5e0!3m2!1sen!2sin!4v1765395917741!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
