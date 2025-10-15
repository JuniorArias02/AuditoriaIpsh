import React from "react";
import { useAuth } from "../../../store/AuthContext";
import { getGreeting } from "../utils/getGreeting";

export function Header() {
	const { user } = useAuth();
	const greeting = getGreeting();

	const currentDate = new Date().toLocaleDateString("es-ES", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return (
		<header className="text-white p-6 shadow-lg rounded-lg bg-[#1B65A6] mt-5">
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-semibold">
						{greeting}, {user?.nombre_completo}
					</h1>
					<p className="text-sm opacity-90 mt-1">Panel de Administración Del Sistema</p>
				</div>
				<p className="text-lg font-light capitalize">{currentDate}</p>
			</div>
		</header>
	);
}
