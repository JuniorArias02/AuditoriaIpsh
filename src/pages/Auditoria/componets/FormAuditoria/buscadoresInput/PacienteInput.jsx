import { useState, useRef, useEffect } from "react";
import { Search, X, Loader2, Check } from "lucide-react";
import { PacienteService } from "../../../../../api/services/pacienteServices";

function PacienteInput({ form, setForm }) {
	const [query, setQuery] = useState("");
	const [resultados, setResultados] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const [selectedPaciente, setSelectedPaciente] = useState(null);
	const debounceTimeout = useRef(null);
	const containerRef = useRef(null);
	const inputRef = useRef(null);

	const buscarPacientes = async (texto) => {
		if (!texto.trim()) {
			setResultados([]);
			setShowDropdown(false);
			return;
		}

		setLoading(true);
		try {
			const res = await PacienteService.buscarPorCedulaONombre(texto);
			const pacientesArray = Array.isArray(res[0]) ? res[0] : res; // aplanar si viene doble array
			setResultados(pacientesArray);
			setShowDropdown(pacientesArray.length > 0);
		} catch (error) {
			console.error("Error buscando pacientes:", error);
			setResultados([]);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		const valor = e.target.value;
		setQuery(valor);
		setSelectedPaciente(null);

		clearTimeout(debounceTimeout.current);
		debounceTimeout.current = setTimeout(() => {
			buscarPacientes(valor);
		}, 350);
	};

	const handleSelect = (paciente) => {
		setQuery(`${paciente.nombre_completo} (${paciente.documento})`);
		setSelectedPaciente(paciente);
		setForm({ ...form, paciente_id: paciente.id });
		setShowDropdown(false);
	};

	const clearInput = () => {
		setQuery("");
		setSelectedPaciente(null);
		setForm({ ...form, paciente_id: "" });
		setResultados([]);
		setShowDropdown(false);
		inputRef.current?.focus();
	};

	const handleFocus = () => {
		if (query && resultados.length > 0) {
			setShowDropdown(true);
		}
	};

	// Click fuera cierra dropdown
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
				Paciente
			</label>

			<div className="relative flex items-center">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />

				<input
					ref={inputRef}
					type="text"
					value={query}
					onChange={handleChange}
					onFocus={handleFocus}
					placeholder="Buscar por nombre o cédula..."
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

			{/* Dropdown */}
			{showDropdown && resultados.length > 0 && (
				<div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-gray-900 overflow-y-auto max-h-60">
					{resultados.map((paciente) => (
						<button
							key={paciente.id}
							onClick={() => handleSelect(paciente)}
							className="w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
						>
							<div className="font-medium text-gray-900 dark:text-white">{paciente.nombre_completo}</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">{paciente.documento}</div>
						</button>
					))}
				</div>
			)}

			{/* No results */}
			{showDropdown && resultados.length === 0 && !loading && query && (
				<div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-gray-900 p-4 text-center">
					<div className="text-gray-500 dark:text-gray-400">No se encontraron pacientes</div>
					<div className="text-sm text-gray-400 dark:text-gray-500 mt-1">Intenta con otros términos</div>
				</div>
			)}
		</div>
	);
}

export default PacienteInput;
