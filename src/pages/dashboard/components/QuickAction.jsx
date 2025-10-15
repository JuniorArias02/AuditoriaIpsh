import React from 'react';

/**
 * @param {object} props
 * @param {string} props.title - Título de la acción (e.g., "Nueva Auditoría").
 * @param {string} props.subtitle - Descripción de la acción.
 * @param {string} props.icon - Icono de la acción.
 * @param {string} props.bgColor - Color de fondo del círculo del icono.
 */
export function QuickAction({ title, subtitle, icon, bgColor = 'bg-indigo-500', onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-4 flex items-start space-x-4 bg-white rounded-lg shadow-sm hover:shadow-md transition duration-200 cursor-pointer border border-gray-100">
      <div className={`p-2 rounded-full text-white ${bgColor}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-gray-800 text-base font-semibold">{title}</h4>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>
    </div>
  );
}