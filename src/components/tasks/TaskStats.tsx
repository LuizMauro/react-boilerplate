import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTaskContext } from "@/context/task-context";
import { Task } from "@/types/task";

function getTaskStats(tasks: Task[]) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "done").length;
  const inProgress = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;
  const todo = tasks.filter((task) => task.status === "todo").length;
  const overdue = tasks.filter(
    (task) =>
      task.dueDate &&
      new Date(task.dueDate) < new Date() &&
      task.status !== "done"
  ).length;

  const byPriority = {
    high: tasks.filter((task) => task.priority === "high").length,
    medium: tasks.filter((task) => task.priority === "medium").length,
    low: tasks.filter((task) => task.priority === "low").length,
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

export function TaskStats() {
  const { tasks } = useTaskContext();
  const stats = getTaskStats(tasks);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Tarefas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">
            {stats.completionRate}% concluídas
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-xl font-bold text-green-500">
                {stats.completed}
              </div>
              <p className="text-xs text-muted-foreground">Concluídas</p>
            </div>
            <div>
              <div className="text-xl font-bold text-blue-500">
                {stats.inProgress}
              </div>
              <p className="text-xs text-muted-foreground">Em Andamento</p>
            </div>
            <div>
              <div className="text-xl font-bold text-slate-500">
                {stats.todo}
              </div>
              <p className="text-xs text-muted-foreground">A Fazer</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Prioridades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-xl font-bold text-red-500">
                {stats.byPriority.high}
              </div>
              <p className="text-xs text-muted-foreground">Alta</p>
            </div>
            <div>
              <div className="text-xl font-bold text-yellow-500">
                {stats.byPriority.medium}
              </div>
              <p className="text-xs text-muted-foreground">Média</p>
            </div>
            <div>
              <div className="text-xl font-bold text-slate-500">
                {stats.byPriority.low}
              </div>
              <p className="text-xs text-muted-foreground">Baixa</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Atrasadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">
            {stats.overdue}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.overdue > 0
              ? "Tarefas precisam de atenção"
              : "Nenhuma tarefa atrasada"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
