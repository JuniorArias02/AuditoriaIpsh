const getStatus = (porcentaje) => {
    if (porcentaje >= 95) {
        return { 
            label: "Satisfactorio", 
            bgColor: "bg-green-100 dark:bg-green-900/30", 
            textColor: "text-green-800 dark:text-green-300" 
        };
    }
    if (porcentaje >= 85) {
        return { 
            label: "Aceptable", 
            bgColor: "bg-yellow-100 dark:bg-yellow-900/30", 
            textColor: "text-yellow-800 dark:text-yellow-300" 
        };
    }
    return { 
        label: "Inaceptable", 
        bgColor: "bg-red-100 dark:bg-red-900/30", 
        textColor: "text-red-800 dark:text-red-300" 
    };
};

export default getStatus;