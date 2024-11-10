import { cn } from "@/lib/utils";
import { formatDate, isTaskOverdue } from "@/lib/formatters";
import { Task } from "@/types/task";

interface TaskDueDateProps {
  task: Task;
}

export function TaskDueDate({ task }: TaskDueDateProps) {
  const isOverdue = isTaskOverdue(task);

  if (!task.dueDate) {
    return <span className="text-sm text-muted-foreground">Sem prazo</span>;
  }

  return (
    <span
      className={cn(
        "text-sm",
        isOverdue && task.status !== "done" && "text-destructive"
      )}
    >
      {formatDate(new Date(task.dueDate))}
    </span>
  );
}
