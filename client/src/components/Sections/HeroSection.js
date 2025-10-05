import React from 'react';
// 1. Import the video file
import HeroVideo from '../../assets/images/hero-bg.mp4'; 
// NOTE: Make sure the path is correct based on where you place the video file.

const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* 2. Embed the Video Element */}
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src={HeroVideo} type="video/mp4" />
        {/* Fallback for browsers that don't support the video tag */}
        Your browser does not support the video tag.
      </video>

      {/* 3. The Content Overlay */}
      <div className="hero-content">
        <h1>Welcome to GFG IKGPTU</h1>
        <p>A community of passionate coders, developers, and tech enthusiasts.</p>
        <button className="cta-button">Join Our Community</button>
      </div>
    </section>
  );
};

export default HeroSection;