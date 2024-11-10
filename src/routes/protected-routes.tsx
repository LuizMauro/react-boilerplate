import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { BaseLayout } from "@/components/layout/BaseLayout";

export function ProtectedRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
}
