import ModoOscuro from "../components/modoOscuro";
import NotificacionesSettings from "../components/NotificacionesSettings";

function Configuracion() {
	return (
		<div className="min-h-screen dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
						Configuración
					</h1>
					<p className="text-gray-600 dark:text-gray-400">
						Gestiona las preferencias de tu aplicación
					</p>
				</div>

				<div className="space-y-6">
					{/* Sección de Apariencia */}
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<div className="flex items-center justify-between mb-6">
							<div>
								<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
									Apariencia
								</h2>
								<p className="text-gray-500 dark:text-gray-400 text-sm">
									Personaliza el aspecto visual de la aplicación
								</p>
							</div>
							<div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
								<svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
								</svg>
							</div>
						</div>
						<ModoOscuro />
					</div>

					{/* Sección de Notificaciones - Directamente el componente completo */}
					<NotificacionesSettings />

					{/* Otras secciones de configuración */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Tarjeta Privacidad */}
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-semibold text-gray-900 dark:text-white">Privacidad</h3>
								<div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
									<svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
									</svg>
								</div>
							</div>
							<p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
								Controla tu privacidad y datos
							</p>
							<button className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
								Configurar
							</button>
						</div>

						{/* Tarjeta Cuenta */}
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-semibold text-gray-900 dark:text-white">Cuenta</h3>
								<div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center">
									<svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
								</div>
							</div>
							<p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
								Gestiona la información de tu cuenta
							</p>
							<button className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
								Administrar
							</button>
						</div>
					</div>

					{/* Tarjeta Soporte */}
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<div className="flex items-center justify-between mb-4">
							<div>
								<h3 className="font-semibold text-gray-900 dark:text-white mb-1">Soporte & Ayuda</h3>
								<p className="text-gray-500 dark:text-gray-400 text-sm">
									Recursos y asistencia para tu experiencia
								</p>
							</div>
							<div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
								<svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<button className="py-3 px-4 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
								📚 Centro de Ayuda
							</button>
							<button className="py-3 px-4 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
								💬 Contactar Soporte
							</button>
							<button className="py-3 px-4 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
								🐛 Reportar Problema
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Configuracion;