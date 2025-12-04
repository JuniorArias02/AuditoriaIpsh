import axios from "axios";
import { AUDITORIA } from "../config/auditoria";

export class AuditoriaServices {
	constructor(token) {
		this.token = token;
	}

	async crearAuditoria(form) {
		const res = await axios.post(AUDITORIA.CREAR, form, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});

		return res.data;
	}

	async listarAuditorias() {
		const res = await axios.get(AUDITORIA.LISTAR_AUDITORIAS, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});

		return res.data;
	}

	async detalleAuditoria(id) {
		try {
			const res = await axios.get(`${AUDITORIA.DETALLE_AUDITORIA}/${id}`, {
				headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
			});
			return res.data;
		} catch (error) {
			console.error("Error obteniendo detalle de auditoría:", error);
			throw error;
		}
	}

	async detalleAuditoriaEvaluacion(id) {
		try {
			const { data } = await axios.get(`${AUDITORIA.DETALLE_AUDITORIA_EVALUACION}/${id}`, {
				headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
			});
			return data;
		} catch (error) {
			console.error("Error obteniendo detalle de auditoría:", error);
			throw error;
		}
	}


	async listarAuditoriasFiltro(filtros = {}) {
		const res = await axios.get(AUDITORIA.LISTAR_AUDITORIA_FILTRO, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
			params: {
				busqueda: filtros.busqueda || null,
				clasificacion: filtros.clasificacion || null,
				fecha_inicio: filtros.fecha_inicio || null,
				fecha_fin: filtros.fecha_fin || null,
			},
		});

		return res.data;
	}

	static async obtenerInformeAuditoria() {
		const res = await axios.get(AUDITORIA.OBTENER_INFORME_DASHBOARD);
		return res.data
	}

	static async obtenerAuditoriasRecientes() {
		const res = await axios.get(AUDITORIA.AUDITORIAS_RECIENTES);
		return res.data
	}

	async obtenerResumenHoy(fecha) {
		if (!fecha) throw new Error("Se requiere una fecha");
		const res = await axios.get(`${AUDITORIA.RESUMEN_HOY}/${fecha}`);
		const data = res.data || {};

		return {
			auditoriasHoy: Number(data.auditoriasHoy) || 0,
			cumplimiento: Number(parseFloat(data.cumplimiento).toFixed(2)) || 0,
			puntajeMaximo: Number(parseFloat(data.puntajeMaximo).toFixed(2)) || 0,
		};
	}

	static async obtenerMetricasCalidad() {
		const res = await axios.get(AUDITORIA.METRICAS_CALIDAD);
		return res.data;
	}

	async obtenerResumenMensual({ fecha_inicio, fecha_fin }) {
		const res = await axios.get(AUDITORIA.RESUMEN_MENSUAL, {
			params: { fecha_inicio, fecha_fin },
		});
		return res.data;
	}


	async obtenerReportesAuditorias({ fecha_inicio, fecha_fin }) {
		const res = await axios.get(AUDITORIA.REPORTES_AUDITORIAS, {
			params: { fecha_inicio, fecha_fin }
		});
		return res.data;
	}


	async eliminarAuditoria(id) {
		const res = await axios.delete(`${AUDITORIA.ELIMINAR}/${id}`, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});
		return res.data;
	}


}
