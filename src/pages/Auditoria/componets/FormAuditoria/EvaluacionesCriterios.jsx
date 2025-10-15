import React, {
	useEffect,
	useState,
	useMemo,
	useCallback
} from "react";
import {
	CheckCircle,
	XCircle,
	MinusCircle,
	FileText,
	AlertCircle,
	Calculator,
	Target,
} from "lucide-react";
import { DimencionesServices } from "../../../../api/services/dimencionesServices";

/* ------------------ Subcomponente optimizado ------------------ */
const CriterioItem = React.memo(({ criterio, respuesta, onSeleccion, onObservacion }) => {
	const valor = respuesta?.valor;

	// 📝 Estado local para observaciones (fluido)
	const [texto, setTexto] = useState(respuesta?.observacion || "");

	// Si cambia la respuesta externa (por ejemplo, al cargar datos)
	useEffect(() => {
		setTexto(respuesta?.observacion || "");
	}, [respuesta?.observacion]);

	// Debounce: solo manda cambios al padre después de 400ms sin escribir
	useEffect(() => {
		const delay = setTimeout(() => {
			onObservacion(criterio.id, texto);
		}, 400);
		return () => clearTimeout(delay);
	}, [texto, criterio.id, onObservacion]);

	const getColorClase = (valor) => {
		switch (valor) {
			case 1:
				return "bg-green-500 border-green-500 text-white";
			case 0:
				return "bg-yellow-500 border-yellow-500 text-white";
			case undefined:
				return "bg-gray-400 border-gray-400 text-white";
			default:
				return "bg-gray-200 border-gray-300 text-gray-600";
		}
	};

	const getIcono = (valor) => {
		switch (valor) {
			case 1:
				return <CheckCircle className="w-4 h-4" />;
			case 0:
				return <XCircle className="w-4 h-4" />;
			case undefined:
				return <MinusCircle className="w-4 h-4" />;
			default:
				return null;
		}
	};

	return (
		<div
			className={`p-4 rounded-xl border-2 transition-all ${valor !== undefined
				? "border-blue-200 bg-blue-50"
				: "border-gray-100 bg-gray-50"
				}`}
		>
			{/* Descripción */}
			<div className="flex items-start gap-3 mb-4">
				<div
					className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${valor !== undefined
						? "bg-blue-600 text-white"
						: "bg-gray-300 text-gray-600"
						}`}
				>
					{criterio.orden}
				</div>
				<div className="flex-1">
					<p className="text-gray-800">{criterio.descripcion}</p>
					{valor !== undefined && (
						<div className="flex items-center gap-2 mt-2">
							<Target className="w-4 h-4 text-blue-600" />
							<span className="text-sm font-medium text-blue-600">
								Puntuación: {valor}/1 pts
							</span>
						</div>
					)}
				</div>
			</div>

			{/* Botones */}
			<div className="flex flex-wrap gap-3 mb-4">
				{[
					{ valor: 1, label: "Cumple", color: "green" },
					{ valor: 0, label: "No cumple", color: "yellow" },
					{ valor: undefined, label: "N/A", color: "gray" },
				].map((op) => (
					<button
						key={op.valor}
						type="button"
						onClick={() => onSeleccion(criterio.id, op.valor)}
						className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-medium transition-all ${valor === op.valor
							? getColorClase(op.valor)
							: `border-${op.color}-300 text-${op.color}-700 hover:bg-${op.color}-50`
							}`}
					>
						{getIcono(op.valor)}
						{op.label} ({op.valor ?? "N/A"})
					</button>
				))}
			</div>

			{/* Observación */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
					<AlertCircle className="w-4 h-4 text-gray-500" />
					Observaciones
				</label>
				<textarea
					value={texto}
					onChange={(e) => setTexto(e.target.value)}
					placeholder="Agregue observaciones..."
					className="w-full text-sm border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
					rows="3"
				/>
			</div>
		</div>
	);
});

/* ------------------ Componente principal ------------------ */
function EvaluacionesCriterios({ onPuntajeChange }) {
	const [dimensiones, setDimensiones] = useState([]);
	const [respuestas, setRespuestas] = useState({});
	const [loading, setLoading] = useState(false);

	// 🧠 Obtener dimensiones solo una vez
	useEffect(() => {
		const fetchDimensiones = async () => {
			setLoading(true);
			try {
				const res = await DimencionesServices.obtenerCriterios();
				setDimensiones(res);
			} catch (error) {
				console.error("Error cargando dimensiones:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchDimensiones();
	}, []);

	// 🪄 Memoizar handlers
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

	// 📊 Calcular totales con useMemo
	const { puntajeTotal, puntajeMaximo, criteriosRespondidos, totalCriterios } = useMemo(() => {
		let total = 0, maximo = 0, respondidos = 0;
		dimensiones.forEach(dim => {
			dim.criterios.forEach(criterio => {
				const r = respuestas[criterio.id];
				if (r?.valor === 0 || r?.valor === 1) {
					total += r.valor;
					maximo++;
					respondidos++;
				}
			});
		});
		return { puntajeTotal: total, puntajeMaximo: maximo, criteriosRespondidos: respondidos, totalCriterios: maximo };
	}, [respuestas, dimensiones]);

	const porcentajeCumplimiento = useMemo(() => (
		puntajeMaximo > 0 ? (puntajeTotal / puntajeMaximo) * 100 : 0
	), [puntajeTotal, puntajeMaximo]);

	// 🧾 Reportar al padre solo cuando cambien datos relevantes
	useEffect(() => {
		const respuestasArray = Object.entries(respuestas)
			.filter(([_, data]) => data.valor === 0 || data.valor === 1)
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
			<div className="sticky top-0 z-50 bg-white rounded-b-2xl shadow-md border-b border-gray-200 p-6 mb-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div className="bg-blue-100 p-3 rounded-xl">
							<FileText className="w-8 h-8 text-blue-600" />
						</div>
						<div>
							<h1 className="text-2xl font-bold text-gray-900">Evaluación de Criterios</h1>
							<p className="text-gray-600 mt-1">Califique cada criterio según los estándares</p>
						</div>
					</div>

					{/* Puntaje */}
					<div className="text-right">
						<div className="flex items-center gap-2 text-lg font-bold text-gray-900">
							<Calculator className="w-5 h-5 text-blue-600" />
							Puntaje: {puntajeTotal}/{puntajeMaximo}
						</div>
						<div className="text-2xl font-bold text-blue-600 mt-1">
							{porcentajeCumplimiento.toFixed(1)}%
						</div>
						<div className={`text-sm font-medium px-2 py-1 rounded-full ${nivelCumplimiento.bg} ${nivelCumplimiento.color}`}>
							{nivelCumplimiento.texto}
						</div>
					</div>
				</div>

				{/* Barra de progreso lo oculto por el momento  */}
				{/* <div className="mt-6 pt-4 border-t border-gray-100">
					<div className="flex items-center justify-between mb-2">
						<span className="text-sm text-gray-600">
							Progreso: {criteriosRespondidos}/{totalCriterios}
						</span>
						<span className="text-sm text-gray-600">
							{((criteriosRespondidos / totalCriterios) * 100).toFixed(1)}% completado
						</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div
							className="bg-blue-600 h-2 rounded-full transition-all duration-300"
							style={{ width: `${(criteriosRespondidos / totalCriterios) * 100}%` }}
						></div>
					</div>
				</div> */}
			</div>

			{/* Dimensiones */}
			<div className="space-y-4">
				{dimensiones.map((dim) => {
					const puntajeDimension = dim.criterios.reduce((t, c) => t + (respuestas[c.id]?.valor || 0), 0);
					const maximoDimension = dim.criterios.length;

					return (
						<div key={dim.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
							<div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between">
								<div className="flex items-center gap-3">
									<div className="bg-white/20 p-2 rounded-lg">
										<span className="text-white font-bold text-lg">{dim.orden}</span>
									</div>
									<div>
										<h2 className="text-xl font-bold text-white">{dim.nombre}</h2>
										<p className="text-blue-100 text-sm mt-1">{dim.criterios.length} criterios</p>
									</div>
								</div>
								<div className="text-right text-white font-bold">
									{puntajeDimension}/{maximoDimension}
									<div className="text-blue-200 text-sm">
										{((puntajeDimension / maximoDimension) * 100).toFixed(1)}%
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
