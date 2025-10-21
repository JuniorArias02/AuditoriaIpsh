import { useState, useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { PacienteService } from "../../../api/services/pacienteServices";
import { useAuth } from "../../../store/AuthContext";
import { User, Calendar, Activity, IdCard, MoreVertical, Search } from "lucide-react";

function ListadoPacientes() {
  const { token } = useAuth();
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [total, setTotal] = useState(0);

  const pacienteService = new PacienteService(token);
  const parentRef = useRef();

  const cargarPacientes = async (query = "") => {
    try {
      setLoading(true);
      console.log(query);
      const res = await pacienteService.listarPacientes(query);
      console.log(res);
      if (res.success) {
        setPacientes(res.data);
        setTotal(res.total);
      } else {
        setPacientes([]);
        setTotal(0);
      }
    } catch (error) {
      console.error("Error cargando pacientes:", error);
    } finally {
      setLoading(false);
    }
  };

  // carga cada vez que cambie el filtro de búsqueda
  useEffect(() => {
    cargarPacientes(searchFilter);
  }, [searchFilter]);

  // Virtualización
  const rowVirtualizer = useVirtualizer({
    count: pacientes.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2068A6]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Pacientes</h2>
        <p className="text-gray-600 mt-1">
          Listado general de pacientes registrados en el sistema
        </p>

        {/* Búsqueda */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setSearchFilter(searchTerm)}
            className="px-4 py-2 bg-[#2068A6] text-white rounded hover:bg-[#14578B] transition"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Tabla virtualizada */}
      <div ref={parentRef} className="overflow-auto" style={{ height: "400px" }}>
        <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: "relative" }}>
          {virtualItems.map((virtualRow) => {
            const pac = pacientes[virtualRow.index];
            return (
              <div
                key={pac.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="flex px-6 py-4 border-b border-gray-200 hover:bg-gray-50"
              >
                <div className="flex-1 flex items-center gap-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-[#2068A6] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{pac.nombre_completo}</div>
                    <div className="text-sm text-gray-500 flex gap-2">
                      <IdCard className="w-4 h-4" /> {pac.documento || "—"}
                      <Calendar className="w-4 h-4" /> {pac.fecha_nacimiento ? new Date(pac.fecha_nacimiento).toLocaleDateString() : "—"}
                      <Activity className="w-4 h-4" /> {pac.eps_nombre || "Sin EPS"}
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        Mostrando <span className="font-medium">{pacientes.length}</span> de <span className="font-medium">{total}</span> pacientes
      </div>
    </div>
  );
}

export default ListadoPacientes;
