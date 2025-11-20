import { motion } from "framer-motion";

export default function CriteriosEvaluados({ data }) {
  return (
    <motion.div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Criterios Más Evaluados</h3>
      <div className="space-y-4">
        {data.map((c, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700 dark:text-gray-300">{c.criterio}</span>
              <span className="text-gray-900 dark:text-white font-medium">{c.cumplimiento}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${c.cumplimiento}%` }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className={`h-3 rounded-full ${
                  c.cumplimiento >= 90 
                    ? 'bg-green-500 dark:bg-green-600' 
                    : c.cumplimiento >= 80 
                    ? 'bg-blue-500 dark:bg-blue-600' 
                    : 'bg-yellow-500 dark:bg-yellow-600'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}