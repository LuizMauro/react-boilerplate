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
  todo: "bg-slate-400/20 hover:bg-slate-400/30",
  "in-progress": "bg-blue-400/20 hover:bg-blue-400/30",
  done: "bg-green-400/20 hover:bg-green-400/30",
} as const;

export const TASK_PRIORITY_COLORS = {
  low: "bg-slate-400/20 hover:bg-slate-400/30",
  medium: "bg-yellow-400/20 hover:bg-yellow-400/30",
  high: "bg-red-400/20 hover:bg-red-400/30",
} as const;
