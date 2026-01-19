import React, { useEffect, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { AuditoriaServices } from '../../../api/services/auditoriaServices';

export function ResumenDiarioCards() {
	const [resumenData, setResumenData] = useState({
		auditoriasHoy: 0,
		cumplimiento: 0,
		puntajeMaximo: 0,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchResumenDiario = async () => {
			setLoading(true);
			setError(null);
			try {
				const auditoriaService = new AuditoriaServices();
				const fecha = new Date().toISOString().split("T")[0];
				const res = await auditoriaService.obtenerResumenHoy(fecha);

				if (res) {
					setResumenData(res);
				} else {
					setError("No se pudo cargar el resumen diario.");
				}
			} catch (err) {
				console.error("Error al obtener el resumen diario:", err);
				setError("Error al cargar los datos. Intente de nuevo más tarde.");
			} finally {
				setLoading(false);
			}
		};

		fetchResumenDiario();
	}, []);

	if (loading) {
		return (
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-none p-6 flex justify-center items-center h-40 border border-gray-100 dark:border-gray-700">
				<div className="w-6 h-6 border-4 border-blue-400 dark:border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
				<p className="text-gray-600 dark:text-gray-400">Cargando resumen diario...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-none p-6 text-center text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
				<p>{error}</p>
			</div>
		);
	} 

	const StatCard = ({ value, label, bgColorClass, valueColorClass }) => (
		<div className={`p-6 rounded-xl text-center ${bgColorClass}`}>
			<p className={`text-4xl font-bold ${valueColorClass}`}>{value}</p>
			<p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">{label}</p>
		</div>
	);

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-none overflow-hidden border border-gray-100 dark:border-gray-700">
			{/* Header */}
			<div className="flex items-center gap-3 p-5 border-b border-gray-100 dark:border-gray-700">
				<CalendarDays className="w-6 h-6 text-gray-600 dark:text-gray-400" />
				<h2 className="text-xl font-semibold text-gray-800 dark:text-white">
					Resumen Diario
				</h2>
			</div>

			{/* Contenido en columnas */}
			<div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
				<StatCard
					value={resumenData.auditoriasHoy}
					label="Auditorías de Hoy"
					bgColorClass="bg-blue-50 dark:bg-blue-900/30"
					valueColorClass="text-blue-600 dark:text-blue-400"
				/>
				<StatCard
					value={resumenData.cumplimiento}
					label="Criterios por Auditoría"
					bgColorClass="bg-green-50 dark:bg-green-900/30"
					valueColorClass="text-green-600 dark:text-green-400"
				/>
				<StatCard
					value={resumenData.puntajeMaximo}
					label="Puntaje Máximo"
					bgColorClass="bg-gray-100 dark:bg-gray-700"
					valueColorClass="text-gray-800 dark:text-gray-200"
				/>
			</div>
		</div>
	);
}