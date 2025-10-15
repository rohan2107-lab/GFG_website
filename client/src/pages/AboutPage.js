import React from 'react';
// Updated icons for new sections
import { FaCode, FaRocket, FaUsers, FaChartLine, FaLinkedin, FaGraduationCap, FaRegLightbulb, FaPaintBrush, FaHandsHelping } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="about-page-container">
      <section className="about-hero">
        <h1>Building the Future of Tech at IKGPTU</h1>
        <p className="hero-subtitle">
          We are the official campus community of **GeeksforGeeks (GFG)**, dedicated to fostering a culture of coding, collaboration, and competitive programming excellence.
        </p>
      </section>

      {/* --- MISSION & VISION --- */}
      <section className="about-section mission-vision-section">
        <div className="mission-vision-card">
          <FaRocket className="mv-icon mission-icon" />
          <h2>Our Mission</h2>
          <p>
            To **empower** every student at IKGPTU with the necessary technical skills and confidence to excel in the global tech industry. We actively work to bridge the gap between academic knowledge and **real-world industrial needs**.
          </p>
        </div>
        <div className="mission-vision-card">
          <FaChartLine className="mv-icon vision-icon" />
          <h2>Our Vision</h2>
          <p>
            To be the **leading technical society** on campus, recognized for promoting innovation, ethical coding practices, and producing top-tier developers and **competitive programmers** ready for tier-1 companies.
          </p>
        </div>
      </section>

      {/* --- WHAT WE DO (Expanded Activities) --- */}
      <section className="about-section activities-section">
        <h2 className="activities-title">What We Do</h2>
        <div className="activities-grid">
          {/* Card 1: Coding Workshops */}
          <div className="activity-card">
            <FaCode className="activity-icon" />
            <h3>Coding Workshops</h3>
            <p>Hands-on sessions covering core concepts, data structures, and algorithms to strengthen foundational knowledge.</p>
          </div>
          {/* Card 2: Contests & Hackathons */}
          <div className="activity-card">
            <FaUsers className="activity-icon" />
            <h3>Contests & Hackathons</h3>
            <p>Organizing regular coding competitions and hackathons to test skills and encourage innovative problem-solving.</p>
          </div>
          {/* Card 3: Mentorship (NEW) */}
          <div className="activity-card">
            <FaGraduationCap className="activity-icon" />
            <h3>1:1 Mentorship</h3>
            <p>Peer-to-peer and senior-to-junior mentorship programs focused on placement preparation and specific tech stacks.</p>
          </div>
          {/* Card 4: Project Development (NEW) */}
          <div className="activity-card">
            <FaRegLightbulb className="activity-icon" />
            <h3>Collaborative Projects</h3>
            <p>Building real-world, open-source projects as a community to enhance portfolio value and practical skills.</p>
          </div>
          {/* Card 5: Content Creation (NEW) */}
          <div className="activity-card">
            <FaPaintBrush className="activity-icon" />
            <h3>Tech Content Creation</h3>
            <p>Encouraging students to write and publish technical blogs and tutorials, enhancing communication skills.</p>
          </div>
          {/* Card 6: Industry Networking */}
          <div className="activity-card">
            <FaLinkedin className="activity-icon" />
            <h3>Industry Networking</h3>
            <p>Inviting professionals and alumni for talks and mentorship sessions to guide students on career paths and trends.</p>
          </div>
        </div>
      </section>
      
      {/* --- NEW SECTION: WHY JOIN US (Replaces old CTA) --- */}
      <section className="about-section core-impact-section">
        <h2 className="activities-title">Why Join GFG IKGPTU?</h2>
        <div className="core-impact-grid">
          <div className="impact-feature-card">
            <h3>Placement Focus</h3>
            <p>Direct exposure to interview preparation techniques trusted by top companies.</p>
          </div>
          <div className="impact-feature-card">
            <h3>Skill Validation</h3>
            <p>Certifications and contests that validate your mastery of DSA and development.</p>
          </div>
          <div className="impact-feature-card">
            <h3>Strong Network</h3>
            <p>Connect with high-achieving seniors and alumni for lifelong guidance.</p>
          </div>
        </div>
        <p className="final-cta-text">
            Ready to elevate your tech journey? Connect with us through our official channels!
        </p>
        <button className="cta-button"><a href='https://chat.whatsapp.com/FOkUp3cUuLkFWKqOY1vXLk?mode=ems_copy_t'>Connect with Us</a></button>
      </section>

    </div>
  );
};

export default AboutPage;