import { useState, useEffect } from "react";
import { Plus, Trash2, Stethoscope, AlertCircle } from "lucide-react";
import Cie10Input from "./buscadoresInput/Cie10Input";

function DiagnosticoMedico({ form, setForm }) {
	const [diagnosticos, setDiagnosticos] = useState([
		{ id: 1, cie10_id: "", descripcion: "" }
	]);

	useEffect(() => {
		const cies = diagnosticos
			.filter(d => d.cie10_id)
			.map(d => ({ id: d.cie10_id, descripcion: d.descripcion }));
		setForm(prev => ({ ...prev, cies }));
	}, [diagnosticos]);

	const agregarDiagnostico = () => {
		const nuevoId = diagnosticos.length > 0
			? Math.max(...diagnosticos.map(d => d.id)) + 1
			: 1;
		setDiagnosticos([...diagnosticos, { id: nuevoId, cie10_id: "", descripcion: "" }]);
	};

	const eliminarDiagnostico = (id) => {
		if (diagnosticos.length > 1) {
			setDiagnosticos(diagnosticos.filter(d => d.id !== id));
		}
	};

	const actualizarDiagnostico = (id, cie10_id, descripcion) => {
		setDiagnosticos(prev =>
			prev.map(d => d.id === id ? { ...d, cie10_id, descripcion } : d)
		);
	};

	return (
		<div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
			{/* Header */}
			<div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
				<div className="bg-green-100 p-2 rounded-lg">
					<Stethoscope className="w-5 h-5 text-green-600" />
				</div>
				<div className="flex-1">
					<h2 className="text-lg font-semibold text-gray-900">
						Diagnósticos Médicos (CIE-10)
					</h2>
					<p className="text-sm text-gray-500 mt-1">
						Seleccione o añada diagnósticos de la base de datos SISPRO Colombia.
					</p>
				</div>
			</div>

			{/* Lista */}
			<div className="space-y-4">
				{diagnosticos.map((diagnostico, index) => (
					<div key={diagnostico.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
						<div className="flex items-center justify-between mb-3">
							<h3 className="font-medium text-gray-700">Diagnóstico #{index + 1}</h3>
							{diagnosticos.length > 1 && (
								<button
									type="button"
									onClick={() => eliminarDiagnostico(diagnostico.id)}
									className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							)}
						</div>

						<Cie10Input
							diagnostico={diagnostico}
							onDiagnosticoChange={actualizarDiagnostico}
						/>
					</div>
				))}
			</div>

			{/* Botón agregar */}
			<div className="mt-6 pt-4 border-t border-gray-100">
				<button
					type="button"
					onClick={agregarDiagnostico}
					className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
				>
					<Plus className="w-4 h-4" />
					Agregar otro diagnóstico
				</button>
			</div>

			{/* Nota */}
			<div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
				<div className="flex items-start gap-2">
					<AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
					<p className="text-sm text-blue-800">
						<strong>Nota:</strong> Puede agregar múltiples diagnósticos si el paciente presenta
						comorbilidades o condiciones adicionales relevantes para la auditoría.
					</p>
				</div>
			</div>
		</div>
	);
}

export default DiagnosticoMedico;
