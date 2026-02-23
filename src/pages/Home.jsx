import { useEffect } from 'react'
import { useFetchCVU } from '@/hooks/useFetchCVU'
import UserInfo from '@/components/UserInfo'

const Home = () => {
  const { userData, fetchCVUData, isLoading } = useFetchCVU()

  useEffect(() => {
    fetchCVUData()
  }, [])

  return (
    <UserInfo userData={userData} isLoading={isLoading} />
  )
}

export default Home
