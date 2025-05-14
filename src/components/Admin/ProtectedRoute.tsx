import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  // You can add role-based access control props here if needed later
  // e.g., allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { user, loading, isAdmin } = useAuth(); // Using isAdmin from context for now
  const location = useLocation();

  if (loading) {
    // You can return a loading spinner or a blank page while auth state is being determined
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  // TODO: Enhance isAdmin check based on actual roles/claims from Supabase user metadata
  // For now, we assume if a user object exists, they are authorized for admin routes.
  // In a real application, you'd check user.roles or similar.
  if (!user || !isAdmin) { 
    // User not logged in or not an admin, redirect them to the /admin/login page.
    // Pass the current location so we can redirect them back after login.
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If logged in and an admin, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
