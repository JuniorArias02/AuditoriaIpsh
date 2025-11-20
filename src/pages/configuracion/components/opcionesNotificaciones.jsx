const opcionesNotificaciones = [
	{
	  id: 'alertasAuditoria',
	  nombre: 'Alertas de Auditoría',
	  descripcion: 'Recibe notificaciones inmediatas sobre nuevas auditorías y cambios de estado',
	  icono: (
		<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
		</svg>
	  ),
	  color: 'red',
	  esBeta: false
	},
	{
	  id: 'estadisticasAuditorias',
	  nombre: 'Estadísticas de Auditorías',
	  descripcion: 'Informes semanales y mensuales con métricas y tendencias',
	  icono: (
		<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
		</svg>
	  ),
	  color: 'blue',
	  esBeta: false
	},
	{
	  id: 'correoInicioSesion',
	  nombre: 'Correo de Inicio de Sesión',
	  descripcion: 'Notificación por correo cuando se detecte un nuevo inicio de sesión',
	  icono: (
		<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
		</svg>
	  ),
	  color: 'green',
	  esBeta: false
	},
	{
	  id: 'recordatorios',
	  nombre: 'Recordatorios',
	  descripcion: 'Recordatorios automáticos para tareas pendientes y fechas límite',
	  icono: (
		<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
	  ),
	  color: 'purple',
	  esBeta: true
	},
	{
	  id: 'puntajeAuditoria',
	  nombre: 'Recibir Puntaje de Auditoría',
	  descripcion: 'Notificación con el resultado y puntuación de cada auditoría completada',
	  icono: (
		<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
		</svg>
	  ),
	  color: 'yellow',
	  esBeta: false
	}
  ];

  export default opcionesNotificaciones;