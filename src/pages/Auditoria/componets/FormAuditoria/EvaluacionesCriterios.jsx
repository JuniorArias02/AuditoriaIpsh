import React, { useEffect, useState, useMemo, useCallback } from "react";
import { FileText, Calculator } from "lucide-react";
import CriterioItem from "./components/CriterioItem";
import { FormularioDimensionesServices } from "../../../../api/services/formularioDimencionesServices";
import { useAuth } from "../../../../store/AuthContext";

function EvaluacionesCriterios({ onPuntajeChange, formulario_auditoria_id }) {
	const { token } = useAuth();
	const [dimensiones, setDimensiones] = useState([]);
	const [respuestas, setRespuestas] = useState({});
	const [loading, setLoading] = useState(false);
	const formularioDimensionesService = new FormularioDimensionesServices(token);

	useEffect(() => {
		const fetchDimensiones = async () => {
			setLoading(true);
			try {
				const res = await formularioDimensionesService.obtenerFormularioDimensionesPorFormulario(formulario_auditoria_id);
				setDimensiones(res);
			} catch (error) {
				console.error("Error cargando dimensiones:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchDimensiones();
	}, [formulario_auditoria_id]);

	const handleSeleccion = useCallback((criterioId, valor) => {
		setRespuestas((prev) => ({
			...prev,
			[criterioId]: { ...(prev[criterioId] || {}), valor },
		}));
	}, []);

	const handleObservacion = useCallback((criterioId, texto) => {
		setRespuestas((prev) => ({
			...prev,
			[criterioId]: { ...(prev[criterioId] || {}), observacion: texto },
		}));
	}, []);

	// 🔹 Calcular puntaje total (con soporte "no aplica")
	const { puntajeTotal, puntajeMaximo, criteriosRespondidos, totalCriterios } = useMemo(() => {
		let puntajeGlobal = 0;
		let totalPorcentaje = 0;

		dimensiones.forEach(dim => {
			const criterios = dim.criterios;
			// Filtrar criterios que fueron respondidos
			const criteriosValidos = criterios.filter(c => {
				const r = respuestas[c.id];
				return r?.valor === 0 || r?.valor === 1 || r?.valor === 2;
			});

			if (criteriosValidos.length === 0) return;

			// Excluir los que son “no aplica”
			const criteriosEvaluables = criteriosValidos.filter(c => respuestas[c.id]?.valor !== 2);
			if (criteriosEvaluables.length === 0) return;

			const cumple = criteriosEvaluables.filter(c => respuestas[c.id]?.valor === 1).length;

			// Fórmula: (porcentajeDim / totalEvaluables) * cumple
			const porcentajeCumplido = (cumple / criteriosEvaluables.length) * parseFloat(dim.porcentaje);

			puntajeGlobal += porcentajeCumplido;
			totalPorcentaje += parseFloat(dim.porcentaje);
		});

		return {
			puntajeTotal: puntajeGlobal,
			puntajeMaximo: totalPorcentaje,
			criteriosRespondidos: Object.keys(respuestas).length,
			totalCriterios: dimensiones.reduce((acc, d) => acc + d.criterios.length, 0),
		};
	}, [respuestas, dimensiones]);

	// 🔹 Calcular porcentaje total
	const porcentajeCumplimiento = useMemo(() => (
		puntajeMaximo > 0 ? (puntajeTotal / puntajeMaximo) * 100 : 0
	), [puntajeTotal, puntajeMaximo]);

	// 🔹 Enviar cambios al padre
	useEffect(() => {
		const respuestasArray = Object.entries(respuestas)
			.filter(([_, data]) => [0, 1, 2].includes(data.valor))
			.map(([criterio_id, data]) => ({
				criterio_id: parseInt(criterio_id),
				puntaje: data.valor,
				observaciones: data.observacion ?? "",
			}));
		onPuntajeChange({
			puntaje_total: puntajeTotal,
			total_criterios: puntajeMaximo,
			porcentaje_cumplimiento: porcentajeCumplimiento,
			respuestas: respuestasArray,
		});
	}, [puntajeTotal, puntajeMaximo, porcentajeCumplimiento, respuestas, onPuntajeChange]);

	// 🔹 Niveles de cumplimiento
	const getNivelCumplimiento = () => {
		const p = porcentajeCumplimiento;
		if (p >= 95) return { texto: "Excelente", color: "text-green-600", bg: "bg-green-100" };
		if (p >= 85) return { texto: "Satisfactorio", color: "text-blue-600", bg: "bg-blue-100" };
		if (p >= 70) return { texto: "Aceptable", color: "text-yellow-600", bg: "bg-yellow-100" };
		return { texto: "Inaceptable", color: "text-red-600", bg: "bg-red-100" };
	};

	const nivelCumplimiento = getNivelCumplimiento();

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-64">
				<p className="text-gray-600">Cargando criterios de evaluación...</p>
			</div>
		);
	}

	return (
		<div className="mt-5">
			{/* Header */}
			<div className="sticky top-0 z-50 bg-white dark:bg-gray-800 rounded-b-2xl shadow-md dark:shadow-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 mb-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
							<FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
						</div>
						<div>
							<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Evaluación de Criterios</h1>
							<p className="text-gray-600 dark:text-gray-400 mt-1">Califique cada criterio según los estándares</p>
						</div>
					</div>

					{/* Puntaje */}
					<div className="text-right">
						<div className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
							<Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
							Puntaje: {puntajeTotal.toFixed(2)}/{puntajeMaximo.toFixed(2)}
						</div>
						<div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
							{porcentajeCumplimiento.toFixed(1)}%
						</div>
						<div className={`text-sm font-medium px-2 py-1 rounded-full ${nivelCumplimiento.bg} ${nivelCumplimiento.color}`}>
							{nivelCumplimiento.texto}
						</div>
					</div>
				</div>
			</div>

			{/* Dimensiones */}
			<div className="space-y-4">
				{dimensiones.map((dim) => {
					const criteriosEvaluables = dim.criterios.filter(c => respuestas[c.id]?.valor !== 2);
					const cumple = criteriosEvaluables.filter(c => respuestas[c.id]?.valor === 1).length;
					const maximoDimension = criteriosEvaluables.length;
					const porcentajeDim = maximoDimension > 0 ? (cumple / maximoDimension) * 100 : 0;

					return (
						<div key={dim.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-700 overflow-hidden">
							<div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 px-6 py-4 flex justify-between">
								<div className="flex items-center gap-3">
									<div className="bg-white/20 p-2 rounded-lg">
										<span className="text-white font-bold text-lg">{dim.orden}</span>
									</div>
									<div>
										<h2 className="text-xl font-bold text-white">{dim.nombre}</h2>
										<p className="text-blue-100 dark:text-blue-200 text-sm mt-1">{dim.criterios.length} criterios</p>
									</div>
								</div>
								<div className="text-right text-white font-bold">
									{cumple}/{maximoDimension}
									<div className="text-blue-200 dark:text-blue-300 text-sm">
										{porcentajeDim.toFixed(1)}%
									</div>
								</div>
							</div>

							{/* Criterios */}
							<div className="p-6 space-y-6">
								{dim.criterios.map((criterio) => (
									<CriterioItem
										key={criterio.id}
										criterio={criterio}
										respuesta={respuestas[criterio.id]}
										onSeleccion={handleSeleccion}
										onObservacion={handleObservacion}
									/>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default EvaluacionesCriterios;
