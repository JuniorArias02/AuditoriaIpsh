import React from "react";
import { Plus, Trash2, ListChecks } from "lucide-react";
import Criterio from "./Criterio";

function Dimension({ 
  dimension, 
  onChangeNombre, 
  onChangePorcentaje, 
  onAgregarCriterio, 
  onEliminarCriterio, 
  onChangeDescripcion, 
  onEliminarDimension 
}) {
  return (
    <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 hover:border-indigo-300 transition-all duration-200 bg-gray-50">
      {/* Dimension Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Nombre de la dimensión"
            value={dimension.nombre}
            onChange={(e) => onChangeNombre(dimension.id, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="number"
              placeholder="%"
              min="0"
              max="100"
              value={dimension.porcentaje}
              onChange={(e) => onChangePorcentaje(dimension.id, e.target.value)}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
          </div>
          
          <button 
            onClick={() => onAgregarCriterio(dimension.id)}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-all"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Criterio</span>
          </button>
          
          <button 
            onClick={() => onEliminarDimension(dimension.id)}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Criterios Section */}
      {dimension.criterios.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-3 text-gray-600">
            <ListChecks size={16} />
            <span className="text-sm font-medium">Criterios ({dimension.criterios.length})</span>
          </div>
          
          <div className="space-y-2">
            {dimension.criterios.map((c) => (
              <Criterio
                key={c.id}
                criterio={c}
                onChangeDescripcion={onChangeDescripcion}
                onEliminar={onEliminarCriterio}
                dimensionId={dimension.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dimension;