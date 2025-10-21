import axios from "axios";
import { SEDES } from "../config/sedes";

export class SedesServices {

	static async listarSedes() {
		const res = await axios.get(SEDES.LISTAR);
		return res.data;
	}

	static async buscarSedePorNombre(nombre) {
		if (!nombre) throw new Error("Se requiere un nombre de servicio");
		const res = await axios.get(`${SEDES.OBTENER_POR_NOMBRE}${nombre}`);
		return res.data.data ? [res.data.data] : [];
	}
	

}
