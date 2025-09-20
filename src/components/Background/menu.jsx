import React, { useState, useEffect } from "react";
import menu from "../../assets/menu.jpeg";
import "./menu.css";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  // disable page scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <div className="menu-container">
      <div className="menu-grid">
        {/* Left: Menu */}
        <div className="menu-card menu-section">
          <h2>MENU</h2>
          <div
            className="menu-img-wrapper"
            onClick={() => setIsOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && setIsOpen(true)
            }
          >
            <img src={menu} alt="Menu" />
          </div>
        </div>

        {/* Top middle: Booking */}
        <div className="menu-card booking-section">
          <h2>BOOKING BY CALENDAR</h2>
          <button className="book-btn">Book a Table</button>
        </div>

        {/* Bottom middle: Manager */}
        <div className="menu-card manager-card">
          <div className="circle"></div>
          <p>MANAGER FOR CALL ANY ASSISTANCE</p>
          <button className="call-btn">Call Manager</button>
        </div>

        {/* Right: Google Map */}
        <div className="menu-card location-section">
          <h2>SHOP LOCATION GOOGLE MAP</h2>
          <iframe
            title="Shop Location"
            src="https://www.google.com/maps?q=Brooklyn,NY&output=embed"
            width="100%"
            height="200"
            style={{ border: 0, borderRadius: "10px" }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div className="popup-overlay" onClick={() => setIsOpen(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <img src={menu} alt="Full Menu" className="popup-img" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
