// CriterioItem.jsx - VERSIÓN CORREGIDA
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    GripVertical, 
    ChevronDown, 
    ChevronUp, 
    Trash2,
    ArrowUp,
    ArrowDown
} from "lucide-react";

function CriterioItem({ criterio, index, onChange, onRemove, onMoveUp, onMoveDown, totalCriterios }) {
    const [collapsed, setCollapsed] = useState(false);

    const handleChange = (field, value) => {
        onChange({ ...criterio, [field]: value });
    };

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <motion.div
            whileHover={{ x: 4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200/60 overflow-hidden"
        >
            {/* Header del Criterio */}
            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                        <div className="flex items-center gap-2 mt-1">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="text-gray-400 cursor-grab active:cursor-grabbing"
                            >
                                <GripVertical size={14} />
                            </motion.div>
                            <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-md flex items-center justify-center">
                                <span className="text-white text-xs font-bold">{index + 1}</span>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="mb-2">
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Descripción del Criterio
                                </label>
                                <textarea
                                    value={criterio.descripcion || ""}
                                    onChange={(e) => handleChange("descripcion", e.target.value)}
                                    rows={2}
                                    placeholder="Describe el criterio de evaluación..."
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white resize-none"
                                />
                            </div>
                            
                            {/* Orden - normalmente no se edita manualmente, pero por si acaso */}
                            <div className="flex items-center gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Orden
                                    </label>
                                    <input
                                        type="number"
                                        value={criterio.orden || index + 1}
                                        onChange={(e) => handleChange("orden", parseInt(e.target.value))}
                                        className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 ml-3">
                        {/* Botones de movimiento */}
                        <div className="flex flex-col gap-0.5">
                            {onMoveUp && (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onMoveUp}
                                    className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                                    title="Mover arriba"
                                >
                                    <ArrowUp size={12} />
                                </motion.button>
                            )}
                            {onMoveDown && (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onMoveDown}
                                    className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                                    title="Mover abajo"
                                >
                                    <ArrowDown size={12} />
                                </motion.button>
                            )}
                        </div>

                        {/* Botón eliminar */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onRemove}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Eliminar criterio"
                        >
                            <Trash2 size={14} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default CriterioItem;