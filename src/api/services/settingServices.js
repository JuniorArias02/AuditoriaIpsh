import axios from "axios";
import { SETTINGS_APP } from "../config/settings";

export class SettingServices {
	constructor(token) {
		this.token = token;
	}

	async cambiarTema(form) {
		const res = await axios.put(SETTINGS_APP.cambiarTema, form, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});
		return res.data;
	}

	async obtenerConfiguracion() {
		const res = await axios.get(SETTINGS_APP.obtenerConfiguracion, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});
		return res.data;
	}

	async obtenerConfigNotificacion() {
		const res = await axios.get(SETTINGS_APP.obtenerConfigNotificacion, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});
		return res.data;
	}

	async actualizarNotificaciones(config) {
		const res = await axios.put(SETTINGS_APP.actualizarConfigNotificacion, config, {
			headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
		});
		return res.data;
	}


}
