import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Public Page Imports
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import EventsPage from './pages/EventsPage';
import TeamPage from './pages/TeamPage';
import BlogPostDetail from './pages/BlogPostDetail'; 

// AUTH Imports (NEW)
import Login from './components/Auth/Login'; 
import Register from './components/Auth/Register';
import ProtectedRoute from './components/Auth/ProtectedRoute'; 

// Layout & Admin Imports
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import AdminPage from './pages/AdminPage'; // Admin CMS Router

import './styles/main.css';

// ------------------------------------------------------------------
// 1. Public Layout Component
// ------------------------------------------------------------------
const PublicLayout = () => {
  return (
    <>
      <Header />
      <main className="public-content-wrapper"> 
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
        {/* GROUP 1: PUBLIC ROUTES */}
        {/* ---------------------------------------------------- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/blogs/:blogId" element={<BlogPostDetail />} /> 
          
          {/* AUTH ROUTES - Publicly accessible */}
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ---------------------------------------------------- */}
        {/* GROUP 2: ADMIN ROUTES - SECURED BY ProtectedRoute    */}
        {/* ---------------------------------------------------- */}
        <Route 
          path="/admin/*" 
          element={
            // FIX: Change requiredRole to 'user'. This allows *any* logged-in user access 
            // to the AdminPage, and the sidebar inside AdminPage will filter the links.
            <ProtectedRoute requiredRole='user'> 
              <AdminPage />
            </ProtectedRoute>
          } 
        /> 

        {/* Fallback 404 Route */}
        <Route path="*" element={<> <Header /> <h2>404 Page Not Found</h2> <Footer /> </>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;