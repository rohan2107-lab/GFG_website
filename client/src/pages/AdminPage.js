import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../components/Admin/AdminSidebar';
import AdminDashboard from '../components/Admin/AdminDashboard';
import BlogAdmin from '../components/Admin/BlogAdmin';
import AnnouncementAdmin from '../components/Admin/AnnouncementAdmin';
// Import UserAdmin and other placeholder components
import EventAdmin from '../components/Admin/EventAdmin'; 
import UserAdmin from '../components/Admin/UserAdmin'; // <<< NEW IMPORT

// import DesignAdmin from '../components/Admin/DesignAdmin'; // (Uncomment if needed later)

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
          
          {/* Blog Management Route */}
          <Route path="blogs/*" element={<BlogAdmin />} /> 

          {/* Event Management Route */}
          <Route path="events/*" element={<EventAdmin />} /> 
          
          {/* Design Management Route */}
          {/* <Route path="design" element={<DesignAdmin />} /> */}

          {/* SUPER ADMIN ROUTE FIX: Render the functional UserAdmin component */}
          <Route path="users" element={<UserAdmin />} />
          
          {/* Fallback 404 Route */}
          <Route path="*" element={<h2>404 Admin Page Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPage;