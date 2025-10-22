import { Link, useLocation } from "react-router-dom";
import { sidebarMenus } from "./sidebarMenus";
import Auditoria from "../components/Auditoria";

export default function SidebarDesktop({ open, setOpen }) {
	const location = useLocation();

	return (
		<aside className={`bg-white text-gray-700 h-screen ${open ? "w-64" : "w-20"} transition-all duration-300 flex flex-col border-r border-gray-200`}>
			<div className="flex items-center justify-between p-4 border-b border-gray-200">
				{open && <Auditoria />}
				<button
					onClick={() => setOpen(!open)}
					className="p-2 hover:bg-gray-100 rounded-md text-gray-600"
				>
					☰
				</button>
			</div>

			<nav className="flex-1 p-3 space-y-2">
				{sidebarMenus.map(({ name, icon: Icon, path }) => (
					<Link
						key={name}
						to={path}
						className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
							location.pathname === path
								? "bg-[#2B6DA6] text-white"
								: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
						}`}
					>
						<Icon size={20} />
						<span
							className={`text-sm font-medium transition-all duration-300 overflow-hidden whitespace-nowrap ${
								open ? "opacity-100 w-full delay-200" : "opacity-0 w-0 delay-0"
							}`}
						>
							{name}
						</span>
					</Link>
				))}
			</nav>
		</aside>
	);
}
