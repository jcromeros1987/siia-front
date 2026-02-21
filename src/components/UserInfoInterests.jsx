const UserInfoInterests = ({ userData }) => {
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
