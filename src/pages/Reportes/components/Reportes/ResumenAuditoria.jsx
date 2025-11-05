import MetricCard from "./MetricCard";
import { BarChart3 } from "lucide-react";
import { FileText, Target, Users, Calendar } from "lucide-react";

function ResumenAuditoria({ data }) {
	
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<MetricCard
				icon={FileText}
				title="Total Auditorías"
				value={data.auditorias.actual}
				subtitle="Registros completos"
				trend={data.auditorias.variacion}
			/>
			<MetricCard
				icon={Target}
				title="Cumplimiento Promedio"
				value={`${data.cumplimiento_promedio.actual}%`}
				subtitle="Meta: 90%"
				trend={data.cumplimiento_promedio.variacion}
			/>
			<MetricCard
				icon={Users}
				title="Profesionales Evaluados"
				value={data.profesionales.actual}
				subtitle="Activos"
			/>
			<MetricCard
				icon={Calendar}
				title="Auditorías del Mes"
				value={data.auditorias_mes.actual}
				subtitle="En tiempo real"
				trend={data.auditorias_mes.variacion}
			/>
		</div>

	);
}

export default ResumenAuditoria;