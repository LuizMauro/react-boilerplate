import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface SidebarItemProps {
  path: string;
  label: string;
  icon: React.ReactNode;
  isCollapsed: boolean;
}

export function SidebarItem({
  path,
  label,
  icon,
  isCollapsed,
}: SidebarItemProps) {
  return (
    <TooltipRoot>
      <NavLink
        to={path}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            isActive
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground",
            isCollapsed ? "justify-center p-2" : "text-sm"
          )
        }
      >
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex items-center justify-center",
              isCollapsed ? "h-6 w-6" : "h-5 w-5"
            )}
          >
            {icon}
          </div>
        </TooltipTrigger>
        {!isCollapsed && label}
      </NavLink>

      {isCollapsed && (
        <TooltipContent side="right" className="pointer-events-none">
          {label}
        </TooltipContent>
      )}
    </TooltipRoot>
  );
}
