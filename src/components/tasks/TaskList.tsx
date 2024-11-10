import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EditTaskDialog } from "./EditTaskDialog";
import { DeleteTaskDialog } from "./DeleteTaskDialog";
import { useTaskContext } from "@/context/task-context";
import { TASK_PRIORITY_COLORS, TASK_STATUS_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { formatDate, isTaskOverdue } from "@/lib/formatters";
import { Task, UpdateTaskInput } from "@/types/task";
import { TaskStatusSelect } from "./TaskStatusSelect";
import { TaskTags } from "./TaskTags";

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
                    <TaskTags tags={task.tags || []} />
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
                  <TaskStatusSelect
                    status={task.status}
                    onChange={(status) => handleStatusChange(task, status)}
                  />
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
                    <DeleteTaskDialog
                      taskTitle={task.title}
                      onConfirm={() => deleteTask(task.id)}
                    />
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
