import { createApiClient } from '../api/axiosConfig'

export const fetchCVU = async ({ token, userId }) => {
  const api = createApiClient(token)
  try {
    const response = await api.get(`/api/v1/cvu/${userId}`)
    console.log(response.data)
    return response.data.data
  } catch (error) {
    console.error('Error fetching CVU:', error)
  }
}
