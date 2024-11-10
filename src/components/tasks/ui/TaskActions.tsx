import { Task, UpdateTaskInput } from "@/types/task";
import { EditTaskDialog, DeleteTaskDialog } from "../dialogs";

interface TaskActionsProps {
  task: Task;
  onEdit: (id: string, data: UpdateTaskInput) => Promise<void>;
  onDelete: (id: string) => Promise<void | string>;
}

export function TaskActions({ task, onEdit, onDelete }: TaskActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <EditTaskDialog task={task} onEditTask={onEdit} />
      <DeleteTaskDialog
        taskTitle={task.title}
        onConfirm={() => onDelete(task.id)}
      />
    </div>
  );
}
