import { useState } from 'react'
import { useToken } from '@/hooks/useToken'
import { fetchCVU } from '@/services/cvuApi'
import { useApi } from '@/hooks/useApi'

export const useFetchCVU = () => {
  const { userId } = useToken()
  const [cvuData, setCvuData] = useState({})
  const [userData, setUserData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const api = useApi()

  const fetchCVUData = ({ skipCache = false } = {}) => {
    if (!skipCache && cvuData && Object.keys(cvuData).length > 0 && userData && Object.keys(userData).length > 0) {
      return
    }
    setIsLoading(true)
    setError(null)
    console.log('Fetching CVU data for userId:', userId)
    fetchCVU({ api, userId })
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
