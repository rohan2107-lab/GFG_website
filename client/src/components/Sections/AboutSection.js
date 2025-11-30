import React from 'react';
import { Link } from 'react-router-dom';
// Added FaCode and FaRocket for more visually distinct features
import { FaHandsHelping, FaCode, FaRocket } from 'react-icons/fa'; 

const AboutSection = () => {
  return (
    <section className="about-section-home">
      <div className="about-section-content">
        <h2 className="section-title-home">Igniting the Tech Spark at IKGPTU</h2>
        <p className="subtitle-home">
          We are the official <b>GeeksforGeeks (GFG)</b> campus community, dedicated to empowering students through coding, collaboration, and competitive programming.
        </p>

        <div className="features-grid-home">
          <div className="feature-item-home item-1"> {/* Unique class for specific coloring */}
            <FaCode className="feature-icon-home" />
            <h4>Skill Development</h4>
            <p>Master Data Structures, Algorithms, and core development concepts through workshops and mentorship.</p>
          </div>
          <div className="feature-item-home item-2"> {/* Unique class for specific coloring */}
            <FaHandsHelping className="feature-icon-home" />
            <h4>Community Focus</h4>
            <p>Join a network of passionate peers for collaborative projects, hackathons, and career guidance.</p>
          </div>
          <div className="feature-item-home item-3"> {/* Added feature card for 3-column look */}
            <FaRocket className="feature-icon-home" />
            <h4>Career Acceleration</h4>
            <p>Focus on placement preparation, interview readiness, and connecting with industry leaders.</p>
          </div>
        </div>
        
        <Link to="/about" className="cta-button-home">
          Discover Our Mission & Team
        </Link>
      </div>
    </section>
  );
};

export default AboutSection;