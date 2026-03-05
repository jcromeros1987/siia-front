import { useApi } from '@/hooks/useApi'

export const useCVURepository = () => {
  const api = useApi()

  const fetchCVU = async (userId) => {
    return api.get(`/api/v1/cvu/${userId}`)
  }

  const getFormSpecification = async (productType) => {
    console.log('Fetching form specification for product type:', productType)
    return api.get(`/api/v1/cvu/form/${productType}/`)
  }

  const addEntry = (entryData) => {
    return api.post('/api/v1/cvu/create-entry/', entryData)
  }

  const updateEntry = (entryData) => {
    return api.patch('/api/v1/cvu/update-entry/', entryData)
  }

  const uploadCVU = (file) => {
    return api.post('/api/v1/cvu/', file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  return {
    fetchCVU,
    getFormSpecification,
    addEntry,
    updateEntry,
    uploadCVU
  }
}
