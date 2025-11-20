// DimensionItem.jsx - VERSIÓN SIMPLIFICADA
import { useState } from "react";
import CriteriosList from "./CriteriosList";
import { motion } from "framer-motion";
import {
    GripVertical,
    Trash2,
    ArrowUp,
    ArrowDown
} from "lucide-react";

function DimensionItem({ dimension, index, onChange, onRemove, onMoveUp, onMoveDown, totalDimensions }) {
    const [collapsed, setCollapsed] = useState(false);

    const handleChange = (field, value) => {
        onChange({ ...dimension, [field]: value });
    };

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-none border border-gray-200/60 dark:border-gray-700/60 overflow-hidden"
        >
            {/* Header de la Dimensión */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                        <div className="flex items-center gap-2 mt-1">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="text-gray-400 dark:text-gray-500 cursor-grab active:cursor-grabbing"
                            >
                                <GripVertical size={16} />
                            </motion.div>
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm font-bold">{index + 1}</span>
                            </div>
                        </div>

                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="lg:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Nombre de la Dimensión
                                </label>
                                <input
                                    value={dimension.nombre || ""}
                                    onChange={(e) => handleChange("nombre", e.target.value)}
                                    placeholder="Ej: Seguridad del Paciente, Calidad Técnica..."
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Porcentaje (%)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        value={dimension.porcentaje || 0}
                                        onChange={(e) => handleChange("porcentaje", parseFloat(e.target.value))}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-12"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                        {/* Botones de movimiento */}
                        <div className="flex flex-col gap-1">
                            {onMoveUp && (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onMoveUp}
                                    className="p-1 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                    title="Mover arriba"
                                >
                                    <ArrowUp size={14} />
                                </motion.button>
                            )}
                            {onMoveDown && (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onMoveDown}
                                    className="p-1 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                    title="Mover abajo"
                                >
                                    <ArrowDown size={14} />
                                </motion.button>
                            )}
                        </div>

                        {/* Botón eliminar */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onRemove}
                            className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                            title="Eliminar dimensión"
                        >
                            <Trash2 size={16} />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Criterios - Siempre visibles */}
            <div className="p-6 bg-gray-50/50 dark:bg-gray-700/30">
                <CriteriosList
                    criterios={dimension.criterios || []}
                    setCriterios={(criterios) => onChange({ ...dimension, criterios })}
                />
            </div>
        </motion.div>
    );
}

export default DimensionItem;