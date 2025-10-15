import React from "react";
import {
	Calendar,
	User,
	Building,
	Stethoscope,
	FileText,
	UserCheck
} from "lucide-react";

const InformacionGeneral = ({ data }) => {
	if (!data) return null;

	const {
		fechaAuditoria,
		nombreAuditor,
		nombrePaciente,
		pacienteDocumento,
		nombreProfesional,
		servicioNombre,
		sedeCompleta,
		fecha_auditoria,
	} = data;

	// Componente reutilizable para items de información
	const InfoItem = ({ Icon, label, value }) => (
		<div className="flex items-start space-x-3 mb-4">
			<div className="mt-1">
				<Icon className="w-5 h-5 text-blue-600" />
			</div>
			<div className="flex flex-col">
				<span className="text-sm text-gray-500 font-normal">{label}</span>
				<span className="text-base text-gray-700 font-semibold">{value || "—"}</span>
			</div>
		</div>
	);

	return (
		<div className="mx-auto my-8 bg-white shadow-lg rounded-xl border border-gray-100">
			{/* Header */}
			<div className="p-5 border-b border-gray-200">
				<h2 className="text-xl font-semibold text-gray-800">Información General</h2>
			</div>

			{/* Contenido */}
			<div className="p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
					{/* Columna 1 */}
					<div>
						<InfoItem
							Icon={Calendar}
							label="Fecha de Auditoría"
							value={fechaAuditoria || "—"}
						/>
						<InfoItem
							Icon={Stethoscope}
							label="Servicio"
							value={servicioNombre}
						/>
					</div>

					{/* Columna 2 */}
					<div>
						<InfoItem
							Icon={User}
							label="Auditor"
							value={nombreAuditor}
						/>
						<InfoItem
							Icon={FileText}
							label="Paciente"
							value={`${nombrePaciente} (Doc: ${pacienteDocumento})`}
						/>
					</div>

					{/* Columna 3 */}
					<div>
						<InfoItem
							Icon={Building}
							label="Sede"
							value={sedeCompleta}
						/>
						<InfoItem
							Icon={UserCheck}
							label="Profesional Auditado"
							value={nombreProfesional}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InformacionGeneral;