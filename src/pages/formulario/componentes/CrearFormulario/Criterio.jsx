import React from "react";
import { Trash2, Edit3 } from "lucide-react";

function Criterio({ criterio, onChangeDescripcion, onEliminar, dimensionId }) {
  return (
    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-200 group">
      <Edit3 size={16} className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
      
      <input
        type="text"
        placeholder="Descripción del criterio..."
        value={criterio.descripcion}
        onChange={(e) => onChangeDescripcion(dimensionId, criterio.id, e.target.value)}
        className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />
      
      <button 
        onClick={() => onEliminar(dimensionId, criterio.id)}
        className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white p-2 rounded transition-all duration-200"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

export default Criterio;