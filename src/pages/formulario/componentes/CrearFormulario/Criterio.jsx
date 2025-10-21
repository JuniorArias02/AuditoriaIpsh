import React from "react";
import { Trash2, Edit3 } from "lucide-react";

function Criterio({ criterio, onChangeDescripcion, onEliminar, dimensionId }) {
  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-indigo-300 transition-all duration-200 group">
      <Edit3 size={16} className="text-gray-400 flex-shrink-0" />
      
      <input
        type="text"
        placeholder="Descripción del criterio..."
        value={criterio.descripcion}
        onChange={(e) => onChangeDescripcion(dimensionId, criterio.id, e.target.value)}
        className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
      />
      
      <button 
        onClick={() => onEliminar(dimensionId, criterio.id)}
        className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-all duration-200"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

export default Criterio;