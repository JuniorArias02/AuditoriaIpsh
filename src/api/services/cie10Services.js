import axios from "axios";
import { CIE10 } from "../config/cie10";
import { useAuth } from "../../store/AuthContext";

export class Cie10Services {
	constructor(token) {
		this.token = token;
	}

	async obtenerCie10(id) {
		if (!id) throw new Error("Se requiere un ID de paciente");
		const res = await axios.get(`${CIE10.OBTENER}/${id}`);
		return res.data;
	}

	async listarCie10() {
		const res = await axios.get(`${CIE10.LISTAR}`);
		return res.data;
	}

	static async buscarCie10PorCodgioDescripcion(nombre) {
		if (!nombre) throw new Error("Se requiere un nombre de profesional");
		const res = await axios.get(`${CIE10.OBTENER_POR_CODIGO_DESCRIPCION}/${nombre}`);
		return res.data.data ? [res.data.data] : [];
	}


}