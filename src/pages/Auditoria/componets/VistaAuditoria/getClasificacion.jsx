import { CheckCircle, MinusCircle, AlertCircle } from "lucide-react";

const getClasificacion = (porcentaje) => {
	const valor = parseFloat(porcentaje);
	if (valor >= 95)
		return { 
			label: "Satisfactoria", 
			icon: <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />, 
			classes: "border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/30" 
		};
	if (valor >= 85)
		return { 
			label: "Aceptable", 
			icon: <MinusCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />, 
			classes: "border-yellow-300 dark:border-yellow-600 text-yellow-700 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/30" 
		};
	return { 
		label: "Inaceptable", 
		icon: <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />, 
		classes: "border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/30" 
	};
};

export default getClasificacion;