import { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { autenticar } from "../../../api/services/authServices";
import { useAuth } from "../../../store/AuthContext";
import { useNavigate } from "react-router-dom";
import PAGES_ROUTES from "../../../routes/routers";

export default function LoginForm({ onForgotPassword }) {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [form, setForm] = useState({ identificador: "", password: "" });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		if (error) setError(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const res = await autenticar(form);
			if (res.success) {
				login({ token: res.token, user: res.user });
				navigate(PAGES_ROUTES.DASHBOARD);
			} else {
				setError(res.message || "Credenciales incorrectas");
			}
		} catch {
			setError("Error al conectar con el servidor");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="mt-8 space-y-6">
			{error && (
				<div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
					{error}
				</div>
			)}

			<div className="space-y-4">
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<User className="h-5 w-5 text-gray-400" />
					</div>
					<input
						type="text"
						name="identificador"
						placeholder="Usuario"
						value={form.identificador}
						onChange={handleChange}
						className="block w-full pl-10 pr-3 py-4 border-0 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
						required
						disabled={loading}
					/>
				</div>

				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Lock className="h-5 w-5 text-gray-400" />
					</div>
					<input
						type={showPassword ? "text" : "password"}
						name="password"
						placeholder="Contraseña"
						value={form.password}
						onChange={handleChange}
						className="block w-full pl-10 pr-12 py-4 border-0 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
						required
						disabled={loading}
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
					>
						{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
					</button>
				</div>
			</div>

			<button
				type="submit"
				disabled={loading}
				className="w-full bg-[#2068A6] hover:bg-[#1E5C8C] dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-4 px-4 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
			>
				{loading ? (
					<div className="flex items-center justify-center gap-2">
						<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
						Iniciando sesión...
					</div>
				) : (
					"Iniciar Sesión"
				)}
			</button>

			<div className="text-center pt-4">
				<button
					type="button"
					onClick={onForgotPassword}
					className="text-[#2068A6] hover:text-[#1a5a8a] dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm cursor-pointer"
				>
					¿Olvidaste tu contraseña?
				</button>
			</div>
		</form>
	);
}
