import { createApiClient } from '@/api/axiosConfig'

const fetchCVU = async ({ token, onTokenRefresh, userId }) => {
  const api = createApiClient(token, onTokenRefresh)
  return api.get(`/api/v1/cvu/${userId}`)
}

const getFormSpecification = async ({ token, onTokenRefresh, productType }) => {
  console.log('Fetching form specification for product type:', productType)
  const api = createApiClient(token, onTokenRefresh)
  return api.get(`/api/v1/cvu/form/${productType}/`)
}

export { fetchCVU, getFormSpecification }
