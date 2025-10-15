import axios from "axios";
import { PROFESIONAL } from "../config/profesional";

export class ProfesionalServices {

	async listarProfesional() {
		const res = await axios.get(PROFESIONAL.LISTAR);
		return res.data;
	}

	static async buscarProfesionalPorNombreDocumento(nombre) {
		if (!nombre) throw new Error("Se requiere un nombre de profesional");
		const res = await axios.get(`${PROFESIONAL.OBTENER_POR_NOMBRE_CEDULA}/${nombre}`);
		return res.data.data ? [res.data.data] : [];
	}

}
