import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FolderOpen,
    FileText,
    Edit3,
    Download,
    Trash2,
    Search,
    Filter,
    Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FormularioAuditoriaService } from "../../../api/services/formularioAuditoriaServices";
import { useAuth } from "../../../store/AuthContext";
import PAGES_ROUTES from "../../../routes/routers";


// Animaciones
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    },
    hover: {
        y: -5,
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 17
        }
    },
    tap: {
        scale: 0.98,
        y: 0
    }
};

const loadingVariants = {
    animate: {
        rotate: 360,
        transition: {
            rotate: {
                repeat: Infinity,
                duration: 1,
                ease: "linear"
            }
        }
    }
};

const searchVariants = {
    focus: {
        scale: 1.02,
        boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)",
        transition: { type: "spring", stiffness: 400 }
    }
};

function VistaFormulariosAuditorias() {
    const { token } = useAuth();
    const formularioService = new FormularioAuditoriaService(token);
    const [formularios, setFormularios] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerFormularios = async () => {
            try {
                setLoading(true);
                const res = await formularioService.listarFormularioAuditoria();
                if (res.success) {
                    setFormularios(res.data);
                } else {
                    console.error("Error al obtener formularios:", res);
                }
            } catch (err) {
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };
        obtenerFormularios();
    }, []);

    const filtrarFormularios = formularios.filter(formulario =>
        formulario.nombre_formulario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formulario.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const irAEditar = (id) => {
        navigate(PAGES_ROUTES.FORMULARIO.EDITAR, { state: { id } });
    };


    const descargarFormulario = (id, nombre) => {
        // Implementar descarga
        console.log(`Descargando formulario ${id}: ${nombre}`);
    };

    const eliminarFormulario = async (id, nombre) => {
        if (window.confirm(`¿Estás seguro de eliminar el formulario "${nombre}"?`)) {
            try {
                await formularioService.eliminarFormularioAuditoria(id);
                setFormularios(prev => prev.filter(f => f.id !== id));
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };

    const crearNuevoFormulario = () => {
        navigate(PAGES_ROUTES.FORMULARIO.CREAR);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    variants={loadingVariants}
                    animate="animate"
                    className="rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto">
                {/* Header con animación */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
                >
                    <div className="flex items-center gap-3">
                        <motion.div
                            className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg"
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FolderOpen className="text-indigo-600 dark:text-indigo-400" size={32} />
                        </motion.div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                                Formularios de Auditoría Médica
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Gestiona y revisa los formularios de auditoría
                            </p>
                        </div>
                    </div>

                    <motion.button
                        onClick={crearNuevoFormulario}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors shadow-lg"
                    >
                        <Plus size={20} />
                        Nuevo Formulario
                    </motion.button>
                </motion.div>

                {/* Barra de búsqueda con animación */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-none p-4 mb-6"
                >
                    <div className="flex flex-col sm:flex-row gap-4">
                        <motion.div
                            className="flex-1 relative"
                            variants={searchVariants}
                            whileFocus="focus"
                        >
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar formularios..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                        </motion.div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                            <Filter size={20} />
                            Filtros
                        </motion.button>
                    </div>
                </motion.div>

                {/* Grid de formularios con animaciones stagger */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={searchTerm}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                    >
                        <AnimatePresence>
                            {filtrarFormularios.map((formulario) => (
                                <motion.div
                                    key={formulario.id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{
                                        opacity: 0,
                                        scale: 0.8,
                                        transition: { duration: 0.3 }
                                    }}
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={() => irAEditar(formulario.id)}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
                                >
                                    {/* Header de la tarjeta */}
                                    <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                                        <div className="flex items-start justify-between mb-3">
                                            <motion.div
                                                className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg"
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                            >
                                                <FileText className="text-blue-600 dark:text-blue-400" size={24} />
                                            </motion.div>
                                            <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                                                ID: {formulario.id}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-2 line-clamp-2">
                                            {formulario.nombre_formulario}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                                            {formulario.descripcion || "Sin descripción"}
                                        </p>
                                    </div>

                                    {/* Acciones */}
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex justify-between">
                                        <motion.button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                irAEditar(formulario.id);
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium"
                                        >
                                            <Edit3 size={16} />
                                            Editar
                                        </motion.button>

                                        <div className="flex gap-3">
                                            <motion.button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    descargarFormulario(formulario.id, formulario.nombre_formulario);
                                                }}
                                                whileHover={{ scale: 1.2, y: -2 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                                title="Descargar"
                                            >
                                                <Download size={16} />
                                            </motion.button>
                                            <motion.button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    eliminarFormulario(formulario.id, formulario.nombre_formulario);
                                                }}
                                                whileHover={{ scale: 1.2, y: -2 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                                title="Eliminar"
                                            >
                                                <Trash2 size={16} />
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </AnimatePresence>

                {/* Estados vacío con animación */}
                <AnimatePresence>
                    {filtrarFormularios.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center py-12"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-none p-8 max-w-md mx-auto">
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        transition: {
                                            repeat: Infinity,
                                            duration: 2,
                                            ease: "easeInOut"
                                        }
                                    }}
                                >
                                    <FileText className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={48} />
                                </motion.div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                    {searchTerm ? "No se encontraron formularios" : "No hay formularios"}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {searchTerm
                                        ? "Intenta con otros términos de búsqueda"
                                        : "Comienza creando tu primer formulario de auditoría"
                                    }
                                </p>
                                {!searchTerm && (
                                    <motion.button
                                        onClick={crearNuevoFormulario}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors shadow-lg"
                                    >
                                        Crear Primer Formulario
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default VistaFormulariosAuditorias;