import axios from "axios";
import { FORMULARIO_DIMENCIONES } from "../config/formularioDimenciones";

export class FormularioDimensionesServices {
	constructor(token) {
		this.token = token;
	}

	async obtenerFormularioDimensionesPorFormulario(formulario_auditoria_id) {
		const res = await axios.get(`${FORMULARIO_DIMENCIONES.OBTENER_POR_FORMULARIO}/${formulario_auditoria_id}`, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});
		return res.data?.data || [];
	}

}
