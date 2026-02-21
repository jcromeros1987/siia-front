import { useState } from 'react'
import { useToken } from '@/hooks/useToken'
import { fetchCVU } from '@/repository/cvuRepository'

export const useFetchCVU = () => {
  const { token, updateAccessToken, userId } = useToken()
  const [cvuData, setCvuData] = useState({})
  const [userData, setUserData] = useState({})

  const fetchCVUData = () => {
    fetchCVU({ token, onTokenRefresh: updateAccessToken, userId })
      .then((response) => {
        const data = response.data.data || {}
        const userData = response.data.user_data || {}

        setCvuData(data)
        setUserData(userData)
      })
      .catch((error) => console.error('Error fetching CVU data:', error))
  }

  return { cvuData, userData, fetchCVUData }
}
