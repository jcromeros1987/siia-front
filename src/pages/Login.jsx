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
    <div className='min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8'>
      {/* Fondo institucional sutil, sin competir visualmente con el formulario. */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        <div className='absolute -top-32 -left-32 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl' />
        <div className='absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl' />
      </div>

      <main className='relative z-10 w-full max-w-md'>
        {/* Identidad institucional del sistema. */}
        <div className='text-center mb-6'>
          <div className='inline-flex items-center gap-2'>
            <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-[#000080] shadow-sm'>
              <span className='text-lg font-bold text-white'>S</span>
            </div>

            <div className='text-left'>
              <div className='text-lg font-bold leading-none text-[#000080]'>
                SIIA
              </div>
              <div className='text-xs font-medium tracking-wide text-slate-500'>
                CVU
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta principal de autenticación. */}
        <section className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60'>
          <div className='h-1.5 bg-[#000080]' />

          <div className='px-7 py-8 sm:px-9 sm:py-9'>
            {/* Encabezado del formulario. */}
            <div className='mb-8 text-center'>
              <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 ring-8 ring-slate-50'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.7'
                  stroke='currentColor'
                  className='h-8 w-8 text-[#000080]'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                  />
                </svg>
              </div>

              <h1 className='text-2xl font-bold text-[#000080] sm:text-3xl'>
                Bienvenido
              </h1>

              <p className='mt-2 text-sm text-slate-500'>
                Accede a tu cuenta
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-5'>
              {/* Campo de correo con el mismo lenguaje visual del CVU. */}
              <div>
                <label
                  htmlFor='email'
                  className='mb-2 block text-sm font-semibold text-slate-700'
                >
                  Correo
                </label>

                <div className='relative'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.7'
                    stroke='currentColor'
                    className='pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615A2.25 2.25 0 0 1 2.25 6.993V6.75'
                    />
                  </svg>

                  <input
                    id='email'
                    type='email'
                    autoComplete='email'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setEmailFilled(e.target.value.length > 0)
                    }}
                    placeholder='Ingresa tu correo'
                    className='w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#000080] focus:ring-4 focus:ring-indigo-100'
                    required
                  />
                </div>
              </div>

              {/* Campo de contraseña. Se conserva el comportamiento existente. */}
              <div>
                <label
                  htmlFor='password'
                  className='mb-2 block text-sm font-semibold text-slate-700'
                >
                  Contraseña
                </label>

                <div className='relative'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.7'
                    stroke='currentColor'
                    className='pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M16.5 10.5V7.875a4.5 4.5 0 0 0-9 0V10.5m-.75 0h10.5A2.25 2.25 0 0 1 19.5 12.75v6A2.25 2.25 0 0 1 17.25 21h-10.5A2.25 2.25 0 0 1 4.5 18.75v-6A2.25 2.25 0 0 1 6.75 10.5Z'
                    />
                  </svg>

                  <input
                    id='password'
                    type='password'
                    autoComplete='current-password'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setPasswordFilled(e.target.value.length > 0)
                    }}
                    placeholder='Ingresa tu contraseña'
                    className='w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#000080] focus:ring-4 focus:ring-indigo-100'
                    required
                  />
                </div>
              </div>

              <div className='flex justify-end'>
                <a
                  href='#'
                  className='text-sm font-medium text-[#000080] transition hover:text-indigo-700 hover:underline'
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Mensaje de error devuelto por la autenticación. */}
              {error && (
                <div className='flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.8'
                    stroke='currentColor'
                    className='mt-0.5 h-5 w-5 shrink-0'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 9v3.75m0 3.75h.008v.008H12v-.008Zm8.25-3.75a8.25 8.25 0 1 1-16.5 0 8.25 8.25 0 0 1 16.5 0Z'
                    />
                  </svg>

                  <span>{error}</span>
                </div>
              )}

              <button
                type='submit'
                disabled={isLoading}
                className='flex w-full items-center justify-center gap-2 rounded-xl bg-[#000080] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-900/20 transition hover:bg-indigo-900 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60'
              >
                {isLoading && (
                  <span className='loading loading-spinner loading-sm' />
                )}

                {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
              </button>
            </form>
          </div>
        </section>

        <div className='mt-5 text-center text-sm text-slate-500'>
          ¿No tienes una cuenta? 
          <a
            href='#'
            className='font-semibold text-[#000080] transition hover:text-indigo-700 hover:underline'
          >
            Regístrate aquí
          </a>
        </div>

        <p className='mt-6 text-center text-xs text-slate-400'>
          Sistema Institucional de Información Académica · CVU
        </p>
      </main>
    </div>
  )
}

export default Login
