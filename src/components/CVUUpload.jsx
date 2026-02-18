import { useState, useRef } from 'react'
import { uploadCVU } from '@/repository/cvuRepository'

const CVUUpload = ({ token, onTokenRefresh, userId, onSuccess = null, onError = null }) => {
  const fileInputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError(null)

    // Validate file type (JSON)
    if (!file.type.includes('json')) {
      const message = 'Por favor, selecciona un archivo JSON válido'
      setError(message)
      onError?.(message)
      return
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      const message = 'El archivo es demasiado grande. Máximo 10MB'
      setError(message)
      onError?.(message)
      return
    }

    handleUpload(file)
  }

  const handleUpload = async (file) => {
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('cvuFile', file)
      formData.append('usuario', userId)

      const response = await uploadCVU({ token, onTokenRefresh, file: formData })

      console.log('CVU file uploaded successfully:', response)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      onSuccess?.(response)
    } catch (err) {
      const message = err.message || 'Error al cargar el archivo CVU'
      setError(message)
      onError?.(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type='file'
        accept='.json'
        onChange={handleFileSelect}
        className='hidden'
        disabled={isLoading}
      />

      <button
        type='button'
        className='btn btn-outline btn-secondary gap-2'
        title='Cargar CVU desde archivo JSON'
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading
          ? (
            <>
              <span className='loading loading-spinner loading-sm' />
              Cargando...
            </>
            )
          : (
            <>
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
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
              CVU
            </>
            )}
      </button>

      {error && (
        <div className='alert alert-error shadow-md border border-error/20 animate-pulse'>
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
              d='M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <div>
            <h3 className='font-semibold'>Error al cargar CVU</h3>
            <span className='text-sm'>{error}</span>
          </div>
        </div>
      )}
    </>
  )
}

export default CVUUpload
