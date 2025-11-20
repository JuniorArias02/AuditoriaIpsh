import { sidebarMenus } from "./sidebarMenus";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function SidebarMobile({ open, setOpen }) {
	const location = useLocation();

	return (
		<div className="md:hidden">
			<button
				onClick={() => setOpen(!open)}
				className="p-3 fixed top-3 left-3 z-50 bg-white dark:bg-gray-800 rounded-full shadow dark:shadow-gray-900"
			>
				{open ? <X className="text-gray-900 dark:text-white" /> : <Menu className="text-gray-900 dark:text-white" />}
			</button>

			<div
				className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900 z-40 transition-transform duration-300 ${
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
									? "bg-[#2B6DA6] dark:bg-blue-600 text-white"
									: "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
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
					className="fixed inset-0 bg-black/40 dark:bg-black/60 z-30"
					onClick={() => setOpen(false)}
				></div>
			)}
		</div>
	);
}