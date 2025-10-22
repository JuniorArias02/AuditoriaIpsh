import { useState } from "react";
import { LayoutDashboard, FilePlus2, ClipboardList,Newspaper, Stethoscope, BarChart3, Users, Building2, Settings, Contact } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import PAGES_ROUTES from "../routes/routers";
import Auditoria from "./components/Auditoria";
export default function Sidebar({ open, setOpen }) {
	// const [open, setOpen] = useState(true);
	const location = useLocation();
	const menus = [
		{ name: "Dashboard", icon: LayoutDashboard, path: PAGES_ROUTES.DASHBOARD },
		{ name: "Nueva Auditoría", icon: FilePlus2, path: PAGES_ROUTES.AUDITORIA.NUEVA_AUDITORIA },
		{ name: "Formulario Auditoria", icon: Newspaper, path:PAGES_ROUTES.FORMULARIO.CREAR },
		{ name: "Formularios", icon: Stethoscope, path: PAGES_ROUTES.FORMULARIO.ROOT },
		{ name: "Auditorías", icon: ClipboardList, path: "/auditorias" },
		{ name: "Reportes", icon: BarChart3, path: "/reportes" },
		{ name: "Profesionales", icon: Users, path: "/profesionales" },
		{ name: "Pacientes", icon: Stethoscope, path: PAGES_ROUTES.PACIENTE.ROOT },
		{ name: "Sedes", icon: Building2, path: "/sedes" },
		{ name: "Usuarios", icon: Contact, path: PAGES_ROUTES.USUARIO.ROOT },
		{ name: "Configuración", icon: Settings, path: "/configuracion" },
	];

	return (
		<aside className={`bg-white text-gray-700 h-screen ${open ? "w-64" : "w-20"} transition-all duration-300 flex flex-col border-r border-gray-200`}>

			{/* Header del Sidebar */}
			<div className="flex items-center justify-between p-4 border-b border-gray-200">
				{open && (
					<Auditoria />
				)}
				<button
					onClick={() => setOpen(!open)}
					className="p-2 hover:bg-gray-100 rounded-md text-gray-600"
				>
					☰
				</button>
			</div>

			{/* Navegación */}
			<nav className="flex-1 p-3 space-y-2">
				{menus.map(({ name, icon: Icon, path }) => (
					<Link
						key={name}
						to={path}
						className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors 
                            ${location.pathname === path
								? "bg-[#2B6DA6] text-white"
								: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
							}`}
					>
						<Icon size={20} className="flex " />

						<span
							className={`
                                text-sm font-medium 
                                transition-all duration-300 overflow-hidden whitespace-nowrap
                                ${open
									? 'opacity-100 w-full delay-200'
									: 'opacity-0 w-0 delay-0'
								}
                            `}
						>
							{name}
						</span>

					</Link>
				))}
			</nav>
		</aside>
	);
}