// AdminCard mejorado con modo oscuro
const AdminCard = ({ title, description, onClick, icon: Icon, color = "blue" }) => {
	const colorClasses = {
		blue: {
			container: "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800",
			icon: "text-blue-600 dark:text-blue-400"
		},
		green: {
			container: "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800", 
			icon: "text-green-600 dark:text-green-400"
		},
		purple: {
			container: "bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800",
			icon: "text-purple-600 dark:text-purple-400"
		},
		gray: {
			container: "bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600",
			icon: "text-gray-600 dark:text-gray-400"
		}
	};

	const { container, icon } = colorClasses[color];

	return (
		<div 
			className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-gray-900 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer"
			onClick={onClick}
		>
			<div className="flex items-start space-x-4">
				<div className={`p-3 rounded-lg border ${container}`}>
					<Icon className={`w-5 h-5 ${icon}`} />
				</div>
				<div className="flex-1">
					<h3 className="font-semibold text-gray-800 dark:text-white mb-1">{title}</h3>
					<p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
				</div>
			</div>
		</div>
	);
};

export default AdminCard;