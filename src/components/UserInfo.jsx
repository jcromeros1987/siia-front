import UserInfoHeader from '@/components/UserInfoHeader'
import UserInfoContact from '@/components/UserInfoContact'
import UserInfoSkills from '@/components/UserInfoSkills'
import UserInfoInterests from '@/components/UserInfoInterests'
import UserInfoKnowledgeArea from '@/components/UserInfoKnowledgeArea'
import UserInfoSystemInfo from '@/components/UserInfoSystemInfo'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const UserInfo = ({ userData, isLoading = false }) => {
  if (!userData && !isLoading) {
    return (
      <div className='alert alert-warning'>
        <span>No hay datos de usuario disponibles</span>
      </div>
    )
  }

  return (
    <SkeletonTheme baseColor='hsla(264, 91%, 53%, 0.1)' highlightColor='hsla(264, 91%, 53%, 0.25)'>
      <div className='w-full max-w-6xl mx-auto py-6 px-4 sm:px-6'>
        <UserInfoHeader userData={userData} isLoading={isLoading} />
        <UserInfoContact userData={userData} isLoading={isLoading} />
        <UserInfoSkills userData={userData} isLoading={isLoading} />
        <UserInfoInterests userData={userData} isLoading={isLoading} />
        <UserInfoKnowledgeArea userData={userData} isLoading={isLoading} />
        <UserInfoSystemInfo userData={userData} isLoading={isLoading} />
      </div>
    </SkeletonTheme>
  )
}

export default UserInfo
