import { Task, UpdateTaskInput } from "@/types/task";
import { TaskCard } from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: string, status: Task["status"]) => void;
  onEdit: (id: string, data: UpdateTaskInput) => Promise<void>;
  onDelete: (id: string) => void;
}

export function TaskList({
  tasks,
  onStatusChange,
  onEdit,
  onDelete,
}: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    // Prioridade: high > medium > low
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    // Se mesma prioridade, ordena por data de criação (mais recente primeiro)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sortedTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
