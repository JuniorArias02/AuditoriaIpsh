import { useEffect, useState } from "react";
import ResumenAuditoria from "../componets/VistaDetalleAuditoria/ResumenAuditoria";
import InformacionGeneral from "../componets/VistaDetalleAuditoria/InformacionGeneral";
import { useAuth } from "../../../store/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { AuditoriaServices } from "../../../api/services/auditoriaServices";
import EvaluacionAuditoria from "../componets/VistaDetalleAuditoria/EvaluacionAuditoria"
import { Download, ArrowLeft } from "lucide-react";

function VistaDetalleAuditoria() {
	const { token } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const auditoriaBase = location.state?.auditoria;
	const auditoriaService = new AuditoriaServices(token);
	const [detalleAuditoria, setDetalleAuditoria] = useState(null);
	const [evaluacion, setEvaluacion] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!auditoriaBase?.id) return;

		const fetchData = async () => {
			try {
				const detalle = await auditoriaService.detalleAuditoria(auditoriaBase.id);
				const evaluacionData = await auditoriaService.detalleAuditoriaEvaluacion(auditoriaBase.id);
				setDetalleAuditoria(detalle);
				setEvaluacion(evaluacionData);
			} catch (error) {
				console.error("Error cargando detalle de auditoría:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [auditoriaBase?.id]);

	const handleDescargar = () => {
		console.log("Descargando auditoría:", auditoriaBase.id);
	};

	const handleRegresar = () => {
		navigate(-1); 
	};

	if (loading) return <p className="p-6 text-gray-500">Cargando detalle...</p>;

	return (
		<div className="p-6 space-y-6">
			{/* Header con botón de regresar */}
			<div className="flex justify-between items-start mb-2">
				<div className="flex items-center gap-4">
					<button
						onClick={handleRegresar}
						className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
					>
						<ArrowLeft className="w-5 h-5" />
						Regresar
					</button>
					<div className="border-l border-gray-300 h-6"></div>
					<div>
						<h1 className="text-2xl font-bold text-gray-800">Detalle de Auditoría</h1>
						<p className="text-gray-600 mt-1">ID: {auditoriaBase.id}</p>
					</div>
				</div>
				<button
					onClick={handleDescargar}
					className="bg-[#1462A6] hover:bg-[#143192]/80 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
				>
					<Download className="w-4 h-4" />
					Descargar
				</button>
			</div>

			<ResumenAuditoria data={detalleAuditoria} />
			<InformacionGeneral data={detalleAuditoria} />
			<EvaluacionAuditoria data={evaluacion} />
		</div>
	);
}

export default VistaDetalleAuditoria;