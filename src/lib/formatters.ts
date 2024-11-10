import { Task } from "@/types/task";

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function isTaskOverdue(task: Task): boolean {
  if (!task.dueDate) return false;
  return task.dueDate < new Date() && task.status !== "done";
}
