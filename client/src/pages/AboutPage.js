import React from 'react';
import { FaCode, FaRocket, FaUsers, FaChartLine, FaLinkedin } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="about-page-container">
      <section className="about-hero">
        <h1>Building the Future of Tech at IKGPTU</h1>
        <p className="hero-subtitle">
          We are the official campus community of **GeeksforGeeks (GFG)**, dedicated to fostering a culture of coding, collaboration, and competitive programming excellence.
        </p>
      </section>

      <section className="about-section mission-vision-section">
        <div className="mission-vision-card">
          <FaRocket className="mv-icon mission-icon" />
          <h2>Our Mission</h2>
          <p>
            To empower every student at IKGPTU with the necessary technical skills and confidence to excel in the global tech industry. We aim to bridge the gap between academic knowledge and real-world industrial needs.
          </p>
        </div>
        <div className="mission-vision-card">
          <FaChartLine className="mv-icon vision-icon" />
          <h2>Our Vision</h2>
          <p>
            To be the leading technical society on campus, recognized for promoting innovation, ethical coding practices, and producing top-tier developers and competitive programmers.
          </p>
        </div>
      </section>

      <section className="about-section activities-section">
        <h2 className="activities-title">What We Do</h2>
        <div className="activities-grid">
          <div className="activity-card">
            <FaCode className="activity-icon" />
            <h3>Coding Workshops</h3>
            <p>Hands-on sessions covering core concepts, data structures, and algorithms to strengthen foundational knowledge.</p>
          </div>
          <div className="activity-card">
            <FaUsers className="activity-icon" />
            <h3>Contests & Hackathons</h3>
            <p>Organizing regular coding competitions and hackathons to test skills and encourage innovative problem-solving.</p>
          </div>
          <div className="activity-card">
            <FaLinkedin className="activity-icon" />
            <h3>Industry Networking</h3>
            <p>Inviting professionals and alumni for talks and mentorship sessions to guide students on career paths and trends.</p>
          </div>
        </div>
      </section>

      <section className="about-section cta-section">
        <h2>Ready to Code the Future?</h2>
        <p>Join the GFG IKGPTU community today and be a part of the coding revolution on campus!</p>
        <button className="cta-button">Connect with Us</button>
      </section>
    </div>
  );
};

export default AboutPage;