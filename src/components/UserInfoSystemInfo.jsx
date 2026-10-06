// ============================================================================
// ARCHIVO:
// C:\Proyectos\SIIA\siia-front\src\components\UserInfoSystemInfo.jsx
//
// DESCRIPCIÓN:
// Muestra información administrativa del registro del perfil CVU.
//
// INFORMACIÓN MOSTRADA:
//   - Fecha de creación.
//   - Fecha de última modificación.
//
// DISEÑO:
//   - Azul institucional: #002B7A
//   - Fondo blanco.
//   - Fondos auxiliares azul muy claro.
//   - Bordes discretos.
//   - Diseño responsive.
//
// IMPORTANTE:
// Los hooks se ejecutan siempre antes de cualquier return condicional.
// Esto evita violaciones de las Rules of Hooks de React.
// ============================================================================

import { useFormatDate } from '@/hooks/useFormatDate'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


// ============================================================================
// SKELETON DE CARGA
// ============================================================================

const UserInfoSystemInfoSkeleton = () => (
  <section className='mb-6'>

    <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>

      {/* ------------------------------------------------------------------
          Franja institucional
          ------------------------------------------------------------------ */}

      <div className='h-2 bg-[#002B7A]' />

      <div className='p-6 sm:p-8'>

        {/* ----------------------------------------------------------------
            Encabezado
            ---------------------------------------------------------------- */}

        <div className='mb-6 flex items-center gap-3'>

          <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1F5FA]'>

            <Skeleton
              width={20}
              height={20}
            />

          </div>

          <div>

            <Skeleton
              width={190}
              height={24}
            />

            <Skeleton
              width={250}
              height={14}
              className='mt-2'
            />

          </div>

        </div>


        {/* ----------------------------------------------------------------
            Información
            ---------------------------------------------------------------- */}

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>

          {[0, 1].map((item) => (

            <div
              key={item}
              className='rounded-xl border border-slate-200 bg-slate-50 p-4'
            >

              <Skeleton
                width={120}
                height={13}
              />

              <Skeleton
                width={180}
                height={20}
                className='mt-2'
              />

            </div>

          ))}

        </div>

      </div>

    </div>

  </section>
)


// ============================================================================
// OBTENER TEXTO SEGURO
// ============================================================================
//
// Aunque las fechas normalmente llegan como string, esta función evita
// intentar renderizar accidentalmente un objeto como hijo de React.
//
// ============================================================================

const getSafeText = (value) => {

  if (
    value === null ||
    value === undefined
  ) {
    return ''
  }


  if (typeof value === 'string') {
    return value
  }


  if (typeof value === 'number') {
    return String(value)
  }


  if (
    typeof value === 'object' &&
    !Array.isArray(value)
  ) {

    const text =
      value.nombre ??
      value.descripcion ??
      value.name ??
      value.label ??
      value.valor


    if (
      text !== null &&
      text !== undefined &&
      typeof text !== 'object'
    ) {
      return String(text)
    }

    return ''
  }


  return ''
}


// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const UserInfoSystemInfo = ({
  userData,
  isLoading = false
}) => {

  // ==========================================================================
  // IMPORTANTE:
  // Estos hooks deben ejecutarse siempre y en el mismo orden.
  //
  // No deben colocarse después de:
  //
  // if (!userData) return null
  //
  // porque eso provocaría una ejecución condicional del hook.
  // ==========================================================================

  const safeUserData = userData ?? {}

  const fechaCreacionRaw =
    safeUserData.fecha_creacion ?? null

  const fechaModificacionRaw =
    safeUserData.fecha_modificacion ?? null


  const fechaCreacion =
    useFormatDate(fechaCreacionRaw)

  const fechaModificacion =
    useFormatDate(fechaModificacionRaw)


  // ==========================================================================
  // ESTADO DE CARGA
  // ==========================================================================

  if (isLoading) {
    return <UserInfoSystemInfoSkeleton />
  }


  // ==========================================================================
  // VALIDACIÓN
  // ==========================================================================

  if (!userData) {
    return null
  }


  // ==========================================================================
  // NORMALIZACIÓN
  // ==========================================================================

  const fechaCreacionTexto =
    getSafeText(fechaCreacion)

  const fechaModificacionTexto =
    getSafeText(fechaModificacion)


  // ==========================================================================
  // SI NO EXISTE NINGUNA FECHA
  // ==========================================================================

  if (
    !fechaCreacionTexto &&
    !fechaModificacionTexto
  ) {
    return null
  }


  return (
    <section className='mb-6'>

      {/* ====================================================================
          TARJETA PRINCIPAL
          ==================================================================== */}

      <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md'>

        {/* ------------------------------------------------------------------
            FRANJA INSTITUCIONAL
            ------------------------------------------------------------------ */}

        <div className='h-2 bg-[#002B7A]' />


        <div className='p-6 sm:p-8'>

          {/* ==================================================================
              ENCABEZADO
              ================================================================== */}

          <div className='mb-6 flex items-center gap-3'>

            {/* --------------------------------------------------------------
                Icono
                -------------------------------------------------------------- */}

            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1F5FA] text-[#002B7A]'>

              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.8'
                className='h-5 w-5'
                aria-hidden='true'
              >

                {/* Documento */}

                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 3.5h8l4 4v13H6a2 2 0 01-2-2v-13a2 2 0 012-2z'
                />

                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14 3.5v4h4'
                />

                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8 12h8M8 16h5'
                />

              </svg>

            </div>


            {/* --------------------------------------------------------------
                Título
                -------------------------------------------------------------- */}

            <div>

              <h2 className='text-xl font-bold tracking-tight text-slate-900'>
                Información del sistema
              </h2>

              <p className='mt-1 text-sm text-slate-500'>
                Información administrativa del registro del perfil
              </p>

            </div>

          </div>


          {/* ==================================================================
              INFORMACIÓN DE FECHAS
              ================================================================== */}

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>

            {/* ================================================================
                FECHA DE CREACIÓN
                ================================================================ */}

            {fechaCreacionTexto && (

              <div className='group rounded-xl border border-[#D1DCEB] bg-white p-4 transition-all duration-200 hover:border-[#002B7A] hover:bg-[#F1F5FA] hover:shadow-sm'>

                <div className='flex items-start gap-3'>

                  {/* Icono */}

                  <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F1F5FA] text-[#002B7A] transition-colors duration-200 group-hover:bg-[#002B7A] group-hover:text-white'>

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.8'
                      className='h-5 w-5'
                      aria-hidden='true'
                    >

                      <rect
                        x='4'
                        y='5'
                        width='16'
                        height='15'
                        rx='2'
                      />

                      <path
                        strokeLinecap='round'
                        d='M8 3v4M16 3v4M4 10h16'
                      />

                    </svg>

                  </div>


                  {/* Información */}

                  <div className='min-w-0'>

                    <p className='text-xs font-semibold uppercase tracking-wider text-slate-500'>
                      Fecha de creación
                    </p>

                    <p className='mt-1 break-words text-base font-semibold text-slate-900'>
                      {fechaCreacionTexto}
                    </p>

                  </div>

                </div>

              </div>

            )}


            {/* ================================================================
                FECHA DE MODIFICACIÓN
                ================================================================ */}

            {fechaModificacionTexto && (

              <div className='group rounded-xl border border-[#D1DCEB] bg-white p-4 transition-all duration-200 hover:border-[#002B7A] hover:bg-[#F1F5FA] hover:shadow-sm'>

                <div className='flex items-start gap-3'>

                  {/* Icono */}

                  <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F1F5FA] text-[#002B7A] transition-colors duration-200 group-hover:bg-[#002B7A] group-hover:text-white'>

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.8'
                      className='h-5 w-5'
                      aria-hidden='true'
                    >

                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M20 11a8.1 8.1 0 00-2.3-5.7A8 8 0 106 18.7'
                      />

                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M20 5v6h-6'
                      />

                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 8v4l2.5 1.5'
                      />

                    </svg>

                  </div>


                  {/* Información */}

                  <div className='min-w-0'>

                    <p className='text-xs font-semibold uppercase tracking-wider text-slate-500'>
                      Última modificación
                    </p>

                    <p className='mt-1 break-words text-base font-semibold text-slate-900'>
                      {fechaModificacionTexto}
                    </p>

                  </div>

                </div>

              </div>

            )}

          </div>


          {/* ==================================================================
              INDICADOR INSTITUCIONAL
              ================================================================== */}

          <div className='mt-6 flex items-start gap-3 rounded-xl border border-[#D1DCEB] bg-[#F1F5FA] p-4'>

            <div className='mt-0.5 shrink-0 text-[#002B7A]'>

              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.8'
                className='h-5 w-5'
                aria-hidden='true'
              >

                <circle
                  cx='12'
                  cy='12'
                  r='9'
                />

                <path
                  strokeLinecap='round'
                  d='M12 10v6'
                />

                <circle
                  cx='12'
                  cy='7'
                  r='0.5'
                  fill='currentColor'
                  stroke='none'
                />

              </svg>

            </div>


            <p className='text-sm leading-relaxed text-slate-600'>
              Estas fechas corresponden al registro y a la última
              actualización de la información del perfil en el sistema.
            </p>

          </div>

        </div>

      </div>

    </section>
  )
}


// ============================================================================
// EXPORTACIÓN
// ============================================================================

export default UserInfoSystemInfo