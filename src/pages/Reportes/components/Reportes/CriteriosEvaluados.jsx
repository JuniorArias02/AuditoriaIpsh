import { motion } from "framer-motion";

export default function CriteriosEvaluados({ data }) {
  return (
    <motion.div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Criterios Más Evaluados</h3>
      <div className="space-y-4">
        {data.map((c, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-2">
              <span>{c.criterio}</span>
              <span>{c.cumplimiento}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${c.cumplimiento}%` }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className={`h-3 rounded-full ${c.cumplimiento >= 90 ? 'bg-green-500' : c.cumplimiento >= 80 ? 'bg-blue-500' : 'bg-yellow-500'}`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
