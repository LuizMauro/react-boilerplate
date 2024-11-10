import { memo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BaseChartProps {
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
}

export const BaseChart = memo(({ data, options }: BaseChartProps) => {
  const defaultOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 150, // Reduzir duração da animação para melhor performance
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <Line
      data={data}
      options={{
        ...defaultOptions,
        ...options,
      }}
    />
  );
});

BaseChart.displayName = "BaseChart";
