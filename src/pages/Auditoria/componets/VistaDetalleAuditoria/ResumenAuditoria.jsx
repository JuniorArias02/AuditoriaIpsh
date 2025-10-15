import React from 'react';
import {
	BarChart3,
	Trophy,
	CheckCircle,
	AlertTriangle,
	XCircle,
	Target
} from 'lucide-react';

const ResumenAuditoria = ({ data }) => {
	if (!data) return null;

	const { puntosObtenido, puntosTotal, porcentaje } = data;

	// Clasificación mejorada con más detalles
	let classification = "";
	let bgColor = "";
	let textColor = "";
	let borderColor = "";
	let Icon = Trophy;
	let description = "";

	if (porcentaje < 85) {
		classification = "Inaceptable";
		bgColor = "bg-red-50";
		textColor = "text-red-700";
		borderColor = "border-red-200";
		Icon = XCircle;
		description = "Requiere Revision";
	} else if (porcentaje >= 85 && porcentaje <= 94) {
		classification = "Aceptable";
		bgColor = "bg-yellow-50";
		textColor = "text-yellow-700";
		borderColor = "border-yellow-200";
		Icon = AlertTriangle;
		description = "Hay áreas de mejora";
	} else {
		classification = "Satisfactorio";
		bgColor = "bg-green-50";
		textColor = "text-green-700";
		borderColor = "border-green-200";
		Icon = CheckCircle;
		description = "Cumple con los estándares";
	}

	return (
		<div className="mx-auto my-8 bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
			{/* Header mejorado */}
			<div className="flex items-center p-5 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-gray-200">
				<BarChart3 className="w-6 h-6 text-blue-600 mr-3" />
				<h2 className="text-xl font-semibold text-gray-800">Resumen de Auditoría</h2>
			</div>

			{/* Cuerpo mejorado */}
			<div className="grid grid-cols-1 md:grid-cols-3 divide-x-0 md:divide-x divide-y md:divide-y-0 divide-gray-100">
				{/* Puntaje Total */}
				<div className="flex flex-col items-center justify-center p-6 bg-white">
					<div className="flex items-center mb-3">
						<Target className="w-5 h-5 text-gray-600 mr-2" />
						<p className="text-sm font-medium text-gray-600">Puntaje Total</p>
					</div>
					<div className="text-center">
						<p className="text-3xl font-bold text-gray-800">
							{puntosObtenido}
						</p>
						<p className="text-lg text-gray-500 mt-1">
							de {puntosTotal} puntos
						</p>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2 mt-4">
						<div
							className="bg-blue-600 h-2 rounded-full transition-all duration-500"
							style={{ width: `${(puntosObtenido / puntosTotal) * 100}%` }}
						></div>
					</div>
				</div>

				{/* Porcentaje */}
				<div className="flex flex-col items-center justify-center p-6 bg-blue-50/30">
					<div className="flex items-center mb-3">
						<BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
						<p className="text-sm font-medium text-gray-600">Porcentaje</p>
					</div>
					<div className="relative">
						<p className="text-4xl font-bold text-blue-600">{porcentaje}%</p>
						<div className="absolute -top-2 -right-6">
							<div className={`w-3 h-3 rounded-full animate-pulse ${porcentaje >= 95 ? 'bg-green-500' :
									porcentaje >= 85 ? 'bg-yellow-500' : 'bg-red-500'
								}`}></div>
						</div>
					</div>
					<p className="text-sm text-gray-500 mt-2">de cumplimiento</p>
				</div>

				{/* Clasificación */}
				<div className={`flex flex-col items-center justify-center p-6 ${bgColor} ${borderColor} border-t md:border-t-0`}>
					<div className="flex items-center mb-3">
						<Icon className={`w-5 h-5 ${textColor} mr-2`} />
						<p className={`text-sm font-medium ${textColor}`}>Clasificación</p>
					</div>
					<p className={`text-2xl font-bold ${textColor} mb-1`}>{classification}</p>
					<p className={`text-sm ${textColor}/80 text-center`}>{description}</p>
					<div className={`w-8 h-1 ${textColor}/30 rounded-full mt-3`}></div>
				</div>
			</div>
		</div>
	);
};

export default ResumenAuditoria;