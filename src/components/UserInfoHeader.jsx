import { useFormatDate } from '@/hooks/useFormatDate'

const UserInfoHeader = ({ userData }) => {
  const fechaNacimiento = useFormatDate(userData.fecha_nacimiento)

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
                    src={userData.fotografia.uri}
                    alt='Fotografía del usuario'
                    className='w-40 h-40 object-cover rounded-full py-17 px-2'
                  />
                </div>
              </div>
            </div>
          )}

          {/* Info básica */}
          <div className='md:col-span-3'>
            <div className='flex items-baseline gap-2 mb-4'>
              <h2 className='card-title text-3xl'>{userData.titulo}</h2>
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
