import { LogOut } from "lucide-react";

export default function Navbar({ onLogout }) {

  return (
    <nav className="w-full bg-white text-gray-800 dark:bg-gray-900 dark:text-white flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div>Auditorías</div>

      <div className="flex items-center gap-4">
        <button
          onClick={onLogout}
          className="flex items-center gap-2 p-2 rounded-lg transition-all duration-200 
            text-gray-600 dark:text-gray-400 
            hover:text-red-600 dark:hover:text-red-400 
            hover:bg-red-50 dark:hover:bg-red-900"
        >
          <LogOut size={20} />
          Salir
        </button>
      </div>
    </nav>
  );
}