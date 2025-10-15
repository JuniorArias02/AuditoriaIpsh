import ListadoUsuarios from "../components/ListadoUsuarios";
import CrearUsuario from "../components/CrearUsuario";
function VistaUsuarios() {
	return (
		<div>
			
			<CrearUsuario />
			<div className="mt-4"></div>
			<ListadoUsuarios />
		</div>
	);
}

export default VistaUsuarios;
