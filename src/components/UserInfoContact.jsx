import Skeleton from 'react-loading-skeleton'

const UserInfoContactSkeleton = () => (
  <div className='card bg-base-100 shadow-lg mb-6'>
    <div className='card-body'>
      <Skeleton width={200} height={28} className='mb-4' />
      <div className='space-y-3'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='flex items-center gap-3'>
            <Skeleton width={100} height={20} />
            <Skeleton width={150} height={20} />
          </div>
        ))}
      </div>
    </div>
  </div>
)

const UserInfoContact = ({ userData, isLoading }) => {
  if (isLoading) return <UserInfoContactSkeleton />
  return (
    <div className='card bg-base-100 shadow-lg mb-6'>
      <div className='card-body'>
        <h2 className='card-title text-xl mb-4'>Información de Contacto</h2>
        <div className='space-y-3'>
          {userData.linkedin && (
            <div className='flex items-center gap-3'>
              <span className='font-semibold w-32'>LinkedIn:</span>
              <a
                href={userData.linkedin}
                target='_blank'
                rel='noopener noreferrer'
                className='link link-primary'
              >
                Perfil
              </a>
            </div>
          )}
          {userData.orcid && userData.orcid !== '0000-0000-0000-0000' && (
            <div className='flex items-center gap-3'>
              <span className='font-semibold w-32'>ORCID:</span>
              <a
                href={`https://orcid.org/${userData.orcid}`}
                target='_blank'
                rel='noopener noreferrer'
                className='link link-primary'
              >
                {userData.orcid}
              </a>
            </div>
          )}
          {userData.correo_alternativo && (
            <div className='flex items-center gap-3'>
              <span className='font-semibold w-32'>Correo Alt:</span>
              <a href={`mailto:${userData.correo_alternativo}`} className='link link-primary'>
                {userData.correo_alternativo}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserInfoContact
