import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createApiClient } from '../api/axiosConfig'
import { useToken } from '../hooks/useToken'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [emailFilled, setEmailFilled] = useState(false)
  const [passwordFilled, setPasswordFilled] = useState(false)
  const { setToken, isLoading } = useToken()
  const api = createApiClient()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await api.post('/api/token/', {
        email,
        password
      })

      const { accessToken, refreshToken } = response.data

      if (accessToken) {
        console.log('Token recibido:', accessToken)
        setToken(accessToken, refreshToken)
        navigate('/', { replace: true })
      } else {
        setError('No se recibió el token')
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Error al iniciar sesión')
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center relative overflow-hidden'>
      <div className='absolute inset-0 bg-base-100 w-full h-3/5' />
      <div className='absolute bottom-0 w-full h-2/5 bg-primary' />
      <svg className='absolute top-1/2 left-0 w-full h-auto md:-translate-y-1/2 lg:-translate-y-3/4' viewBox='0 0 1200 400' preserveAspectRatio='xMidYMid slice'>
        <path d='M 0 203 C 13 196 39 174 93 172 C 346 166 347 380 602 328 C 929 304 826 20 1099 3 C 1145 4 1190 14 1200 27 L 1200 400 L 0 400 L 0 203' fill='currentColor' className='text-primary' />
      </svg>
      <div className='relative z-10 flex flex-col items-center gap-0'>
        <div className='p-10 z-20 bg-base-300 rounded-lg shadow-2xl/30 max-w-sm md:max-w-lg md:min-w-lg text-center'>
          <div className='w-32 h-32 bg-primary rounded-full mx-auto -mt-26 flex justify-center items-center'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-20 h-20 text-base-100'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z' />
            </svg>
          </div>
          <h2 className='text-lg mt-4 text-primary'>BIENVENIDO DE VUELTA</h2>
          <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
            <div className='relative'>
              <input
                id='email'
                type='email'
                className='peer block w-full border-b-2 border-gray-300 px-4 pb-2 pt-6 focus:outline-none focus:border-primary transition-colors duration-300'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setEmailFilled(e.target.value.length > 0)
                }}
              />
              <label
                htmlFor='email' className={`absolute font-bold text-primary transition-all duration-300
                                        ${emailFilled || email ? 'left-0 top-0.5 scale-75' : 'top-6 scale-100'} 
                                        peer-focus:top-0.5 peer-focus:scale-75 peer-focus:left-0 
                                        ${!emailFilled && !email ? 'font-semibold left-2' : ''}`}
              >
                Correo
              </label>
            </div>
            <div className='relative'>
              <input
                id='password'
                type='password'
                className='peer block w-full border-b-2 border-gray-300 px-4 pb-2 pt-6 focus:outline-none focus:border-primary transition-colors duration-300'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordFilled(e.target.value.length > 0)
                }}
              />
              <label
                htmlFor='password' className={`absolute font-bold text-primary transition-all duration-300 
                                           ${passwordFilled || password ? 'left-0 top-0.5 scale-75' : 'top-6 scale-100'} 
                                           peer-focus:top-0.5 peer-focus:scale-75 peer-focus:left-0 
                                           ${!passwordFilled && !password ? 'font-semibold left-2' : ''}`}
              >
                Contraseña
              </label>
            </div>
            <div className='text-left mt-8'>
              <a href='#' className='text-primary hover:text-primary/80 font-medium transition-colors duration-300'>¿Olvidaste tu contraseña?</a>
            </div>
            <button
              type='submit'
              disabled={isLoading}
              className='bg-primary text-base-100 py-3 px-12 rounded-full mt-4 font-bold hover:bg-primary/90 active:scale-95 disabled:opacity-60 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              {isLoading
                ? (
                  <span className='flex items-center justify-center gap-2'>
                    <span className='loading loading-spinner loading-sm' />
                    Cargando...
                  </span>
                  )
                : 'Iniciar Sesión'}
            </button>
          </form>
          {error && (
            <div className='mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md flex gap-3 items-start'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 flex-shrink-0 mt-0.5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4v2m0-6a4 4 0 110-8 4 4 0 010 8zm0 0a6 6 0 01-6 6m0 0a6 6 0 006-6m0 0a6 6 0 00-6-6m0 0a6 6 0 006 6' />
              </svg>
              <span className='text-sm font-medium'>{error}</span>
            </div>
          )}
        </div>
        <div className='shadow-2xl/30 z-10 -mt-6 rounded-lg w-64 md:w-md pt-12 pb-8 text-sm md:text-base text-center bg-base-100 px-6'>
          <p className='text-primary'>¿No tienes una cuenta? <a href='#' className='font-semibold hover:text-primary/80 transition-colors duration-300'>Registrate aquí</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login
