import { createContext, useState, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { jwtDecode } from 'jwt-decode'

const TokenContext = createContext()

const TokenProvider = ({ children }) => {
  // Access token in memory (lost on refresh for security)
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', null)

  // Refresh token in localStorage (persists across refreshes)
  const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken', null)

  // Loading state for apps that need to rehydrate on mount
  const [isLoading, setIsLoading] = useState(true)

  const [userId, setUserId] = useLocalStorage('userId', null)

  const token = {
    access: accessToken,
    refresh: refreshToken
  }

  const setToken = useCallback((access, refresh) => {
    setAccessToken(access)
    if (refresh) {
      setRefreshToken(refresh)
    }
    if (access) {
      const decodedPayload = jwtDecode(access)
      setUserId(decodedPayload.user_id)
    }
  }, [setRefreshToken, setAccessToken, setUserId])

  const updateAccessToken = useCallback((newAccessToken) => {
    setAccessToken(newAccessToken)
  }, [setAccessToken])

  const clearTokens = useCallback(() => {
    setAccessToken(null)
    setRefreshToken(null)
    setUserId(null)
  }, [setAccessToken, setRefreshToken, setUserId])

  return (
    <TokenContext.Provider value={{
      token,
      setToken,
      updateAccessToken,
      clearTokens,
      isLoading,
      setIsLoading,
      userId
    }}
    >
      {children}
    </TokenContext.Provider>
  )
}

export { TokenContext, TokenProvider }
