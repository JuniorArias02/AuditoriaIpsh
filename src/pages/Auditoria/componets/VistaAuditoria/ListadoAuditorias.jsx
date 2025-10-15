import React, { useEffect, useState } from "react";
import { Eye, Edit, Trash2, Download, AlertCircle, CheckCircle, MinusCircle, FileText, Filter } from "lucide-react";
import { useAuth } from "../../../../store/AuthContext";
import { AuditoriaServices } from "../../../../api/services/auditoriaServices";
import { useNavigate } from "react-router-dom";
import PAGES_ROUTES from "../../../../routes/routers";
const ListadoAuditorias = ({ auditoriasExternas }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const auditoriaServices = new AuditoriaServices(token);
  const [auditorias, setAuditorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si recibimos auditorías filtradas, las mostramos directamente
    if (auditoriasExternas.length > 0) {
      setAuditorias(auditoriasExternas);
      setLoading(false);
      return;
    }

    // Si no hay filtros aplicados, cargamos todas
    const obtenerAuditorias = async () => {
      try {
        const res = await auditoriaServices.listarAuditorias();
        setAuditorias(res || []);
      } catch (err) {
        console.error(err);
        setError("Error al cargar auditorías");
      } finally {
        setLoading(false);
      }
    };

    obtenerAuditorias();
  }, [auditoriasExternas]);

  const getClasificacion = (porcentaje) => {
    const valor = parseFloat(porcentaje);
    if (valor >= 95)
      return { label: "Satisfactoria", icon: <CheckCircle className="w-4 h-4 text-green-600" />, classes: "border-green-300 text-green-700 bg-green-50" };
    if (valor >= 85)
      return { label: "Aceptable", icon: <MinusCircle className="w-4 h-4 text-yellow-600" />, classes: "border-yellow-300 text-yellow-700 bg-yellow-50" };
    return { label: "Inaceptable", icon: <AlertCircle className="w-4 h-4 text-red-600" />, classes: "border-red-300 text-red-700 bg-red-50" };
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
    <div className="p-6 bg-gray-50 h-full max-h-9/10 bg-white rounded-lg
    ">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="p-2 bg-blue-50 rounded-lg border border-blue-100 mr-3">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Lista de Auditorías</h1>
            <p className="text-sm text-gray-500 mt-1">
              {auditorias.length} auditoría{auditorias.length !== 1 ? 's' : ''} registrada{auditorias.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          {/* <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filtrar
          </button> */}
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Paciente", "Fecha Auditoría", "Auditor", "Servicio", "Puntaje", "Clasificación", "Acciones"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {auditorias.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-12 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-lg font-medium text-gray-400">No hay auditorías registradas</p>
                  <p className="text-sm text-gray-500 mt-1">Las auditorías aparecerán aquí una vez creadas</p>
                </td>
              </tr>
            ) : (
              auditorias.map((a) => {
                const clasificacion = getClasificacion(a.porcentaje_cumplimiento);
                return (
                  <tr key={a.id} className="hover:bg-gray-50/80 transition-colors duration-150">
                    {/* Paciente */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">{a.pacienteNombre}</div>
                      <div className="text-xs text-gray-500 mt-1">Doc: {a.pacienteDocumento}</div>
                    </td>

                    {/* Fecha */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">{a.fecha_auditoria}</div>
                    </td>

                    {/* Auditor */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">{a.auditor}</div>
                    </td>

                    {/* Servicio */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">{a.servicioAuditar}</div>
                    </td>

                    {/* Puntaje */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900">{a.puntaje_total} / {a.total_criterios}</div>
                      <div className="text-xs text-gray-500">{parseFloat(a.porcentaje_cumplimiento).toFixed(1)}%</div>
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
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                          title="Ver detalle"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-150"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-150"
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