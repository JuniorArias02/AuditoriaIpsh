import { useNavigate } from 'react-router-dom';

function Error404() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen  flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Icono o ilustración */}
                <div className="mb-8">
                    <div className="w-32 h-32 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                        <svg 
                            className="w-16 h-16 text-[#2269A6]" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={1.5} 
                                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5-1.709M12 4a8 8 0 00-8 8c0 1.892.653 3.631 1.75 5l2.5-2.5"
                            />
                        </svg>
                    </div>
                </div>

                {/* Texto del error */}
                <h1 className="text-6xl font-bold text-[#2269A6] mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Página no encontrada
                </h2>
                <p className="text-gray-600 mb-8">
                    Lo sentimos, la página que estás buscando no existe o ha sido movida. 
                    Puedes volver a la página anterior o contactar con soporte si necesitas ayuda.
                </p>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleGoBack}
                        className="bg-[#2269A6] hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        Volver atrás
                    </button>
                    
                    <button
                        onClick={() => navigate('/')}
                        className="border border-[#2269A6] text-[#2269A6] hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                        Ir al inicio
                    </button>
                </div>

                {/* Información adicional para auditorías */}
                <div className="mt-12 p-4 bg-blue-100 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-700">
                        <strong>Auditorías de Historias Clínicas</strong><br/>
                        Si crees que esto es un error, contacta con el equipo de soporte técnico.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Error404;