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
      const y = tooltipElement.element.y;

      // Sauvegarder le contexte pour restaurer après modifications
      ctx.save();

      // Dessiner la ligne verticale
      ctx.beginPath();
      ctx.moveTo(x, chart.scales.y.top);
      ctx.lineTo(x, chart.scales.y.bottom);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(128,128,128)";
      ctx.stroke();

      // Dessiner un cercle
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();

      // Restaurer le contexte
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
        label: "Cours",
        data: data.map((entry) => entry.value.toFixed(5)),
        borderColor: "rgba(220,58,51)",
        tension: 0,
        pointRadius: 0,
        fill: {
          target: "origin",
          above: "rgb(220,58,51,0.4)",
        },
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
