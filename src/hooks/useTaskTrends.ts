import { Task } from "@/types/task";

export function useTaskTrends(tasks: Task[]) {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const recentTasks = tasks?.filter(
    (task) => new Date(task.createdAt) >= thirtyDaysAgo
  );

  const completionTimes = recentTasks
    .filter((task) => task.status === "done")
    .map((task) => {
      const created = new Date(task.createdAt);
      const completed = new Date(task.updatedAt);
      return completed.getTime() - created.getTime();
    });

  const avgCompletionTime =
    completionTimes.length > 0
      ? completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length
      : 0;

  return {
    tasksLastMonth: recentTasks?.length,
    completedLastMonth: recentTasks?.filter((task) => task.status === "done")
      .length,
    avgCompletionDays: Math.round(avgCompletionTime / (1000 * 60 * 60 * 24)),
  };
}
