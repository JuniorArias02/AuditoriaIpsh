import { API_BASE } from "./apiBase";

export const PACIENTE = {
	LISTAR: `${API_BASE}/pacientes`,
	OBTENER: `${API_BASE}/pacientes/`,
	OBTENER_POR_NOMBRE_CEDULA: `${API_BASE}/pacientes/filtro`,
};
