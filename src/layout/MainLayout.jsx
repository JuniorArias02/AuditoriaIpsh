import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.href = "/";
	};

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
			<div className="flex-1 flex flex-col bg-[#F2F2F2]">
				<Navbar sidebarOpen={sidebarOpen} onLogout={handleLogout} />
				<main className="flex-1 overflow-y-auto p-4">
					{children}
				</main>
			</div>
		</div>
	);
}
