import { useTaskContext } from "@/context/task-context";
import { Task } from "@/types/task";

function getTaskStats(tasks: Task[]) {
  const total = tasks?.length;
  const completed = tasks?.filter((task) => task.status === "done").length;
  const inProgress = tasks?.filter(
    (task) => task.status === "in-progress"
  ).length;
  const todo = tasks?.filter((task) => task.status === "todo").length;
  const overdue = tasks?.filter(
    (task) =>
      task.dueDate &&
      new Date(task.dueDate) < new Date() &&
      task.status !== "done"
  ).length;

  const byPriority = {
    high: tasks?.filter((task) => task.priority === "high").length,
    medium: tasks?.filter((task) => task.priority === "medium").length,
    low: tasks?.filter((task) => task.priority === "low").length,
  };

  return {
    total,
    completed,
    inProgress,
    todo,
    overdue,
    byPriority,
    completionRate: total ? Math.round((completed / total) * 100) : 0,
  };
}

export function useTaskStats() {
  const { tasks } = useTaskContext();
  return getTaskStats(tasks);
}
