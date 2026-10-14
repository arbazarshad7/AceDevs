import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { supabase, checkConnection, isConfigured } from '../services/supabaseClient';

const AuthContext = createContext(null);

const DEFAULT_DEV_EMAILS = [
  'arbazarshad7@gmail.com',
  'deveshkumardas08@gmail.com',
  'arbazarshad@gmail.com',
  'deveshdas@gmail.com',
  'arbaz@acedevs.io',
  'devesh@acedevs.io'
];

/**
 * Determines whether an authenticated user is one of the lead developers
 * and maps their developer code (DEV-01 or DEV-02).
 */
function resolveDeveloperProfile(user) {
  if (!user || !user.email) return { isDev: false, profile: null };

  const email = user.email.toLowerCase();
  const envDevEmails = import.meta.env.VITE_DEV_EMAILS
    ? import.meta.env.VITE_DEV_EMAILS.toLowerCase().split(',').map((e) => e.trim())
    : [];

  const allDevEmails = [...DEFAULT_DEV_EMAILS, ...envDevEmails];
  const isMatch = allDevEmails.includes(email) || email.includes('arbaz') || email.includes('devesh');

  if (!isMatch) {
    return {
      isDev: false,
      profile: {
        role: 'GUEST_USER',
        code: 'GUEST',
        name: user.user_metadata?.full_name || email.split('@')[0],
        email: user.email
      }
    };
  }

  const isArbaz = email.includes('arbaz');
  return {
    isDev: true,
    profile: {
      role: 'DEVELOPER_ADMIN',
      id: isArbaz ? 'arbaz' : 'devesh',
      code: isArbaz ? 'DEV-01' : 'DEV-02',
      name: isArbaz ? 'Arbaz Arshad' : 'Devesh Das',
      email: user.email,
      designation: isArbaz ? 'Game Developer · AI & Systems' : 'Game Developer & Computer Science Engineer'
    }
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState({ status: 'CHECKING', latencyMs: 0 });

  // Developer attribution
  const { isDev: isDeveloper, profile: developerProfile } = useMemo(() => {
    return resolveDeveloperProfile(user);
  }, [user]);

  // Initial session & connection health verification
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        const conn = await checkConnection();
        if (mounted) setConnectionStatus(conn);

        const { data, error } = await supabase.auth.getSession();
        if (mounted) {
          if (error) setAuthError(error.message);
          setSession(data?.session || null);
          setUser(data?.session?.user || null);
        }
      } catch (err) {
        if (mounted) setAuthError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initAuth();

    // Subscribe to auth state updates
    const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      setUser(newSession?.user || null);
      setLoading(false);
      setAuthError(null);
    });

    return () => {
      mounted = false;
      if (authListener?.subscription?.unsubscribe) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setAuthError(null);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const signInWithEmail = useCallback(async (email, password) => {
    setAuthError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      setSession(data.session);
      setUser(data.user);
      return { success: true, data };
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const signUpWithEmail = useCallback(async (email, password) => {
    setAuthError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      if (error) throw error;
      setSession(data.session);
      setUser(data.user);
      return { success: true, data };
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const signOut = useCallback(async () => {
    setAuthError(null);
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      return { success: true };
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  const value = useMemo(() => ({
    user,
    session,
    loading,
    authError,
    isDeveloper,
    developerProfile,
    connectionStatus,
    isConfigured,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    clearError
  }), [
    user,
    session,
    loading,
    authError,
    isDeveloper,
    developerProfile,
    connectionStatus,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    clearError
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
