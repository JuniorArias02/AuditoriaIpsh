import { Stethoscope } from "lucide-react";

function Auditoria() {
	return (
		<div className="flex items-center gap-3">
			<div className="bg-[#2B6DA6] dark:bg-blue-600 text-white p-2 rounded-lg">
				<Stethoscope size={18} />
			</div>
			<h1 className="text-xl font-semibold tracking-wide text-gray-900 dark:text-white">Auditoría</h1>
		</div>
	);
}

export default Auditoria;