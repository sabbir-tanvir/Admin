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
  if (roles && roles.length && !roles.includes(user.role)) {
    const fallback = user.role === 'admin'
      ? '/dashboard'
      : user.role === 'seller'
        ? '/seller-panel'
        : '/marketor-panel'; // keep existing panel path name
    return <Navigate to={fallback} replace />;
  }
  return <Outlet />;
}
