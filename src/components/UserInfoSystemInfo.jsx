import { useFormatDate } from '@/hooks/useFormatDate'

const UserInfoSystemInfo = ({ userData }) => {
  const fechaCreacion = useFormatDate(userData.fecha_creacion)
  const fechaModificacion = useFormatDate(userData.fecha_modificacion)

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
