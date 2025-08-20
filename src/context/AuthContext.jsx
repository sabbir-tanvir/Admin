import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { loginUser, tokenStore } from '../services/api.js';

/*
AuthContext holds:
- user: { role, accessToken } (extend when backend ready)
- login: (username, password) -> fetch /token/ and store tokens
- logout: clear tokens and user
- loading: during initial token check

Assumptions until backend spec provided:
Backend /token/ accepts {username, password} and returns {access, refresh, role}
*/

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const logoutTimerRef = useRef(null);

  // Helper to decode JWT (no signature verification - client-side only)
  const decodeJwt = (token) => {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodeURIComponent(escape(decoded)));
    } catch {
      return null;
    }
  };

  const clearLogoutTimer = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  };

  // Define logout first so scheduleAutoLogout can reference it safely
  const logout = useCallback(() => {
    tokenStore.clear();
    localStorage.removeItem('user_role');
    setUser(null);
    clearLogoutTimer();
  }, []);

  const scheduleAutoLogout = useCallback((accessToken) => {
    clearLogoutTimer();
    if (!accessToken) return;
    const payload = decodeJwt(accessToken);
    const exp = payload?.exp; // seconds since epoch
    if (!exp) return;
    const msUntilExpiry = exp * 1000 - Date.now();
    if (msUntilExpiry <= 0) {
      logout();
      return;
    }
    const timeout = Math.max(msUntilExpiry - 200, 0); // small buffer
    logoutTimerRef.current = setTimeout(() => logout(), timeout);
  }, [logout]);

  useEffect(() => {
    const access = tokenStore.access;
    if (access) {
      const parsed = decodeJwt(access);
      const role = parsed?.role; // STRICT: only trust token
      if (role) {
        setUser({ role, accessToken: access, username: parsed?.username, userId: parsed?.user_id });
        scheduleAutoLogout(access);
      } else {
        setUser(null);
      }
    }
    setLoading(false);
  }, [scheduleAutoLogout]);

  const login = useCallback(async ({ username, password }) => {
    const { data } = await loginUser({ username, password });
    const { access, refresh } = data || {};
    if (!access) throw new Error('No access token returned');
    tokenStore.set(access, refresh);
    const parsed = decodeJwt(access);
    const role = parsed?.role; // STRICT
    if (!role) throw new Error('No role in token');
    setUser({ role, accessToken: access, username: parsed?.username, userId: parsed?.user_id });
    scheduleAutoLogout(access);
    return role;
  }, [scheduleAutoLogout]);

  const value = { user, login, logout, loading, isAuthenticated: !!user };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
