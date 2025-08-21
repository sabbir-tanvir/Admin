import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

/*
Usage:
<Route element={<ProtectedRoute roles={["admin"]} />}> ...protected admin routes... </Route>
If roles omitted -> any authenticated user.
*/
export default function ProtectedRoute({ roles }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 32 }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && roles.length && !roles.includes(user.role)) return <Navigate to="/unauthorized" replace />;
  return <Outlet />;
}
