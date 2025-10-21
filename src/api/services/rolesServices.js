import axios from "axios";
import { ROLES } from "../config/roles";

export class RolesServices {
  constructor(token) {
    this.token = token;
  }

  async listarRoles() {
    const res = await axios.get(ROLES.LISTAR, {
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
    });
    return res.data;
  }

  static async buscarRolesPorNombre(nombre) {
    if (!nombre) throw new Error("Se requiere un nombre de servicio");
    const res = await axios.get(`${ROLES.OBTENER_POR_NOMBRE}${nombre}`);
    return res.data.data ? [res.data.data] : [];
  }

}
