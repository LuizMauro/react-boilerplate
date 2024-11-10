import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditTaskDialog } from "./EditTaskDialog";
import { Trash2 } from "lucide-react";
import { useTaskContext } from "@/context/task-context";
import { TASK_PRIORITY_COLORS, TASK_STATUS_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { formatDate, isTaskOverdue } from "@/lib/formatters";
import { Task, UpdateTaskInput } from "@/types/task";

export function TaskList() {
  const { tasks, updateTask, deleteTask } = useTaskContext();

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleStatusChange = async (task: Task, status: Task["status"]) => {
    await updateTask(task.id, { status });
  };

  const handleEdit = async (id: string, data: UpdateTaskInput) => {
    await updateTask(id, data);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[3px]"></TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Prazo</TableHead>
            <TableHead className="w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.map((task) => {
            const isOverdueTask = isTaskOverdue(task);
            return (
              <TableRow key={task.id} className="relative">
                <TableCell className="p-0">
                  <div
                    className={cn(
                      "w-1 h-full absolute left-0",
                      TASK_STATUS_COLORS[task.status]
                    )}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{task.title}</span>
                    {task.description && (
                      <span className="text-sm text-muted-foreground line-clamp-1">
                        {task.description}
                      </span>
                    )}
                    {task.tags && task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {task.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={TASK_PRIORITY_COLORS[task.priority]}
                  >
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <select
                    className={cn(
                      "text-sm border rounded-md px-2 py-1",
                      "bg-background hover:bg-accent transition-colors",
                      TASK_STATUS_COLORS[task.status]
                    )}
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task, e.target.value as Task["status"])
                    }
                  >
                    <option value="todo">A fazer</option>
                    <option value="in-progress">Em andamento</option>
                    <option value="done">Concluída</option>
                  </select>
                </TableCell>
                <TableCell>
                  {task.dueDate ? (
                    <span
                      className={cn(
                        "text-sm",
                        isOverdueTask &&
                          task.status !== "done" &&
                          "text-destructive"
                      )}
                    >
                      {formatDate(new Date(task.dueDate))}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Sem prazo
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <EditTaskDialog task={task} onEditTask={handleEdit} />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTask(task.id)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
