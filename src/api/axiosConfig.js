import axios from 'axios'

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  isRefreshing = false
  failedQueue = []
}

export const createApiClient = (token, onTokenRefresh) => {
  const api = axios.create({
    baseURL: import.meta.env.API_URL || 'http://localhost:8000',
    withCredentials: true // Include cookies (httpOnly refresh token)
  })

  // Request interceptor: Add access token to headers
  api.interceptors.request.use(
    (config) => {
      // Only set if not already set (allows retry with new token to keep new token)
      if (!config.headers.Authorization && token?.access) {
        config.headers.Authorization = `Bearer ${token.access}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor: Handle token refresh
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      // Only retry once and if it's a 401
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        if (!isRefreshing) {
          isRefreshing = true

          try {
            // Call your refresh endpoint
            const response = await axios.post(
              `${import.meta.env.API_URL || 'http://localhost:8000'}/api/token/refresh/`,
              { refresh: token.refresh },
              { withCredentials: true }
            )

            const { access: accessToken } = response.data

            // Update token in context (handled by parent component)
            if (onTokenRefresh) {
              onTokenRefresh(accessToken)
            }
            processQueue(null, accessToken)

            console.log('Token refreshed successfully:', accessToken)
            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
            return api(originalRequest)
          } catch (err) {
            console.error('Token refresh failed:', err)
            processQueue(err, null)
            // Redirect to login on refresh failure
            window.location.href = '/login'
            return Promise.reject(err)
          }
        } else {
          // If already refreshing, queue the request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          }).then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
        }
      }

      return Promise.reject(error)
    }
  )

  return api
}
