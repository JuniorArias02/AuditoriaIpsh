import axios from "axios";
import { PACIENTE } from "../config/paciente";
import { useAuth } from "../../store/AuthContext";

export class PacienteService {
	constructor(token) {
		this.token = token;
	}

	async listarPacientes(query = "") {
		const url = `${PACIENTE.LISTAR}?query=${encodeURIComponent(query)}`;
		const res = await axios.get(url, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});
		return res.data;
	}



	async crearPaciente(data) {
		const res = await axios.post(`${PACIENTE.CREAR}`, data, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});

		return res.data;
	}

	async obtenerPaciente(id) {
		if (!id) throw new Error("Se requiere un ID de paciente");

		const res = await axios.get(`${PACIENTE.OBTENER}/${id}`, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});

		return res.data;
	}

	async listarPacientes() {
		const res = await axios.get(`${PACIENTE.LISTAR}`, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});

		return res.data;
	}

	static async buscarPorCedulaONombre(texto) {
		const res = await axios.get(`${PACIENTE.OBTENER_POR_NOMBRE_CEDULA}/${texto}`, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});

		return res.data.data ? [res.data.data] : [];
	}



}