import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { SettingServices } from "../api/services/settingServices";
import { useAuth } from "./AuthContext";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { settings, token, refreshSettings } = useAuth();

  // Crear servicio solo si hay token
  const settingServices = useMemo(() => {
    if (!token) return null;
    return new SettingServices(token);
  }, [token]);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Cuando los settings vienen del backend → aplicar tema
  useEffect(() => {
    if (settings?.tema) {
      setTheme(settings.tema);
    }
  }, [settings]);

  // Aplicar theme al DOM + guardarlo en storage
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Cambiar tema
  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    try {
      // Actualizar en backend
      if (settingServices) {
        await settingServices.cambiarTema({ tema: newTheme });
        // Actualizar settings globales del usuario
        await refreshSettings();
      }
    } catch (error) {
      console.error("Error cambiando tema:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
