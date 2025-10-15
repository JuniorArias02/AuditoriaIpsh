// FormAuditoria.jsx
import { useState, useCallback, useEffect } from "react";
import { Save, PlusCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatosBasicosAuditoria from "../componets/FormAuditoria/DatosBasicosAuditoria";
import { AuditoriaServices } from "../../../api/services/auditoriaServices";
import DiagnosticoMedico from "../componets/FormAuditoria/DiagnosticosMedicos";
import EvaluacionesCriterio from "../componets/FormAuditoria/EvaluacionesCriterios"
import { AuditoriaCiesServices } from "../../../api/services/auditoriaCiesServices";
import { RespuestasServices } from "../../../api/services/respuestasServices";
import { useAuth } from "../../../store/AuthContext";
import Swal from 'sweetalert2';

function FormAuditoria() {
	const { user, token } = useAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		creador_id: user ? user.id : null,
		fecha_auditoria: "",
		fecha_atencion: "",
		servicio_auditado: "",
		paciente_id: "",
		sede_id: "",
		profesional_id: "",
		puntaje_total: 0,
		total_criterios: 0,
		porcentaje_cumplimiento: 0,
		cies: [],
		respuestas: []
	});
	const auditoriaData = {
		creador_id: form.creador_id,
		fecha_auditoria: form.fecha_auditoria,
		fecha_atencion: form.fecha_atencion,
		servicio_auditado: form.servicio_auditado,
		paciente_id: form.paciente_id,
		sede_id: form.sede_id,
		profesional_id: form.profesional_id,
		puntaje_total: form.puntaje_total,
		total_criterios: form.total_criterios,
		porcentaje_cumplimiento: form.porcentaje_cumplimiento,
	};

	const handlePuntajeChange = useCallback((valores) => {
		setForm(prev => ({ ...prev, ...valores }));
	}, []);
	useEffect(() => {
		if (user) {
			setForm(prev => ({ ...prev, creador_id: user.id }));
		}
	}, [user]);
	const respuestaServices = new RespuestasServices(token);
	const auditoriaServices = new AuditoriaServices(token);
	const auditoriaCiesServices = new AuditoriaCiesServices(token);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			console.log("📤 Enviando auditoría principal:", auditoriaData);
			const res = await auditoriaServices.crearAuditoria(auditoriaData);

			if (!res.success) {
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'No se pudo crear la auditoría principal',
				});
				return;
			}

			const auditoriaId = res.auditoria_id;
			console.log("✅ Auditoría creada:", auditoriaId);

			// 🔹 Diagnósticos (CIES)
			if (form.cies.length > 0) {
				const auditoriaCiesData = form.cies.map(cie => ({
					auditorias_id: auditoriaId,
					cie10_id: cie.id
				}));

				await Promise.all(
					auditoriaCiesData.map(data => auditoriaCiesServices.crearAuditoriaCies(data))
				);

				console.log("✅ Diagnósticos guardados");
			}

			// 🔹 Respuestas
			if (form.respuestas.length > 0) {
				const respuestasData = form.respuestas.map(r => ({
					auditoria_id: auditoriaId,
					criterio_id: r.criterio_id,
					puntaje: r.puntaje,
					observaciones: r.observaciones
				}));

				await Promise.all(
					respuestasData.map(data => respuestaServices.crearRespuesta(data))
				);

				console.log("✅ Respuestas guardadas");
			}

			Swal.fire({
				icon: 'success',
				title: '¡Éxito!',
				text: 'Auditoría, diagnósticos y respuestas creados exitosamente',
				timer: 2500,
				showConfirmButton: false
			});

			// 🔹 Limpiar formulario
			setForm({
				fecha_auditoria: "",
				fecha_atencion: "",
				servicio_auditado: "",
				paciente_id: "",
				sede_id: "",
				profesional_id: "",
				puntaje_total: 0,
				total_criterios: 0,
				porcentaje_cumplimiento: 0,
				cies: [],
				respuestas: []
			});

		} catch (error) {
			console.error("🚨 Error creando auditoría:", error);

			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Error en la petición. Intente nuevamente'
			});

		} finally {
			setLoading(false);
		}
	};



	const handleCancel = () => {
		if (window.confirm("¿Está seguro de que desea cancelar? Los datos no guardados se perderán.")) {
			navigate(-1);
		}
	};

	return (
		<div className="py-8">
			<div className="max-w-5/6 mx-auto px-4">

				<div className="mb-8">
					<button
						onClick={handleCancel}
						className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
					>
						<ArrowLeft className="w-4 h-4" />
						Volver
					</button>

					<div className="flex items-center gap-3">
						<div className="bg-blue-100 p-3 rounded-xl">
							<PlusCircle className="w-8 h-8 text-blue-600" />
						</div>
						<div>
							<h1 className="text-2xl font-bold text-gray-900">Nueva Auditoría</h1>
							<p className="text-gray-600 mt-1">Complete la información para crear una nueva auditoría de historia clínica</p>
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<DatosBasicosAuditoria form={form} setForm={setForm} />
					<DiagnosticoMedico form={form} setForm={setForm} />
					<EvaluacionesCriterio
						onPuntajeChange={handlePuntajeChange}
					/>
					<div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200">
						<button
							type="button"
							onClick={handleCancel}
							className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
							disabled={loading}
						>
							Cancelar
						</button>

						<button
							type="submit"
							disabled={loading}
							className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? (
								<>
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
									Guardando...
								</>
							) : (
								<>
									<Save className="w-4 h-4" />
									Guardar Auditoría
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default FormAuditoria;