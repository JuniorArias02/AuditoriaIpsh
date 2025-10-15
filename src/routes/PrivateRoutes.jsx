import { Route } from "react-router-dom";
import { Dashboard } from "../pages/dashboard/Dashboard";
import FormAuditoria from "../pages/Auditoria/pages/FormAuditoria"
import PAGES_ROUTES from "./routers";
import VistaAuditorias from "../pages/Auditoria/pages/VistaAuditorias";
import VistaDetalleAuditoria from "../pages/Auditoria/pages/VistaDetalleAuditoria";
import VistaUsuarios from "../pages/usuarios/page/VistaUsuarios";
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
];
