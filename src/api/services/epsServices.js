import axios from "axios";
import { EPS } from "../config/eps";
import { useAuth } from "../../store/AuthContext";

export class EpsService {
	constructor(token) {
		this.token = token;
	}

	async listarEps() {
		const res = await axios.get(`${EPS.LISTAR}`);
		return res.data;
	}


}