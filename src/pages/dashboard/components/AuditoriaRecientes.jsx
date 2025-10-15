// src/components/AuditoriaRecientes.jsx

import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import getStatus from "../utils/getStatus";
import { AuditoriaServices } from '../../../api/services/auditoriaServices';

export function AuditoriaRecientes() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchInforme = async () => {
			setLoading(true);
			try {
				const res = await AuditoriaServices.obtenerAuditoriasRecientes();
				setData(res.data || []);
			} catch (error) {
				console.error("Error al obtener informe de auditoría:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchInforme();
	}, []);


	if (loading) {
		return (
			<div className="bg-white rounded-xl shadow-md p-6 flex justify-center items-center h-40">
				<div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mr-3"></div>
				<p className="text-gray-600">Cargando auditorías recientes...</p>
			</div>
		);
	}


	if (data.length === 0) {
		return (
			<div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-500 border border-gray-100">
				<p>No se encontraron auditorías recientes.</p>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
			{/* Header */}
			<div className="flex items-center gap-3 p-5 border-b border-gray-100">
				<Calendar className="w-6 h-6 text-gray-600" />
				<h2 className="text-xl font-semibold text-gray-800">
					Auditorías Recientes
				</h2>
			</div>

			{/* Lista de Auditorías */}
			<ul className="divide-y divide-gray-100">
				{data.map((auditoria) => {
					const cumplimiento = parseFloat(auditoria.porcentaje_cumplimiento);

					const status = getStatus(cumplimiento);
					const porcentajeFormateado = `${cumplimiento.toFixed(1)}%`;

					return (
						<li
							key={auditoria.id}
							className="px-2 py-2 border-none transition"
						>
							<div className="flex items-center justify-between bg-[#F9FAFB] p-2 rounded-sm">
								<div className="flex flex-col ">
									<span className="text-gray-900 font-medium">
										{auditoria.nombre}
									</span>
									<span className="text-sm text-gray-500 mt-1">
										{auditoria.fecha_auditoria} • {auditoria.cargo}
									</span>
								</div>

								<div className="flex items-center gap-4 flex-col">
									<span className={`text-sm font-semibold px-3 py-1 rounded-full ${status.bgColor} ${status.textColor}`}>
										{status.label}
									</span>
									<span className="text-lg font-bold text-gray-900 min-w-[55px] text-right">
										{porcentajeFormateado}
									</span>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}