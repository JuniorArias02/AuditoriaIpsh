import { useState, useRef, useEffect } from "react";
import { Search, X, Loader2, Check } from "lucide-react";
import { ServicioAuditoriaService } from "../../../../../api/services/servicioAuditoriaServices";

function ServicioInput({ form, setForm }) {
	const [query, setQuery] = useState("");
	const [resultados, setResultados] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const [selectedService, setSelectedService] = useState(null);
	const debounceTimeout = useRef(null);
	const containerRef = useRef(null);
	const inputRef = useRef(null);


	const buscarServicios = async (texto) => {
		if (!texto.trim()) {
			setResultados([]);
			setShowDropdown(false);
			return;
		}

		setLoading(true);
		try {
			const res = await ServicioAuditoriaService.buscarServicioAuditoriaPorNombre(texto);


			const serviciosArray = res.flat();

			const resultadosFinales = serviciosArray;

			setResultados(resultadosFinales);
			setShowDropdown(resultadosFinales.length > 0);
		} catch (error) {
			console.error("Error buscando servicios:", error);
			setResultados([]);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		const valor = e.target.value;
		setQuery(valor);
		setSelectedService(null);

		clearTimeout(debounceTimeout.current);
		debounceTimeout.current = setTimeout(() => {
			buscarServicios(valor);
		}, 350);
	};

	const handleSelect = (servicio) => {
		setQuery(servicio.nombre);
		setSelectedService(servicio);
		setForm({ ...form, servicio_auditado: servicio.id });
		setShowDropdown(false);
	};

	const clearInput = () => {
		setQuery("");
		setSelectedService(null);
		setForm({ ...form, servicio_auditado: "" });
		setResultados([]);
		setShowDropdown(false);
		inputRef.current?.focus();
	};

	const handleFocus = () => {
		if (query && resultados.length > 0) {
			setShowDropdown(true);
		}
	};

	// Cerrar dropdown al hacer click fuera
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (containerRef.current && !containerRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);


	useEffect(() => {
		return () => clearTimeout(debounceTimeout.current);
	}, []);

	return (
		<div className="relative mb-4" ref={containerRef}>
			<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
				Servicio Auditado
			</label>

			<div className="relative">
				<div className="relative flex items-center">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />

					<input
						ref={inputRef}
						type="text"
						value={query}
						onChange={handleChange}
						onFocus={handleFocus}
						placeholder="Buscar servicio..."
						className="w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
					/>

					{loading && (
						<Loader2 className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 animate-spin" />
					)}

					{query && !loading && (
						<button
							onClick={clearInput}
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
						>
							<X className="w-4 h-4" />
						</button>
					)}
				</div>

				{selectedService && (
					<div className="mt-2 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg flex items-center justify-between">
						<div className="flex items-center">
							<Check className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
							<span className="text-green-800 dark:text-green-300 font-medium">{selectedService.nombre}</span>
						</div>
						<button
							onClick={clearInput}
							className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium"
						>
							Cambiar
						</button>
					</div>
				)}
			</div>

			{/* Dropdown de resultados */}
			{showDropdown && (
				<div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-gray-900 overflow-y-auto max-h-60">
					{resultados.map((servicio) => (
						<button
							key={servicio.id}
							onClick={() => handleSelect(servicio)}
							className="w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-blue-900/30 focus:bg-blue-50 dark:focus:bg-blue-900/30 focus:outline-none transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
						>
							<div className="font-medium text-gray-900 dark:text-white">{servicio.nombre}</div>
						</button>
					))}
				</div>
			)}

			{/* Estados vacíos */}
			{showDropdown && resultados.length === 0 && !loading && query && (
				<div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-gray-900 p-4 text-center">
					<div className="text-gray-500 dark:text-gray-400">No se encontraron servicios</div>
					<div className="text-sm text-gray-400 dark:text-gray-500 mt-1">Intenta con otros términos</div>
				</div>
			)}
		</div>
	);
}

export default ServicioInput;