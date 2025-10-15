// src/components/Admin/UserAdmin.js

import React from 'react';
// IMPORT THE CORRECT COMPONENTS WITH THE RIGHT PATHS
import AdminUsersList from './BlogCMS/AdminUsersList'; 
import LoginActivity from './BlogCMS/LoginActivity'; 

const UserAdmin = () => {
    return (
        <div className="admin-panel user-management-panel">
            <h2>User Management & Roles 🛡️</h2>
            <p className="panel-subtitle">
                This panel is for the Super Admin only. Manage user roles and monitor all recent login activity.
            </p>
            
            <section className="user-management-section">
                <h3>Admin User Roles</h3>
                <AdminUsersList /> {/* Render the Role Management Table */}
            </section>

            <section className="user-management-section">
                <h3>Recent Login History</h3>
                <LoginActivity /> {/* Render the Login History Table */}
            </section>
        </div>
    );
};

export default UserAdmin;