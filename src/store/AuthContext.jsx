import { SettingServices } from "../api/services/settingServices";
import { createContext, useContext, useState, useEffect } from "react";
import PAGES_ROUTES from "../routes/routers";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [settings, setSettings] = useState(null);
	const [permissions, setPermissions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showWarning, setShowWarning] = useState(false);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUser = localStorage.getItem("user");
		const storedSettings = localStorage.getItem("settings");

		// Cargar token y usuario
		if (storedToken && storedUser) {
			setToken(storedToken);
			setUser(JSON.parse(storedUser));
		}

		// Cargar settings guardados
		if (storedSettings && storedSettings !== "undefined") {
			try {
				setSettings(JSON.parse(storedSettings));
			} catch (e) {
				console.error("Settings corruptos en storage, limpiando...");
				localStorage.removeItem("settings");
			}
		}

		setLoading(false);
	}, []);

	// ---------- LOGIN ----------
	const login = async (data) => {
		const { token, user } = data;

		setToken(token);
		setUser(user);
		setPermissions(user.permissions || []);

		localStorage.setItem("token", token);
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("permissions", JSON.stringify(user.permissions || []));
		localStorage.setItem("loginTime", Date.now().toString());

		await refreshSettings(token);
	};


	const logout = () => {
		setToken(null);
		setUser(null);
		setSettings(null);
		localStorage.clear();
		alert("Tu sesión expiró. Inicia sesión de nuevo.");
		window.location.href = PAGES_ROUTES.LOGIN;
	};

	const refreshSettings = async (customToken = null) => {
		try {
			const service = new SettingServices(customToken || token);
			const data = await service.obtenerConfiguracion();
			const config = data.settings;

			setSettings(config);
			localStorage.setItem("settings", JSON.stringify(config));

		} catch (err) {
			console.error("Error actualizando configuración:", err);
		}
	};



	// ---------- INACTIVIDAD ----------
	useEffect(() => {
		let checkInterval;
		let warningTimeout;

		const updateActivity = () => {
			localStorage.setItem("lastActivity", Date.now().toString());
			setShowWarning(false);
			if (warningTimeout) clearTimeout(warningTimeout);
		};

		const checkInactivity = () => {
			const lastActivity = localStorage.getItem("lastActivity");
			if (lastActivity) {
				const now = Date.now();
				const elapsed = now - parseInt(lastActivity, 10);

				const thirty = 30 * 60 * 1000; // 30 mins
				const twentyNine = 29 * 60 * 1000; // 29 mins

				if (elapsed >= thirty) {
					logout();
				} else if (elapsed >= twentyNine && !showWarning) {
					setShowWarning(true);
					warningTimeout = setTimeout(() => setShowWarning(false), 60000);
				}
			}
		};

		window.addEventListener("mousemove", updateActivity);
		window.addEventListener("keydown", updateActivity);
		window.addEventListener("click", updateActivity);
		window.addEventListener("scroll", updateActivity);

		checkInterval = setInterval(checkInactivity, 10000);

		return () => {
			clearInterval(checkInterval);
			window.removeEventListener("mousemove", updateActivity);
			window.removeEventListener("keydown", updateActivity);
			window.removeEventListener("click", updateActivity);
			window.removeEventListener("scroll", updateActivity);
		};
	}, [token]);

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				settings,
				permissions,
				login,
				logout,
				loading,
				refreshSettings
			}}
		>
			{children}

			{showWarning && (
				<div className="fixed bottom-4 right-4 bg-yellow-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-pulse">
					⚠️ Tu sesión expirará en 1 minuto por inactividad.
					<br /> Mueve el mouse o presiona una tecla.
				</div>
			)}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
