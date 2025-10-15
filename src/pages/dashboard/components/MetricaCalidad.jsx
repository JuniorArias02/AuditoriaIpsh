import React, { useEffect, useState } from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { AuditoriaServices } from '../../../api/services/auditoriaServices';
import ScoreItem from '../utils/ScoreItem';

const MetricaCalidad = ({ mostrarAlerta = true }) => {
	const [metricas, setMetricas] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMetricas = async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await AuditoriaServices.obtenerMetricasCalidad();
				setMetricas(data);
			} catch (err) {
				console.error("Error al cargar métricas:", err);
				setError("No se pudieron cargar las métricas");
			} finally {
				setLoading(false);
			}
		};
		fetchMetricas();
	}, []);

	// Funciones de color CORREGIDAS
	const getPromedioColor = (valor) => {
		if (valor >= 95) return "text-green-600";
		if (valor >= 85) return "text-yellow-600";
		return "text-red-600";
	};

	const getProgressColor = (valor) => {
		if (valor >= 95) return "bg-green-500";
		if (valor >= 85) return "bg-yellow-500";
		return "bg-red-500";
	};

	if (loading) {
		return (
			<div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
				<div className="flex items-center justify-center h-32">
					<div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-3"></div>
					<p className="text-gray-600">Cargando métricas...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
				<div className="flex items-center justify-center h-32 text-red-600">
					<AlertCircle className="w-5 h-5 mr-2" />
					<p>{error}</p>
				</div>
			</div>
		);
	}

	if (!metricas) {
		return (
			<div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
				<div className="flex items-center justify-center h-32 text-gray-500">
					<AlertCircle className="w-5 h-5 mr-2" />
					<p>No hay datos disponibles</p>
				</div>
			</div>
		);
	}

	const promedioClamped = Math.max(0, Math.min(100, parseFloat(metricas.promedio_cumplimiento)));
	const satisfactorias = Number(metricas.satisfactorias);
	const aceptables = Number(metricas.aceptables);
	const inaceptables = Number(metricas.inaceptables);

	return (
		<div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
			{/* Header con icono */}
			<div className="flex items-center mb-6 pb-4 border-b border-gray-100">
				<div className="p-2 bg-blue-50 rounded-lg border border-blue-100 mr-3">
					<TrendingUp className="w-5 h-5 text-blue-600" />
				</div>
				<div>
					<h2 className="text-lg font-semibold text-gray-800">Métricas de Calidad</h2>
					<p className="text-sm text-gray-500">Resumen del desempeño</p>
				</div>
			</div>

			{/* Promedio General */}
			<div className="mb-6">
				<div className="flex justify-between items-baseline mb-3">
					<p className="text-sm font-medium text-gray-700">Promedio General</p>
					<span className={`text-2xl font-bold ${getPromedioColor(promedioClamped)}`}>
						{promedioClamped.toFixed(1)}%
					</span>
				</div>
				<div className="h-2 bg-gray-100 rounded-full overflow-hidden">
					<div
						className={`h-full ${getProgressColor(promedioClamped)} transition-all duration-500 ease-out`}
						style={{ width: `${promedioClamped}%` }}
						role="progressbar"
						aria-valuenow={promedioClamped}
						aria-valuemin="0"
						aria-valuemax="100"
					/>
				</div>
			</div>

			{/* Detalle de Calificaciones */}
			<div className="space-y-3">
				<ScoreItem
					label="Satisfactorias"
					count={satisfactorias}
					colorClass="text-green-700"
					bgClass="bg-green-100"
					borderClass="border-green-200"
				/>
				<ScoreItem
					label="Aceptables"
					count={aceptables}
					colorClass="text-yellow-700"
					bgClass="bg-yellow-100"
					borderClass="border-yellow-200"
				/>
				<ScoreItem
					label="Inaceptables"
					count={inaceptables}
					colorClass="text-red-700"
					bgClass="bg-red-100"
					borderClass="border-red-200"
				/>
			</div>

			{/* Footer informativo */}
			<div className="mt-6 pt-4 border-t border-gray-100">
				<p className="text-xs text-gray-500 text-center">
					Actualizado recientemente
				</p>
			</div>
		</div>
	);
};

export default MetricaCalidad;