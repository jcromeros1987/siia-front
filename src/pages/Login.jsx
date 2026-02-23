import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToken } from '@/hooks/useToken'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [emailFilled, setEmailFilled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordFilled, setPasswordFilled] = useState(false)
  const { setToken } = useToken()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    if (!email || !password) {
      setError('Por favor, completa ambos campos')
      setIsLoading(false)
      return
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/token/`, {
        email,
        password
      })

      const { access, refresh } = response.data

      if (access) {
        console.log('Token recibido:', access)
        setToken(access, refresh)
        navigate('/', { replace: true })
      } else {
        setError('No se recibió el token')
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary/20 via-base-100 to-primary/10 flex justify-center items-center relative overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-0 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse animation-delay-2000' />
      </div>

      <div className='relative z-10 flex flex-col items-center gap-4 animate-fade-in'>
        {/* Avatar */}
        <div className='avatar mb-4 animate-fade-in-scale'>
          <div className='bg-gradient-to-br from-primary to-primary/70 rounded-full w-32 shadow-lg border-4 border-base-100 flex justify-center items-center hover:shadow-xl hover:scale-110 transition-all duration-300'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-16 h-16 text-base-100'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
              />
            </svg>
          </div>
        </div>

        {/* Card Container */}
        <div className='card bg-base-100 shadow-2xl max-w-sm md:max-w-lg w-full mx-4 animate-fade-in-up hover:shadow-3xl transition-shadow duration-500'>
          <div className='relative'>
            {/* Form Section */}
            <div className='card-body pt-8'>
              <h2 className='card-title justify-center text-3xl text-primary font-bold text-center'>
                Bienvenido de vuelta
              </h2>
              <p className='text-center text-base-content/60 text-sm -mt-2'>Accede a tu cuenta</p>

              <form onSubmit={handleSubmit} className='space-y-6 mt-4'>
                {/* Email Input */}
                <div className='relative group'>
                  <input
                    id='email'
                    type='email'
                    className='peer block w-full border-b-2 border-gray-300 px-0 pb-2 pt-4 bg-transparent focus:outline-none focus:border-primary transition-colors duration-300'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setEmailFilled(e.target.value.length > 0)
                    }}
                    placeholder=' '
                  />
                  <label
                    htmlFor='email'
                    className={`absolute font-bold text-primary transition-all duration-300
                                            ${emailFilled || email ? 'left-0 top-0 scale-75' : 'top-4 scale-100'}
                                            peer-focus:top-0 peer-focus:scale-75 peer-focus:left-0
                                            ${!emailFilled && !email ? 'font-semibold' : ''}`}
                  >
                    Correo
                  </label>
                  <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 peer-focus:w-full' />
                </div>

                {/* Password Input */}
                <div className='relative group'>
                  <input
                    id='password'
                    type='password'
                    className='peer block w-full border-b-2 border-gray-300 px-0 pb-2 pt-4 bg-transparent focus:outline-none focus:border-primary transition-colors duration-300'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setPasswordFilled(e.target.value.length > 0)
                    }}
                    placeholder=' '
                  />
                  <label
                    htmlFor='password'
                    className={`absolute font-bold text-primary transition-all duration-300
                                               ${passwordFilled || password ? 'left-0 top-0 scale-75' : 'top-4 scale-100'}
                                               peer-focus:top-0 peer-focus:scale-75 peer-focus:left-0
                                               ${!passwordFilled && !password ? 'font-semibold' : ''}`}
                  >
                    Contraseña
                  </label>
                  <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 peer-focus:w-full' />
                </div>

                {/* Forgot Password Link */}
                <div className='text-right'>
                  <a
                    href='#'
                    className='link link-primary text-sm font-medium hover:no-underline hover:text-primary/80 transition-colors duration-200'
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                {/* Error Alert */}
                {error && (
                  <div className='alert alert-error shadow-md animate-fade-in-down'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 flex-shrink-0'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 9v2m0 4v2m0-6a4 4 0 110-8 4 4 0 010 8zm0 0a6 6 0 01-6 6m0 0a6 6 0 006-6m0 0a6 6 0 00-6-6m0 0a6 6 0 006 6'
                      />
                    </svg>
                    <span className='text-sm'>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={isLoading}
                  className='btn btn-primary w-full mt-8 text-base font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300'
                >
                  {isLoading && <span className='loading loading-spinner loading-sm' />}
                  {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Sign Up Section */}
        <div className='text-center text-sm animate-fade-in-up animation-delay-300'>
          <p className='text-base-content'>
            ¿No tienes una cuenta?{' '}
            <a href='#' className='link link-primary font-semibold hover:link-hover'>
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}
      </style>
    </div>
  )
}

export default Login
