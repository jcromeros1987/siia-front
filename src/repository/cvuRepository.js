import { createApiClient } from '../api/axiosConfig'

export const fetchCVU = async ({ token, userId }) => {
  const api = createApiClient(token)
  return api.get(`/api/v1/cvu/${userId}`)
}
