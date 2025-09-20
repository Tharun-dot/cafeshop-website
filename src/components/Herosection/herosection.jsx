import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./herosection.css";
import back from "../../assets/back.mp4";

import cafe1 from "../../assets/cafe1.jpeg";
import cafe2 from "../../assets/cafe2.jpeg";
import cafe3 from "../../assets/cafe3.jpeg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="hero-section">
        <video
          className="background-video"
          src={back}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="content">
          <h1>Espresso yourself — we’re glad you’re here!</h1>
          <p>
            "Savoring a cup of coffee is more than a drink—it's a moment of calm.
            Each sip fuels the day and awakens inspiration."
          </p>
          <button className="btn" onClick={() => navigate("/menu")}>
            Explore Menu
          </button>
        </div>
      </div> 

      {/* Cafes Section */}
      <div className="location">
        <h2 className="text1">Checkout some super cafes!!</h2>
        <p className="text2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Rerum veritatis ratione perspiciatis molestias quos.
        </p>

        <div className="cafes-gallery">
          <div className="cafe-card"><img src={cafe1} alt="Cafe 1" /></div>
          <div className="cafe-card"><img src={cafe2} alt="Cafe 2" /></div>
          <div className="cafe-card"><img src={cafe3} alt="Cafe 3" /></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Cafe Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HeroSection;
