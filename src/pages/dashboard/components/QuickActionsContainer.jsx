// src/components/QuickActionsContainer.jsx
import React from 'react';
import { QuickAction } from './QuickAction';
import {
	Plus,
	FileText,
	BarChart3,
	Users,
	User,
	Settings,
	Download,
	Upload,
	Search,
	Filter
} from 'lucide-react';
import PAGES_ROUTES from '../../../routes/routers';
import { useNavigate } from 'react-router-dom';
export function QuickActionsContainer() {
	const navigate = useNavigate();
	const quickActions = [
		{
			title: "Nueva Auditoría",
			subtitle: "Crear una nueva auditoría",
			icon: <Plus className="w-6 h-6" />,
			bgColor: "bg-blue-600",
			onClick: () => navigate(PAGES_ROUTES.AUDITORIA.NUEVA_AUDITORIA)
		},
		{
			title: "Ver Auditorías",
			subtitle: "Consultar auditorías completadas",
			icon: <FileText className="w-6 h-6" />,
			bgColor: "bg-green-600",
			onClick: () => navigate(PAGES_ROUTES.AUDITORIA.AUDITORIAS)
		},
		{
			title: "Reportes",
			subtitle: "Generar reportes de cumplimiento",
			icon: <BarChart3 className="w-6 h-6" />,
			bgColor: "bg-purple-600",
			onClick: () => navigate(PAGES_ROUTES.REPORTES.ROOT)
		},
		{
			title: "Gestionar Profesionales",
			subtitle: "Administrar personal de salud",
			icon: <Users className="w-6 h-6" />,
			bgColor: "bg-gray-600",
			onClick: () => navigate(PAGES_ROUTES.PROFESIONAL.ROOT)
		},
		{
			title: "Gestionar Pacientes",
			subtitle: "Administrar registro de pacientes",
			icon: <User className="w-6 h-6" />,
			bgColor: "bg-gray-600",
			onClick: () => navigate(PAGES_ROUTES.PACIENTE.ROOT)
		}
	];

	return (
		<div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
			<h2 className="text-xl font-semibold text-gray-800 flex items-center mb-6">
				<BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
				Acciones Rápidas
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{quickActions.map((action, index) => (
					<QuickAction
						key={index}
						title={action.title}
						subtitle={action.subtitle}
						icon={action.icon}
						bgColor={action.bgColor}
						onClick={action.onClick}
					/>
				))}
			</div>
		</div>
	);
}