import { LogOut } from "lucide-react";
import Auditoria from "./components/Auditoria";

export default function Navbar({ onLogout, sidebarOpen }) {
	return (
		<nav className="w-full bg-white text-gray-800 flex items-center justify-between px-6 py-3 border-b border-gray-200 shadow-sm">
			<div className="min-w-[180px] flex justify-start">
				{!sidebarOpen ? <Auditoria /> : <div className="h-6" />}
			</div>

			{/* Botón de cerrar sesión */}
			<button
				onClick={onLogout}
				className="flex items-center gap-2 text-gray-600 hover:text-red-600 p-2 rounded-lg transition-all duration-200 hover:bg-red-50"
				title="Cerrar sesión"
			>
				<LogOut size={20} />
			</button>
		</nav>
	);
}
