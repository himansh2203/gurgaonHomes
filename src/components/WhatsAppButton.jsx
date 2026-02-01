import React from "react";
import "../styles/WhatsApp.css";

// Edit the number below (country code + number, no + sign) to your WhatsApp number
export const WHATSAPP_NUMBER = "919718069177";

export default function WhatsAppButton({
  message = "Hi, I'm interested in a property",
}) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      className="whatsapp-fab"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden>
        <path
          d="M21 12.05a9 9 0 10-2.47 5.84L22 22l-3.17-0.83A8.97 8.97 0 0021 12.05z"
          fill="#25D366"
        />
        <path
          d="M17.5 14.5c-.4 0-1.3-.2-2.1-.9-.9-.8-1.6-2.1-1.9-2.7-.2-.5-.5-.6-.9-.6-.4 0-.7.1-1 .3-.1.1-.5.3-.9.3-.3 0-.6 0-.9-.9s-1-1.5-1.5-1.9c-.4-.4-1-.6-1.6-.6s-1.1.2-1.5.5c-.4.4-1 1.1-1 2.2 0 1.1.8 2.4 1.8 3.6 1 1.2 2.6 2.3 4.8 2.9 2.2.6 3.5.5 4 .4.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.2.1-1.4-.1-.2-.4-.3-.8-.3z"
          fill="#fff"
        />
      </svg>
    </a>
  );
}
