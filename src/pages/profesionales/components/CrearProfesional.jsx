import { useEffect, useState } from "react";
import { ProfesionalServices } from "../../../api/services/profesionalServices";
import { useAuth } from "../../../store/AuthContext";
import { Plus, User, IdCard, Briefcase, X, Save, Edit } from "lucide-react";
import Swal from "sweetalert2";

function CrearProfesional({ profesionalEditando, onCancelEdit }) {
	const { token } = useAuth();
	const [isExpanded, setIsExpanded] = useState(false);
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		nombre: "",
		cedula: "",
		cargo: ""
	});

	const profesionalServices = new ProfesionalServices(token);

	// 🔹 Cargar datos si estamos editando
	useEffect(() => {
		if (profesionalEditando) {
			setIsExpanded(true);
			setFormData({
				nombre: profesionalEditando.nombre || "",
				cedula: profesionalEditando.cedula || "",
				cargo: profesionalEditando.cargo || ""
			});
		} else {
			setFormData({ nombre: "", cedula: "", cargo: "" });
		}
	}, [profesionalEditando]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		for (const [key, value] of Object.entries(formData)) {
			if (!value.trim()) {
				Swal.fire({
					icon: "error",
					title: "Error",
					text: `El campo ${key} es obligatorio`,
					confirmButtonColor: "#2068A6"
				});
				return;
			}
		}

		setLoading(true);

		try {
			let response;
			if (profesionalEditando) {
				response = await profesionalServices.actualizarProfesional(
					profesionalEditando.id,
					formData
				);
			} else {
				response = await profesionalServices.crearProfesional(formData);
			}

			if (response.success) {
				Swal.fire({
					icon: "success",
					title: "¡Éxito!",
					text: profesionalEditando
						? "Profesional actualizado correctamente"
						: "Profesional creado correctamente",
					confirmButtonColor: "#2068A6"
				});

				setFormData({ nombre: "", cedula: "", cargo: "" });
				setIsExpanded(false);
				onCancelEdit?.();
			} else {
				throw new Error(response.data || "Error en el servidor");
			}
		} catch (error) {
			console.error("Error guardando profesional:", error);
			const mensajeError =
				error.response?.data?.error ||
				error.response?.data?.message ||
				error.message ||
				"Error al guardar el profesional";

			Swal.fire({
				icon: "error",
				title: "Error",
				text: mensajeError,
				confirmButtonColor: "#2068A6"
			});
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		setFormData({ nombre: "", cedula: "", cargo: "" });
		setIsExpanded(false);
		onCancelEdit?.();
	};

	return (
		<div className={`bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-300 ${isExpanded ? 'mx-auto' : 'duration-300'}`}>

			{/* Header */}
			<div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">Profesionales</h2>
					<p className="text-gray-600 mt-1">
						{isExpanded
							? profesionalEditando
								? "Edita la información del profesional seleccionado"
								: "Completa la información del nuevo profesional"
							: "Gestión de profesionales del sistema"}
					</p>
				</div>

				{!isExpanded ? (
					<button
						onClick={() => setIsExpanded(true)}
						className="bg-[#2068A6] text-white px-4 py-2 rounded-lg hover:bg-[#1a568c] transition-colors flex items-center gap-2"
					>
						<Plus className="w-4 h-4" />
						Crear Profesional
					</button>
				) : (
					<button
						onClick={handleCancel}
						className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-gray-100"
					>
						<X className="w-5 h-5" />
					</button>
				)}
			</div>

			{/* Formulario */}
			{isExpanded && (
				<div className="p-6">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Nombre */}
							<div className="space-y-2">
								<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
									<User className="w-4 h-4" /> Nombre Completo *
								</label>
								<input
									type="text"
									name="nombre"
									value={formData.nombre}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent transition-colors"
									placeholder="Ingresa el nombre completo"
								/>
							</div>

							{/* Cédula */}
							<div className="space-y-2">
								<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
									<IdCard className="w-4 h-4" /> Cédula *
								</label>
								<input
									type="text"
									name="cedula"
									value={formData.cedula}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent transition-colors"
									placeholder="Ingresa la cédula"
								/>
							</div>

							{/* Cargo */}
							<div className="space-y-2 md:col-span-2">
								<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
									<Briefcase className="w-4 h-4" /> Cargo *
								</label>
								<input
									type="text"
									name="cargo"
									value={formData.cargo}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent transition-colors"
									placeholder="Ingresa el cargo del profesional"
								/>
							</div>
						</div>

						{/* Botones */}
						<div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
							<button
								type="button"
								onClick={handleCancel}
								className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
								disabled={loading}
							>
								Cancelar
							</button>

							<button
								type="submit"
								disabled={loading}
								className="bg-[#2068A6] text-white px-4 py-2 rounded-lg hover:bg-[#1a568c] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{loading ? "Guardando..." : (
									<>
										{profesionalEditando ? (
											<>
												<Edit className="w-4 h-4" />
												Actualizar Profesional
											</>
										) : (
											<>
												<Save className="w-4 h-4" />
												Crear Profesional
											</>
										)}
									</>
								)}
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}

export default CrearProfesional;
