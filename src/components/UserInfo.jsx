import UserInfoHeader from '@/components/UserInfoHeader'
import UserInfoContact from '@/components/UserInfoContact'
import UserInfoSkills from '@/components/UserInfoSkills'
import UserInfoInterests from '@/components/UserInfoInterests'
import UserInfoKnowledgeArea from '@/components/UserInfoKnowledgeArea'
import UserInfoSystemInfo from '@/components/UserInfoSystemInfo'
import CVUUpload from '@/components/CVUUpload'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useToken } from '@/hooks/useToken'
import { useNavigate } from 'react-router-dom'

const UserInfo = ({ userData, isLoading = false, fetchCVUData = null }) => {
  const { token, clearTokens, updateAccessToken, userId } = useToken()
  const navigate = useNavigate()

  const handleLogout = () => {
    clearTokens()
    navigate('/logout')
  }
  if (!userData && !isLoading) {
    return (
      <div className='alert alert-warning'>
        <span>No hay datos de usuario disponibles</span>
      </div>
    )
  }

  return (
    <SkeletonTheme baseColor='hsla(264, 91%, 53%, 0.1)' highlightColor='hsla(264, 91%, 53%, 0.25)'>
      <div className='flex flex-col min-h-screen'>
        {/* Navigation Bar */}
        <nav className='bg-base-100 border-b border-base-300 px-4 sm:px-6 py-4'>
          <div className='max-w-6xl mx-auto flex items-center justify-between'>
            <h1 className='text-2xl font-bold text-primary'>CVU</h1>
            <div className='flex items-center gap-2'>
              {fetchCVUData && (
                <CVUUpload
                  token={token}
                  onTokenRefresh={updateAccessToken}
                  userId={userId}
                  onSuccess={() => fetchCVUData({ skipCache: true })}
                  onError={(error) => {
                    console.error('Error uploading CVU file:', error)
                  }}
                />
              )}
              <button
                className='btn btn-outline btn-error gap-2'
                onClick={handleLogout}
                title='Cerrar sesión'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='w-5 h-5 stroke-current'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                  />
                </svg>
                Salir
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className='flex-1 w-full max-w-6xl mx-auto py-6 px-4 sm:px-6'>
          <UserInfoHeader userData={userData} isLoading={isLoading} />
          <UserInfoContact userData={userData} isLoading={isLoading} />
          <UserInfoSkills userData={userData} isLoading={isLoading} />
          <UserInfoInterests userData={userData} isLoading={isLoading} />
          <UserInfoKnowledgeArea userData={userData} isLoading={isLoading} />
          <UserInfoSystemInfo userData={userData} isLoading={isLoading} />
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default UserInfo
