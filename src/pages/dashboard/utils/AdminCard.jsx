// AdminCard mejorado
const AdminCard = ({ title, description, onClick, icon: Icon, color = "blue" }) => {
	const colorClasses = {
		blue: "bg-blue-50 border-blue-100 text-blue-600",
		green: "bg-green-50 border-green-100 text-green-600", 
		purple: "bg-purple-50 border-purple-100 text-purple-600",
		gray: "bg-gray-50 border-gray-100 text-gray-600"
	};

	return (
		<div 
			className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer"
			onClick={onClick}
		>
			<div className="flex items-start space-x-4">
				<div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
					<Icon className="w-5 h-5" />
				</div>
				<div className="flex-1">
					<h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
					<p className="text-sm text-gray-600">{description}</p>
				</div>
			</div>
		</div>
	);
};

export default AdminCard;
