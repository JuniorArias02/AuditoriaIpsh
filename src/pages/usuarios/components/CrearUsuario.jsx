import { useState, useEffect } from "react";
import { useAuth } from "../../../store/AuthContext";
import { UsuariosServices } from "../../../api/services/usuariosServices";
import { RolesServices } from "../../../api/services/rolesServices";
import {
	Plus,
	User,
	Mail,
	UserCircle,
	Shield,
	Eye,
	EyeOff,
	X,
	Save
} from "lucide-react";
import Swal from "sweetalert2";

function CrearUsuario() {
	const { token } = useAuth();
	const [isExpanded, setIsExpanded] = useState(false);
	const [loading, setLoading] = useState(false);
	const [roles, setRoles] = useState([]);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [formData, setFormData] = useState({
		nombre_completo: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		rol_id: ""
	});

	const usuariosServices = new UsuariosServices(token);
	const rolesServices = new RolesServices(token);

	useEffect(() => {
		if (isExpanded) {
			cargarRoles();
		}
	}, [isExpanded]);

	const cargarRoles = async () => {
		try {
			const response = await rolesServices.listarRoles();
			if (response.success) {
				setRoles(response.data);
			}
		} catch (error) {
			console.error("Error cargando roles:", error);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validaciones
		if (formData.password !== formData.confirmPassword) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Las contraseñas no coinciden',
				confirmButtonColor: '#2068A6'
			});
			return;
		}

		if (formData.password.length < 6) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'La contraseña debe tener al menos 6 caracteres',
				confirmButtonColor: '#2068A6'
			});
			return;
		}

		if (!formData.rol_id) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Por favor selecciona un rol',
				confirmButtonColor: '#2068A6'
			});
			return;
		}

		setLoading(true);

		try {
			const usuarioData = {
				nombre_completo: formData.nombre_completo,
				username: formData.username,
				email: formData.email,
				password: formData.password,
				rol_id: parseInt(formData.rol_id)
			};

			const response = await usuariosServices.crearUsuario(usuarioData);

			if (response.success) {
				Swal.fire({
					icon: 'success',
					title: '¡Éxito!',
					text: 'Usuario creado correctamente',
					confirmButtonColor: '#2068A6'
				});

				// Reset form
				setFormData({
					nombre_completo: "",
					username: "",
					email: "",
					password: "",
					confirmPassword: "",
					rol_id: ""
				});

				setIsExpanded(false);
			} else {
				throw new Error(response.message || 'Error al crear usuario');
			}
		} catch (error) {
			console.error('Error creando usuario:', error);
			const mensajeError =
				error.response?.data?.error ||
				error.response?.data?.message ||
				error.message ||
				'Error al crear el usuario';

			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: mensajeError,
				confirmButtonColor: '#2068A6'
			});
		}
		finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		setFormData({
			nombre_completo: "",
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			rol_id: ""
		});
		setIsExpanded(false);
	};

	return (
		<div className={`bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-300 ${isExpanded ? 'mx-auto' : 'duration-300'
			}`}>

			{/* Header - Siempre visible */}
			<div className="px-6 py-4 border-b border-gray-200">
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-2xl font-bold text-gray-900">Usuarios</h2>
						<p className="text-gray-600 mt-1">
							{isExpanded ? 'Completa la información del nuevo usuario' : 'Gestión de usuarios del sistema'}
						</p>
					</div>

					{!isExpanded ? (
						<button
							onClick={() => setIsExpanded(true)}
							className="bg-[#2068A6] text-white px-4 py-2 rounded-lg hover:bg-[#1a568c] transition-colors flex items-center gap-2"
						>
							<Plus className="w-4 h-4" />
							Crear Usuario
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

			{/* Formulario - Solo visible cuando está expandido */}
			{isExpanded && (
				<div className="p-6">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

							{/* Nombre Completo */}
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
									placeholder="Ingresa el nombre completo"
								/>
							</div>

							{/* Username */}
							<div className="space-y-2">
								<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
									<UserCircle className="w-4 h-4" />
									Nombre de Usuario *
								</label>
								<input
									type="text"
									name="username"
									value={formData.username}
									onChange={handleInputChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent transition-colors"
									placeholder="Ingresa el nombre de usuario"
								/>
							</div>

							{/* Email */}
							<div className="space-y-2">
								<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
									<Mail className="w-4 h-4" />
									Correo Electrónico *
								</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent transition-colors"
									placeholder="usuario@ejemplo.com"
								/>
							</div>

							{/* Rol */}
							<div className="space-y-2">
								<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
									<Shield className="w-4 h-4" />
									Rol *
								</label>
								<select
									name="rol_id"
									value={formData.rol_id}
									onChange={handleInputChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent transition-colors"
								>
									<option value="">Selecciona un rol</option>
									{roles.map(rol => (
										<option key={rol.id} value={rol.id}>
											{rol.nombre}
										</option>
									))}
								</select>
							</div>

							{/* Contraseña */}
							<div className="space-y-2">
								<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
									Contraseña *
								</label>
								<div className="relative">
									<input
										type={showPassword ? "text" : "password"}
										name="password"
										value={formData.password}
										onChange={handleInputChange}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent transition-colors pr-10"
										placeholder="Mínimo 6 caracteres"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
									>
										{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
									</button>
								</div>
							</div>

							{/* Confirmar Contraseña */}
							<div className="space-y-2">
								<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
									Confirmar Contraseña *
								</label>
								<div className="relative">
									<input
										type={showConfirmPassword ? "text" : "password"}
										name="confirmPassword"
										value={formData.confirmPassword}
										onChange={handleInputChange}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent transition-colors pr-10"
										placeholder="Confirma tu contraseña"
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
									>
										{showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
									</button>
								</div>
							</div>
						</div>

						{/* Botones de acción */}
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
								{loading ? 'Creando...' : 'Crear Usuario'}
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}

export default CrearUsuario;