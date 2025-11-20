import ServicioInput from "./buscadoresInput/ServicioInput";
import SedeInput from "./buscadoresInput/SedeInput";
import PacienteInput from "./buscadoresInput/PacienteInput";
import ProfesionalInput from "./buscadoresInput/Profesionalnput";
import FormularioAuditoriaInput from "./buscadoresInput/FormularioAuditoriaInput";
import { Calendar, ClipboardList } from "lucide-react";

function DatosBasicosAuditoria({ form, setForm }) {
	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none">
			{/* Header de la sección */}
			<div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
				<div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
					<ClipboardList className="w-5 h-5 text-blue-600 dark:text-blue-400" />
				</div>
				<div>
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white">Datos Básicos de la Auditoría</h2>
					<p className="text-sm text-gray-500 dark:text-gray-400">Complete la información fundamental del proceso de auditoría</p>
				</div>
			</div>

			{/* Grid de campos */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Fechas */}
				<div className="space-y-4">
					<FormularioAuditoriaInput form={form} setForm={setForm} />
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							<span className="flex items-center gap-2">
								<Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
								Fecha de Auditoría
							</span>
						</label>
						<input
							type="date"
							name="fecha_auditoria"
							value={form.fecha_auditoria}
							onChange={handleChange}
							className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							<span className="flex items-center gap-2">
								<Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
								Fecha de Atención
							</span>
						</label>
						<input
							type="date"
							name="fecha_atencion"
							value={form.fecha_atencion}
							onChange={handleChange}
							className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
						/>
					</div>
				</div>

				{/* Buscadores - Columna derecha */}
				<div className="space-y-4">
					<ServicioInput form={form} setForm={setForm} />
					<SedeInput form={form} setForm={setForm} />
				</div>
			</div>

			{/* Segunda fila de buscadores */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
				<PacienteInput form={form} setForm={setForm} />
				<ProfesionalInput form={form} setForm={setForm} />
			</div>
		</div>
	);
}

export default DatosBasicosAuditoria;