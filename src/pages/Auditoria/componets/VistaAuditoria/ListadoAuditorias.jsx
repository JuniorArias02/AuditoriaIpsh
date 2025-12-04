import React, { useEffect, useState } from "react";
import { Eye, Edit, Trash2, Download, AlertCircle, CheckCircle, MinusCircle, FileText, Filter } from "lucide-react";
import { useAuth } from "../../../../store/AuthContext";
import { AuditoriaServices } from "../../../../api/services/auditoriaServices";
import { useNavigate } from "react-router-dom";
import PAGES_ROUTES from "../../../../routes/routers";
import getClasificacion from "./getClasificacion";
import Swal from "sweetalert2";

const ListadoAuditorias = ({ auditoriasExternas }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const auditoriaServices = new AuditoriaServices(token);
  const [auditorias, setAuditorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    if (auditoriasExternas.length > 0) {
      setAuditorias(auditoriasExternas);
      setLoading(false);
      return;
    }


    const obtenerAuditorias = async () => {
      try {
        const service = new AuditoriaServices(token);
        const res = await auditoriaServices.listarAuditorias();
        setAuditorias(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Error al cargar auditorías");
      } finally {
        setLoading(false);
      }
    };

    obtenerAuditorias();
  }, [token, auditoriasExternas]);


  const handleEliminarAuditoria = async (auditoria) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará la auditoría #${auditoria.id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await auditoriaServices.eliminarAuditoria(auditoria.id);

      await Swal.fire({
        icon: "success",
        title: "Eliminada",
        text: "La auditoría fue eliminada correctamente",
        timer: 1800,
        showConfirmButton: false,
      });

      setAuditorias((prev) => prev.filter((a) => a.id !== auditoria.id));
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Error al eliminar auditoría";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMsg,
        confirmButtonColor: "#3085d6",
      });
    }
  };

  if (loading) {
    return (
      <div className="p-5 text-center text-gray-600">
        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        Cargando auditorías...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 text-center text-red-600">
        <AlertCircle className="w-5 h-5 inline mr-1" /> {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 h-full max-h-9/10 bg-white dark:bg-gray-800 rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800 mr-3">
            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Lista de Auditorías</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {auditorias.length} auditoría{auditorias.length !== 1 ? 's' : ''} registrada{auditorias.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          {/* <button className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filtrar
          </button> */}
          <button className="flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-none overflow-hidden border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {["Paciente", "Fecha Auditoría", "Auditor", "Servicio", "Puntaje", "Clasificación", "Acciones"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
            {auditorias.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p className="text-lg font-medium text-gray-400 dark:text-gray-500">No hay auditorías registradas</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Las auditorías aparecerán aquí una vez creadas</p>
                </td>
              </tr>
            ) : (
              auditorias.map((a) => {
                const clasificacion = getClasificacion(a.porcentaje_cumplimiento);
                return (
                  <tr key={a.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-150">
                    {/* Paciente */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{a.pacienteNombre}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Doc: {a.pacienteDocumento}</div>
                    </td>

                    {/* Fecha */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{a.fecha_auditoria}</div>
                    </td>

                    {/* Auditor */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{a.auditor}</div>
                    </td>

                    {/* Servicio */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{a.servicioAuditar}</div>
                    </td>

                    {/* Puntaje */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{a.puntaje_total} / {a.total_criterios}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{parseFloat(a.porcentaje_cumplimiento).toFixed(1)}%</div>
                    </td>

                    {/* Clasificación */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full border ${clasificacion.classes}`}
                      >
                        {clasificacion.icon}
                        <span className="ml-1.5">{clasificacion.label}</span>
                      </span>
                    </td>

                    {/* Acciones */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => navigate(PAGES_ROUTES.AUDITORIA.DETALLE_AUDITORIA, { state: { auditoria: a } })}
                          className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-150"
                          title="Ver detalle"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {/* <button
                          className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-150"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button> */}
                        <button
                          onClick={() => handleEliminarAuditoria(a)}
                          className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-150"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors duration-150"
                          title="Descargar"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListadoAuditorias;