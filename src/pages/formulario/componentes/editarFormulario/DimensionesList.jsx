// DimensionesList.jsx
import { useState } from "react";
import DimensionItem from "./DimensionItem";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Layers } from "lucide-react";

function DimensionesList({ dimensiones, setDimensiones }) {
    const addDimension = () => {
        setDimensiones([
            ...dimensiones,
            {
                id: null,
                nombre: "",
                orden: dimensiones.length + 1,
                porcentaje: 0,
                criterios: [],
                collapsed: false
            },
        ]);
    };

    const removeDimension = (index) => {
        setDimensiones(dimensiones.filter((_, i) => i !== index));
    };

    const updateDimension = (index, updated) => {
        const newDims = [...dimensiones];
        newDims[index] = updated;
        setDimensiones(newDims);
    };

    const moveDimension = (fromIndex, toIndex) => {
        const newDims = [...dimensiones];
        const [movedDim] = newDims.splice(fromIndex, 1);
        newDims.splice(toIndex, 0, movedDim);
        // Actualizar órdenes
        newDims.forEach((dim, index) => {
            dim.orden = index + 1;
        });
        setDimensiones(newDims);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <Layers className="text-indigo-600 dark:text-indigo-400" size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Dimensiones de Auditoría</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Organiza las dimensiones y sus criterios de evaluación</p>
                    </div>
                </div>

                <motion.button
                    onClick={addDimension}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white px-4 py-3 rounded-xl shadow-lg dark:shadow-gray-900 hover:shadow-xl transition-all"
                >
                    <Plus size={18} />
                    Agregar Dimensión
                </motion.button>
            </div>

            <AnimatePresence>
                <div className="space-y-4">
                    {dimensiones.map((dim, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <DimensionItem
                                dimension={dim}
                                index={i}
                                onChange={(updated) => updateDimension(i, updated)}
                                onRemove={() => removeDimension(i)}
                                onMoveUp={i > 0 ? () => moveDimension(i, i - 1) : null}
                                onMoveDown={i < dimensiones.length - 1 ? () => moveDimension(i, i + 1) : null}
                                totalDimensions={dimensiones.length}
                            />
                        </motion.div>
                    ))}
                </div>
            </AnimatePresence>

            {dimensiones.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 bg-white/50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600"
                >
                    <Layers className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={48} />
                    <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        No hay dimensiones configuradas
                    </h3>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                        Comienza agregando tu primera dimensión de auditoría
                    </p>
                </motion.div>
            )}
        </div>
    );
}

export default DimensionesList;