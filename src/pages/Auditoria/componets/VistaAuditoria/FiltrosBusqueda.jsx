import React, { useState } from 'react';
import { Search, Calendar, ChevronDown, Filter, X } from 'lucide-react';
import { AuditoriaServices } from '../../../../api/services/auditoriaServices';
import { useAuth } from '../../../../store/AuthContext';

const FiltrosBusqueda = ({ onFiltrar }) => {
	const { token } = useAuth();
	const auditoriaService = new AuditoriaServices(token);

	const [pacienteAuditor, setPacienteAuditor] = useState('');
	const [clasificacion, setClasificacion] = useState('');
	const [fechaInicio, setFechaInicio] = useState('');
	const [fechaFin, setFechaFin] = useState('');
	const [loading, setLoading] = useState(false);

	const limpiarFiltros = async () => {
		setPacienteAuditor('');
		setClasificacion('');
		setFechaInicio('');
		setFechaFin('');
		await aplicarFiltros();
	};

	const aplicarFiltros = async () => {
		setLoading(true);
		try {
			const filtros = {
				busqueda: pacienteAuditor || null,
				clasificacion: clasificacion || null,
				fecha_inicio: fechaInicio || null,
				fecha_fin: fechaFin || null,
			};

			const res = await auditoriaService.listarAuditoriasFiltro(filtros);

			if (onFiltrar) onFiltrar(res.data || res);

		} catch (err) {
			console.error('Error al filtrar auditorías:', err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-white p-6 shadow-md rounded-lg">
			<div className="flex items-center mb-4 pb-4 border-b border-gray-100">
				<Filter className="w-5 h-5 text-gray-700 mr-2" />
				<h2 className="text-xl font-semibold text-gray-800">Filtros de Búsqueda</h2>
			</div>

			<div className="flex flex-col md:flex-row gap-4 mb-4">
				{/* búsqueda por paciente o auditor */}
				<div className="relative flex-1 min-w-0">
					<input
						type="text"
						placeholder="Buscar paciente, auditor..."
						value={pacienteAuditor}
						onChange={(e) => setPacienteAuditor(e.target.value)}
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
					/>
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
				</div>

				{/* clasificación */}
				<div className="relative w-full md:w-1/4">
					<select
						value={clasificacion}
						onChange={(e) => setClasificacion(e.target.value)}
						className="w-full appearance-none bg-white pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out cursor-pointer text-gray-700"
					>
						<option value="">Todas las clasificaciones</option>
						<option value="bajo">Inaceptable</option>
						<option value="medio">Aceptable</option>
						<option value="alto">Satisfactoria</option>
					</select>
					<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
				</div>

				{/* fecha inicio */}
				<div className="relative w-full md:w-1/4">
					<input
						type="text"
						placeholder="dd/mm/aaaa"
						value={fechaInicio}
						onChange={(e) => setFechaInicio(e.target.value)}
						onFocus={(e) => (e.target.type = 'date')}
						onBlur={(e) => (e.target.type = 'text')}
						className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-700"
					/>
					<Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
				</div>

				{/* fecha fin */}
				<div className="relative w-full md:w-1/4">
					<input
						type="text"
						placeholder="dd/mm/aaaa"
						value={fechaFin}
						onChange={(e) => setFechaFin(e.target.value)}
						onFocus={(e) => (e.target.type = 'date')}
						onBlur={(e) => (e.target.type = 'text')}
						className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-700"
					/>
					<Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
				</div>
			</div>

			<div className="flex gap-2">
				<button
					onClick={aplicarFiltros}
					disabled={loading}
					className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
				>
					{loading ? 'Buscando...' : 'Aplicar filtros'}
				</button>

				<button
					onClick={limpiarFiltros}
					className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
				>
					Limpiar
				</button>
			</div>
		</div>
	);
};

export default FiltrosBusqueda;
