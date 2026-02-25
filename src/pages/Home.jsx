import { useEffect } from 'react'
import { useFetchCVU } from '@/hooks/useFetchCVU'
import UserInfo from '@/components/UserInfo'
import { CVUInfo } from '@/components/CVUInfo'
import CVUNotFound from '@/components/CVUNotFound'

const Home = () => {
  const { userData, cvuData, fetchCVUData, isLoading, error } = useFetchCVU()

  useEffect(() => {
    fetchCVUData()
  }, [])

  // Show loading state
  if (isLoading && !cvuData) {
    return (
      <div className='w-full h-screen flex items-center justify-center bg-primary'>
        <div className='flex flex-col items-center gap-4'>
          <span className='loading loading-spinner loading-lg text-base-100'></span>
          <p className='text-base-100 text-lg'>Cargando datos...</p>
        </div>
      </div>
    )
  }

  // Show CVU not found component if 404 error
  if (error === 404) {
    return <CVUNotFound fetchCVUData={fetchCVUData} isLoading={isLoading} />
  }

  // Show error message for other errors
  if (error) {
    return (
      <div className='w-full h-screen flex items-center justify-center bg-primary'>
        <div className='alert alert-error shadow-lg max-w-md'>
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
              d='M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <div>
            <h3 className='font-bold'>Error al cargar datos</h3>
            <div className='text-xs'>Ha ocurrido un error. Por favor, recarga la página.</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='carousel carousel-center w-full h-screen bg-primary snap-x snap-mandatory overflow-x-auto overflow-hidden'>
      <div id='userInfo' className='carousel-item relative w-full h-full flex-shrink-0 flex flex-col'>
        <div className='flex-1 overflow-y-auto w-full'>
          <UserInfo userData={userData} isLoading={isLoading} fetchCVUData={fetchCVUData} />
        </div>
        <div className='absolute left-5 right-5 top-1/2 hidden md:flex -translate-y-1/2 transform justify-between pointer-events-none'>
          <a href='#cvuInfo' className='btn btn-circle pointer-events-auto opacity-50 hover:opacity-100'>❮</a>
          <a href='#cvuInfo' className='btn btn-circle pointer-events-auto opacity-50 hover:opacity-100'>❯</a>
        </div>
        <div className='absolute bottom-4 left-0 right-0 md:hidden flex justify-center'>
          <span className='badge badge-neutral text-xs'>Desliza para más →</span>
        </div>
      </div>

      <div id='cvuInfo' className='carousel-item relative w-full h-full flex-shrink-0 flex flex-col'>
        <div className='flex-1 overflow-y-auto w-full'>
          <CVUInfo cvuData={cvuData} fetchCVUData={fetchCVUData} isLoading={isLoading} />
        </div>
        <div className='absolute left-5 right-5 top-1/2 hidden md:flex -translate-y-1/2 transform justify-between pointer-events-none z-50'>
          <a href='#userInfo' className='btn btn-circle bg-primary pointer-events-auto opacity-50 hover:opacity-100'>❮</a>
          <a href='#userInfo' className='btn btn-circle bg-primary pointer-events-auto opacity-50 hover:opacity-100'>❯</a>
        </div>
        <div className='absolute bottom-4 left-0 right-0 md:hidden flex justify-center'>
          <span className='badge badge-neutral text-xs'>← Desliza para atrás</span>
        </div>
      </div>
    </div>
  )
}

export default Home
