import { Navigate, Outlet } from 'react-router-dom'
import { useToken } from '../hooks/useToken'

const ProtectedRoute = () => {
  const { token } = useToken()

  console.log('ProtectedRoute - token:', token) // Debug log to check token value
  // If there is no token, redirect to the login page
  if (!token.access) {
    return <Navigate to='/login' replace />
  }

  // If there is a token, render the navbar and child routes
  return (
    <div className='bg-primary min-h-screen'>
      <Outlet />
    </div>
  )
}

export default ProtectedRoute
