import { formatDate, isTaskOverdue } from "@/lib/formatters";
import { TASK_PRIORITY_COLORS, TASK_STATUS_COLORS } from "@/lib/constants";
import { Task, UpdateTaskInput } from "@/types/task";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditTaskDialog } from "./EditTaskDialog";
import { useTaskContext } from "@/context/task-context";
import { DeleteTaskDialog } from "./DeleteTaskDialog";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { updateTask, deleteTask } = useTaskContext();
  const isOverdue = isTaskOverdue(task);

  const handleStatusChange = async (status: Task["status"]) => {
    await updateTask(task.id, { status });
  };

  const handleEdit = async (id: string, data: UpdateTaskInput) => {
    await updateTask(id, data);
  };

  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md",
        isOverdue && task.status !== "done" && "border-destructive"
      )}
    >
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1">{task.title}</CardTitle>
          <Badge
            variant="secondary"
            className={cn("ml-2", TASK_PRIORITY_COLORS[task.priority])}
          >
            {task.priority}
          </Badge>
        </div>
        {task.description && (
          <CardDescription className="line-clamp-2">
            {task.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <Badge variant="outline" className={TASK_STATUS_COLORS[task.status]}>
            {task.status}
          </Badge>
          {task.dueDate && (
            <p
              className={cn(
                "text-sm text-muted-foreground",
                isOverdue && task.status !== "done" && "text-destructive"
              )}
            >
              Prazo: {formatDate(new Date(task.dueDate))}
            </p>
          )}
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <select
          className="text-sm bg-background border rounded-md px-2 py-1"
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value as Task["status"])}
        >
          <option value="todo">A fazer</option>
          <option value="in-progress">Em andamento</option>
          <option value="done">Concluída</option>
        </select>
        <div className="flex gap-2">
          <EditTaskDialog task={task} onEditTask={handleEdit} />
          <DeleteTaskDialog
            taskTitle={task.title}
            onConfirm={() => deleteTask(task.id)}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
