import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/auth-context";

export function PublicRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
