import { Stethoscope } from "lucide-react";
import fondo from "../../../public/fondo.png";
import LoginForm from "./componets/LoginForm";
import Footer from "./componets/Foother";
import logoIpsch from "../../../public/ipsch.png";

export function FormLogin() {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-8 bg-white relative">
        
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
              <div className="bg-[#2068A6] text-white p-3 rounded-2xl">
                <Stethoscope size={32} />
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold text-gray-900">Auditoria</h1>
                <p className="text-gray-500 text-sm">Sistema de Auditorías Médicas</p>
              </div>
            </div>
          </div>
          <LoginForm />
          <Footer />
        </div>
      </div>

      <div className="hidden lg:flex flex-1 justify-center items-center p-4">
        <img src={fondo} alt="Imagen de login" className="max-w-full max-h-full object-contain" />
      </div>
    </div>
  );
}