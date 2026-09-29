/**
 * ============================================================
 * CONFIGURACIÓN DE AXIOS PARA EL FRONTEND
 * ============================================================
 *
 * Este archivo crea el cliente HTTP que utiliza el frontend
 * para comunicarse con el backend de SIIA.
 *
 * También se encarga de:
 *
 * 1. Agregar el access token JWT a las peticiones.
 * 2. Detectar cuando el access token ha expirado.
 * 3. Solicitar un nuevo access token mediante el refresh token.
 * 4. Reintentar automáticamente la petición original.
 * 5. Poner en espera las peticiones que llegan mientras se
 *    está realizando una renovación del token.
 * 6. Redirigir al login si no es posible renovar el token.
 *
 * IMPORTANTE:
 *
 * Esta versión conserva la lógica original del proyecto.
 * Los cambios realizados aquí son únicamente comentarios.
 * ============================================================
 */

import axios from 'axios'


/**
 * ============================================================
 * CONTROL DEL PROCESO DE REFRESH
 * ============================================================
 *
 * Indica si actualmente existe una petición intentando renovar
 * el access token.
 *
 * Esto evita que varias peticiones intenten renovar el token
 * simultáneamente.
 *
 * Ejemplo:
 *
 * Petición A -> 401
 * Petición B -> 401
 * Petición C -> 401
 *
 * Solo A realizará el refresh.
 *
 * B y C quedarán en failedQueue esperando el resultado.
 */
let isRefreshing = false


/**
 * ============================================================
 * COLA DE PETICIONES
 * ============================================================
 *
 * Contiene las peticiones que recibieron un error 401 mientras
 * otra petición ya estaba renovando el token.
 *
 * Cuando el refresh termina:
 *
 * - Si fue exitoso -> todas reciben el nuevo token.
 * - Si falló -> todas reciben el error.
 */
let failedQueue = []


/**
 * ============================================================
 * PROCESAR COLA
 * ============================================================
 *
 * Esta función libera todas las peticiones que estaban
 * esperando durante el proceso de renovación del token.
 *
 * @param {Error|null} error
 *   Error producido durante el refresh.
 *
 * @param {string|null} token
 *   Nuevo access token cuando la renovación fue exitosa.
 */
const processQueue = (error, token = null) => {

  /**
   * Recorrer todas las peticiones que estaban esperando.
   */
  failedQueue.forEach(prom => {

    /**
     * Si ocurrió un error durante el refresh,
     * rechazamos las promesas pendientes.
     */
    if (error) {
      prom.reject(error)

    /**
     * Si el refresh fue exitoso,
     * entregamos el nuevo token a las peticiones pendientes.
     */
    } else {
      prom.resolve(token)
    }
  })


  /**
   * Ya no existe un refresh en proceso.
   */
  isRefreshing = false


  /**
   * Limpiamos la cola.
   */
  failedQueue = []
}


/**
 * ============================================================
 * CREAR CLIENTE API
 * ============================================================
 *
 * Crea una instancia independiente de Axios.
 *
 * @param {Object} token
 *   Objeto que contiene los tokens de autenticación.
 *
 *   Ejemplo:
 *
 *   {
 *      access: "...",
 *      refresh: "..."
 *   }
 *
 * @param {Function} onTokenRefresh
 *   Función proporcionada por el contexto de autenticación
 *   para actualizar el access token.
 *
 * @param {Function} onTokenRefreshFailed
 *   Función que se ejecuta cuando ya no es posible renovar
 *   el token.
 *
 * @returns {AxiosInstance}
 *   Cliente Axios configurado.
 */
export const createApiClient = (
  token,
  onTokenRefresh,
  onTokenRefreshFailed
) => {

  /**
   * ==========================================================
   * CREAR INSTANCIA DE AXIOS
   * ==========================================================
   *
   * baseURL:
   *
   * URL base utilizada para todas las peticiones.
   *
   * Actualmente utiliza:
   *
   * import.meta.env.API_URL
   *
   * Si no existe la variable de entorno, utiliza:
   *
   * http://localhost:8000
   *
   * withCredentials:
   *
   * Permite enviar cookies junto con las peticiones.
   *
   * Esto es importante porque el backend puede utilizar una
   * cookie httpOnly para el refresh token.
   */
  const api = axios.create({
    baseURL: import.meta.env.API_URL || 'http://localhost:8000',

    withCredentials: true // Incluye cookies (refresh token httpOnly)
  })


  /**
   * ==========================================================
   * INTERCEPTOR DE PETICIONES
   * ==========================================================
   *
   * Este interceptor se ejecuta antes de enviar cada petición.
   *
   * Su función principal es agregar el access token JWT
   * al encabezado Authorization.
   */
  api.interceptors.request.use(

    /**
     * --------------------------------------------------------
     * PETICIÓN ANTES DE SER ENVIADA
     * --------------------------------------------------------
     */
    (config) => {

      /**
       * Solo agregamos Authorization si:
       *
       * 1. La petición todavía no tiene Authorization.
       * 2. Existe un access token.
       *
       * La condición de Authorization evita sobrescribir
       * un token actualizado cuando se está reintentando
       * una petición después de un refresh.
       */
      if (!config.headers.Authorization && token?.access) {

        config.headers.Authorization =
          `Bearer ${token.access}`
      }


      /**
       * Regresar la configuración modificada.
       */
      return config
    },


    /**
     * --------------------------------------------------------
     * ERROR AL CONFIGURAR LA PETICIÓN
     * --------------------------------------------------------
     */
    (error) => Promise.reject(error)
  )


  /**
   * ==========================================================
   * INTERCEPTOR DE RESPUESTAS
   * ==========================================================
   *
   * Este interceptor analiza todas las respuestas recibidas
   * desde el backend.
   *
   * Si la respuesta es correcta, simplemente la devuelve.
   *
   * Si recibe HTTP 401, intenta renovar el access token.
   */
  api.interceptors.response.use(

    /**
     * --------------------------------------------------------
     * RESPUESTA EXITOSA
     * --------------------------------------------------------
     *
     * Cualquier respuesta exitosa continúa normalmente.
     */
    (response) => response,


    /**
     * --------------------------------------------------------
     * RESPUESTA CON ERROR
     * --------------------------------------------------------
     */
    async (error) => {

      /**
       * Guardamos la configuración de la petición original.
       *
       * Esto permitirá volver a ejecutarla después de obtener
       * un nuevo access token.
       */
      const originalRequest = error.config


      /**
       * ======================================================
       * VALIDAR ERROR 401
       * ======================================================
       *
       * Solamente se intenta renovar el token cuando:
       *
       * - El backend devuelve 401.
       * - La petición todavía no ha sido reintentada.
       *
       * _retry evita un ciclo infinito.
       *
       * Ejemplo que queremos evitar:
       *
       * petición -> 401
       * refresh -> 401
       * refresh -> 401
       * refresh -> 401
       * ...
       */
      if (
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {

        /**
         * Marcar esta petición como reintentada.
         */
        originalRequest._retry = true


        /**
         * ====================================================
         * ¿YA SE ESTÁ RENOVANDO EL TOKEN?
         * ====================================================
         */
        if (!isRefreshing) {

          /**
           * Indicamos que comienza el proceso de refresh.
           */
          isRefreshing = true


          try {

            /**
             * =================================================
             * SOLICITAR NUEVO ACCESS TOKEN
             * =================================================
             *
             * Utilizamos axios directamente en lugar de "api".
             *
             * Esto evita que la propia petición de refresh
             * vuelva a pasar por el interceptor que intenta
             * renovar el token.
             */
            const response = await axios.post(

              /**
               * Endpoint del refresh token.
               */
              `${
                import.meta.env.API_URL ||
                'http://localhost:8000'
              }/api/token/refresh/`,

              /**
               * Datos enviados al backend.
               */
              {
                refresh: token.refresh
              },

              /**
               * Permitir envío de cookies.
               */
              {
                withCredentials: true
              }
            )


            /**
             * =================================================
             * OBTENER NUEVO ACCESS TOKEN
             * =================================================
             */
            const {
              access: accessToken
            } = response.data


            /**
             * =================================================
             * ACTUALIZAR TOKEN EN EL CONTEXTO
             * =================================================
             *
             * La actualización real del token es responsabilidad
             * del componente/contexto que creó este cliente API.
             */
            if (onTokenRefresh) {
              onTokenRefresh(accessToken)
            }


            /**
             * Liberar las peticiones que estaban esperando.
             *
             * Todas recibirán el nuevo access token.
             */
            processQueue(null, accessToken)


            /**
             * Mensaje de diagnóstico.
             */
            console.log(
              'Token refreshed successfully:',
              accessToken
            )


            /**
             * =================================================
             * REINTENTAR PETICIÓN ORIGINAL
             * =================================================
             *
             * Colocamos el nuevo access token en la petición
             * original.
             */
            originalRequest.headers.Authorization =
              `Bearer ${accessToken}`


            /**
             * Volvemos a ejecutar la petición original.
             */
            return api(originalRequest)


          } catch (err) {

            /**
             * =================================================
             * ERROR AL RENOVAR TOKEN
             * =================================================
             */
            console.error(
              'Token refresh failed:',
              err
            )


            /**
             * Todas las peticiones que estaban esperando
             * reciben el error.
             */
            processQueue(err, null)


            /**
             * =================================================
             * NOTIFICAR AL CONTEXTO DE AUTENTICACIÓN
             * =================================================
             *
             * El componente/contexto puede limpiar los tokens
             * almacenados.
             */
            if (onTokenRefreshFailed) {
              onTokenRefreshFailed()
            }


            /**
             * =================================================
             * REGRESAR AL LOGIN
             * =================================================
             *
             * La sesión ya no puede renovarse.
             */
            window.location.href = '/login'


            /**
             * Propagar el error.
             */
            return Promise.reject(err)
          }

        } else {

          /**
           * ==================================================
           * YA EXISTE UN REFRESH EN PROCESO
           * ==================================================
           *
           * No hacemos otro refresh.
           *
           * Esta petición queda esperando en failedQueue.
           */
          return new Promise((resolve, reject) => {

            failedQueue.push({
              resolve,
              reject
            })

          }).then(token => {

            /**
             * Cuando el refresh termine correctamente,
             * recibimos el nuevo token.
             */
            originalRequest.headers.Authorization =
              `Bearer ${token}`


            /**
             * Reintentamos la petición original.
             */
            return api(originalRequest)
          })
        }
      }


      /**
       * ======================================================
       * OTRO TIPO DE ERROR
       * ======================================================
       *
       * Si el error NO es 401, no intentamos renovar el token.
       *
       * Por ejemplo:
       *
       * 400 -> datos incorrectos
       * 403 -> no autorizado
       * 404 -> recurso no encontrado
       * 500 -> error interno del servidor
       *
       * Todos estos errores se regresan directamente al
       * componente que hizo la petición.
       */
      return Promise.reject(error)
    }
  )


  /**
   * ==========================================================
   * DEVOLVER CLIENTE AXIOS
   * ==========================================================
   *
   * Los componentes y hooks recibirán esta instancia para
   * realizar las peticiones al backend.
   */
  return api
}