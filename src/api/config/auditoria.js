import { API_BASE } from "./apiBase";

export const AUDITORIA = {
	CREAR: `${API_BASE}/auditoria`,
	OBTENER_INFORME_DASHBOARD: `${API_BASE}/auditoria/informe`,
	AUDITORIAS_RECIENTES: `${API_BASE}/auditoria/recientes`,
	RESUMEN_HOY: `${API_BASE}/auditoria/resumenHoy`,
	METRICAS_CALIDAD: `${API_BASE}/auditoria/metricas`,
	LISTAR_AUDITORIAS: `${API_BASE}/auditoria/listarAuditorias`,
	LISTAR_AUDITORIA_FILTRO: `${API_BASE}/auditoria/listarAuditoriasFiltro`,
	DETALLE_AUDITORIA: `${API_BASE}/auditoria/detalle`,
	DETALLE_AUDITORIA_EVALUACION: `${API_BASE}/auditoria/DetalleEvaluacion`,
	RESUMEN_MENSUAL: `${API_BASE}/auditoria/resumenMensual`,
	REPORTES_AUDITORIAS: `${API_BASE}/reportes/auditoriasCompleto`,
	ELIMINAR: `${API_BASE}/auditoria`,
};
