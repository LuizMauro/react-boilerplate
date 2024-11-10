import { Badge } from "@/components/ui/badge";
import { TASK_PRIORITY_COLORS } from "@/lib/constants";
import { TaskPriority } from "@/types/task";
import { cn } from "@/lib/utils";

interface TaskPriorityBadgeProps {
  priority: TaskPriority;
  className?: string;
}

export function TaskPriorityBadge({
  priority,
  className,
}: TaskPriorityBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(TASK_PRIORITY_COLORS[priority], className)}
    >
      {priority}
    </Badge>
  );
}
