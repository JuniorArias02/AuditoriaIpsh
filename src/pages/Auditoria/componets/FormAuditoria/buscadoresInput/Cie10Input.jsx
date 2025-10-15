import { useState, useRef, useEffect } from "react";
import { Search, X, Loader2, Check } from "lucide-react";
import { Cie10Services } from "../../../../../api/services/cie10Services";

function Cie10Input({ diagnostico, onDiagnosticoChange }) {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceTimeout = useRef(null);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Inicializar el query si ya hay un diagnóstico seleccionado
  useEffect(() => {
    if (diagnostico.cie10_id && diagnostico.descripcion) {
      setQuery(`${diagnostico.codigo || ''} - ${diagnostico.descripcion}`);
    }
  }, [diagnostico]);

  const buscarCie10 = async (texto) => {
    if (!texto.trim()) {
      setResultados([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    try {
      const res = await Cie10Services.buscarCie10PorCodgioDescripcion(texto);
      const cie10Array = res.flat();
      setResultados(cie10Array);
      setShowDropdown(cie10Array.length > 0);
    } catch (error) {
      console.error("Error buscando CIE10:", error);
      setResultados([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const valor = e.target.value;
    setQuery(valor);

    // Limpiar el diagnóstico si el usuario empieza a escribir
    if (valor && diagnostico.cie10_id) {
      onDiagnosticoChange(diagnostico.id, "", "");
    }

    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      buscarCie10(valor);
    }, 350);
  };

  const handleSelect = (item) => {
    setQuery(`${item.codigo} - ${item.descripcion}`);
    onDiagnosticoChange(diagnostico.id, item.id, item.descripcion);
    setShowDropdown(false);
  };

  const clearInput = () => {
    setQuery("");
    onDiagnosticoChange(diagnostico.id, "", "");
    setResultados([]);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    if (query && resultados.length > 0) {
      setShowDropdown(true);
    }
  };

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
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Código CIE-10
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
            placeholder="Buscar por código o descripción..."
            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
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

        {diagnostico.cie10_id && (
          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-green-800">{diagnostico.descripcion}</div>
                <div className="text-sm text-green-600 mt-1">Código seleccionado</div>
              </div>
              <Check className="w-4 h-4 text-green-600" />
            </div>
          </div>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && resultados.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto max-h-60">
          {resultados.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              className="w-full px-4 py-3 text-left hover:bg-green-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-gray-900">
                <span className="text-green-600 font-bold">{item.codigo}</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">{item.descripcion}</div>
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {showDropdown && resultados.length === 0 && !loading && query && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center">
          <div className="text-gray-500">No se encontraron resultados</div>
          <div className="text-sm text-gray-400 mt-1">Intenta con otros términos</div>
        </div>
      )}
    </div>
  );
}

export default Cie10Input;