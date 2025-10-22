import { useEffect, useState } from "react";
import SidebarDesktop from "./SidebarDesktop";
import SidebarMobile from "./SidebarMobile";

export default function SidebarWrapper() {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const [open, setOpen] = useState(true);

	return (
		<>
			{isMobile ? (
				<SidebarMobile open={open} setOpen={setOpen} />
			) : (
				<SidebarDesktop open={open} setOpen={setOpen} />
			)}
		</>
	);
}
