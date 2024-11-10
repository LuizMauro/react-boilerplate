import { StatCard } from "./StatCard";
import { useTaskStats } from "@/hooks/useTaskStats";

export function TaskStats() {
  const stats = useTaskStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total de Tarefas"
        value={stats.total}
        description={`${stats.completionRate}% concluídas`}
      />

      <StatCard
        title="Status"
        value={
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
        }
      />

      <StatCard
        title="Prioridades"
        value={
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
        }
      />

      <StatCard
        title="Atrasadas"
        value={stats.overdue}
        description={
          stats.overdue > 0
            ? "Tarefas precisam de atenção"
            : "Nenhuma tarefa atrasada"
        }
      />
    </div>
  );
}
