import React from 'react';
import AdminUsersList from './AdminUsersList';
import LoginActivity from './LoginActivity';

const SettingsCMS = () => {
  // Mock data for settings
  const mockAdmins = [
    { username: 'rohan_kumar', email: 'rohan@gfg.com', name: 'Rohan Kumar', created_at: '2025-01-10' },
    { username: 'tech_admin', email: 'tech@gfg.com', name: 'Priya Sharma', created_at: '2025-03-05' },
  ];

  const mockLoginHistory = [
    { username: 'rohan_kumar', timestamp: '2025-10-10 10:30:00' },
    { username: 'tech_admin', timestamp: '2025-10-10 09:15:00' },
  ];

  return (
    <div className="settings-panel">
      <h2>CMS Settings and Administration</h2>
      
      <section>
        <h3>Admin Users List</h3>
        <AdminUsersList users={mockAdmins} />
      </section>

      <section>
        <h3>Admin Login History</h3>
        <LoginActivity history={mockLoginHistory} />
      </section>
    </div>
  );
};

export default SettingsCMS;