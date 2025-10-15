import axios from "axios";
import { DIMENCIONES } from "../config/dimenciones";
import { useAuth } from "../../store/AuthContext";

export class DimencionesServices {
	constructor(token) {
		this.token = token;
	}



	static async obtenerCriterios() {
		const res = await axios.get(`${DIMENCIONES.OBTENER_CRITERIOS}`);
		return res.data;
	}




}