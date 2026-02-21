const UserInfoSkills = ({ userData }) => {
  if (!userData.habilidades || userData.habilidades.length === 0) {
    return null
  }

  return (
    <div className='card bg-base-100 shadow-lg mb-6'>
      <div className='card-body'>
        <h2 className='card-title text-xl mb-4'>Habilidades</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {userData.habilidades.map((habilidad, index) => {
            try {
              const parsed = JSON.parse(habilidad.replace(/'/g, '"'))
              return (
                <div key={index} className='space-y-2'>
                  <p className='font-semibold text-sm'>{parsed.descripcion}</p>
                  <progress
                    className='progress progress-primary w-full'
                    value={parseInt(parsed.nivel)}
                    max='100'
                  />
                  <p className='text-xs text-gray-500'>{parsed.nivel}</p>
                </div>
              )
            } catch (e) {
              return (
                <div key={index} className='badge badge-outline'>
                  {habilidad}
                </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default UserInfoSkills
