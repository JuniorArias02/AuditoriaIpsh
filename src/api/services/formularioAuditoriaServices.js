import axios from "axios";
import { FORMULARIO_AUDITORIA } from "../config/formularioAuditoria";
import { useAuth } from "../../store/AuthContext";

export class FormularioAuditoriaService {
	constructor(token) {
		this.token = token;
	}

	async listarFormularioAuditoria() {
		const res = await axios.get(`${FORMULARIO_AUDITORIA.LISTAR}`, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});
		return res.data;
	}

	async crearFormularioAuditoria(formulario) {
		const res = await axios.post(`${FORMULARIO_AUDITORIA.CREAR}`, formulario, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});
		return res.data;
	}

	async obtenerFormularioAuditoriaPorId(id) {
		const res = await axios.get(`${FORMULARIO_AUDITORIA.OBTENER_DATOS_FORMULARIO}/${id}`, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});
		return res.data;
	}

	async actualizarFormulario(formulario) {
		const res = await axios.put(`${FORMULARIO_AUDITORIA.ACTUALIZAR}`, formulario, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});
		return res.data;
	}


}