import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../api/supabaseClient'; 
import { FaEdit, FaCheck } from 'react-icons/fa';

const ROLES = ['user', 'social_media_admin', 'events_admin', 'tech_admin', 'creative_admin', 'super_admin', 'campus_mantri']; // Added campus_mantri

const AdminUsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); 
  const [selectedRole, setSelectedRole] = useState('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    
    // FIX: Corrected Supabase Join Syntax
    // We explicitly name the relationship 'auth' and target 'auth.users'
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id, 
        full_name, 
        role, 
        created_at, 
        auth:auth.users!inner (email)  /* <<< CORRECTED JOIN SYNTAX */
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching admin users:', error.message);
      // NOTE: If this error persists, check your Supabase Policy again.
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  }, []);
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Function to save the new role
  const saveRole = async (userId) => {
    setLoading(true);
    // Since we are updating the role in the profiles table, this query remains simple.
    const { error } = await supabase
      .from('profiles')
      .update({ role: selectedRole })
      .eq('id', userId);

    if (error) {
      console.error('Role update error:', error.message);
      alert(`Error updating role: ${error.message}`);
    } else {
      // Update UI state with the new role instantly
      setUsers(prev => 
        prev.map(u => u.id === userId ? { ...u, role: selectedRole } : u)
      );
      setEditingId(null);
      alert(`Role updated to ${selectedRole.toUpperCase()}`);
    }
    setLoading(false);
  };
  
  // Enter Edit mode
  const startEdit = (user) => {
    setEditingId(user.id);
    setSelectedRole(user.role);
  };

  if (loading) return <div className="cms-loading">Loading Admin Users...</div>;

  return (
    <div className="users-list-container">
      <table className="settings-table users-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.full_name}</td>
              
              {/* FIX: Access email via the new relationship name 'auth' */}
              <td>{user.auth ? user.auth.email : 'N/A'}</td> 
              
              <td className="role-cell">
                {editingId === user.id ? (
                  <select 
                    value={selectedRole} 
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="role-select"
                  >
                    {ROLES.map(role => (
                      <option key={role} value={role}>
                        {role.replace('_', ' ').toUpperCase()}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className={`role-badge role-${user.role.toLowerCase().replace('_', '-')}`}>
                    {user.role.replace('_', ' ').toUpperCase()}
                  </span>
                )}
              </td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              
              <td>
                <div className="action-btn-group">
                  {editingId === user.id ? (
                    <button onClick={() => saveRole(user.id)} className="action-btn save-btn" title="Save Role">
                      <FaCheck />
                    </button>
                  ) : (
                    <button onClick={() => startEdit(user)} className="action-btn edit-btn" title="Edit Role">
                      <FaEdit />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersList;