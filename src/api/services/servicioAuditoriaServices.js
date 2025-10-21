import axios from "axios";
import { SERVICIO_AUDITORIA } from "../config/servicioAuditoria";

export class ServicioAuditoriaService {

	async listarServiciosAuditoria() {
		const res = await axios.get(SERVICIO_AUDITORIA.LISTAR);
		return res.data;
	}                                                                                                                                                                                                                                                                                                                                                                                                                     


	static async buscarServicioAuditoriaPorNombre(nombre) {
		if (!nombre) throw new Error("Se requiere un nombre de servicio");
		const res = await axios.get(`${SERVICIO_AUDITORIA.OBTENER_POR_NOMBRE}${nombre}`);
		return res.data.data ? [res.data.data] : [];
	}

}
