import axios from "axios";
import { RESPUESTAS } from "../config/respuesta";

export class RespuestasServices {
	constructor(token) {
		this.token = token;
	}

	async crearRespuesta(form) {
		const res = await axios.post(RESPUESTAS.CREAR, form, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});

		return res.data;
	}

}
