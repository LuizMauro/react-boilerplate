import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskTrendsProps {
  tasksLastMonth: number;
  completedLastMonth: number;
  avgCompletionDays: number;
}

export function TaskTrends({
  tasksLastMonth,
  completedLastMonth,
  avgCompletionDays,
}: TaskTrendsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Tarefas no Último Mês
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tasksLastMonth}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Concluídas no Último Mês
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedLastMonth}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Tempo Médio de Conclusão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgCompletionDays} dias</div>
        </CardContent>
      </Card>
    </div>
  );
}
