// CriteriosList.jsx - VERSIÓN CORREGIDA
import { useState } from "react";
import CriterioItem from "./CriterioItem";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ListChecks } from "lucide-react";

function CriteriosList({ criterios, setCriterios }) {
    const addCriterio = () => {
        setCriterios([
            ...criterios,
            { 
                id: null, 
                descripcion: "",
                orden: criterios.length + 1
            },
        ]);
    };

    const removeCriterio = (index) => {
        setCriterios(criterios.filter((_, i) => i !== index));
    };

    const updateCriterio = (index, updated) => {
        const newCriterios = [...criterios];
        newCriterios[index] = updated;
        setCriterios(newCriterios);
    };

    const moveCriterio = (fromIndex, toIndex) => {
        const newCriterios = [...criterios];
        const [movedCriterio] = newCriterios.splice(fromIndex, 1);
        newCriterios.splice(toIndex, 0, movedCriterio);
        // Actualizar órdenes automáticamente
        newCriterios.forEach((criterio, index) => {
            criterio.orden = index + 1;
        });
        setCriterios(newCriterios);
    };

    return (
        <div className="space-y-4">
            {/* Header de Criterios */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <ListChecks className="text-green-600" size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Criterios de Evaluación</h3>
                        <p className="text-sm text-gray-600">
                            {criterios.length} criterio{criterios.length !== 1 ? 's' : ''} configurado{criterios.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
                
                <motion.button 
                    onClick={addCriterio}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                    <Plus size={16} />
                    Agregar Criterio
                </motion.button>
            </div>

            {/* Lista de Criterios */}
            <AnimatePresence>
                <div className="space-y-3">
                    {criterios.map((criterio, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, height: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                            <CriterioItem
                                criterio={criterio}
                                index={i}
                                onChange={(updated) => updateCriterio(i, updated)}
                                onRemove={() => removeCriterio(i)}
                                onMoveUp={i > 0 ? () => moveCriterio(i, i - 1) : null}
                                onMoveDown={i < criterios.length - 1 ? () => moveCriterio(i, i + 1) : null}
                                totalCriterios={criterios.length}
                            />
                        </motion.div>
                    ))}
                </div>
            </AnimatePresence>

            {/* Estado vacío */}
            {criterios.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 bg-white/50 rounded-xl border-2 border-dashed border-gray-300"
                >
                    <ListChecks className="mx-auto text-gray-400 mb-3" size={32} />
                    <h4 className="text-base font-semibold text-gray-600 mb-1">
                        No hay criterios configurados
                    </h4>
                    <p className="text-gray-500 text-sm">
                        Agrega criterios para evaluar esta dimensión
                    </p>
                </motion.div>
            )}
        </div>
    );
}

export default CriteriosList;