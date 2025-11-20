import React, { useState } from "react";
import {
	Plus,
	Trash2,
	Edit3,
	Save,
	FolderOpen,
	Layers,
	ListChecks,
	Info
} from "lucide-react";
import Dimension from "../componentes/CrearFormulario/Dimension";
import Criterio from "../componentes/CrearFormulario/Criterio";
import { FormularioAuditoriaService } from "../../../api/services/formularioAuditoriaServices";
import { useAuth } from "../../../store/AuthContext";

function CrearFormularioAuditoria() {
	const { token } = useAuth();
	const formularioService = new FormularioAuditoriaService(token);

	const [formulario, setFormulario] = useState({
		nombre_formulario: "",
		descripcion: "",
		dimensiones: []
	});

	const agregarDimension = () => {
		const nuevaDim = {
			id: Date.now(),
			nombre: "",
			porcentaje: 0,
			criterios: []
		};
		setFormulario((prev) => ({ ...prev, dimensiones: [...prev.dimensiones, nuevaDim] }));
	};

	const eliminarDimension = (id) => {
		setFormulario((prev) => ({ ...prev, dimensiones: prev.dimensiones.filter(d => d.id !== id) }));
	};

	const cambiarNombreDimension = (id, nombre) => {
		setFormulario((prev) => ({
			...prev,
			dimensiones: prev.dimensiones.map(d => d.id === id ? { ...d, nombre } : d)
		}));
	};

	const cambiarPorcentajeDimension = (id, porcentaje) => {
		setFormulario((prev) => ({
			...prev,
			dimensiones: prev.dimensiones.map(d => d.id === id ? { ...d, porcentaje: Number(porcentaje) } : d)
		}));
	};

	const agregarCriterio = (dimensionId) => {
		setFormulario((prev) => ({
			...prev,
			dimensiones: prev.dimensiones.map(d =>
				d.id === dimensionId
					? { ...d, criterios: [...d.criterios, { id: Date.now(), descripcion: "" }] }
					: d
			)
		}));
	};

	const eliminarCriterio = (dimensionId, criterioId) => {
		setFormulario((prev) => ({
			...prev,
			dimensiones: prev.dimensiones.map(d =>
				d.id === dimensionId
					? { ...d, criterios: d.criterios.filter(c => c.id !== criterioId) }
					: d
			)
		}));
	};

	const cambiarDescripcionCriterio = (dimensionId, criterioId, descripcion) => {
		setFormulario((prev) => ({
			...prev,
			dimensiones: prev.dimensiones.map(d =>
				d.id === dimensionId
					? {
						...d,
						criterios: d.criterios.map(c => c.id === criterioId ? { ...c, descripcion } : c)
					}
					: d
			)
		}));
	};

	const handleSubmit = async () => {
		const total = formulario.dimensiones.reduce((sum, d) => sum + d.porcentaje, 0);

		if (total !== 100) {
			alert("El total de los porcentajes de las dimensiones debe ser 100%");
			return;
		}

		try {
			const res = await formularioService.crearFormularioAuditoria(formulario);
			if (res.success) {
				alert(`Formulario creado correctamente! ID: ${res.formulario_id}`);
				setFormulario({
					nombre_formulario: "",
					descripcion: "",
					dimensiones: []
				});
			} else {
				alert("Error al crear el formulario: " + (res.error || "desconocido"));
			}
		} catch (error) {
			console.error(error);
			alert("Error de conexión con el servidor");
		}
	};


	const totalPorcentaje = formulario.dimensiones.reduce((sum, d) => sum + d.porcentaje, 0);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900 p-6 mb-6">
					<div className="flex items-center gap-3 mb-4">
						<FolderOpen className="text-indigo-600 dark:text-indigo-400" size={32} />
						<h1 className="text-2xl font-bold text-gray-800 dark:text-white">Crear Formulario de Auditoría</h1>
					</div>

					{/* Nombre del formulario */}
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Nombre del formulario
						</label>
						<input
							type="text"
							placeholder="Ej: Auditoría de Calidad Web 2024"
							value={formulario.nombre_formulario}
							onChange={(e) => setFormulario({ ...formulario, nombre_formulario: e.target.value })}
							className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
						/>
					</div>

					{/* Descripción */}
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Descripción
						</label>
						<textarea
							placeholder="Describe el propósito y alcance de este formulario de auditoría..."
							value={formulario.descripcion}
							onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })}
							rows={3}
							className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
						/>
					</div>
				</div>

				{/* Dimensiones Section */}
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900 p-6 mb-6">
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center gap-3">
							<Layers className="text-indigo-600 dark:text-indigo-400" size={24} />
							<h2 className="text-xl font-semibold text-gray-800 dark:text-white">Dimensiones</h2>
							<span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-2 py-1 rounded-full text-sm font-medium">
								{formulario.dimensiones.length}
							</span>
						</div>

						{/* Total Percentage */}
						<div className="flex items-center gap-2">
							<span className="text-sm text-gray-600 dark:text-gray-400">Total:</span>
							<span className={`px-3 py-1 rounded-full text-sm font-medium ${totalPorcentaje > 100
								? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
								: totalPorcentaje === 100
									? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
									: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
								}`}>
								{totalPorcentaje}%
							</span>
						</div>
					</div>

					{/* Agregar Dimensión Button */}
					<button
						onClick={agregarDimension}
						className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-4 py-3 rounded-lg transition-all duration-200 mb-6"
					>
						<Plus size={20} />
						Agregar Dimensión
					</button>

					{/* Dimensiones List */}
					<div className="space-y-4">
						{formulario.dimensiones.map((d) => (
							<Dimension
								key={d.id}
								dimension={d}
								onChangeNombre={cambiarNombreDimension}
								onChangePorcentaje={cambiarPorcentajeDimension}
								onAgregarCriterio={agregarCriterio}
								onEliminarCriterio={eliminarCriterio}
								onChangeDescripcion={cambiarDescripcionCriterio}
								onEliminarDimension={eliminarDimension}
							/>
						))}
					</div>
				</div>

				{/* Submit Button */}
				<button
					onClick={handleSubmit}
					disabled={totalPorcentaje !== 100}
					className="flex items-center gap-2 w-full justify-center bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg"
				>
					<Save size={20} />
					Guardar Formulario de Auditoría
				</button>

				{totalPorcentaje !== 100 && (
					<div className="flex items-center gap-2 justify-center mt-3 text-yellow-600 dark:text-yellow-400 text-sm">
						<Info size={16} />
						El total debe ser exactamente 100% para guardar
					</div>
				)}
			</div>
		</div>
	);
}

export default CrearFormularioAuditoria;