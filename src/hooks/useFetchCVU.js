import { useState } from 'react'
import { useToken } from '@/hooks/useToken'
import { useCVURepository } from '@/repository/cvuRepository'

export const useFetchCVU = () => {
  const { userId } = useToken()
  const { fetchCVU } = useCVURepository()
  const [cvuData, setCvuData] = useState({})
  const [userData, setUserData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCVUData = ({ skipCache = false } = {}) => {
    if (!skipCache && cvuData && Object.keys(cvuData).length > 0 && userData && Object.keys(userData).length > 0) {
      return
    }
    setIsLoading(true)
    setError(null)
    fetchCVU(userId)
      .then((response) => {
        const data = response.data.data || {}
        const userData = response.data.user_data || {}

        setCvuData(data)
        setUserData(userData)
        setError(null)
      })
      .catch((error) => {
        console.error('Error fetching CVU data:', error)
        setError(error.response?.status)
        setCvuData({})
        setUserData({})
      })
      .finally(() => setIsLoading(false))
  }

  return { cvuData, userData, fetchCVUData, isLoading, error }
}
