import ListadoPacientes from "../components/ListadoPacientes";
import CrearPaciente from "../components/CrearPaciente";
function VistaPacientes() {
	return (
		<div>
			
			<CrearPaciente />
			<div className="mt-4"></div>
			<ListadoPacientes />
		</div>
	);
}

export default VistaPacientes;
