import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../components/Admin/AdminSidebar';
import AdminDashboard from '../components/Admin/AdminDashboard';
import BlogAdmin from '../components/Admin/BlogAdmin';
import AnnouncementAdmin from '../components/Admin/AnnouncementAdmin';

const AdminPage = () => {
  return (
    <div className="admin-page-container">
      <AdminSidebar />
      <main className="admin-content-area">
        <Routes>
          {/* Main Dashboard Overview */}
          <Route path="/" element={<AdminDashboard />} /> 

          {/* Social Media Admin Routes */}
          <Route path="announcements" element={<AnnouncementAdmin />} />
          <Route path="blogs" element={<BlogAdmin />} />

          {/* Placeholder for other admin types */}
          <Route path="users" element={<h2>User Role Management (Super Admin)</h2>} />
          {/* Add more routes here: 'events', 'design', 'pr', etc. */}

          <Route path="*" element={<h2>404 Admin Page Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPage;