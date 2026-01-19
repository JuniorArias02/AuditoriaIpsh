import { Stethoscope } from "lucide-react";
// import fondo from "../../../public/fondo.png";
import LoginForm from "./componets/LoginForm";
import ForgotPasswordForm from "./componets/ForgotPasswordForm"; // Nuevo componente
import Footer from "./componets/Foother";
import logoIpsch from "../../../public/ipsch.png";
import { useState } from "react";
// import ChristmasWelcome from "./componets/ChristmasWelcome";

export function FormLogin() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="min-h-screen flex">
      {/* {showWelcome && <ChristmasWelcome onComplete={() => setShowWelcome(false)} />} */}  
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

      <div className="hidden lg:flex flex-1 relative bg-[#2068A6] overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 opacity-90"></div>

        {/* Diagonal Pattern SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 L100 0 L100 100 Z" fill="white" />
        </svg>

        <div className="relative z-10 text-white p-12 max-w-xl">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Gestión Integral de Auditorías Médicas
          </h2>
          <p className="text-lg text-blue-100 mb-8 leading-relaxed">
            Optimice sus procesos, garantice la calidad y mantenga el control total de sus auditorías con nuestra plataforma especializada.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
              <h3 className="font-semibold text-xl mb-2">Eficiencia</h3>
              <p className="text-sm text-blue-100">Automatización de flujos de trabajo y reportes.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
              <h3 className="font-semibold text-xl mb-2">Seguridad</h3>
              <p className="text-sm text-blue-100">Protección de datos y cumplimiento normativo.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}