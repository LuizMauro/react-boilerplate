import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/context/theme-provider";
import { AuthProvider } from "@/context/auth-context";
import { TaskProvider } from "@/context/task-context";
import { ProtectedRoutes } from "@/routes/protected-routes";
import { PublicRoutes } from "@/routes/public-routes";
import { routes } from "@/routes/config";

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            {/* Rotas Públicas */}
            <Route element={<PublicRoutes />}>
              {routes.public.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>

            {/* Rotas Protegidas */}
            <Route element={<ProtectedRoutes />}>
              {routes.protected.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>

            {/* Rota 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
