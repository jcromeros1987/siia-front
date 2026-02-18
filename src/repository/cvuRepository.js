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

const addEntry = ({ token, onTokenRefresh, entryData }) => {
  const api = createApiClient(token, onTokenRefresh)
  return api.post('/api/v1/cvu/create-entry/', entryData)
}

const updateEntry = ({ token, onTokenRefresh, entryData }) => {
  const api = createApiClient(token, onTokenRefresh)
  return api.patch('/api/v1/cvu/update-entry/', entryData)
}

export { fetchCVU, getFormSpecification, addEntry, updateEntry }
