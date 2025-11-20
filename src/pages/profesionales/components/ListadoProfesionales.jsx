import { useState, useEffect, useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ProfesionalServices } from "../../../api/services/profesionalServices";
import { useAuth } from "../../../store/AuthContext";
import {
	Search,
	Filter,
	MoreVertical,
	Edit,
	User,
	IdCard,
	Briefcase,
	CheckCircle,
	XCircle
} from "lucide-react";

function ListadoProfesionales({ onEditarProfesional }) {
	const { token } = useAuth();
	const [profesionales, setProfesionales] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterCargo, setFilterCargo] = useState("");

	const parentRef = useRef();

	useEffect(() => {
		if (!token) return;
		cargarProfesionales();
	}, [token]);


	const cargarProfesionales = async () => {
		try {
			const profesionalServices = new ProfesionalServices(token);
			const data = await profesionalServices.listarProfesional();
			setProfesionales(data.data || []);
		} catch (error) {
			console.error("Error cargando profesionales:", error);

		} finally {
			setLoading(false);
		}
	};

	const cargosUnicos = useMemo(() => [...new Set(profesionales.map(p => p.cargo))], [profesionales]);

	const filteredProfesionales = useMemo(() => {
		return profesionales.filter(profesional => {
			const matchesSearch =
				profesional.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
				profesional.cedula.toLowerCase().includes(searchTerm.toLowerCase()) ||
				profesional.cargo.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesCargo = !filterCargo || profesional.cargo === filterCargo;
			return matchesSearch && matchesCargo;
		});
	}, [profesionales, searchTerm, filterCargo]);

	const rowVirtualizer = useVirtualizer({
		count: filteredProfesionales.length,
		getScrollElement: () => parentRef.current,
		// Altura estimada de la fila (debe coincidir con el alto de la fila simulada)
		estimateSize: () => 75,
		overscan: 5,
	});

	const getCargoBadgeColor = (cargo) => {
		const colors = {
			médico: "bg-blue-100 text-blue-800 border-blue-200",
			enfermero: "bg-green-100 text-green-800 border-green-200",
			administrativo: "bg-purple-100 text-purple-800 border-purple-200",
			servicios: "bg-orange-100 text-orange-800 border-orange-200",
			especialista: "bg-indigo-100 text-indigo-800 border-indigo-200",
		};
		const lowerCaseCargo = cargo.toLowerCase();
		for (const [key, value] of Object.entries(colors)) {
			if (lowerCaseCargo.includes(key)) return value;
		}
		return "bg-gray-100 text-gray-800 border-gray-200";
	};

	if (loading) {
		return (
			<div className="text-center py-20">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2068A6] mx-auto"></div>
				<p className="mt-4 text-gray-600">Cargando profesionales...</p>
			</div>
		);
	}

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
			{/* Header y Filtros */}
			<div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
					<div>
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Profesionales</h2>
						<p className="text-gray-600 dark:text-gray-400 mt-1">Administra los profesionales del sistema</p>
					</div>
					<button className="bg-[#2068A6] text-white px-4 py-2 rounded-lg hover:bg-[#1a568c] transition-colors flex items-center gap-2">
						<User className="w-4 h-4" />
						Nuevo Profesional
					</button>
				</div>
				<div className="mt-6 flex flex-col sm:flex-row gap-4">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
						<input
							type="text"
							placeholder="Buscar por nombre, cédula o cargo..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
						/>
					</div>
					<div className="relative">
						<Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
						<select
							value={filterCargo}
							onChange={(e) => setFilterCargo(e.target.value)}
							className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
						>
							<option value="">Todos los cargos</option>
							{cargosUnicos.map(cargo => <option key={cargo} value={cargo}>{cargo}</option>)}
						</select>
					</div>
				</div>
			</div>

			{/* Simulación de Tabla Virtualizada con Divs */}
			<div ref={parentRef} className="overflow-auto" style={{ height: "600px" }}>

				{/* 1. Cabecera (Simulada con DIV/FLEX) */}
				<div className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10 flex">
					<div className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-5/12">Profesional</div>
					<div className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/12">Cédula</div>
					<div className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-2/12">Cargo</div>
					<div className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/12">Estado</div>
					<div className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-2/12">Fecha Creación</div>
					<div className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/12">Acciones</div>
				</div>

				{/* 2. Cuerpo Virtualizado (Contenedor de alto y posición) */}
				<div
					style={{
						height: `${rowVirtualizer.getTotalSize()}px`,
						width: "100%",
						position: "relative",
					}}
				>
					{rowVirtualizer.getVirtualItems().map(virtualRow => {
						const profesional = filteredProfesionales[virtualRow.index];
						if (!profesional) return null;

						return (
							// Fila Simulada (Div con estilos de virtualización y flex)
							<div
								key={profesional.id}
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: `${virtualRow.size}px`,
									transform: `translateY(${virtualRow.start}px)`,
								}}
								className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b dark:border-gray-600 flex items-center"
							>
								{/* Celdas (Divs con el mismo ancho que la cabecera) */}
								<div className="px-6 py-4 w-5/12">
									<div className="flex items-center">
										<div className="flex-shrink-0 h-10 w-10 bg-[#2068A6] rounded-full flex items-center justify-center">
											<User className="w-5 h-5 text-white" />
										</div>
										<div className="ml-4 truncate">
											<div className="text-sm font-medium text-gray-900 dark:text-white truncate">{profesional.nombre}</div>
											<div className="text-sm text-gray-500 dark:text-gray-400">ID: {profesional.id}</div>
										</div>
									</div>
								</div>
								<div className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 w-1/12">
									<div className="flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
										<IdCard className="w-4 h-4 text-gray-400" />
										{profesional.cedula}
									</div>
								</div>
								<div className="px-6 py-4 w-2/12">
									<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCargoBadgeColor(profesional.cargo)} dark:bg-opacity-20`}>
										<Briefcase className="w-3 h-3 mr-1" />{profesional.cargo}
									</span>
								</div>
								<div className="px-6 py-4 w-1/12">
									{profesional.activo ? (
										<div className="flex items-center gap-2">
											<CheckCircle className="w-4 h-4 text-green-500" />
											<span className="text-sm text-green-700 dark:text-green-400 whitespace-nowrap">Activo</span>
										</div>
									) : (
										<div className="flex items-center gap-2">
											<XCircle className="w-4 h-4 text-red-500" />
											<span className="text-sm text-red-700 dark:text-red-400 whitespace-nowrap">Inactivo</span>
										</div>
									)}
								</div>
								<div className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap w-2/12">
									{profesional.created_at ? new Date(profesional.created_at).toLocaleDateString("es-ES") : "N/A"}
								</div>
								<div className="px-6 py-4 flex items-center gap-2 w-1/12">
									<button
										onClick={() => onEditarProfesional(profesional)}
										className="text-[#2068A6] hover:text-[#1a568c] dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded transition-colors"
									>
										<Edit className="w-4 h-4" />
									</button>
									<button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1 rounded transition-colors">
										<MoreVertical className="w-4 h-4" />
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Footer */}
			<div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400">
				Mostrando <span className="font-medium text-gray-900 dark:text-white">{filteredProfesionales.length}</span> de <span className="font-medium text-gray-900 dark:text-white">{profesionales.length}</span> profesionales
			</div>

			{/* Sin resultados */}
			{filteredProfesionales.length === 0 && (
				<div className="text-center py-12">
					<User className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
					<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
						{profesionales.length === 0 ? "No hay profesionales registrados" : "No se encontraron resultados"}
					</h3>
					<p className="text-gray-500 dark:text-gray-400">
						{profesionales.length === 0 ? "Comienza agregando el primer profesional al sistema." : "Intenta con otros términos de búsqueda o filtros."}
					</p>
				</div>
			)}
		</div>
	);
}

export default ListadoProfesionales;