import { LayoutDashboard, ListTodo, Settings } from "lucide-react";
import { DashboardPage } from "@/pages/DashboardPage";
import { TasksPage } from "@/pages/TasksPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { LoginPage } from "@/pages/LoginPage";

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  icon?: React.ReactNode;
  label?: string;
}

interface RoutesConfig {
  public: RouteConfig[];
  protected: RouteConfig[];
}

export const routes: RoutesConfig = {
  public: [
    {
      path: "/login",
      element: <LoginPage />,
    },
  ],
  protected: [
    {
      path: "/",
      element: <DashboardPage />,
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
    },
    {
      path: "/tasks",
      element: <TasksPage />,
      icon: <ListTodo className="h-5 w-5" />,
      label: "Tarefas",
    },
    {
      path: "/settings",
      element: <SettingsPage />,
      icon: <Settings className="h-5 w-5" />,
      label: "Configurações",
    },
  ],
};
