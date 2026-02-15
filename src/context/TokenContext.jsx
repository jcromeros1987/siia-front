import { createContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const TokenContext = createContext()

const TokenProvider = ({ children }) => {
  const [tokenAccess, setTokenAccess] = useLocalStorage('tokenAccess', null)
  const [tokenRefresh, setTokenRefresh] = useLocalStorage('tokenRefresh', null)

  const token = {
    access: tokenAccess,
    refresh: tokenRefresh
  }

  const setToken = (access, refresh) => {
    setTokenAccess(access)
    setTokenRefresh(refresh)
  }

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  )
}

export { TokenContext, TokenProvider }
