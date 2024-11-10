import { TaskPriority, TaskStatus } from "@/types/task";

export const TASK_PRIORITIES: { label: string; value: TaskPriority }[] = [
  { label: "Baixa", value: "low" },
  { label: "Média", value: "medium" },
  { label: "Alta", value: "high" },
];

export const TASK_STATUS: { label: string; value: TaskStatus }[] = [
  { label: "A fazer", value: "todo" },
  { label: "Em andamento", value: "in-progress" },
  { label: "Concluída", value: "done" },
];

export const TASK_STATUS_COLORS = {
  todo: "bg-slate-400",
  "in-progress": "bg-blue-400",
  done: "bg-green-400",
} as const;

export const TASK_PRIORITY_COLORS = {
  low: "bg-slate-400",
  medium: "bg-yellow-400",
  high: "bg-red-400",
} as const;
