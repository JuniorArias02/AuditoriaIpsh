import { SettingServices } from '../../../api/services/settingServices';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../store/AuthContext';
import getColorClasses from './getColorClasses';
import opcionesNotificaciones from './opcionesNotificaciones';
function NotificacionesSettings() {
  const { token } = useAuth();
  const [notificaciones, setNotificaciones] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      try {
        const service = new SettingServices(token);
        const data = await service.obtenerConfigNotificacion();

        if (data?.notificaciones) {
          setNotificaciones(data.notificaciones);
        }

      } catch (err) {
        console.error("Error cargando notificaciones:", err);
      }
    };

    load();
  }, [token]);



  useEffect(() => {

    if (!token) return;

    const guardar = async () => {
      try {
        const service = new SettingServices(token);
        await service.actualizarNotificaciones({
          notificaciones: JSON.stringify(notificaciones)
        });
      } catch (err) {
        console.error("Error guardando:", err);
      }
    };

    guardar();
  }, [notificaciones]);


  const guardarPreferencias = async () => {
    try {
      const service = new SettingServices(token);

      await service.actualizarNotificaciones({
        notificaciones: JSON.stringify(notificaciones)
      });

    } catch (err) {
      console.error("Error guardando:", err);
      alert("Error guardando preferencias");
    }
  };



  const handleToggleNotificacion = (id) => {
    setNotificaciones(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };


  if (!notificaciones) {
    return <div>Cargando notificaciones...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            Notificaciones
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Controla qué notificaciones deseas recibir
          </p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
          <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.93 4.93l9.07 9.07-9.07 9.07L4.93 4.93z" />
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        {opcionesNotificaciones.map((opcion) => {
          const isActive = notificaciones[opcion.id];
          const colorClasses = getColorClasses(opcion.color, isActive);

          return (
            <div
              key={opcion.id}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-sm ${colorClasses.bg} ${colorClasses.border}`}
              onClick={() => handleToggleNotificacion(opcion.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-lg ${colorClasses.bg} border ${colorClasses.border}`}>
                    <div className={colorClasses.icon}>
                      {opcion.icono}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-medium ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                        {opcion.nombre}
                      </h4>
                      {opcion.esBeta && (
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
                          BETA
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {opcion.descripcion}
                    </p>
                  </div>
                </div>

                {/* Checkbox personalizado */}
                <div className="ml-4 flex-shrink-0">
                  <div className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${isActive
                    ? 'bg-green-500 dark:bg-green-600'
                    : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${isActive ? 'left-5' : 'left-1'
                      }`} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumen de selección */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Notificaciones activas: {Object.values(notificaciones).filter(Boolean).length} de {opcionesNotificaciones.length}
          </span>

        </div>
      </div>
    </div>
  );
}

export default NotificacionesSettings;