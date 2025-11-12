import { CheckCircle, MinusCircle, AlertCircle } from "lucide-react";

const getClasificacion = (porcentaje) => {
	const valor = parseFloat(porcentaje);
	if (valor >= 95)
		return { label: "Satisfactoria", icon: <CheckCircle className="w-4 h-4 text-green-600" />, classes: "border-green-300 text-green-700 bg-green-50" };
	if (valor >= 85)
		return { label: "Aceptable", icon: <MinusCircle className="w-4 h-4 text-yellow-600" />, classes: "border-yellow-300 text-yellow-700 bg-yellow-50" };
	return { label: "Inaceptable", icon: <AlertCircle className="w-4 h-4 text-red-600" />, classes: "border-red-300 text-red-700 bg-red-50" };
};

export default getClasificacion;