import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

export default function GraficoTendencia({ data }) {
  const chartData = {
    labels: data.map(d => d.mes),
    datasets: [
      {
        label: "Cumplimiento (%)",
        data: data.map(d => d.promedio_cumplimiento),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3B82F6",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { min: 75, max: 100 },
      x: { grid: { display: false } },
    },
  };

  return (
    <motion.div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tendencia Mensual</h3>
        <BarChart3 className="w-5 h-5 text-gray-400 dark:text-gray-500" />
      </div>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </motion.div>
  );
}
