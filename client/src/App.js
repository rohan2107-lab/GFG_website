// This is the correct import statement for react-router-dom v6
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import EventsPage from './pages/EventsPage';
import TeamPage from './pages/TeamPage';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import './styles/main.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;