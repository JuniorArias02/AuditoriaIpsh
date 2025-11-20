import { Doughnut } from "react-chartjs-2";
import { PieChart } from "lucide-react";
import { motion } from "framer-motion";

export default function GraficoDimension({ data }) {
  const colores = [
    "#60A5FA", // azul claro
    "#3B82F6", // azul
    "#2563EB", // azul oscuro
    "#34D399", // verde claro
    "#10B981", // verde
    "#059669", // verde oscuro
    "#FBBF24", // amarillo
    "#F59E0B", // ámbar
    "#D97706", // ámbar oscuro
    "#F87171", // rojo claro
    "#EF4444", // rojo
    "#DC2626", // rojo oscuro
    "#A78BFA", // violeta
    "#8B5CF6", // violeta medio
    "#7C3AED", // violeta oscuro
    "#F472B6", // rosa
    "#EC4899", // rosa medio
    "#DB2777", // rosa oscuro
    "#2DD4BF", // turquesa
    "#14B8A6", // turquesa medio
    "#0D9488", // turquesa oscuro
    "#6366F1", // índigo
    "#4F46E5", // índigo medio
    "#4338CA", // índigo oscuro
    "#F97316", // naranja
    "#EA580C", // naranja medio
    "#C2410C"  // naranja oscuro
  ];

  const chartData = {
    labels: data.map(d => d.dimension),
    datasets: [
      {
        data: data.map(d => parseFloat(d.promedio_cumplimiento)),
        backgroundColor: data.map((_, i) => colores[i % colores.length]),
        borderColor: "#fff",
        borderWidth: 2,
        cutout: "65%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 15,
          boxWidth: 12,
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10
      }
    }
  };

  return (
    <motion.div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700 w-full">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          Cumplimiento por Dimensión
        </h3>
        <PieChart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500" />
      </div>

      {/* Contenedor responsive para el gráfico */}
      <div className="relative w-full" style={{ height: "clamp(250px, 40vh, 400px)" }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </motion.div>
  );
}