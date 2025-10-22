import { sidebarMenus } from "./sidebarMenus";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function SidebarMobile({ open, setOpen }) {
	const location = useLocation();

	return (
		<div className="md:hidden">
			<button
				onClick={() => setOpen(!open)}
				className="p-3 fixed top-3 left-3 z-50 bg-white rounded-full shadow"
			>
				{open ? <X /> : <Menu />}
			</button>

			<div
				className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-transform duration-300 ${
					open ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<nav className="flex flex-col p-4 space-y-3 mt-12">
					{sidebarMenus.map(({ name, icon: Icon, path }) => (
						<Link
							key={name}
							to={path}
							onClick={() => setOpen(false)} // cierra el menú al navegar
							className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
								location.pathname === path
									? "bg-[#2B6DA6] text-white"
									: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
							}`}
						>
							<Icon size={20} />
							<span className="text-sm font-medium">{name}</span>
						</Link>
					))}
				</nav>
			</div>

			{open && (
				<div
					className="fixed inset-0 bg-black/40 z-30"
					onClick={() => setOpen(false)}
				></div>
			)}
		</div>
	);
}
