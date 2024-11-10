import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onCollapse: () => void;
}

export function SidebarHeader({ isCollapsed, onCollapse }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-3 border-b">
      {!isCollapsed && (
        <span className="text-xl font-semibold">Task Manager</span>
      )}
      <Button variant="ghost" size="icon" onClick={onCollapse}>
        {isCollapsed ? (
          <PanelLeftOpen className="h-5 w-5" />
        ) : (
          <PanelLeftClose className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
