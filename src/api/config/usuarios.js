import { API_BASE } from "./apiBase";

export const USUARIOS = {
  LISTAR: `${API_BASE}/usuarios`,
  OBTENER: `${API_BASE}/usuarios/`,
  OBTENER_POR_NOMBRE:`${API_BASE}/usuarios/nombre/`,
  CREAR: `${API_BASE}/usuarios`,
  VALIDAR_USUARIO: `${API_BASE}/usuarios/validarUsuario`,
  CAMBIAR_CONTRASENA: `${API_BASE}/usuarios/nuevaContrasena`,

};
