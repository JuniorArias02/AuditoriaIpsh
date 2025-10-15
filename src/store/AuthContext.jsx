import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showWarning, setShowWarning] = useState(false);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUser = localStorage.getItem("user");
		const storedTime = localStorage.getItem("loginTime");

		if (storedToken && storedUser && storedTime) {
			setToken(storedToken);
			setUser(JSON.parse(storedUser));
		}

		setLoading(false);
	}, []);

	const login = (data) => {
		const { token, user } = data;
		setToken(token);
		setUser(user);
		localStorage.setItem("token", token);
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("loginTime", Date.now().toString());
		localStorage.setItem("lastActivity", Date.now().toString());
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		localStorage.removeItem("loginTime");
		localStorage.removeItem("lastActivity");
		alert("Tu sesión ha expirado por inactividad. Inicia sesión nuevamente.");
		window.location.href = "/";
	};

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
				const thirtyMinutes = 30 * 60 * 1000;
				const twentyNineMinutes = 29 * 60 * 1000;

				if (elapsed >= thirtyMinutes) {
					logout();
				} else if (elapsed >= twentyNineMinutes && !showWarning) {
					setShowWarning(true);
					warningTimeout = setTimeout(() => {
						setShowWarning(false);
					}, 60 * 1000); // se esconde después de 1 min
				}
			}
		};

		// Detectar actividad del usuario
		window.addEventListener("mousemove", updateActivity);
		window.addEventListener("keydown", updateActivity);
		window.addEventListener("click", updateActivity);
		window.addEventListener("scroll", updateActivity);

		checkInterval = setInterval(checkInactivity, 10000); // cada 10 seg

		return () => {
			clearInterval(checkInterval);
			window.removeEventListener("mousemove", updateActivity);
			window.removeEventListener("keydown", updateActivity);
			window.removeEventListener("click", updateActivity);
			window.removeEventListener("scroll", updateActivity);
		};
	}, [token]);

	return (
		<AuthContext.Provider value={{ user, token, login, logout, loading }}>
			{children}

			{/* Modal simple de advertencia */}
			{showWarning && (
				<div className="fixed bottom-4 right-4 bg-yellow-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-pulse">
					⚠️ Tu sesión expirará en 1 minuto por inactividad.
					<br />
					Mueve el mouse o presiona una tecla para mantenerla activa.
				</div>
			)}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
