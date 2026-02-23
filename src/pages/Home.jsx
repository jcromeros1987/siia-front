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
    <div className='caruousel w-full'>
      <div id='slide1' className='carousel-item relative w-full'>
        <UserInfo userData={userData} isLoading={isLoading} />
        <div className='absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between'>
          <a href='#slide2' className='btn btn-circle'>❮</a>
          <a href='#slide2' className='btn btn-circle'>❯</a>
        </div>
      </div>

      <div id='slide2' className='carousel-item relative w-full'>
        <CVUInfo cvuData={cvuData} fetchCVUData={fetchCVUData} isLoading={isLoading} />
        <div className='absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between'>
          <a href='#slide1' className='btn btn-circle'>❮</a>
          <a href='#slide1' className='btn btn-circle'>❯</a>
        </div>
      </div>

    </div>
  )
}

export default Home
