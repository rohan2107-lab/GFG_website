import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Public Page Imports
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import EventsPage from './pages/EventsPage';
import TeamPage from './pages/TeamPage';
import BlogPostDetail from './pages/BlogPostDetail'; 

// Layout & Admin Imports
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import AdminPage from './pages/AdminPage'; // Import the AdminPage component

import './styles/main.css';

// ------------------------------------------------------------------
// 1. Public Layout Component
// This component wraps ALL public pages with the Header and Footer
// ------------------------------------------------------------------
const PublicLayout = () => {
  return (
    <>
      <Header />
      <main className="public-content-wrapper"> 
        {/* The <Outlet /> renders the specific page component (HomePage, AboutPage, etc.) */}
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------------------------------------------------- */}
        {/* GROUP 1: PUBLIC ROUTES (Uses the Header and Footer)  */}
        {/* ---------------------------------------------------- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/team" element={<TeamPage />} />
         {/* FIX: DYNAMIC BLOG DETAIL ROUTE */}
          {/* The ':blogId' tells React Router to capture the ID segment */}
          <Route path="/blogs/:blogId" element={<BlogPostDetail />} /> 
          {/* Add a Login route here when you create it */}
          {/* <Route path="/login" element={<Login />} /> */}
        </Route>

        {/* ---------------------------------------------------- */}
        {/* GROUP 2: ADMIN ROUTES (DOES NOT use the public Header/Footer) */}
        {/* ---------------------------------------------------- */}
        {/* The '*' tells the router to match any path starting with /admin/ */}
        <Route path="/admin/*" element={<AdminPage />} /> 

        {/* Fallback 404 Route (Can also use the PublicLayout) */}
        <Route path="*" element={<> <Header /> <h2>404 Page Not Found</h2> <Footer /> </>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;