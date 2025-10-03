import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">GFG IKGPTU</Link>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/team">Our Team</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;