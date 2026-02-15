import { createContext, useState, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const TokenContext = createContext()

const TokenProvider = ({ children }) => {
  // Access token in memory (lost on refresh for security)
  const [accessToken, setAccessToken] = useState(null)

  // Refresh token in localStorage (persists across refreshes)
  const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken', null)

  // Loading state for apps that need to rehydrate on mount
  const [isLoading, setIsLoading] = useState(true)

  const token = {
    access: accessToken,
    refresh: refreshToken
  }

  const setToken = useCallback((access, refresh) => {
    setAccessToken(access)
    if (refresh) {
      setRefreshToken(refresh)
    }
  }, [setRefreshToken])

  const updateAccessToken = useCallback((newAccessToken) => {
    setAccessToken(newAccessToken)
  }, [])

  const clearTokens = useCallback(() => {
    setAccessToken(null)
    setRefreshToken(null)
  }, [setRefreshToken])

  return (
    <TokenContext.Provider value={{
      token,
      setToken,
      updateAccessToken,
      clearTokens,
      isLoading,
      setIsLoading
    }}
    >
      {children}
    </TokenContext.Provider>
  )
}

export { TokenContext, TokenProvider }
