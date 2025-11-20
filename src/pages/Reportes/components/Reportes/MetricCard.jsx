import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function MetricCard({ icon: Icon, title, value, subtitle, trend }) {
  const trendValue = trend ? parseFloat(trend) : 0;
  const isPositive = trendValue > 0;
  const isNegative = trendValue < 0;

  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
  const trendColor = isPositive ? "green" : isNegative ? "red" : "gray";
  const trendText = isNegative ? `${Math.abs(trendValue)}%` : `${trend}%`;

  // Mapeo explícito de clases de color para Tailwind
  const trendColorClasses = {
    green: "text-green-600 dark:text-green-400",
    red: "text-red-600 dark:text-red-400",
    gray: "text-gray-600 dark:text-gray-400"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900 transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
        </div>
        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      {trend && (
        <div className={`flex items-center mt-4 ${trendColorClasses[trendColor]}`}>
          <TrendIcon className="w-4 h-4" />
          <span className="text-sm ml-1">{trendText}</span>
        </div>
      )}
    </motion.div>
  );
}