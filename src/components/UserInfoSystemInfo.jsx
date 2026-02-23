import { useFormatDate } from '@/hooks/useFormatDate'
import Skeleton from 'react-loading-skeleton'

const UserInfoSystemInfoSkeleton = () => (
  <div className='card bg-base-100 shadow-lg'>
    <div className='card-body'>
      <Skeleton width={200} height={28} className='mb-4' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {[...Array(2)].map((_, i) => (
          <div key={i}>
            <Skeleton width={150} height={16} className='mb-2' />
            <Skeleton width={180} height={20} />
          </div>
        ))}
      </div>
    </div>
  </div>
)

const UserInfoSystemInfo = ({ userData, isLoading }) => {
  const fechaCreacion = useFormatDate(userData.fecha_creacion)
  const fechaModificacion = useFormatDate(userData.fecha_modificacion)

  if (isLoading) return <UserInfoSystemInfoSkeleton />

  return (
    <div className='card bg-base-100 shadow-lg'>
      <div className='card-body'>
        <h2 className='card-title text-xl mb-4'>Información de Sistema</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
          <div>
            <span className='opacity-70'>Fecha de Creación</span>
            <p className='font-semibold'>{fechaCreacion}</p>
          </div>
          <div>
            <span className='opacity-70'>Fecha de Modificación</span>
            <p className='font-semibold'>{fechaModificacion}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfoSystemInfo
