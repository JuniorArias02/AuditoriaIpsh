import React from "react";
import {
	CheckCircle,
	AlertCircle,
	Award,
	ClipboardList,
	TrendingUp,
	MessageCircle,
	XCircle
} from 'lucide-react';


const EvaluacionAuditoria = ({ data = [] }) => {
	// Agrupar por dimensionNombre
	const dimensiones = data.reduce((acc, item) => {
		if (!acc[item.dimensionNombre]) acc[item.dimensionNombre] = [];
		acc[item.dimensionNombre].push(item);
		return acc;
	}, {});

	// Calcular estadísticas por dimensión
	const dimensionStats = Object.entries(dimensiones).map(([dimension, criterios]) => {
		const totalCriterios = criterios.length;
		const criteriosCumplidos = criterios.filter(c => c.puntaje === 1).length;
		const porcentaje = Math.round((criteriosCumplidos / totalCriterios) * 100);

		return {
			dimension,
			criterios,
			totalCriterios,
			criteriosCumplidos,
			porcentaje
		};
	});

	return (
		<div className="mx-auto my-8 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
			{/* Header mejorado */}
			<div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50/50 border-b border-gray-200">
				<ClipboardList className="w-6 h-6 text-blue-600 mr-3" />
				<div>
					<h2 className="text-xl font-semibold text-gray-800">
						Evaluación de Auditoría
					</h2>
					<p className="text-sm text-gray-600 mt-1">
						Desglose por dimensiones y criterios evaluados
					</p>
				</div>
			</div>

			<div className="p-6 space-y-6">
				{dimensionStats.map((dimension, i) => (
					<div key={i} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
						{/* Header de dimensión con estadísticas */}
						<div className="bg-gradient-to-r from-gray-50 to-blue-50/30 px-6 py-4 border-b border-gray-200">
							<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
								<div className="flex items-center">
									<Award className="w-5 h-5 text-blue-600 mr-3" />
									<h3 className="text-lg font-semibold text-gray-800">{dimension.dimension}</h3>
								</div>
								<div className="flex items-center gap-4 text-sm">
									<div className="flex items-center gap-2">
										<TrendingUp className="w-4 h-4 text-green-600" />
										<span className="text-gray-600">
											{dimension.criteriosCumplidos} de {dimension.totalCriterios} criterios
										</span>
									</div>
									<div className={`px-3 py-1 rounded-full text-xs font-medium ${dimension.porcentaje >= 90 ? 'bg-green-100 text-green-800' :
										dimension.porcentaje >= 70 ? 'bg-yellow-100 text-yellow-800' :
											'bg-red-100 text-red-800'
										}`}>
										{dimension.porcentaje}% cumplimiento
									</div>
								</div>
							</div>
						</div>

						{/* Criterios */}
						<div className="divide-y divide-gray-100">
							{dimension.criterios.map((crit, idx) => (
								<div
									key={idx}
									className={`px-6 py-4 transition-colors duration-200 ${crit.puntaje === 1
										? "bg-green-50/50 hover:bg-green-50"
										: "bg-red-50/50 hover:bg-red-50"
										}`}
								>
									<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
										{/* Icono y descripción */}
										<div className="flex items-start gap-3 flex-1">
											{crit.puntaje === 1 ? (
												<CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
											) : (
												<XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
											)}
											<div className="flex-1">
												<p className="text-gray-700 leading-relaxed mb-2">
													{crit.criterioDescripcion}
												</p>

												{/* Observaciones con diseño de cita */}
												{crit.respuestaObservaciones && (
													<div className="border-l-4 border-blue-200 bg-blue-50/50 rounded-r-lg p-3">
														<div className="flex items-start gap-2">
															<MessageCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
															<div>
																<span className="text-xs font-medium text-blue-700 uppercase tracking-wide">
																	Observaciones
																</span>
																<p className="text-gray-700 text-sm mt-1">
																	{crit.respuestaObservaciones}
																</p>
															</div>
														</div>
													</div>
												)}
											</div>
										</div>

										{/* Puntaje */}
										<div className="flex items-center gap-2 mt-3 md:mt-0">
											<div
												className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${crit.puntaje === 1
													? "bg-green-100 text-green-800 border border-green-200"
													: "bg-red-100 text-red-800 border border-red-200"
													}`}
											>
												{crit.puntaje === 1 ? (
													<>
														<CheckCircle className="w-4 h-4" />
														Cumple
													</>
												) : (
													<>
														<XCircle className="w-4 h-4" />
														No cumple
													</>
												)}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				))}

				{/* Estado vacío */}
				{data.length === 0 && (
					<div className="text-center py-12">
						<AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-500 mb-2">
							No hay datos de evaluación
						</h3>
						<p className="text-gray-400">
							No se encontraron criterios evaluados para esta auditoría.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default EvaluacionAuditoria;