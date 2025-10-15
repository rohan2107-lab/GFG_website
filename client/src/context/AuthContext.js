import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../api/supabaseClient'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch the user's role from the profiles table
  const fetchUserProfile = useCallback(async (userId) => {
    // We select the role and the full_name to confirm the profile exists
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = No Rows Found
      console.error('Error fetching user role:', error.message);
      // Fallback: Set role to a safe default if API fails
      setRole('user'); 
    } else if (!data) {
      // If no data is returned (profile hasn't been created yet), set a default
      console.warn('Profile not found for user. Setting default role.');
      setRole('user'); 
    } else {
      setRole(data.role); // Set the specific, verified role
    }
  }, []);

  useEffect(() => {
    const handleAuthChange = async (sessionUser) => {
      setUser(sessionUser);
      if (sessionUser) {
        await fetchUserProfile(sessionUser.id); 
      } else {
        setRole(null);
      }
      setLoading(false);
    };

    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      await handleAuthChange(session?.user ?? null);
    };

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        handleAuthChange(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [fetchUserProfile]);

  // --- Core Authentication Functions (unchanged) ---
  const signIn = async (email, password) => {
    return supabase.auth.signInWithPassword({ email, password });
  };
  const signUp = async (email, password, name) => {
    return supabase.auth.signUp({ 
      email, 
      password, 
      options: { data: { full_name: name } } 
    });
  };
  const signOut = async () => {
    return supabase.auth.signOut();
  };
  
  // CRITICAL FIX: Ensure a safe string is always returned. 
  // It returns the determined role, or 'user' if role is null.
  const getUserRole = () => role || 'user'; 

  const value = {
    user,
    role, 
    loading,
    signIn,
    signUp,
    signOut,
    getUserRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};