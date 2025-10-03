import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaYoutube, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <Link to="/">
            <h2>GFG IKGPTU</h2>
          </Link>
          <p>The official campus community of GeeksforGeeks at IKGPTU.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/team">Our Team</Link></li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
            <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="mailto:contact@gfgikgptu.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GFG IKGPTU. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;