import { TaskStats } from "@/components/dashboard/TaskStats";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <TaskStats />
    </div>
  );
}
