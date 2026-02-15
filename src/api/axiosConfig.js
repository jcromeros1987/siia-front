import axios from 'axios'
import { useToken } from '../hooks/useToken'

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

export const createApiClient = (token) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    withCredentials: true // Include cookies (httpOnly refresh token)
  })

  // Request interceptor: Add access token to headers
  api.interceptors.request.use(
    (config) => {
      if (token?.access) {
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
              `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'}/auth/refresh`,
              {},
              { withCredentials: true }
            )

            const { accessToken } = response.data

            // Update token in context (handled by parent component)
            processQueue(null, accessToken)

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
            return api(originalRequest)
          } catch (err) {
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
