import React from 'react';

const LoginActivity = ({ history }) => (
  <table className="settings-table">
    <thead>
      <tr>
        <th>Username</th>
        <th>Login Date/Time</th>
      </tr>
    </thead>
    <tbody>
      {history.map((log, index) => (
        <tr key={index}>
          <td>{log.username}</td>
          <td>{log.timestamp}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default LoginActivity;