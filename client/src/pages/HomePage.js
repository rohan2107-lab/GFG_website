import React from 'react';
import HeroSection from '../components/Sections/HeroSection';
import BlogSection from '../components/Sections/BlogSection';
import AboutSection from '../components/Sections/AboutSection';
import AnnouncementTicker from '../components/Sections/AnnouncementTicker';
import { mockBlogs } from '../mockData'; // We'll create this file next

const HomePage = () => {
  return (
    <>
    <AnnouncementTicker />
      <HeroSection />
    
      <AboutSection />
      <BlogSection blogs={mockBlogs.slice(0, 3)} /> {/* Display a few blogs */}
    </>
  );
};

export default HomePage;