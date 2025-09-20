import React, { useState, useEffect } from "react";
import "./Loading.css";

const Loading = ({ progress = 0, onComplete }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setDisplayProgress(prev => {
        const diff = progress - prev;
        if (Math.abs(diff) < 0.5) {
          clearInterval(progressInterval);
          return progress;
        }
        return prev + diff * 0.1;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [progress]);

  useEffect(() => {
    if (progress >= 100 && onComplete) {
      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          onComplete();
        }, 500);
      }, 1000);
    }
  }, [progress, onComplete]);

  return (
    <div className={`loading-container ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="loading-content">
        {/* Coffee cup animation */}
        <div className="coffee-cup">
          <div className="cup">
            <div className="cup-handle"></div>
            <div className="coffee-liquid"></div>
            <div className="steam">
              <div className="steam-line"></div>
              <div className="steam-line"></div>
              <div className="steam-line"></div>
            </div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="loading-text">
          <h2 className="loading-title">Cafe Shop</h2>
          <p className="loading-subtitle">Brewing your perfect experience...</p>
        </div>
        
        {/* Loading progress bar */}
        <div className="loading-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${Math.min(displayProgress, 100)}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {Math.round(displayProgress)}%
          </div>
        </div>
        
        {/* Loading dots */}
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
