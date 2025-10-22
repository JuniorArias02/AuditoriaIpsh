import { LayoutDashboard, FilePlus2, ClipboardList, Newspaper, Stethoscope, BarChart3, Users, Building2, Settings, Contact } from "lucide-react";
import PAGES_ROUTES from "../../routes/routers";

export const sidebarMenus = [
  { name: "Dashboard", icon: LayoutDashboard, path: PAGES_ROUTES.DASHBOARD },
  { name: "Nueva Auditoría", icon: FilePlus2, path: PAGES_ROUTES.AUDITORIA.NUEVA_AUDITORIA },
  { name: "Formulario Auditoria", icon: Newspaper, path: PAGES_ROUTES.FORMULARIO.CREAR },
  { name: "Formularios", icon: Stethoscope, path: PAGES_ROUTES.FORMULARIO.ROOT },
  { name: "Auditorías", icon: ClipboardList, path: "/auditorias" },
  { name: "Reportes", icon: BarChart3, path: "/reportes" },
  { name: "Profesionales", icon: Users, path: "/profesionales" },
  { name: "Pacientes", icon: Stethoscope, path: PAGES_ROUTES.PACIENTE.ROOT },
  { name: "Sedes", icon: Building2, path: "/sedes" },
  { name: "Usuarios", icon: Contact, path: PAGES_ROUTES.USUARIO.ROOT },
  { name: "Configuración", icon: Settings, path: "/configuracion" },
];
