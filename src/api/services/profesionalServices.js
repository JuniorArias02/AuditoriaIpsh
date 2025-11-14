import axios from "axios";
import { PROFESIONAL } from "../config/profesional";
import { header } from "framer-motion/client";

export class ProfesionalServices {
	constructor(token) {
		this.token = token;
	}


	async listarProfesional() {
		const res = await axios.get(PROFESIONAL.LISTAR, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});
		return res.data;
	}

	static async buscarProfesionalPorNombreDocumento(nombre) {
		if (!nombre) throw new Error("Se requiere un nombre de profesional");
		const res = await axios.get(`${PROFESIONAL.OBTENER_POR_NOMBRE_CEDULA}/${nombre}`);
		return res.data.data ? [res.data.data] : [];
	}

	async crearProfesional(form) {
		const res = await axios.post(PROFESIONAL.CREAR, form, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});

		return res.data;
	}

	async actualizarProfesional(id, form) {
		const res = await axios.put(`${PROFESIONAL.ACTUALIZAR}/${id}`, form, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});

		return res.data;
	}


}
