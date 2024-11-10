import { lazy, Suspense } from "react";
import { BaseLayout } from "@/components/layout/BaseLayout";

// Lazy loading dos componentes de páginas
const Login = lazy(() => import("../pages/LoginPage"));
const Dashboard = lazy(() => import("../pages/DashboardPage"));
const Tasks = lazy(() => import("../pages/TasksPage"));

// Componente de loading
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Wrapper para Suspense
const LazyComponent = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

export const routes = {
  public: [
    {
      path: "/login",
      element: (
        <LazyComponent>
          <Login />
        </LazyComponent>
      ),
    },
  ],
  protected: [
    {
      path: "/",
      element: (
        <BaseLayout>
          <LazyComponent>
            <Dashboard />
          </LazyComponent>
        </BaseLayout>
      ),
    },
    {
      path: "/tasks",
      element: (
        <BaseLayout>
          <LazyComponent>
            <Tasks />
          </LazyComponent>
        </BaseLayout>
      ),
    },
  ],
};
