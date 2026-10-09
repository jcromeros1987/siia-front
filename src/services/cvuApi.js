/**
 * ============================================================
 * Servicio de API para CVU
 * ============================================================
 *
 * Este archivo concentra todas las peticiones HTTP relacionadas
 * con el módulo CVU.
 *
 * La comunicación se realiza mediante la instancia "api"
 * proporcionada por Axios.
 *
 * IMPORTANTE:
 * - Este archivo NO maneja directamente el token JWT.
 * - La instancia "api" se encarga de agregar el token mediante
 *   el interceptor configurado en:
 *
 *   C:\Proyectos\SIIA\siia-front\src\api\axiosConfig.js
 *
 * - Aquí solamente definimos las operaciones que consume el
 *   frontend para trabajar con CVU.
 * ============================================================
 */

/**
 * ============================================================
 * Obtener información completa del CVU de un usuario
 * ============================================================
 *
 * Endpoint:
 *
 * GET /api/v1/cvu/{userId}
 *
 * @param {Object} params
 * @param {Object} params.api
 *   Instancia de Axios configurada para la aplicación.
 *
 * @param {string} params.userId
 *   Identificador del usuario cuyo CVU se desea consultar.
 *
 * @returns {Promise}
 *   Promesa con la respuesta HTTP de Axios.
 */
const fetchCVU = async ({ api, userId }) => {
  return api.get(`/api/v1/cvu/${userId}`)
}

/**
 * ============================================================
 * Obtener especificación de un formulario CVU
 * ============================================================
 *
 * Endpoint:
 *
 * GET /api/v1/cvu/form/{productType}/
 *
 * El backend genera/devolverá la estructura que utiliza
 * RecursiveForm.jsx para construir dinámicamente el formulario.
 *
 * Ejemplo:
 *
 * productType = "articulosCientifica"
 *
 * Solicitud:
 *
 * GET /api/v1/cvu/form/articulosCientifica/
 *
 * @param {Object} params
 * @param {Object} params.api
 *   Instancia de Axios.
 *
 * @param {string} params.productType
 *   Tipo de producto que se desea capturar.
 *
 * @returns {Promise}
 *   Respuesta HTTP con la especificación del formulario.
 */
const getFormSpecification = async ({ api, productType }) => {
  return api.get(`/api/v1/cvu/form/${productType}/`)
}

/**
 * ============================================================
 * Crear un nuevo registro CVU
 * ============================================================
 *
 * Endpoint:
 *
 * POST /api/v1/cvu/create-entry/
 *
 * Esta operación se utiliza cuando el usuario presiona
 * "Agregar" en la interfaz.
 *
 * El objeto entryData contiene la información capturada
 * mediante DynamicForm / RecursiveForm.
 *
 * @param {Object} params
 * @param {Object} params.api
 *   Instancia de Axios.
 *
 * @param {Object} params.entryData
 *   Información del nuevo producto CVU.
 *
 * @returns {Promise}
 *   Respuesta HTTP del backend.
 */
const addEntry = ({ api, entryData }) => {
  return api.post('/api/v1/cvu/create-entry/', entryData)
}

/**
 * ============================================================
 * Actualizar un registro CVU existente
 * ============================================================
 *
 * Endpoint:
 *
 * PATCH /api/v1/cvu/update-entry/
 *
 * Esta operación se utiliza cuando el usuario modifica
 * un registro que ya existe.
 *
 * @param {Object} params
 * @param {Object} params.api
 *   Instancia de Axios.
 *
 * @param {Object} params.entryData
 *   Información modificada del producto CVU.
 *
 * @returns {Promise}
 *   Respuesta HTTP del backend.
 */
const updateEntry = ({ api, entryData }) => {
  return api.patch('/api/v1/cvu/update-entry/', entryData)
}

/**
 * ============================================================
 * Cargar archivo CVU
 * ============================================================
 *
 * Endpoint:
 *
 * POST /api/v1/cvu/
 *
 * Esta operación recibe un archivo JSON del CVU mediante
 * multipart/form-data.
 *
 * El componente CVUUpload.jsx construye previamente el
 * FormData:
 *
 *   const formData = new FormData()
 *
 *   formData.append('cvuFile', file)
 *   formData.append('usuario', userId)
 *
 * Posteriormente este servicio envía dicho FormData al backend.
 *
 * @param {Object} params
 * @param {Object} params.api
 *   Instancia de Axios.
 *
 * @param {FormData} params.file
 *   FormData que contiene el archivo CVU y el usuario destino.
 *
 * @returns {Promise}
 *   Respuesta HTTP del backend.
 */
const uploadCVU = ({ api, file }) => {
  return api.post('/api/v1/cvu/', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

/**
 * Descarga el CVU con la misma estructura del archivo de Rizoma.
 *
 * GET /api/v1/cvu/{userId}/export/
 */
const downloadCVU = ({ api, userId }) => {
  return api.get(`/api/v1/cvu/${userId}/export/`, {
    responseType: 'blob',
  })
}

const saveBlobAsFile = (data, filename) => {
  const blob = data instanceof Blob
    ? data
    : new Blob(
      [data],
      { type: 'application/json;charset=utf-8' }
    )

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

/**
 * ============================================================
 * Exportaciones
 * ============================================================
 *
 * Estos métodos son utilizados principalmente por:
 *
 * CVUInfo.jsx
 * CVUUpload.jsx
 * DynamicForm.jsx
 *
 * para comunicarse con el backend.
 * ============================================================
 */
export {
  fetchCVU,
  getFormSpecification,
  addEntry,
  updateEntry,
  uploadCVU,
  downloadCVU,
  saveBlobAsFile,
}