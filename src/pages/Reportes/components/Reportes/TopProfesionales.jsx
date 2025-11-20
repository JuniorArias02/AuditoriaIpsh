import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function TopProfesionales({ data }) {
  return (
    <motion.div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Top Profesionales</h3>
      <div className="space-y-4">
        {data.map((prof, i) => (
          <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                i === 0 
                  ? "bg-yellow-100 dark:bg-yellow-900/30" 
                  : i === 1 
                  ? "bg-gray-100 dark:bg-gray-700" 
                  : "bg-blue-100 dark:bg-blue-900/30"
              }`}>
                {i === 0 ? (
                  <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                ) : (
                  <span className={`font-medium ${
                    i === 0 
                      ? "text-yellow-600 dark:text-yellow-400"
                      : i === 1
                      ? "text-gray-600 dark:text-gray-400"
                      : "text-blue-600 dark:text-blue-400"
                  }`}>
                    {i + 1}
                  </span>
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{prof.nombre}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{prof.total_auditorias} auditorías</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900 dark:text-white">{prof.promedio_cumplimiento}%</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}