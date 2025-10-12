import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../components/Admin/AdminSidebar';
import AdminDashboard from '../components/Admin/AdminDashboard';
import BlogAdmin from '../components/Admin/BlogAdmin';
import AnnouncementAdmin from '../components/Admin/AnnouncementAdmin';
// Import placeholder components for the new routes
import EventAdmin from '../components/Admin/EventAdmin'; 
// import DesignAdmin from '../components/Admin/DesignAdmin'; 

const AdminPage = () => {
  return (
    <div className="admin-page-container">
      <AdminSidebar />
      <main className="admin-content-area">
        <Routes>
          {/* Main Dashboard Overview */}
          <Route path="/" element={<AdminDashboard />} /> 

          {/* Social Media Admin Routes */}
          <Route path="announcements/*" element={<AnnouncementAdmin />} />
          
          {/* FIX: Use "blogs/*" to enable NESTED routing for Create/Edit views */}
          <Route path="blogs/*" element={<BlogAdmin />} /> 

          {/* Event Management Route */}
          <Route path="events/*" element={<EventAdmin />} /> 
          
          {/* Design Management Route */}
          {/* <Route path="design" element={<DesignAdmin />} /> */}

          {/* Placeholder for Super Admin */}
          <Route path="users" element={<h2>User Role Management (Super Admin)</h2>} />
          
          {/* Fallback 404 Route */}
          <Route path="*" element={<h2>404 Admin Page Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPage;