import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { FormularioAuditoriaService } from "../../../../../api/services/formularioAuditoriaServices";
import { useAuth } from "../../../../../store/AuthContext";

function FormularioAuditoriaInput({ form, setForm }) {
	const { token } = useAuth();
	const formularioAuditoriaService = new FormularioAuditoriaService(token);

	const [formularios, setFormularios] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchFormularios = async () => {
			setLoading(true);
			try {
				const res = await formularioAuditoriaService.listarFormularioAuditoria();
				if (res.success) setFormularios(res.data);
			} catch (err) {
				console.error("Error cargando formularios:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchFormularios();
	}, []);

	const handleChange = (e) => {
		const id = e.target.value;
		setForm({ ...form, formulario_auditoria_id: id });
	};

	return (
		<div className="mb-4">
			<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
				Formulario de Auditoría
			</label>
			<div className="relative">
				<select
					value={form.formulario_auditoria_id || ""}
					onChange={handleChange}
					className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
					disabled={loading}
				>
					<option value="">Selecciona un formulario...</option>
					{formularios.map((f) => (
						<option key={f.id} value={f.id} className="text-gray-900 dark:text-white bg-white dark:bg-gray-700">
							{f.nombre_formulario}
						</option>
					))}
				</select>

				{loading && (
					<Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
				)}
			</div>
		</div>
	);
}

export default FormularioAuditoriaInput;
