import axios from "axios";
import { USUARIOS } from "../config/usuarios";

export class UsuariosServices {
	constructor(token) {
		this.token = token;
	}

	async listarUsuarios() {
		const res = await axios.get(USUARIOS.LISTAR, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});

		return res.data.data;
	}

	async crearUsuario(form) {
		const res = await axios.post(USUARIOS.CREAR, form, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});

		return res.data;
	}

	async validarUsuario(form) {
		try {
			const res = await axios.post(USUARIOS.VALIDAR_USUARIO, form);
			return res.data;
		} catch (error) {
			if (error.response) {
				return error.response.data;
			}
			return {
				success: false,
				message: 'Error de conexión con el servidor'
			};
		}
	}

	async cambiarContrasena(form) {
		try {
			const res = await axios.patch(USUARIOS.CAMBIAR_CONTRASENA, form);
			return res.data;
		} catch (error) {
			if (error.response) {
				return error.response.data;
			}
			return {
				success: false,
				message: 'Error de conexión con el servidor'
			};
		}
	}


}
