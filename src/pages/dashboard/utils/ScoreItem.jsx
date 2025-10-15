const ScoreItem = ({ label, count, colorClass, bgClass }) => (
	<div className="flex justify-between items-center text-sm text-gray-700">
		<div className="flex items-center">
			<span className={`w-3 h-3 rounded-full mr-2 ${bgClass}`}></span>
			<span>{label}</span>
		</div>
		<span className={`font-semibold ${colorClass}`}>{count}</span>
	</div>
);

export default ScoreItem;