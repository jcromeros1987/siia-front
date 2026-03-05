const fetchCVU = async ({ api, userId }) => {
  return api.get(`/api/v1/cvu/${userId}`)
}

const getFormSpecification = async ({ api, productType }) => {
  console.log('Fetching form specification for product type:', productType)
  return api.get(`/api/v1/cvu/form/${productType}/`)
}

const addEntry = ({ api, entryData }) => {
  return api.post('/api/v1/cvu/create-entry/', entryData)
}

const updateEntry = ({ api, entryData }) => {
  return api.patch('/api/v1/cvu/update-entry/', entryData)
}

const uploadCVU = ({ api, file }) => {
  return api.post('/api/v1/cvu/', file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export {
  fetchCVU,
  getFormSpecification,
  addEntry,
  updateEntry,
  uploadCVU
}
