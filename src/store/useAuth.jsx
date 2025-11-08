const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}
