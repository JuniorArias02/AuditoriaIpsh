import axios from "axios";
import { CODIGO_VERIFICACION } from "../config/codigoVerificacion";

export class CodigoVerificacionServices {
	constructor(token) {
		this.token = token;
	}

	async validarCodigo(form) {
		try {
			const res = await axios.post(CODIGO_VERIFICACION.VALIDAR_CODIGO, form);
			return res.data;
		} catch (error) {
			if (error.response) {
				// El servidor respondió con un código de error
				return error.response.data;
			}
			// Error de red u otro tipo de error
			return {
				success: false,
				message: 'Error de conexión con el servidor'
			};
		}
	}
}
