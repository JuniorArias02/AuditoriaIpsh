const DASHBOARD = "/dashboard";

const PAGES_ROUTES = {
  ERROR_404: "/404",
  ERROR_403: "/403",
  PAGINA_CONSTRUCCION: "/construccion",
  PAGINA_MANTENIMIENTO: "/mantenimiento",
  LOGIN: "/",

  DASHBOARD: "/dashboard",

  USER: {
    PERFIL: {
      ROOT: `${DASHBOARD}/perfil`,
    },
  },


  AUDITORIA: {
    NUEVA_AUDITORIA: "/NuevaAuditoria",
    AUDITORIAS: "/Auditorias",
    DETALLE_AUDITORIA: "/DetalleAuditoria"
  },

  FORMULARIO: {
    CREAR: "/CrearFormularioAuditoria",
    ROOT: "/FormulariosAuditorias",
    EDITAR: "/EditarFormularioAuditoria",
  },

  USUARIO: {
    ROOT: `${DASHBOARD}/usuarios`,
    CREAR: `${DASHBOARD}/usuario/crear`,
    DETALLE: `${DASHBOARD}/usuario/detalle`,
    LISTAR: `${DASHBOARD}/usuario/listar`,
  },

  PACIENTE: {
    ROOT: `${DASHBOARD}/pacientes`,
    CREAR: `${DASHBOARD}/paciente/crear`,
    DETALLE: `${DASHBOARD}/paciente/detalle`,
    LISTAR: `${DASHBOARD}/paciente/listar`,
  },

};

export default PAGES_ROUTES;