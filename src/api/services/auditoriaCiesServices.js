import axios from "axios";
import { AUDITORIA_CIES } from "../config/auditoriaCies";

export class AuditoriaCiesServices {
	constructor(token) {
		this.token = token;
	}

	async crearAuditoriaCies(form) {
		const res = await axios.post(AUDITORIA_CIES.CREAR, form, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});
		return res.data;
	}
}
