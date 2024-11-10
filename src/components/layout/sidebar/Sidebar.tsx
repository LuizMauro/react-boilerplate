import { useState } from "react";
import { cn } from "@/lib/utils";
import { routes } from "@/routes/config";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "border-r bg-background transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-full flex-col">
          <SidebarHeader
            isCollapsed={isCollapsed}
            onCollapse={() => setIsCollapsed(!isCollapsed)}
          />

          <nav className="space-y-2 p-4">
            {routes.protected.map(
              (route) =>
                route.label && (
                  <SidebarItem
                    key={route.path}
                    path={route.path}
                    label={route.label}
                    icon={route.icon}
                    isCollapsed={isCollapsed}
                  />
                )
            )}
          </nav>
        </div>
      </aside>
    </TooltipProvider>
  );
}
