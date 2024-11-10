import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const routes: Record<string, string> = {
  Dashboard: "Dashboard",
  tasks: "Tarefas",
  calendar: "Calendário",
  settings: "Configurações",
};

export function Breadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        to="/"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4 mr-2" /> Dashboard
      </Link>

      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;

        return (
          <div key={path} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1" />
            {isLast ? (
              <span className="font-medium text-foreground">
                {routes[segment] || segment}
              </span>
            ) : (
              <Link
                to={path}
                className="hover:text-foreground transition-colors"
              >
                {routes[segment] || segment}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
