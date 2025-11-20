

import { useTheme } from "../../../store/ThemeContext";
function ModoOscuro() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-6">
      {/* Toggle Principal */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-4">
          <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-600'}`}>
            <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {theme === 'dark' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              )}
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Modo {theme === 'dark' ? 'Oscuro' : 'Claro'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {theme === 'dark' ? 'Tema oscuro activado' : 'Tema claro activado'}
            </p>
          </div>
        </div>
        
        {/* Switch Mejorado */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <div className="w-12 h-6 bg-gray-300 peer-focus:ring-3 peer-focus:ring-blue-200 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500 dark:bg-gray-600"></div>
        </label>
      </div>

      {/* Advertencia Beta Mejorada */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-5">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/40 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm font-bold">β</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-yellow-800 dark:text-yellow-200 font-semibold">
                Función Beta
              </span>
              <span className="px-2 py-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-xs font-medium rounded-full">
                EXPERIMENTAL
              </span>
            </div>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm leading-relaxed">
              El modo oscuro se encuentra en fase beta activa. Algunos elementos de la interfaz 
              podrían no mostrarse correctamente o presentar problemas de contraste. 
              Estamos trabajando para optimizar toda la experiencia visual.
            </p>
            {/* <div className="mt-3 flex items-center text-xs text-yellow-600 dark:text-yellow-400">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tu feedback nos ayuda a mejorar esta función
            </div> */}
          </div>
        </div>
      </div>

      {/* Estado Actual */}
      <div className="text-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Tema {theme === 'dark' ? 'oscuro' : 'claro'} activo
        </span>
      </div>
    </div>
  );
}

export default ModoOscuro;