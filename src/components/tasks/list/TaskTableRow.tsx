import { TableCell, TableRow } from "@/components/ui/table";
import { Task, UpdateTaskInput } from "@/types/task";
import { TASK_STATUS_COLORS_ROW } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  TaskTitle,
  TaskTags,
  TaskPriorityBadge,
  TaskStatusSelect,
  TaskDueDate,
} from "../ui";
import { TaskActions } from "../ui";

interface TaskTableRowProps {
  task: Task;
  onStatusChange: (task: Task, status: Task["status"]) => Promise<void>;
  onEdit: (id: string, data: UpdateTaskInput) => Promise<void>;
  onDelete: (id: string) => Promise<string>;
}

export function TaskTableRow({
  task,
  onStatusChange,
  onEdit,
  onDelete,
}: TaskTableRowProps) {
  return (
    <TableRow className="relative">
      <TableCell className="p-0">
        <div
          className={cn(
            "w-1 h-full absolute left-0 top-0",
            TASK_STATUS_COLORS_ROW[task.status]
          )}
        />
      </TableCell>
      <TableCell>
        <TaskTitle title={task.title} description={task.description} />
        <TaskTags tags={task.tags || []} />
      </TableCell>
      <TableCell>
        <TaskPriorityBadge priority={task.priority} />
      </TableCell>
      <TableCell>
        <TaskStatusSelect
          status={task.status}
          onChange={(status) => onStatusChange(task, status)}
        />
      </TableCell>
      <TableCell>
        <TaskDueDate task={task} />
      </TableCell>
      <TableCell>
        <TaskActions task={task} onEdit={onEdit} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
}
