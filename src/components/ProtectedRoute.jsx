// src/components/ProtectedRoute.js
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, bootLoading } = useAuth();

  if (bootLoading) return null;

  if (!isAuthenticated) return <Navigate to="/auth?mode=signin" replace />;

  return children;
}
