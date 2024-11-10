import { cn } from "@/lib/utils";
import { TASK_STATUS, TASK_STATUS_COLORS } from "@/lib/constants";
import { Task } from "@/types/task";

interface TaskStatusSelectProps {
  status: Task["status"];
  onChange: (status: Task["status"]) => void;
}

export function TaskStatusSelect({ status, onChange }: TaskStatusSelectProps) {
  return (
    <select
      className={cn(
        "text-sm border rounded-md px-2 py-1",
        "bg-background hover:bg-accent transition-colors",
        TASK_STATUS_COLORS[status]
      )}
      value={status}
      onChange={(e) => onChange(e.target.value as Task["status"])}
    >
      {TASK_STATUS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
