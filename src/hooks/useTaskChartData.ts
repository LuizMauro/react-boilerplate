import { Task } from "@/types/task";

export function useTaskChartData(tasks: Task[]) {
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - (6 - i));
    return date.toISOString().split("T")[0];
  });

  const tasksByDate = last7Days.map((date) => {
    const dayTasks = tasks.filter(
      (task) => new Date(task.createdAt).toISOString().split("T")[0] === date
    );

    return {
      date,
      total: dayTasks.length,
      completed: dayTasks.filter((task) => task.status === "done").length,
      inProgress: dayTasks.filter((task) => task.status === "in-progress")
        .length,
    };
  });

  return tasksByDate;
}
