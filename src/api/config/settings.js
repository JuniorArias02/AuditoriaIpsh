import { API_BASE } from "./apiBase";

export const SETTINGS_APP = {
  cambiarTema: `${API_BASE}/userSetting/tema`,
  obtenerConfiguracion: `${API_BASE}/userSetting`,
  obtenerConfigNotificacion: `${API_BASE}/userSetting/notificacion`,
  actualizarConfigNotificacion: `${API_BASE}/userSetting/notificaciones`,

};
