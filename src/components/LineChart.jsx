import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

// Assurez-vous de bien enregistrer Tooltip également
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

export default function LineChart({ data }) {
  const hourlyLabels = data.map((entry) => entry.time);

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
          display: true,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
    },
  };

  return (
    <>
      <Line data={chartData} options={chartOptions} />
    </>
  );
}
