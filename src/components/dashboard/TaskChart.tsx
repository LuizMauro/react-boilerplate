import { memo, useMemo } from "react";
import { BaseChart } from "../charts/BaseChart";
import type { ChartData, ChartOptions } from "chart.js";

interface TaskChartProps {
  data: {
    date: string;
    total: number;
    completed: number;
    inProgress: number;
  }[];
}

export const TaskChart = memo(({ data }: TaskChartProps) => {
  // Memoize chart data to prevent unnecessary recalculations
  const chartData: ChartData<"line"> = useMemo(
    () => ({
      labels: data.map((item) => item.date),
      datasets: [
        {
          label: "Total",
          data: data.map((item) => item.total),
          borderColor: "rgb(99, 102, 241)",
          backgroundColor: "rgba(99, 102, 241, 0.1)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Concluídas",
          data: data.map((item) => item.completed),
          borderColor: "rgb(34, 197, 94)",
          backgroundColor: "rgba(34, 197, 94, 0.1)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Em Progresso",
          data: data.map((item) => item.inProgress),
          borderColor: "rgb(234, 179, 8)",
          backgroundColor: "rgba(234, 179, 8, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    }),
    [data]
  );

  // Memoize chart options
  const options: ChartOptions<"line"> = useMemo(
    () => ({
      plugins: {
        legend: {
          display: true,
          position: "top" as const,
        },
        tooltip: {
          enabled: true,
          mode: "index",
          intersect: false,
          backgroundColor: "rgb(255, 255, 255)",
          titleColor: "rgb(0, 0, 0)",
          bodyColor: "rgb(0, 0, 0)",
          borderColor: "rgb(229, 231, 235)",
          borderWidth: 1,
          padding: 8,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            borderDash: [2],
            color: "rgba(0, 0, 0, 0.1)",
          },
        },
      },
    }),
    []
  );

  return (
    <div className="h-[300px] w-full">
      <BaseChart data={chartData} options={options} />
    </div>
  );
});

TaskChart.displayName = "TaskChart";
