import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

// Création d'un plugin pour dessiner une ligne verticale
const verticalLinePlugin = {
  id: "verticalLineOnTooltip",
  afterDraw: (chart) => {
    if (chart.tooltip.getActiveElements().length > 0) {
      const ctx = chart.ctx;
      const tooltipElement = chart.tooltip.getActiveElements()[0];
      const x = tooltipElement.element.x;
      const yAxis = chart.scales.y;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, yAxis.top);
      ctx.lineTo(x, yAxis.bottom);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0, 0, 255, 0.4)";
      ctx.stroke();
      ctx.restore();
    }
  },
};

ChartJS.register(verticalLinePlugin);

export default function LineChart({ data }) {
  const hourlyLabels = data.map((entry) => entry.time);
  const chartData = {
    labels: hourlyLabels,
    datasets: [
      {
        label: "Valeur Crypto",
        data: data.map((entry) => entry.value.toFixed(5)),
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
        fill: false,
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

  return <Line data={chartData} options={chartOptions} />;
}
