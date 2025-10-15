import React from 'react';
import { Users, Settings, Building, Stethoscope } from 'lucide-react';
import AdminCard from '../utils/AdminCard';

const AdministracionSistemas = () => {
	const menuItems = [
		{
			title: "Gestionar Profesionales",
			description: "Administrar profesionales de la salud",
			action: () => console.log('Ir a Profesionales'),
			icon: Users,
			color: "blue"
		},
		{
			title: "Gestionar Servicios",
			description: "Configurar servicios de salud",
			action: () => console.log('Ir a Servicios'),
			icon: Stethoscope,
			color: "green"
		},
		{
			title: "Gestionar Sedes",
			description: "Administrar sedes de atención",
			action: () => console.log('Ir a Sedes'),
			icon: Building,
			color: "purple"
		},
		{
			title: "Configuración",
			description: "Ajustes del sistema",
			action: () => console.log('Ir a Configuración'),
			icon: Settings,
			color: "gray"
		},
	];

	return (
		<div className="p-6 md:p-8 w-full mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
			{/* Header */}
			<div className="flex items-center mb-6">
				<div className="p-2 bg-blue-50 rounded-lg border border-blue-100 mr-3">
					<Settings className="w-6 h-6 text-blue-600" />
				</div>
				<div>
					<h1 className="text-xl font-semibold text-gray-800">
						Administración del Sistema
					</h1>
					<p className="text-sm text-gray-500 mt-1">
						Gestiona los recursos y configuraciones de la plataforma
					</p>
				</div>
			</div>

			<hr className="mb-8 border-gray-200" />

			{/* Grid de tarjetas */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{menuItems.map((item, index) => (
					<AdminCard
						key={index}
						title={item.title}
						description={item.description}
						onClick={item.action}
						icon={item.icon}
						color={item.color}
					/>
				))}
			</div>

			{/* depronto le ponga algo a esta madre */}
			{/* <div className="mt-8 pt-6 border-t border-gray-100">
				<p className="text-xs text-gray-500 text-center">
					Sección administrativa • Acceso restringido
				</p>
			</div> */}
		</div>
	);
};

export default AdministracionSistemas;