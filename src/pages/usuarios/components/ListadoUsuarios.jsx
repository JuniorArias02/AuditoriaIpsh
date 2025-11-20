import { useState, useEffect } from "react";
import { UsuariosServices } from "../../../api/services/usuariosServices";
import { useAuth } from "../../../store/AuthContext";
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  User,
  Mail,
  Shield,
  CheckCircle,
  XCircle
} from "lucide-react";

function ListadoUsuarios() {
  const { token } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    cargarUsuarios();
  }, [token]);


  const cargarUsuarios = async () => {
    try {
      const usuariosServices = new UsuariosServices(token);
      const data = await usuariosServices.listarUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsuarios = usuarios.filter(usuario => {
    const matchesSearch = usuario.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || usuario.rol_nombre === filterRole;
    return matchesSearch && matchesRole;
  });

  const rolesUnicos = [...new Set(usuarios.map(u => u.rol_nombre))];

  const getRoleBadgeColor = (rol) => {
    const colors = {
      'admin': 'bg-red-100 text-red-800 border-red-200',
      'user': 'bg-blue-100 text-blue-800 border-blue-200',
      'auditor': 'bg-green-100 text-green-800 border-green-200',
      'medico': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[rol] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2068A6]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header de la tabla */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Usuarios</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Administra los usuarios del sistema de auditorías</p>
          </div>

          <button className="bg-[#2068A6] text-white px-4 py-2 rounded-lg hover:bg-[#1a568c] transition-colors flex items-center gap-2">
            <User className="w-4 h-4" />
            Nuevo Usuario
          </button>
        </div>

        {/* Filtros y búsqueda */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Todos los roles</option>
              {rolesUnicos.map(rol => (
                <option key={rol} value={rol}>{rol}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Información de Contacto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Fecha Creación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredUsuarios.map((usuario) => (
              <tr key={usuario.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                {/* Columna Usuario */}
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-[#2068A6] rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {usuario.nombre_completo}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        @{usuario.username}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Columna Información de Contacto */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {usuario.email}
                  </div>
                </td>

                {/* Columna Rol */}
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeColor(usuario.rol_nombre)} dark:bg-opacity-20`}>
                    <Shield className="w-3 h-3 mr-1" />
                    {usuario.rol_nombre}
                  </span>
                </td>

                {/* Columna Estado */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {usuario.activo ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-700 dark:text-green-400">Activo</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-700 dark:text-red-400">Inactivo</span>
                      </>
                    )}
                  </div>
                </td>

                {/* Columna Fecha Creación */}
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                  {new Date(usuario.created_at).toLocaleDateString('es-ES')}
                </td>

                {/* Columna Acciones */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="text-[#2068A6] hover:text-[#1a568c] dark:text-blue-400 dark:hover:text-blue-300 transition-colors p-1 rounded"
                      title="Editar usuario"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 rounded"
                      title="Eliminar usuario"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors p-1 rounded"
                      title="Más opciones"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer de la tabla */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            Mostrando <span className="font-medium text-gray-900 dark:text-white">{filteredUsuarios.length}</span> de{" "}
            <span className="font-medium text-gray-900 dark:text-white">{usuarios.length}</span> usuarios
          </div>
          <div className="flex items-center gap-4">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300">
              Anterior
            </button>
            <span className="text-sm">Página 1 de 1</span>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300">
              Siguiente
            </button>
          </div>
        </div>
      </div>

      {/* Estado vacío */}
      {filteredUsuarios.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {usuarios.length === 0 ? "No hay usuarios registrados" : "No se encontraron resultados"}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {usuarios.length === 0
              ? "Comienza agregando el primer usuario al sistema."
              : "Intenta con otros términos de búsqueda o filtros."
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default ListadoUsuarios;