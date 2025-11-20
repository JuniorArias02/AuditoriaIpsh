import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../store/AuthContext";
import { FormularioAuditoriaService } from "../../../api/services/formularioAuditoriaServices";
import DimensionesList from "../componentes/editarFormulario/DimensionesList";
import {
    ArrowLeft,
    Save,
    Download,
    Settings,
    Eye,
    Plus,
    Trash2,
    GripVertical,
    ChevronDown,
    ChevronUp,
    BarChart3,
    Target
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

function EditarFormulario() {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state?.id;

    const { token } = useAuth();
    const formularioService = new FormularioAuditoriaService(token);

    const [formulario, setFormulario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState("dimensiones");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await formularioService.obtenerFormularioAuditoriaPorId(id);
                setFormulario(data.data);
            } catch (error) {
                console.error("Error fetching form:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (field, value) => {
        setFormulario((prev) => ({ ...prev, [field]: value }));
    };

    const handleGuardar = async () => {
        setSaving(true);
        try {
            const res = await formularioService.actualizarFormulario(formulario);
            if (res.success) {
                Swal.fire({
                    icon: "success",
                    title: "Formulario actualizado 🎉",
                    text: "Los cambios se guardaron correctamente",
                    confirmButtonColor: "#2563eb", // azul bonito
                }).then(() => navigate(-1));
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Algo salió mal 😕",
                    text: "Hubo un problema al guardar el formulario",
                    confirmButtonColor: "#f59e0b",
                });
            }
        } catch (error) {
            console.error("❌ Error al guardar:", error);
            Swal.fire({
                icon: "error",
                title: "Error al guardar",
                text: "Ocurrió un error en el servidor o la conexión",
                confirmButtonColor: "#dc2626",
            });
        } finally {
            setSaving(false);
        }
    };



    const calcularPorcentajeTotal = () => {
        return formulario?.dimensiones?.reduce((sum, dim) => sum + (parseFloat(dim.porcentaje) || 0), 0) || 0;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando formulario...</p>
                </div>
            </div>
        );
    }

    if (!formulario) return <div>Error al cargar el formulario</div>;

    const porcentajeTotal = calcularPorcentajeTotal();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200/60 dark:border-gray-700/60 sticky top-0 z-50"
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate(-1)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
                            >
                                <ArrowLeft size={20} />
                            </motion.button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Editar Formulario
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {formulario.nombre_formulario || "Sin nombre"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                            >
                                <Eye size={16} />
                                Vista Previa
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                            >
                                <Download size={16} />
                                Exportar
                            </motion.button>

                            <motion.button
                                onClick={handleGuardar}
                                disabled={saving || porcentajeTotal !== 100}
                                whileHover={{ scale: saving ? 1 : 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${saving || porcentajeTotal !== 100
                                    ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-gray-600 dark:text-gray-400"
                                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-700 dark:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white shadow-lg hover:shadow-xl"
                                    }`}
                            >
                                <Save size={16} />
                                {saving ? "Guardando..." : "Guardar Cambios"}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Información General */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-none border border-gray-200/60 dark:border-gray-700/60 p-6 mb-8"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                Nombre del Formulario
                            </label>
                            <input
                                value={formulario.nombre_formulario}
                                onChange={(e) => handleChange("nombre_formulario", e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                placeholder="Ej: Auditoría de Calidad Médica 2025"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                Descripción
                            </label>
                            <textarea
                                value={formulario.descripcion}
                                onChange={(e) => handleChange("descripcion", e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                                placeholder="Describe el propósito y alcance de este formulario de auditoría..."
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Panel de Control */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-none border border-gray-200/60 dark:border-gray-700/60 p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <BarChart3 className="text-blue-600 dark:text-blue-400" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Porcentaje Total</p>
                                    <p className={`text-lg font-bold ${porcentajeTotal === 100 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                        }`}>
                                        {porcentajeTotal}%
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-none border border-gray-200/60 dark:border-gray-700/60 p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                    <Target className="text-green-600 dark:text-green-400" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Dimensiones</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                        {formulario.dimensiones?.length || 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {porcentajeTotal !== 100 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3"
                        >
                            <p className="text-red-700 dark:text-red-300 text-sm font-medium">
                                ⚠️ El porcentaje total debe ser 100%. Actual: {porcentajeTotal}%
                            </p>
                        </motion.div>
                    )}
                </div>

                {/* Dimensiones */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <DimensionesList
                        dimensiones={formulario.dimensiones}
                        setDimensiones={(dims) =>
                            setFormulario((prev) => ({ ...prev, dimensiones: dims }))
                        }
                    />
                </motion.div>
            </div>
        </div>
    );
}

export default EditarFormulario;