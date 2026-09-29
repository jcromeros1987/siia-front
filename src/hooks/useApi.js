import { useMemo } from 'react'
import { useToken } from './useToken'
import { createApiClient } from '../api/axiosConfig'

/**
 * Hook centralizado para crear y obtener la instancia de Axios
 * utilizada por las peticiones autenticadas del frontend.
 *
 * La instancia se vuelve a crear cuando cambia el token o
 * la función para limpiar los tokens.
 */
export const useApi = () => {
  const {
    token,
    updateAccessToken,
    clearTokens,
  } = useToken()

  /**
   * Crea la instancia de API con la información actual de autenticación.
   *
   * updateAccessToken es importante porque axiosConfig.js puede
   * obtener un nuevo access token cuando una petición recibe 401.
   *
   * De esta manera, cuando el interceptor refresca el token,
   * puede actualizar TokenContext y las siguientes peticiones
   * utilizarán el access token actualizado.
   */
  const api = useMemo(() => {
    return createApiClient(
      token,
      updateAccessToken,
      clearTokens
    )
  }, [token, updateAccessToken, clearTokens])

  return api
}