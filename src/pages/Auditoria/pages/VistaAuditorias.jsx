import { useState } from "react";
import ListadoAuditorias from "../componets/VistaAuditoria/ListadoAuditorias";
import { AuditCardsContainer } from "../../dashboard/components/AuditCardsContainer";
import FiltrosBusqueda from "../componets/VistaAuditoria/FiltrosBusqueda";
import { useNavigate } from "react-router-dom";
import PAGES_ROUTES from "../../../routes/routers";
function VistaAuditorias() {
	const navigate = useNavigate();
	const [auditoriasFiltradas, setAuditoriasFiltradas] = useState([]);

	return (
		<div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
			<div className="flex justify-between items-start mb-6">
				<div>
					<h1 className="text-2xl font-bold text-gray-800 dark:text-white">Auditorías de Historias Clínicas</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-2">Gestión integral de auditorías del sistema de historias clínicas</p>
				</div>
				<button
					onClick={() => navigate(PAGES_ROUTES.AUDITORIA.NUEVA_AUDITORIA)}
					className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
				>
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
					</svg>
					Crear nueva auditoría
				</button>
			</div>

			<FiltrosBusqueda onFiltrar={setAuditoriasFiltradas} />

			<div className="mt-5"></div>
			<ListadoAuditorias auditoriasExternas={auditoriasFiltradas} />
			<div className="mt-5"></div>
			<AuditCardsContainer />
		</div>
	);
}

export default VistaAuditorias;
