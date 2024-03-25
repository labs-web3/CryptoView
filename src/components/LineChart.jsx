import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function LineChart({ data }) {
  const chartData = {
    labels: data.map((entry) => entry.time),
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
  return (
    <>
      <Line data={chartData} />
    </>
  );
}
