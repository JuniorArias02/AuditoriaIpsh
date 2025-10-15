import React from 'react';

/**
 * @param {object} props
 * @param {string} props.title - Título de la tarjeta (e.g., "Auditorías Totales").
 * @param {string} props.value - El número principal (e.g., "6").
 * @param {string} props.description - La descripción debajo del valor (e.g., "Auditorías completadas").
 * @param {string} props.icon - Icono a mostrar (puedes usar un componente de íconos o un simple div con estilo).
 * @param {string} props.color - Color de acento para el borde y el valor.
 */
export function AuditCard({ title, value, description, icon, color = 'border-gray-300' }) {
  return (
    <div className={`p-6 bg-white rounded-lg shadow-sm border-l-4 ${color}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-600 text-sm font-medium uppercase tracking-wider">{title}</h3>
          <p className={`text-4xl font-bold mt-2 ${color.replace('border-', 'text-')}`}>{value}</p>
          <p className="text-gray-500 text-xs mt-1">{description}</p>
        </div>
        <div className={`text-2xl ${color.replace('border-', 'text-')}`}>{icon}</div>
      </div>
    </div>
  );
}