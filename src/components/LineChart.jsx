import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
ChartJS.defaults.scale.border.display = false;

export default function LineChart({ data }) {
  const hourlyLabels = data
    .filter((entry, index) => index % 2 === 0)
    .map((entry) => entry.time);

  const chartData = {
    labels: hourlyLabels,
    datasets: [
      {
        label: "Valeur Crypto",
        data: data.map((entry) => entry.value),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };
  return (
    <>
      <Line data={chartData} options={chartOptions} />
    </>
  );
}
