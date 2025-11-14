import { useState } from "react";
import CrearProfesional from "../components/CrearProfesional";
import ListadoProfesionales from "../components/ListadoProfesionales";

function VistaProfesional() {
	const [profesionalEditando, setProfesionalEditando] = useState(null);

	return (
		<div>
			<CrearProfesional
				profesionalEditando={profesionalEditando}
				onCancelEdit={() => setProfesionalEditando(null)}
			/>
			<div className="mt-4"></div>
			<ListadoProfesionales onEditarProfesional={setProfesionalEditando} />
		</div>
	);
}

export default VistaProfesional;
