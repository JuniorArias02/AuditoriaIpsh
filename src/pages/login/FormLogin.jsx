import { Stethoscope } from "lucide-react";
import fondo from "../../../public/fondo.png";
import LoginForm from "./componets/LoginForm";
import ForgotPasswordForm from "./componets/ForgotPasswordForm"; // Nuevo componente
import Footer from "./componets/Foother";
import logoIpsch from "../../../public/ipsch.png";
import { useState } from "react";

export function FormLogin() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-8 bg-white dark:bg-gray-900 relative">

        {/* Logo en esquina superior izquierda */}
        <div className="absolute top-6 left-6">
          <img
            src={logoIpsch}
            alt="Logo IPSCH"
            className="h-16 w-auto"
          />
        </div>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-[#2068A6] dark:bg-blue-700 text-white p-3 rounded-2xl">
                <Stethoscope size={32} />
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {showForgotPassword ? "Recuperar Contraseña" : "Auditoria"}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Sistema de Auditorías Médicas</p>
              </div>
            </div>
          </div>

          {showForgotPassword ? (
            <ForgotPasswordForm
              onBackToLogin={() => setShowForgotPassword(false)}
            />
          ) : (
            <LoginForm
              onForgotPassword={() => setShowForgotPassword(true)}
            />
          )}

          <Footer />
        </div>
      </div>

      <div className="hidden lg:flex flex-1 justify-center items-center p-4 bg-gray-50 dark:bg-gray-800">
        <img src={fondo} alt="Imagen de login" className="max-w-full max-h-full object-contain" />
      </div>
    </div>
  );
}