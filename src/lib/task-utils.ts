import { CreateTaskInput, Task } from "@/types/task";

export function createTask(input: CreateTaskInput): Task {
  const now = new Date();

  return {
    id: crypto.randomUUID(),
    ...input,
    status: "todo",
    createdAt: now,
    updatedAt: now,
  };
}

export function formatTaskDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function isTaskOverdue(task: Task): boolean {
  if (!task.dueDate) return false;
  return task.dueDate < new Date() && task.status !== "done";
}
