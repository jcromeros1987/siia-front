import UserInfoHeader from '@/components/UserInfoHeader'
import UserInfoContact from '@/components/UserInfoContact'
import UserInfoSkills from '@/components/UserInfoSkills'
import UserInfoInterests from '@/components/UserInfoInterests'
import UserInfoKnowledgeArea from '@/components/UserInfoKnowledgeArea'
import UserInfoSystemInfo from '@/components/UserInfoSystemInfo'

const UserInfo = ({ userData }) => {
  if (!userData) {
    return (
      <div className='alert alert-warning'>
        <span>No hay datos de usuario disponibles</span>
      </div>
    )
  }

  return (
    <div className='w-full max-w-6xl mx-auto py-6 px-4 sm:px-6'>
      <UserInfoHeader userData={userData} />
      <UserInfoContact userData={userData} />
      <UserInfoSkills userData={userData} />
      <UserInfoInterests userData={userData} />
      <UserInfoKnowledgeArea userData={userData} />
      <UserInfoSystemInfo userData={userData} />
    </div>
  )
}

export default UserInfo
