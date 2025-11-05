import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function TopProfesionales({ data }) {
  return (
    <motion.div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Profesionales</h3>
      <div className="space-y-4">
        {data.map((prof, i) => (
          <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                i === 0 ? "bg-yellow-100" : i === 1 ? "bg-gray-100" : "bg-blue-100"
              }`}>
                {i === 0 ? <Star className="w-5 h-5 text-yellow-600" /> : <span>{i + 1}</span>}
              </div>
              <div>
                <p className="font-medium">{prof.nombre}</p>
                <p className="text-sm text-gray-500">{prof.total_auditorias} auditorías</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{prof.promedio_cumplimiento}%</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
