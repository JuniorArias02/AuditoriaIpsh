import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";

export default function GraficoServicios({ data }) {
  const colores = [
    "#60A5FA", // azul
    "#34D399", // verde
    "#FBBF24", // amarillo
    "#F87171", // rojo
    "#A78BFA", // violeta
    "#F472B6", // rosa
    "#2DD4BF"  // turquesa
  ];

  const chartData = {
    labels: data.map(s => s.servicio),
    datasets: [
      {
        label: "Cumplimiento (%)",
        data: data.map(s => parseFloat(s.promedio_cumplimiento)),
        backgroundColor: data.map((_, i) => colores[i % colores.length]),
        borderRadius: 8,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => value + "%",
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: context => `${context.raw}%`,
        },
      },
    },
  };

  return (
    <motion.div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Auditorías por Servicio
      </h3>
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
    </motion.div>
  );
}
