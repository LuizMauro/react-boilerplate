import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TaskChartData {
  date: string;
  total: number;
  completed: number;
  inProgress: number;
}

interface TaskChartProps {
  data: TaskChartData[];
}

export function TaskChart({ data }: TaskChartProps) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" name="Total" />
          <Bar dataKey="completed" fill="#82ca9d" name="Concluídas" />
          <Bar dataKey="inProgress" fill="#ffc658" name="Em Progresso" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
