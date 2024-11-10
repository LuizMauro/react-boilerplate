import { TaskStats } from "@/components/dashboard/TaskStats";
import { TaskChart } from "@/components/dashboard/TaskChart";
import { TaskTrends } from "@/components/dashboard/TaskTrends";
import { Card } from "@/components/ui/card";
import { useTaskContext } from "@/context/task-context";
import { useTaskChartData } from "@/hooks/useTaskChartData";
import { useTaskTrends } from "@/hooks/useTaskTrends";

export function DashboardPage() {
  const { tasks } = useTaskContext();
  const chartData = useTaskChartData(tasks);
  const trends = useTaskTrends(tasks);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <TaskStats />

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Atividade nos Últimos 7 Dias
        </h2>
        <TaskChart data={chartData} />
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Tendências</h2>
        <TaskTrends {...trends} />
      </div>
    </div>
  );
}
