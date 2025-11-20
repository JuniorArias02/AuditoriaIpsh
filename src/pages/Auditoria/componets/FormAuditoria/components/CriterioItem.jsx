import React, { useState, useEffect, useCallback } from "react";
import { CheckCircle, XCircle, MinusCircle, Target, AlertCircle } from "lucide-react";

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
				return "bg-green-500 dark:bg-green-600 border-green-500 dark:border-green-600 text-white";
			case 0:
				return "bg-yellow-500 dark:bg-yellow-600 border-yellow-500 dark:border-yellow-600 text-white";
			case undefined:
				return "bg-gray-400 dark:bg-gray-600 border-gray-400 dark:border-gray-600 text-white";
			default:
				return "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300";
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
				? "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20"
				: "border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
				}`}
		>
			{/* Descripción */}
			<div className="flex items-start gap-3 mb-4">
				<div
					className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${valor !== undefined
						? "bg-blue-600 dark:bg-blue-700 text-white"
						: "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
						}`}
				>
					{criterio.orden}
				</div>
				<div className="flex-1">
					<p className="text-gray-800 dark:text-gray-200">{criterio.descripcion}</p>
					{valor !== undefined && (
						<div className="flex items-center gap-2 mt-2">
							<Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
							<span className="text-sm font-medium text-blue-600 dark:text-blue-400">
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
							: `border-${op.color}-300 dark:border-${op.color}-600 text-${op.color}-700 dark:text-${op.color}-300 hover:bg-${op.color}-50 dark:hover:bg-${op.color}-900/30`
							}`}
					>
						{getIcono(op.valor)}
						{op.label} ({op.valor ?? "N/A"})
					</button>
				))}
			</div>

			{/* Observación */}
			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
					<AlertCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
					Observaciones
				</label>
				<textarea
					value={texto}
					onChange={(e) => setTexto(e.target.value)}
					placeholder="Agregue observaciones..."
					className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
					rows="3"
				/>
			</div>
		</div>
	);
});

export default CriterioItem;