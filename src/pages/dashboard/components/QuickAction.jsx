import React from 'react';

/**
 * @param {object} props
 * @param {string} props.title - Título de la acción (e.g., "Nueva Auditoría").
 * @param {string} props.subtitle - Descripción de la acción.
 * @param {string} props.icon - Icono de la acción.
 * @param {string} props.bgColor - Color de fondo del círculo del icono.
 * @param {string} props.hoverColor - Color para el efecto hover.
 * @param {function} props.onClick - Función a ejecutar al hacer click.
 */
export function QuickAction({ 
  title, 
  subtitle, 
  icon, 
  bgColor = 'bg-indigo-500 dark:bg-indigo-600', 
  hoverColor = 'hover:shadow-md dark:hover:bg-gray-700',
  onClick 
}) {
  return (
    <div
      onClick={onClick}
      className={`p-4 flex items-start space-x-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm transition duration-200 cursor-pointer border border-gray-100 dark:border-gray-700 ${hoverColor}`}
    >
      <div className={`p-2 rounded-full text-white ${bgColor}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-gray-800 dark:text-white text-base font-semibold">{title}</h4>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{subtitle}</p>
      </div>
    </div>
  );
}