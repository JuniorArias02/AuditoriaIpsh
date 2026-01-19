/**
 * Utilidades para manejo de fechas
 * Todas las fechas del backend están en UTC
 */

/**
 * Convierte una fecha UTC del backend a la zona horaria local del usuario
 * @param {string} utcDateString - Fecha en formato ISO o MySQL (YYYY-MM-DD HH:mm:ss)
 * @returns {Date} Objeto Date en la zona horaria local
 */
export const utcToLocal = (utcDateString) => {
    if (!utcDateString) return null;

    // Si la fecha no tiene 'Z' al final, agregarla para indicar que es UTC
    const dateStr = utcDateString.endsWith('Z') ? utcDateString : `${utcDateString}Z`;
    return new Date(dateStr);
};

/**
 * Convierte una fecha local a UTC para enviar al backend
 * @param {Date} localDate - Fecha local
 * @returns {string} Fecha en formato UTC (YYYY-MM-DD HH:mm:ss)
 */
export const localToUtc = (localDate) => {
    if (!localDate) return null;

    const date = localDate instanceof Date ? localDate : new Date(localDate);
    return date.toISOString().slice(0, 19).replace('T', ' ');
};

/**
 * Formatea una fecha UTC a string legible en la zona horaria local
 * @param {string} utcDateString - Fecha UTC del backend
 * @param {Object} options - Opciones de formato (Intl.DateTimeFormat)
 * @returns {string} Fecha formateada
 */
export const formatUtcDate = (utcDateString, options = {}) => {
    if (!utcDateString) return '';

    const date = utcToLocal(utcDateString);

    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        ...options
    };

    return new Intl.DateTimeFormat('es-ES', defaultOptions).format(date);
};

/**
 * Obtiene la fecha/hora actual en UTC para enviar al backend
 * @returns {string} Fecha UTC en formato YYYY-MM-DD HH:mm:ss
 */
export const getCurrentUtc = () => {
    return localToUtc(new Date());
};

/**
 * Calcula la diferencia en minutos entre una fecha UTC y ahora
 * @param {string} utcDateString - Fecha UTC del backend
 * @returns {number} Diferencia en minutos (positivo si es futuro, negativo si es pasado)
 */
export const getMinutesUntil = (utcDateString) => {
    if (!utcDateString) return 0;

    const targetDate = utcToLocal(utcDateString);
    const now = new Date();
    const diffMs = targetDate - now;
    return Math.floor(diffMs / 60000);
};

/**
 * Verifica si una fecha UTC ya expiró
 * @param {string} utcDateString - Fecha UTC del backend
 * @returns {boolean} true si ya expiró, false si aún es válida
 */
export const isExpired = (utcDateString) => {
    return getMinutesUntil(utcDateString) < 0;
};

// Ejemplos de uso:
//
// // Convertir fecha UTC del backend a local
// const fechaLocal = utcToLocal('2026-01-19 15:30:00');
//
// // Formatear fecha para mostrar al usuario
// const fechaFormateada = formatUtcDate('2026-01-19 15:30:00');
// // Output: "19 de enero de 2026, 10:30" (si estás en UTC-5)
//
// // Verificar si un código expiró
// if (isExpired(codigoExpiracion)) {
//   console.log('El código ya expiró');
// }
//
// // Obtener minutos restantes
// const minutosRestantes = getMinutesUntil(codigoExpiracion);
// console.log(`Quedan ${minutosRestantes} minutos`);
