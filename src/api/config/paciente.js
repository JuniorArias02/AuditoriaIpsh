import { API_BASE } from "./apiBase";

export const PACIENTE = {
	LISTAR: `${API_BASE}/pacientes/listar`,
	OBTENER: `${API_BASE}/pacientes/`,
	OBTENER_POR_NOMBRE_CEDULA: `${API_BASE}/pacientes/filtro`,
	CREAR: `${API_BASE}/pacientes`,
};
