import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CVUUpload from '@/components/CVUUpload'
import { useToken } from '@/hooks/useToken'

const CVUNotFound = ({ fetchCVUData }) => {
  const { clearTokens } = useToken()
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const navigate = useNavigate()

  const handleUploadSuccess = (response) => {
    setUploadSuccess(true)
    // Refetch the CVU data after successful upload
    setTimeout(() => {
      fetchCVUData({ skipCache: true })
    }, 500)
  }

  const handleUploadError = (error) => {
    console.error('CVU upload error:', error)
    setUploadSuccess(false)
  }

  const handleLogout = () => {
    clearTokens()
    navigate('/logout')
  }

  return (
    <div className='w-full h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10'>
      <div className='card bg-base-100 shadow-xl max-w-md w-full mx-4'>
        <div className='card-body items-center text-center'>
          <div className='mb-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='w-20 h-20 stroke-current text-warning inline-block'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>

          <h2 className='card-title text-2xl'>CVU no encontrado</h2>
          <p className='text-sm opacity-70 mb-6'>
            Aún no tienes un archivo CVU cargado. Por favor, sube tu archivo JSON del Currículum Vitae Único para comenzar.
          </p>

          <div className='w-full flex flex-col items-center gap-3'>
            <CVUUpload
              onSuccess={handleUploadSuccess}
              onError={handleUploadError}
            />

            <button
              onClick={handleLogout}
              className='btn btn-outline btn-error gap-2'
              title='Cerrar sesión'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='w-5 h-5 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                />
              </svg>
              Salir
            </button>

            {uploadSuccess && (
              <div className='alert alert-success shadow-md border border-success/20 w-full mt-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 flex-shrink-0 stroke-current'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <div className='text-sm'>
                  <p className='font-semibold'>¡Archivo cargado exitosamente!</p>
                  <p>Redirigiendo...</p>
                </div>
              </div>
            )}
          </div>

          <div className='divider my-4'>O</div>

          <p className='text-xs opacity-50'>
            ¿Necesitas ayuda? Consulta la documentación para conocer el formato del archivo CVU.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CVUNotFound
