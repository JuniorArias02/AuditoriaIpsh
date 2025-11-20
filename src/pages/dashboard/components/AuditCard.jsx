import React from 'react';

/**
 * @param {object} props
 * @param {string} props.title - Título de la tarjeta (e.g., "Auditorías Totales").
 * @param {string} props.value - El número principal (e.g., "6").
 * @param {string} props.description - La descripción debajo del valor (e.g., "Auditorías completadas").
 * @param {string} props.icon - Icono a mostrar (puedes usar un componente de íconos o un simple div con estilo).
 * @param {string} props.color - Color de acento para el borde y el valor.
 * @param {string} props.bgColor - Color de fondo para la tarjeta.
 */
export function AuditCard({ 
  title, 
  value, 
  description, 
  icon, 
  color = 'border-gray-300 dark:border-gray-600',
  bgColor = 'bg-white dark:bg-gray-800'
}) {
  // Función para obtener el color de texto correspondiente
  const getTextColor = (borderColor) => {
    if (borderColor.includes('blue')) return 'text-blue-600 dark:text-blue-400';
    if (borderColor.includes('green')) return 'text-green-600 dark:text-green-400';
    if (borderColor.includes('amber')) return 'text-amber-600 dark:text-amber-400';
    if (borderColor.includes('red')) return 'text-red-600 dark:text-red-400';
    return 'text-gray-700 dark:text-gray-300';
  };

  const textColor = getTextColor(color);

  return (
    <div className={`p-6 rounded-lg shadow-sm border-l-4 ${color} ${bgColor} dark:shadow-none`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
          <p className={`text-4xl font-bold mt-2 ${textColor}`}>{value}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{description}</p>
        </div>
        <div className={textColor}>{icon}</div>
      </div>
    </div>
  );
}