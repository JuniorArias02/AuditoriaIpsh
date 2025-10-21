import { useState, useEffect } from "react";
import { useAuth } from "../../../store/AuthContext";
import { PacienteService } from "../../../api/services/pacienteServices";
import { EpsService } from "../../../api/services/epsServices";
import {
	Plus,
	User,
	Calendar,
	FileText,
	Shield,
	X,
	Save
} from "lucide-react";
import Swal from "sweetalert2";

function CrearPaciente() {
	const { token } = useAuth();
	const [isExpanded, setIsExpanded] = useState(false);
	const [loading, setLoading] = useState(false);
	const [epsList, setEpsList] = useState([]);

	const [formData, setFormData] = useState({
		documento: "",
		nombre_completo: "",
		fecha_nacimiento: "",
		eps_id: ""
	});

	const pacienteService = new PacienteService(token);
	const epsService = new EpsService(token);

	useEffect(() => {
		if (isExpanded) cargarEps();
	}, [isExpanded]);

	const cargarEps = async () => {
		try {
			const res = await epsService.listarEps();
			setEpsList(res);
		} catch (err) {
			console.error("Error cargando EPS:", err);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validaciones
		if (!formData.documento || !formData.nombre_completo || !formData.fecha_nacimiento || !formData.eps_id) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Por favor completa todos los campos requeridos",
				confirmButtonColor: "#2068A6"
			});
			return;
		}

		setLoading(true);
		try {
			const data = {
				documento: formData.documento,
				nombre_completo: formData.nombre_completo,
				fecha_nacimiento: formData.fecha_nacimiento,
				eps_id: parseInt(formData.eps_id)
			};

			const res = await pacienteService.crearPaciente(data);

			if (res.success) {
				Swal.fire({
					icon: "success",
					title: "¡Éxito!",
					text: "Paciente creado correctamente",
					confirmButtonColor: "#2068A6"
				});

				setFormData({
					documento: "",
					nombre_completo: "",
					fecha_nacimiento: "",
					eps_id: ""
				});
				setIsExpanded(false);
			} else {
				throw new Error(res.message || "Error al crear paciente");
			}
		} catch (error) {
			console.error("Error creando paciente:", error);
			Swal.fire({
				icon: "error",
				title: "Error",
				text: error.response?.data?.message || error.message,
				confirmButtonColor: "#2068A6"
			});
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		setFormData({
			documento: "",
			nombre_completo: "",
			fecha_nacimiento: "",
			eps_id: ""
		});
		setIsExpanded(false);
	};

	return (
		<div className={`bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-300 ${isExpanded ? "mx-auto" : "duration-300"}`}>
			{/* Header */}
			<div className="px-6 py-4 border-b border-gray-200">
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-2xl font-bold text-gray-900">Pacientes</h2>
						<p className="text-gray-600 mt-1">
							{isExpanded ? "Completa la información del nuevo paciente" : "Gestión de pacientes del sistema"}
						</p>
					</div>

					{!isExpanded ? (
						<button
							onClick={() => setIsExpanded(true)}
							className="bg-[#2068A6] text-white px-4 py-2 rounded-lg hover:bg-[#1a568c] transition-colors flex items-center gap-2"
						>
							<Plus className="w-4 h-4" />
							Crear Paciente
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
			</div>

			{/* Formulario */}
			{isExpanded && (
				<div className="p-6">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Documento */}
							<div className="space-y-2">
								<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
									<FileText className="w-4 h-4" />
									Documento *
								</label>
								<input
									type="text"
									name="documento"
									value={formData.documento}
									onChange={handleInputChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent transition-colors"
									placeholder="Número de documento"
								/>
							</div>

							{/* Nombre completo */}
							<div className="space-y-2">
								<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
									<User className="w-4 h-4" />
									Nombre Completo *
								</label>
								<input
									type="text"
									name="nombre_completo"
									value={formData.nombre_completo}
									onChange={handleInputChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent transition-colors"
									placeholder="Nombre completo del paciente"
								/>
							</div>

							{/* Fecha de nacimiento */}
							<div className="space-y-2">
								<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
									<Calendar className="w-4 h-4" />
									Fecha de Nacimiento *
								</label>
								<input
									type="date"
									name="fecha_nacimiento"
									value={formData.fecha_nacimiento}
									onChange={handleInputChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent transition-colors"
								/>
							</div>

							{/* EPS */}
							<div className="space-y-2">
								<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
									<Shield className="w-4 h-4" />
									EPS *
								</label>
								<select
									name="eps_id"
									value={formData.eps_id}
									onChange={handleInputChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent transition-colors"
								>
									<option value="">Selecciona una EPS</option>
									{epsList.map((e) => (
										<option key={e.id} value={e.id}>
											{e.nombre}
										</option>
									))}
								</select>
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
								<Save className="w-4 h-4" />
								{loading ? "Creando..." : "Crear Paciente"}
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}

export default CrearPaciente;
