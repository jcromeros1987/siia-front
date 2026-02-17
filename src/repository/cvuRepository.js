import { createApiClient } from '@/api/axiosConfig'

const fetchCVU = async ({ token, userId }) => {
  const api = createApiClient(token)
  return api.get(`/api/v1/cvu/${userId}`)
}

const getFormSpecification = async ({ token, productType }) => {
  console.log('Fetching form specification for product type:', productType)
  const api = createApiClient(token)
  return api.get(`/api/v1/cvu/form/${productType}/`)
}

export { fetchCVU, getFormSpecification }
