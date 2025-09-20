import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nabar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>Cafe</Link>
      
      {/* Mobile menu button */}
      <button 
        className="mobile-menu-btn"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {/* Navigation links */}
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><a href="#about" onClick={closeMenu}>About</a></li>
        <li><a href="#services" onClick={closeMenu}>Services</a></li>
        <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        <li><Link to="/menu" onClick={closeMenu}>Menu</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
