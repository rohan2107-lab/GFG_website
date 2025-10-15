import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../api/supabaseClient';

const LoginActivity = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLoginHistory = useCallback(async () => {
        setLoading(true);
        
        // FIX: Corrected Supabase Join Syntax
        // We explicitly name the join 'auth' and target 'auth.users'
        const { data, error } = await supabase
            .from('profiles')
            .select(`
                full_name,
                auth:auth.users!inner (email, last_sign_in_at) /* <<< CORRECTED JOIN SYNTAX */
            `)
            .neq('auth.last_sign_in_at', null) // Filter for users who have signed in at least once
            .order('auth.last_sign_in_at', { ascending: false });

        if (error) {
            console.error('Error fetching login history:', error.message);
        } else {
            // Flatten the data structure using the new 'auth' relationship name
            const formattedHistory = data
                // Filter out any rows where the auth join somehow failed (shouldn't happen with !inner but for safety)
                .filter(item => item.auth && item.auth.last_sign_in_at) 
                .map(item => ({
                    // Prioritize full_name, fall back to email
                    username: item.full_name || item.auth.email, 
                    timestamp: item.auth.last_sign_in_at,
                }));
            
            setHistory(formattedHistory || []);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchLoginHistory();
    }, [fetchLoginHistory]);
    
    if (loading) return <div className="cms-loading">Loading Login History...</div>;
    
    return (
        <div className="login-history-container">
            <table className="settings-table login-table">
                <thead>
                    <tr>
                        <th>User Name / Email</th>
                        <th>Last Login Date/Time</th>
                    </tr>
                </thead>
                <tbody>
                    {history.length === 0 ? (
                        <tr><td colSpan="2" className="no-data-cell">No recent login activity found.</td></tr>
                    ) : (
                        history.map((log, index) => (
                            <tr key={index}>
                                <td>{log.username}</td>
                                <td>{new Date(log.timestamp).toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LoginActivity;