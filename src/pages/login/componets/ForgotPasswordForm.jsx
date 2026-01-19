import { useState } from 'react';
import { ArrowLeft, Mail, Shield, Lock, CheckCircle, Eye, EyeOff, Check, CircleAlert } from 'lucide-react';
import { UsuariosServices } from '../../../api/services/usuariosServices';
import { CodigoVerificacionServices } from '../../../api/services/codigoVerificacionServices';
import Swal from 'sweetalert2';


export default function ForgotPasswordForm({ onBackToLogin }) {
  const usuarioService = new UsuariosServices();
  const codigoVerificacionService = new CodigoVerificacionServices();
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await usuarioService.validarUsuario({ identificador: email });



      if (res.success) {

        await Swal.fire({
          icon: 'success',
          title: 'Usuario encontrado',
          text: 'Te enviamos un código de verificación al correo.',
          confirmButtonText: 'Continuar'
        });


        setUsuarioId(res.token);
        setStep('code');

      } else {

        await Swal.fire({
          icon: 'error',
          title: 'Correo no válido',
          text: res.message || 'No encontramos un usuario con ese correo.',
        });

      }
    } catch (error) {

      await Swal.fire({
        icon: 'error',
        title: 'Error interno',
        text: 'Hubo un fallo procesando la solicitud.',
      });

      console.error("Error:", error);

    } finally {
      setIsLoading(false);
    }
  };




  const handleSubmitCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await codigoVerificacionService.validarCodigo({
        token: usuarioId,
        codigo: code
      });



      if (res.success) {

        await Swal.fire({
          icon: 'success',
          title: 'Código validado',
          text: 'Ahora puedes crear tu nueva contraseña.',
          confirmButtonText: 'Continuar'
        });


        setUsuarioId(res.token);
        setStep('newPassword');

      } else {

        await Swal.fire({
          icon: 'error',
          title: 'Código incorrecto',
          text: res.message || 'El código no coincide, intenta de nuevo.',
        });

      }
    } catch (error) {

      await Swal.fire({
        icon: 'error',
        title: 'Error interno',
        text: 'Hubo un problema con la verificación. Intenta más tarde.',
      });

      console.error("Error:", error);

    } finally {
      setIsLoading(false);
    }
  };


  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      await Swal.fire({
        icon: 'warning',
        title: 'Contraseñas diferentes',
        text: 'Las contraseñas no coinciden, revisa y vuelve a intentar.',
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await usuarioService.cambiarContrasena({
        token_final: usuarioId,
        new_password: newPassword
      });



      if (res.success) {

        await Swal.fire({
          icon: 'success',
          title: 'Contraseña actualizada',
          text: 'Tu contraseña se cambió correctamente.',
          confirmButtonText: 'Perfecto'
        });

        setStep('success');

      } else {

        await Swal.fire({
          icon: 'error',
          title: 'No se pudo cambiar la contraseña',
          text: res.message || 'Inténtalo de nuevo más tarde.',
        });

      }
    } catch (error) {

      await Swal.fire({
        icon: 'error',
        title: 'Error interno',
        text: 'Hubo un problema con el servidor.',
      });

      console.error("Error:", error);

    } finally {
      setIsLoading(false);
    }
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
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
              <Mail className="h-6 w-6 text-[#2068A6] dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recuperar Contraseña</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Ingresa tu correo electrónico para recibir un código de verificación
            </p>
          </div>

          <div>
            <label htmlFor="identificador" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Correo Electrónico
            </label>
            <input
              id="identificador"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#2068A6] dark:focus:ring-blue-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Correo o usuario"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onBackToLogin}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft size={20} />
              Volver
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#2068A6] dark:bg-blue-700 text-white py-3 rounded-lg hover:bg-[#1a5a8a] dark:hover:bg-blue-600 transition-colors disabled:opacity-50"
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
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
              <Shield className="h-6 w-6 text-[#2068A6] dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Código de Verificación</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Hemos enviado un código a <strong className="text-gray-900 dark:text-white">{email}</strong>
            </p>
          </div>

          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Código de 6 dígitos
            </label>
            <input
              id="code"
              type="text"
              required
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#2068A6] dark:focus:ring-blue-400 focus:border-transparent text-center text-xl tracking-widest bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="000000"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep('email')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft size={20} />
              Atrás
            </button>
            <button
              type="submit"
              disabled={isLoading || code.length !== 6}
              className="flex-1 bg-[#2068A6] dark:bg-blue-700 text-white py-3 rounded-lg hover:bg-[#1a5a8a] dark:hover:bg-blue-600 transition-colors disabled:opacity-50"
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
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
              <Lock className="h-6 w-6 text-[#2068A6] dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Nueva Contraseña</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Crea una nueva contraseña para tu cuenta
            </p>
          </div>

          {/* Nueva Contraseña con opción de mostrar */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#2068A6] dark:focus:ring-blue-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Mínimo 6 caracteres"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Indicador de fortaleza de contraseña */}
            {newPassword && (
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Fortaleza de la contraseña:</span>
                  <span className={`text-xs font-medium ${getPasswordStrength(newPassword).color}`}>
                    {getPasswordStrength(newPassword).text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${getPasswordStrength(newPassword).score * 25}%`,
                      backgroundColor: getPasswordStrength(newPassword).color
                    }}
                  ></div>
                </div>
                <ul className="mt-2 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li className={`flex items-center ${newPassword.length >= 6 ? 'text-green-600 dark:text-green-400' : ''}`}>
                    {newPassword.length >= 6 ? <Check size={16} className="text-green-600 dark:text-green-400" /> : <CircleAlert size={16} className="text-red-600 dark:text-red-400" />} Mínimo 6 caracteres
                  </li>
                  <li className={`flex items-center ${/[A-Z]/.test(newPassword) ? 'text-green-600 dark:text-green-400' : ''}`}>
                    {/[A-Z]/.test(newPassword) ? <Check size={16} className="text-green-600 dark:text-green-400" /> : <CircleAlert size={16} className="text-red-600 dark:text-red-400" />} Una letra mayúscula
                  </li>
                  <li className={`flex items-center ${/[0-9]/.test(newPassword) ? 'text-green-600 dark:text-green-400' : ''}`}>
                    {/[0-9]/.test(newPassword) ? <Check size={16} className="text-green-600 dark:text-green-400" /> : <CircleAlert size={16} className="text-red-600 dark:text-red-400" />} Un número
                  </li>
                  <li className={`flex items-center ${/[!@#$%^&*]/.test(newPassword) ? 'text-green-600 dark:text-green-400' : ''}`}>
                    {/[!@#$%^&*]/.test(newPassword) ? <Check size={16} className="text-green-600 dark:text-green-400" /> : <CircleAlert size={16} className="text-red-600 dark:text-red-400" />} Un carácter especial
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Confirmar Contraseña con opción de mostrar */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#2068A6] dark:focus:ring-blue-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Repite tu contraseña"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Indicador de coincidencia */}
            {confirmPassword && (
              <div className="mt-2">
                <span className={`text-xs font-medium ${newPassword === confirmPassword ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
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
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft size={20} />
              Atrás
            </button>
            <button
              type="submit"
              disabled={isLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
              className="flex-1 bg-[#2068A6] dark:bg-blue-700 text-white py-3 rounded-lg hover:bg-[#1a5a8a] dark:hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Actualizando...' : 'Actualizar'}
            </button>
          </div>
        </form>
      )}

      {/* Paso 4: Éxito */}
      {step === 'success' && (
        <div className="text-center space-y-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">¡Contraseña Actualizada!</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Tu contraseña ha sido actualizada exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.
          </p>
          <button
            onClick={onBackToLogin}
            className="w-full bg-[#2068A6] dark:bg-blue-700 text-white py-3 rounded-lg hover:bg-[#1a5a8a] dark:hover:bg-blue-600 transition-colors"
          >
            Volver al Inicio de Sesión
          </button>
        </div>
      )}
    </div>
  );
}