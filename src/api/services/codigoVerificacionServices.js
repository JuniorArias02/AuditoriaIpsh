import axios from "axios";
import { CODIGO_VERIFICACION } from "../config/codigoVerificacion";

export class CodigoVerificacionServices {
	constructor(token) {
		this.token = token;
	}

	async validarCodigo(form) {
		const res = await axios.post(CODIGO_VERIFICACION.VALIDAR_CODIGO, form);
		return res.data;
	}
}
