const getStatus = (porcentaje) => {
    if (porcentaje >= 95) {
        return { label: "Satisfactorio", bgColor: "bg-green-100", textColor: "text-green-800" };
    }
    if (porcentaje >= 85) {
        return { label: "Aceptable", bgColor: "bg-yellow-100", textColor: "text-yellow-800" };
    }
    return { label: "Inaceptable", bgColor: "bg-red-100", textColor: "text-red-800" };
};

export default getStatus;