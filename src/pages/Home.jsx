import { useEffect } from 'react'
import { useToken } from '@/hooks/useToken'
import { fetchCVU } from '@/repository/cvuRepository'

const Home = () => {
  const { token, userId } = useToken()

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        console.log('User ID from token:', userId)
        const cvuData = await fetchCVU({ token, userId })
        console.log('CVU data:', cvuData)
      }
    }

    fetchData()
  }, [token, userId])

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold text-primary'>¡Bienvenido a SIIA!</h1>
      <p className='text-lg text-gray-600 mt-4'>Tu sistema integral de información académica</p>
    </div>
  )
}

export default Home
