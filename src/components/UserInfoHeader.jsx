import { useFormatDate } from '@/hooks/useFormatDate'
import Skeleton from 'react-loading-skeleton'

const UserInfoHeaderSkeleton = () => (
  <div className='card bg-base-100 shadow-xl mb-6'>
    <div className='card-body'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 items-start'>
        <div className='flex justify-center'>
          <Skeleton circle width={160} height={160} />
        </div>
        <div className='md:col-span-3'>
          <Skeleton width={300} height={40} className='mb-4' />
          <Skeleton width={250} height={20} className='mb-4' />
          <Skeleton count={3} className='mb-4' />
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <Skeleton width={80} height={16} className='mb-2' />
                <Skeleton width={100} height={20} />
              </div>
            ))}
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            {[...Array(2)].map((_, i) => (
              <div key={i}>
                <Skeleton width={60} height={16} className='mb-2' />
                <Skeleton width={150} height={20} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

const UserInfoHeader = ({ userData, isLoading }) => {
  const fechaNacimiento = useFormatDate(userData.fecha_nacimiento)

  const getFotoURL = () => {
    if (userData.fotografia && userData.fotografia.uri) {
      return `${userData.fotografia.uri}/download/${userData.fotografia.nombre}`
    }
    return null
  }

  if (isLoading) return <UserInfoHeaderSkeleton />

  return (
    <div className='card bg-base-100 shadow-xl mb-6'>
      <div className='card-body'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 items-start'>
          {/* Foto */}
          {userData.fotografia && (
            <div className='flex justify-center'>
              <div className='avatar placeholder'>
                <div className='bg-primary text-primary-content rounded-full w-40'>
                  <img
                    src={getFotoURL()}
                    alt='Fotografía del usuario'
                    className={getFotoURL() ? 'w-40 h-40 object-cover rounded-full' : 'w-40 h-40 object-cover rounded-full py-17 px-2'}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Info básica */}
          <div className='md:col-span-3'>
            <div className='flex items-baseline gap-2 mb-4'>
              <h2 className='card-title text-3xl'>{userData.titulo} {userData.nombre} {userData.primer_apellido} {userData.segundo_apellido}</h2>
              <span className='badge badge-lg badge-primary'>{userData.nivel_academico}</span>
            </div>

            <p className='text-sm text-gray-500 mb-4'>
              CVU:
              {' '}
              <span className='font-mono font-semibold'>{userData.cvu}</span>
            </p>

            {userData.semblanza && (
              <div className='mb-4'>
                <p className='text-base-content leading-relaxed whitespace-pre-wrap'>
                  {userData.semblanza}
                </p>
              </div>
            )}

            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 text-sm'>
              <div>
                <span className='opacity-70'>Sexo</span>
                <p className='font-semibold'>{userData.sexo?.nombre || '-'}</p>
              </div>
              <div>
                <span className='opacity-70'>Nacionalidad</span>
                <p className='font-semibold'>{userData.nacionalidad?.nombre || '-'}</p>
              </div>
              <div>
                <span className='opacity-70'>Nacimiento</span>
                <p className='font-semibold'>{fechaNacimiento}</p>
              </div>
              <div>
                <span className='opacity-70'>País</span>
                <p className='font-semibold'>{userData.pais_nacimiento?.nombre || '-'}</p>
              </div>
              <div>
                <span className='opacity-70'>Entidad</span>
                <p className='font-semibold'>{userData.entidad_federativa?.nombre || '-'}</p>
              </div>
              <div>
                <span className='opacity-70'>Estado Civil</span>
                <p className='font-semibold'>{userData.estado_civil?.nombre || '-'}</p>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm'>
              <div>
                <span className='opacity-70'>CURP</span>
                <p className='font-mono font-semibold'>{userData.curp || '-'}</p>
              </div>
              <div>
                <span className='opacity-70'>RFC</span>
                <p className='font-mono font-semibold'>{userData.rfc || '-'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfoHeader
