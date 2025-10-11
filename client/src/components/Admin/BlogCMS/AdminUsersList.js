import React from 'react';

const AdminUsersList = ({ users }) => (
  <table className="settings-table">
    <thead>
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Full Name</th>
        <th>Account Created</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => (
        <tr key={index}>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.name}</td>
          <td>{user.created_at}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default AdminUsersList;