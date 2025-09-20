import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <div className="coffee-spill">
          <div className="coffee-cup">
            <div className="cup-body"></div>
            <div className="cup-handle"></div>
            <div className="coffee-liquid"></div>
          </div>
          <div className="spill"></div>
        </div>
        
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>Looks like this page got lost in the coffee beans. Don't worry, even the best baristas sometimes spill!</p>
        
        <div className="not-found-actions">
          <Link to="/" className="home-button">
            <span className="button-icon">🏠</span>
            Back to Home
          </Link>
          <Link to="/menu" className="menu-button">
            <span className="button-icon">☕</span>
            View Menu
          </Link>
        </div>
        
        <div className="coffee-facts">
          <p>Did you know? The average coffee tree produces only 1-2 pounds of coffee beans per year!</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
