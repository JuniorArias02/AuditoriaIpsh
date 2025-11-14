import { Route } from "react-router-dom";
import { Dashboard } from "../pages/dashboard/Dashboard";
import FormAuditoria from "../pages/Auditoria/pages/FormAuditoria"
import PAGES_ROUTES from "./routers";
import VistaAuditorias from "../pages/Auditoria/pages/VistaAuditorias";
import VistaDetalleAuditoria from "../pages/Auditoria/pages/VistaDetalleAuditoria";
import VistaUsuarios from "../pages/usuarios/page/VistaUsuarios";
import VistaPacientes from "../pages/pacientes/page/VistaPacientes";
import CrearFormularioAuditoria from "../pages/formulario/page/CrearFormularioAuditoria";
import VistaFormulariosAuditorias from "../pages/formulario/page/VistaFormulariosAuditorias";
import EditarFormulario from "../pages/formulario/page/EditarFormulario";
import Configuracion from "../pages/configuracion/page/Configuracion";
import Sedes from "../pages/sedes/page/Sedes";
import Profesional from "../pages/profesionales/page/VistaProfesional";
import Reportes from "../pages/Reportes/page/Reportes";
export const privateRoutes = [
	{
		path: PAGES_ROUTES.DASHBOARD,
		element: <Dashboard />,
	},
	{
		path: PAGES_ROUTES.AUDITORIA.NUEVA_AUDITORIA,
		element: <FormAuditoria />,
	},
	{
		path: PAGES_ROUTES.AUDITORIA.AUDITORIAS,
		element: <VistaAuditorias />,
	},
	{
		path: PAGES_ROUTES.AUDITORIA.DETALLE_AUDITORIA,
		element: <VistaDetalleAuditoria />,
	},
	{
		path: PAGES_ROUTES.USUARIO.ROOT,
		element: <VistaUsuarios />,
	},
	{
		path: PAGES_ROUTES.PACIENTE.ROOT,
		element: <VistaPacientes />,
	},
	{
		path: PAGES_ROUTES.FORMULARIO.CREAR,
		element: <CrearFormularioAuditoria />,
	},
	{
		path: PAGES_ROUTES.FORMULARIO.ROOT,
		element: <VistaFormulariosAuditorias />,
	},
	{
		path: PAGES_ROUTES.FORMULARIO.EDITAR,
		element: <EditarFormulario />,
	},
	{
		path: PAGES_ROUTES.CONFIGURACION.ROOT,
		element: <Configuracion />,
	},
	{
		path: PAGES_ROUTES.SEDES.ROOT,
		element: <Sedes />,
	},
	{
		path: PAGES_ROUTES.PROFESIONAL.ROOT,
		element: <Profesional />,
	},
	{
		path: PAGES_ROUTES.REPORTES.ROOT,
		element: <Reportes />,
	},
];
