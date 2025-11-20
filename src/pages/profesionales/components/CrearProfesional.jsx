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
		<div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 ${isExpanded ? 'mx-auto' : ''}`}>

			{/* Header Mejorado */}
			<div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<div className="w-10 h-10 bg-[#2068A6] rounded-lg flex items-center justify-center">
							<User className="w-5 h-5 text-white" />
						</div>
						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profesionales</h2>
							<p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
								{isExpanded
									? profesionalEditando
										? "Editando profesional existente"
										: "Agregar nuevo profesional al sistema"
									: "Gestión y administración de profesionales"
								}
							</p>
						</div>
					</div>

					{!isExpanded ? (
						<button
							onClick={() => setIsExpanded(true)}
							className="bg-[#2068A6] text-white px-5 py-2.5 rounded-lg hover:bg-[#1a568c] transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md font-medium"
						>
							<Plus className="w-4 h-4" />
							Crear Profesional
						</button>
					) : (
						<button
							onClick={handleCancel}
							className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
							title="Cerrar formulario"
						>
							<X className="w-5 h-5" />
						</button>
					)}
				</div>
			</div>

			{/* Formulario Mejorado */}
			{isExpanded && (
				<div className="p-6 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50">
					<form onSubmit={handleSubmit} className="space-y-8">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Nombre */}
							<div className="space-y-3">
								<label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
									<User className="w-4 h-4 text-[#2068A6]" />
									Nombre Completo *
								</label>
								<div className="relative">
									<input
										type="text"
										name="nombre"
										value={formData.nombre}
										onChange={handleInputChange}
										className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-[#2068A6] transition-all duration-200 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
										placeholder="Ej: María González Pérez"
										required
									/>
								</div>
							</div>

							{/* Cédula */}
							<div className="space-y-3">
								<label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
									<IdCard className="w-4 h-4 text-[#2068A6]" />
									Cédula de Identidad *
								</label>
								<div className="relative">
									<input
										type="text"
										name="cedula"
										value={formData.cedula}
										onChange={handleInputChange}
										className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-[#2068A6] transition-all duration-200 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
										placeholder="Ej: 12345678"
										required
									/>
								</div>
							</div>

							{/* Cargo - Ahora ocupa el ancho completo */}
							<div className="space-y-3 md:col-span-2">
								<label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
									<Briefcase className="w-4 h-4 text-[#2068A6]" />
									Cargo / Posición *
								</label>
								<div className="relative">
									<input
										type="text"
										name="cargo"
										value={formData.cargo}
										onChange={handleInputChange}
										className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-[#2068A6] transition-all duration-200 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
										placeholder="Ej: Auditor Interno, Especialista en Calidad, etc."
										required
									/>
								</div>
							</div>

							{/* Campos adicionales que podrías agregar */}
							{/* 
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <Envelope className="w-4 h-4 text-[#2068A6]" /> 
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-[#2068A6] transition-all duration-200 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
                placeholder="ejemplo@empresa.com"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <Phone className="w-4 h-4 text-[#2068A6]" /> 
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-[#2068A6] transition-all duration-200 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
                placeholder="+1 234 567 8900"
              />
            </div>
            */}
						</div>

						{/* Botones Mejorados */}
						<div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
							<button
								type="button"
								onClick={handleCancel}
								disabled={loading}
								className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400 dark:hover:border-gray-500"
							>
								Cancelar
							</button>

							<button
								type="submit"
								disabled={loading}
								className="bg-[#2068A6] text-white px-6 py-3 rounded-lg hover:bg-[#1a568c] transition-all duration-200 flex items-center gap-2 font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px] justify-center"
							>
								{loading ? (
									<>
										<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
										{profesionalEditando ? "Actualizando..." : "Creando..."}
									</>
								) : (
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
