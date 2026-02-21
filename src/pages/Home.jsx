import { useEffect } from 'react'
import { useFetchCVU } from '@/hooks/useFetchCVU'
import UserInfo from '@/components/UserInfo'

const Home = () => {
  const { userData, fetchCVUData } = useFetchCVU()

  useEffect(() => {
    fetchCVUData()
  }, [])

  return (
    <UserInfo userData={userData} />
  )
}

export default Home
