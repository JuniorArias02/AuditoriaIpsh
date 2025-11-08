import { useState } from 'react';
import { ArrowLeft, Mail, Shield, Lock, CheckCircle, Eye, EyeOff, Check, CircleAlert } from 'lucide-react';

export default function ForgotPasswordForm({ onBackToLogin }) {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular envío de código
    setTimeout(() => {
      setIsLoading(false);
      setStep('code');
    }, 1500);
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular verificación de código
    setTimeout(() => {
      setIsLoading(false);
      setStep('newPassword');
    }, 1500);
  };

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);

    // Simular actualización de contraseña
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 1500);
  };

  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <div className={`text-sm font-medium ${step === 'email' ? 'text-[#2068A6]' : 'text-gray-500'}`}>
          Paso 1
        </div>
        <div className={`text-sm font-medium ${step === 'code' ? 'text-[#2068A6]' : step === 'newPassword' || step === 'success' ? 'text-green-600' : 'text-gray-500'}`}>
          Paso 2
        </div>
        <div className={`text-sm font-medium ${step === 'newPassword' ? 'text-[#2068A6]' : step === 'success' ? 'text-green-600' : 'text-gray-500'}`}>
          Paso 3
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-[#2068A6] h-2 rounded-full transition-all duration-300"
          style={{
            width: step === 'email' ? '33%' : step === 'code' ? '66%' : '100%'
          }}
        ></div>
      </div>
    </div>
  );

  // Función para calcular la fortaleza de la contraseña
  const getPasswordStrength = (password) => {
    let score = 0;

    // Longitud mínima
    if (password.length >= 6) score++;
    // Contiene mayúsculas
    if (/[A-Z]/.test(password)) score++;
    // Contiene números
    if (/[0-9]/.test(password)) score++;
    // Contiene caracteres especiales
    if (/[!@#$%^&*]/.test(password)) score++;

    const strengthLevels = [
      { text: 'Muy Débil', color: 'text-red-600', bgColor: 'bg-red-500' },
      { text: 'Débil', color: 'text-orange-500', bgColor: 'bg-orange-500' },
      { text: 'Moderada', color: 'text-yellow-500', bgColor: 'bg-yellow-500' },
      { text: 'Fuerte', color: 'text-green-500', bgColor: 'bg-green-500' },
      { text: 'Muy Fuerte', color: 'text-green-600', bgColor: 'bg-green-600' }
    ];

    return {
      score: score,
      text: strengthLevels[score].text,
      color: strengthLevels[score].color,
      bgColor: strengthLevels[score].bgColor
    };
  };

  return (
    <div className="space-y-6">
      <ProgressBar />

      {/* Paso 1: Email */}
      {step === 'email' && (
        <form onSubmit={handleSubmitEmail} className="space-y-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <Mail className="h-6 w-6 text-[#2068A6]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Recuperar Contraseña</h2>
            <p className="text-gray-600 mt-2">
              Ingresa tu correo electrónico para recibir un código de verificación
            </p>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent transition-all"
              placeholder="usuario@ejemplo.com"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onBackToLogin}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={20} />
              Volver
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#2068A6] text-white py-3 rounded-lg hover:bg-[#1a5a8a] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Enviando...' : 'Enviar Código'}
            </button>
          </div>
        </form>
      )}

      {/* Paso 2: Código de Verificación */}
      {step === 'code' && (
        <form onSubmit={handleSubmitCode} className="space-y-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <Shield className="h-6 w-6 text-[#2068A6]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Código de Verificación</h2>
            <p className="text-gray-600 mt-2">
              Hemos enviado un código a <strong>{email}</strong>
            </p>
          </div>

          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              Código de 6 dígitos
            </label>
            <input
              id="code"
              type="text"
              required
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent text-center text-xl tracking-widest"
              placeholder="000000"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep('email')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={20} />
              Atrás
            </button>
            <button
              type="submit"
              disabled={isLoading || code.length !== 6}
              className="flex-1 bg-[#2068A6] text-white py-3 rounded-lg hover:bg-[#1a5a8a] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Verificando...' : 'Verificar'}
            </button>
          </div>
        </form>
      )}

      {/* Paso 3: Nueva Contraseña */}
      {step === 'newPassword' && (
        <form onSubmit={handleSubmitNewPassword} className="space-y-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <Lock className="h-6 w-6 text-[#2068A6]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Nueva Contraseña</h2>
            <p className="text-gray-600 mt-2">
              Crea una nueva contraseña para tu cuenta
            </p>
          </div>

          {/* Nueva Contraseña con opción de mostrar */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Nueva Contraseña
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent transition-all"
                placeholder="Mínimo 6 caracteres"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Indicador de fortaleza de contraseña */}
            {newPassword && (
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">Fortaleza de la contraseña:</span>
                  <span className={`text-xs font-medium ${getPasswordStrength(newPassword).color}`}>
                    {getPasswordStrength(newPassword).text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${getPasswordStrength(newPassword).score * 25}%`,
                      backgroundColor: getPasswordStrength(newPassword).color
                    }}
                  ></div>
                </div>
                <ul className="mt-2 text-xs text-gray-600 space-y-1">
                  <li className={`flex items-center ${newPassword.length >= 6 ? 'text-green-600' : ''}`}>
                    {newPassword.length >= 6 ? <Check size={16} color='green' /> : <CircleAlert size={16} color='red' />} Mínimo 6 caracteres
                  </li>
                  <li className={`flex items-center ${/[A-Z]/.test(newPassword) ? 'text-green-600' : ''}`}>
                    {/[A-Z]/.test(newPassword) ? <Check size={16} color='green' /> : <CircleAlert size={16} color='red' />} Una letra mayúscula
                  </li>
                  <li className={`flex items-center ${/[0-9]/.test(newPassword) ? 'text-green-600' : ''}`}>
                    {/[0-9]/.test(newPassword) ? <Check size={16} color='green' /> : <CircleAlert size={16} color='red' />} Un número
                  </li>
                  <li className={`flex items-center ${/[!@#$%^&*]/.test(newPassword) ? 'text-green-600' : ''}`}>
                    {/[!@#$%^&*]/.test(newPassword) ? <Check size={16} color='green' /> : <CircleAlert size={16} color='red' />} Un carácter especial
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Confirmar Contraseña con opción de mostrar */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2068A6] focus:border-transparent transition-all"
                placeholder="Repite tu contraseña"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Indicador de coincidencia */}
            {confirmPassword && (
              <div className="mt-2">
                <span className={`text-xs font-medium ${newPassword === confirmPassword ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {newPassword === confirmPassword ? '✅ Las contraseñas coinciden' : '❌ Las contraseñas no coinciden'}
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep('code')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={20} />
              Atrás
            </button>
            <button
              type="submit"
              disabled={isLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
              className="flex-1 bg-[#2068A6] text-white py-3 rounded-lg hover:bg-[#1a5a8a] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Actualizando...' : 'Actualizar'}
            </button>
          </div>
        </form>
      )}

      {/* Paso 4: Éxito */}
      {step === 'success' && (
        <div className="text-center space-y-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">¡Contraseña Actualizada!</h2>
          <p className="text-gray-600">
            Tu contraseña ha sido actualizada exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.
          </p>
          <button
            onClick={onBackToLogin}
            className="w-full bg-[#2068A6] text-white py-3 rounded-lg hover:bg-[#1a5a8a] transition-colors"
          >
            Volver al Inicio de Sesión
          </button>
        </div>
      )}
    </div>
  );
}