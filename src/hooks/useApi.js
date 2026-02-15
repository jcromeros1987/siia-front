import { useMemo } from 'react'
import { useToken } from './useToken'
import { createApiClient } from '../api/axiosConfig'

export const useApi = () => {
  const { token } = useToken()

  // Create a new client instance whenever token changes
  const api = useMemo(() => {
    return createApiClient(token)
  }, [token])

  return api
}
