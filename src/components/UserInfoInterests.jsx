import Skeleton from 'react-loading-skeleton'

const UserInfoInterestsSkeleton = () => (
  <div className='card bg-base-100 shadow-lg mb-6'>
    <div className='card-body'>
      <Skeleton width={150} height={28} className='mb-4' />
      <div className='flex flex-wrap gap-2'>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} width={100} height={36} borderRadius={20} />
        ))}
      </div>
    </div>
  </div>
)

const UserInfoInterests = ({ userData, isLoading }) => {
  if (isLoading) return <UserInfoInterestsSkeleton />
  if (!userData.intereses || userData.intereses.length === 0) {
    return null
  }

  return (
    <div className='card bg-base-100 shadow-lg mb-6'>
      <div className='card-body'>
        <h2 className='card-title text-xl mb-4'>Intereses</h2>
        <div className='flex flex-wrap gap-2'>
          {userData.intereses.map((interes, index) => (
            <span key={index} className='badge badge-secondary badge-lg'>
              {interes}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserInfoInterests
