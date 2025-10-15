import { useState, useRef, useEffect } from "react";
import { Search, X, Loader2, Check } from "lucide-react";
import { ProfesionalServices } from "../../../../../api/services/profesionalServices";

function ProfesionalInput({ form, setForm }) {
	const [query, setQuery] = useState("");
	const [resultados, setResultados] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const [selectedProfesional, setSelectedProfesional] = useState(null);
	const debounceTimeout = useRef(null);
	const containerRef = useRef(null);
	const inputRef = useRef(null);

	const buscarProfesionales = async (texto) => {
		if (!texto.trim()) {
			setResultados([]);
			setShowDropdown(false);
			return;
		}

		setLoading(true);
		try {
			const res = await ProfesionalServices.buscarProfesionalPorNombreDocumento(texto);
			const profesionalesArray = res.flat();
			setResultados(profesionalesArray);
			setShowDropdown(profesionalesArray.length > 0);
		} catch (error) {
			console.error("Error buscando profesionales:", error);
			setResultados([]);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		const valor = e.target.value;
		setQuery(valor);
		setSelectedProfesional(null);

		clearTimeout(debounceTimeout.current);
		debounceTimeout.current = setTimeout(() => {
			buscarProfesionales(valor);
		}, 350);
	};

	const handleSelect = (profesional) => {
		setQuery(`${profesional.nombre} (${profesional.cedula})`);
		setSelectedProfesional(profesional);
		setForm({ ...form, profesional_id: profesional.id });
		setShowDropdown(false);
	};

	const clearInput = () => {
		setQuery("");
		setSelectedProfesional(null);
		setForm({ ...form, profesional_id: "" });
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
			<label className="block text-sm font-medium text-gray-700 mb-2">
				Profesional
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
					className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
				/>

				{loading && (
					<Loader2 className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 animate-spin" />
				)}

				{query && !loading && (
					<button
						onClick={clearInput}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
					>
						<X className="w-4 h-4" />
					</button>
				)}
			</div>

			{/* Dropdown */}
			{showDropdown && resultados.length > 0 && (
				<div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto max-h-60">
					{resultados.map((profesional) => (
						<button
							key={profesional.id}
							onClick={() => handleSelect(profesional)}
							className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
						>
							<div className="font-medium text-gray-900">{profesional.nombre}</div>
							<div className="text-sm text-gray-500">{profesional.cedula}</div>
						</button>
					))}
				</div>
			)}

			{/* No results */}
			{showDropdown && resultados.length === 0 && !loading && query && (
				<div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center">
					<div className="text-gray-500">No se encontraron profesionales</div>
					<div className="text-sm text-gray-400 mt-1">Intenta con otros términos</div>
				</div>
			)}
		</div>
	);
}

export default ProfesionalInput;
