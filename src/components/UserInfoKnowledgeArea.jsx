import Skeleton from 'react-loading-skeleton'

const UserInfoKnowledgeAreaSkeleton = () => (
  <div className='card bg-base-100 shadow-lg mb-6'>
    <div className='card-body'>
      <Skeleton width={200} height={28} className='mb-4' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className='space-y-1 pb-4'>
            <Skeleton width={80} height={16} className='mb-2' />
            <Skeleton width={150} height={20} className='mb-2' />
            <Skeleton width={100} height={14} />
          </div>
        ))}
      </div>
    </div>
  </div>
)

const UserInfoKnowledgeArea = ({ userData, isLoading }) => {
  if (isLoading) return <UserInfoKnowledgeAreaSkeleton />
  if (!userData.area_conocimiento) {
    return null
  }

  return (
    <div className='card bg-base-100 shadow-lg mb-6'>
      <div className='card-body'>
        <h2 className='card-title text-xl mb-4'>Área de Conocimiento</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {userData.area_conocimiento.area && (
            <div className='space-y-1 pb-4 border-b md:border-b-0 md:border-r'>
              <p className='text-xs uppercase opacity-70 font-semibold'>Área</p>
              <p className='text-base font-semibold'>{userData.area_conocimiento.area.nombre}</p>
              <p className='text-xs text-gray-500'>Clave: {userData.area_conocimiento.area.clave}</p>
            </div>
          )}
          {userData.area_conocimiento.campo && (
            <div className='space-y-1 pb-4 border-b md:border-b-0'>
              <p className='text-xs uppercase opacity-70 font-semibold'>Campo</p>
              <p className='text-base font-semibold'>{userData.area_conocimiento.campo.nombre}</p>
              <p className='text-xs text-gray-500'>Clave: {userData.area_conocimiento.campo.clave}</p>
            </div>
          )}
          {userData.area_conocimiento.disciplina && (
            <div className='space-y-1 pb-4 border-b md:border-b-0 md:border-r'>
              <p className='text-xs uppercase opacity-70 font-semibold'>Disciplina</p>
              <p className='text-base font-semibold'>{userData.area_conocimiento.disciplina.nombre}</p>
              <p className='text-xs text-gray-500'>Clave: {userData.area_conocimiento.disciplina.clave}</p>
            </div>
          )}
          {userData.area_conocimiento.subdisciplina && (
            <div className='space-y-1 pb-4'>
              <p className='text-xs uppercase opacity-70 font-semibold'>Subdisciplina</p>
              <p className='text-base font-semibold'>{userData.area_conocimiento.subdisciplina.nombre}</p>
              <p className='text-xs text-gray-500'>Clave: {userData.area_conocimiento.subdisciplina.clave}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserInfoKnowledgeArea
