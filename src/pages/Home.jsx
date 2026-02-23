import { useEffect } from 'react'
import { useFetchCVU } from '@/hooks/useFetchCVU'
import UserInfo from '@/components/UserInfo'
import { CVUInfo } from '@/components/CVUInfo'

const Home = () => {
  const { userData, cvuData, fetchCVUData, isLoading } = useFetchCVU()

  useEffect(() => {
    fetchCVUData()
  }, [])

  return (
    <div className='carousel carousel-center w-full h-screen bg-primary snap-x snap-mandatory overflow-x-auto overflow-hidden'>
      <div id='userInfo' className='carousel-item relative w-full h-full flex-shrink-0 flex flex-col'>
        <div className='flex-1 overflow-y-auto w-full'>
          <UserInfo userData={userData} isLoading={isLoading} fetchCVUData={fetchCVUData} />
        </div>
        <div className='absolute left-5 right-5 top-1/2 hidden md:flex -translate-y-1/2 transform justify-between pointer-events-none'>
          <a href='#cvuInfo' className='btn btn-circle pointer-events-auto'>❮</a>
          <a href='#cvuInfo' className='btn btn-circle pointer-events-auto'>❯</a>
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
          <a href='#userInfo' className='btn btn-circle pointer-events-auto'>❮</a>
          <a href='#userInfo' className='btn btn-circle pointer-events-auto'>❯</a>
        </div>
        <div className='absolute bottom-4 left-0 right-0 md:hidden flex justify-center'>
          <span className='badge badge-neutral text-xs'>← Desliza para atrás</span>
        </div>
      </div>
    </div>
  )
}

export default Home
