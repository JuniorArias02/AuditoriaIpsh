import { versionApp } from "../../../../version";
function Footer() {
	return (
		<div className="text-center pt-8 border-t border-gray-100">
			<p className="text-xs text-gray-500">
				© 2025 Auditoria. Sistema de auditorías médicas.
			</p>
			<p className="text-xs text-gray-500">
				Version: {versionApp()}
			</p>
		</div>
	);
}

export default Footer;