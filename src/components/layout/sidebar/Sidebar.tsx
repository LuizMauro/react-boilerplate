import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarItem } from "./SidebarItem";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Calendar,
  Settings,
  CheckSquare,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Memoize navigation items to prevent unnecessary re-renders
  const navigationItems = useMemo(
    () => [
      {
        path: "/",
        label: "Dashboard",
        icon: <LayoutDashboard className="h-5 w-5" />,
      },
      {
        path: "/tasks",
        label: "Tarefas",
        icon: <CheckSquare className="h-5 w-5" />,
      },
      {
        path: "/calendar",
        label: "Calendário",
        icon: <Calendar className="h-5 w-5" />,
      },
      {
        path: "/settings",
        label: "Configurações",
        icon: <Settings className="h-5 w-5" />,
      },
    ],
    []
  );

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r bg-background",
        isCollapsed ? "w-16" : "w-64",
        "transition-all duration-300 ease-in-out",
        className
      )}
    >
      {/* Logo/Header Section */}
      <div
        className={cn(
          "flex h-16 items-center border-b px-4",
          isCollapsed ? "justify-center" : "justify-between"
        )}
      >
        {!isCollapsed && <span className="text-lg font-semibold">Menu</span>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-6 w-6"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 p-2">
        {navigationItems.map((item) => (
          <SidebarItem
            key={item.path}
            path={item.path}
            label={item.label}
            icon={item.icon}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
    </aside>
  );
}
