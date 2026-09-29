// ============================================================================
// ARCHIVO:
// C:\Proyectos\SIIA\siia-front\src\components\UserInfoContact.jsx
//
// DESCRIPCIÓN:
// Sección de información de contacto del investigador.
//
// DISEÑO:
//   - Fondo blanco.
//   - Azul institucional #000080.
//   - Tarjetas independientes para cada medio de contacto.
//   - Diseño responsive.
//   - Apariencia institucional y académica.
//   - Estados hover discretos.
//
// DATOS MOSTRADOS:
//   - LinkedIn
//   - ORCID
//   - Correo alternativo
//
// IMPORTANTE:
// No se modifica la información recibida desde la API.
// Únicamente se modifica la presentación visual.
// ============================================================================

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


// ============================================================================
// SKELETON DE CARGA
// ============================================================================
//
// Mantiene la misma estructura visual de la sección mientras se obtiene
// la información del investigador.
// ============================================================================

const UserInfoContactSkeleton = () => (
  <section className='mb-6'>

    <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>

      {/* --------------------------------------------------------------
          Franja institucional
          -------------------------------------------------------------- */}

      <div className='h-2 bg-[#000080]' />

      <div className='p-6 sm:p-8'>

        {/* ------------------------------------------------------------
            Encabezado
            ------------------------------------------------------------ */}

        <div className='mb-6 flex items-center gap-3'>

          <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F3FC]'>
            <Skeleton
              width={20}
              height={20}
            />
          </div>

          <div>

            <Skeleton
              width={210}
              height={24}
            />

            <Skeleton
              width={230}
              height={14}
              className='mt-2'
            />

          </div>

        </div>


        {/* ------------------------------------------------------------
            Tarjetas de contacto
            ------------------------------------------------------------ */}

        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>

          {[0, 1, 2].map((item) => (

            <div
              key={item}
              className='rounded-xl border border-slate-200 bg-slate-50/70 p-4'
            >

              <div className='flex items-center gap-3'>

                <Skeleton
                  width={42}
                  height={42}
                />

                <div className='flex-1'>

                  <Skeleton
                    width={90}
                    height={12}
                  />

                  <Skeleton
                    width={130}
                    height={18}
                    className='mt-2'
                  />

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  </section>
)


// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const UserInfoContact = ({
  userData,
  isLoading = false
}) => {

  // --------------------------------------------------------------------------
  // Estado de carga
  // --------------------------------------------------------------------------

  if (isLoading) {
    return <UserInfoContactSkeleton />
  }


  // --------------------------------------------------------------------------
  // Si todavía no existen datos, no mostramos una tarjeta vacía.
  // --------------------------------------------------------------------------

  if (!userData) {
    return null
  }


  // --------------------------------------------------------------------------
  // Determinamos si existe al menos un medio de contacto.
  // --------------------------------------------------------------------------

  const hasLinkedin = Boolean(
    userData.linkedin
  )

  const hasOrcid =
    Boolean(userData.orcid) &&
    userData.orcid !== '0000-0000-0000-0000'

  const hasEmail = Boolean(
    userData.correo_alternativo
  )


  // --------------------------------------------------------------------------
  // Si no existe ningún medio de contacto, no mostramos la sección.
  // --------------------------------------------------------------------------

  if (
    !hasLinkedin &&
    !hasOrcid &&
    !hasEmail
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

        <div className='h-2 bg-[#000080]' />


        <div className='p-6 sm:p-8'>

          {/* ==================================================================
              ENCABEZADO
              ================================================================== */}

          <div className='mb-6 flex items-center gap-3'>

            {/* --------------------------------------------------------------
                Icono
                -------------------------------------------------------------- */}

            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F3FC] text-[#000080]'>

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
                  d='M21 11.5a8.38 8.38 0 01-9 8.3 8.38 8.38 0 01-3.5-.75L3 21l1.95-4.95A8.38 8.38 0 013.5 11.5a8.5 8.5 0 0117 0z'
                />

              </svg>

            </div>


            {/* --------------------------------------------------------------
                Título
                -------------------------------------------------------------- */}

            <div>

              <h2 className='text-xl font-bold tracking-tight text-slate-900'>
                Información de contacto
              </h2>

              <p className='mt-1 text-sm text-slate-500'>
                Perfiles y medios de contacto disponibles
              </p>

            </div>

          </div>


          {/* ==================================================================
              MEDIOS DE CONTACTO
              ================================================================== */}

          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>

            {/* ================================================================
                LINKEDIN
                ================================================================ */}

            {hasLinkedin && (

              <a
                href={
                  userData.linkedin.startsWith('http')
                    ? userData.linkedin
                    : `https://${userData.linkedin}`
                }
                target='_blank'
                rel='noopener noreferrer'
                className='group rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-[#D6D6EF] hover:bg-[#F3F3FC] hover:shadow-sm'
              >

                <div className='flex items-center gap-3'>

                  {/* Icono */}

                  <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D6D6EF] bg-[#F3F3FC] text-[#000080] transition-colors duration-200 group-hover:bg-[#E8E8F7]'>

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='h-5 w-5'
                      aria-hidden='true'
                    >

                      <path d='M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A2.02 2.02 0 003.23 5c0 1.1.9 2 2.02 2s2-.9 2-2A2.02 2.02 0 005.25 3zM20.77 13.41c0-3.47-1.85-5.09-4.32-5.09-1.99 0-2.88 1.1-3.38 1.87V8.5H9.69V20h3.38v-6.39c0-1.68.32-3.31 2.4-3.31 2.05 0 2.08 1.93 2.08 3.42V20h3.38l-.16-6.59z' />

                    </svg>

                  </div>


                  {/* Informação */}

                  <div className='min-w-0 flex-1'>

                    <p className='text-xs font-semibold uppercase tracking-wider text-slate-500'>
                      LinkedIn
                    </p>

                    <p className='mt-1 text-sm font-semibold text-slate-800'>
                      Perfil profesional
                    </p>

                  </div>


                  {/* Flecha */}

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.8'
                    className='h-4 w-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#000080]'
                    aria-hidden='true'
                  >

                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M7 17L17 7M7 7h10v10'
                    />

                  </svg>

                </div>

              </a>

            )}


            {/* ================================================================
                ORCID
                ================================================================ */}

            {hasOrcid && (

              <a
                href={`https://orcid.org/${userData.orcid}`}
                target='_blank'
                rel='noopener noreferrer'
                className='group rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-[#D6D6EF] hover:bg-[#F3F3FC] hover:shadow-sm'
              >

                <div className='flex items-center gap-3'>

                  {/* Icono */}

                  <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D6D6EF] bg-[#F3F3FC] text-[#000080] transition-colors duration-200 group-hover:bg-[#E8E8F7]'>

                    <span className='text-sm font-bold'>
                      iD
                    </span>

                  </div>


                  {/* Información */}

                  <div className='min-w-0 flex-1'>

                    <p className='text-xs font-semibold uppercase tracking-wider text-slate-500'>
                      ORCID
                    </p>

                    <p className='mt-1 break-all text-sm font-semibold text-slate-800'>
                      {userData.orcid}
                    </p>

                  </div>


                  {/* Flecha */}

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.8'
                    className='h-4 w-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#000080]'
                    aria-hidden='true'
                  >

                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M7 17L17 7M7 7h10v10'
                    />

                  </svg>

                </div>

              </a>

            )}


            {/* ================================================================
                CORREO ALTERNATIVO
                ================================================================ */}

            {hasEmail && (

              <a
                href={`mailto:${userData.correo_alternativo}`}
                className='group rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-[#D6D6EF] hover:bg-[#F3F3FC] hover:shadow-sm'
              >

                <div className='flex items-center gap-3'>

                  {/* Icono */}

                  <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D6D6EF] bg-[#F3F3FC] text-[#000080] transition-colors duration-200 group-hover:bg-[#E8E8F7]'>

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
                        x='3'
                        y='5'
                        width='18'
                        height='14'
                        rx='2'
                      />

                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3 7l9 6 9-6'
                      />

                    </svg>

                  </div>


                  {/* Información */}

                  <div className='min-w-0 flex-1'>

                    <p className='text-xs font-semibold uppercase tracking-wider text-slate-500'>
                      Correo alternativo
                    </p>

                    <p className='mt-1 break-all text-sm font-semibold text-slate-800'>
                      {userData.correo_alternativo}
                    </p>

                  </div>


                  {/* Flecha */}

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.8'
                    className='h-4 w-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#000080]'
                    aria-hidden='true'
                  >

                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M5 12h14M13 6l6 6-6 6'
                    />

                  </svg>

                </div>

              </a>

            )}

          </div>

        </div>

      </div>

    </section>
  )
}


// ============================================================================
// EXPORTACIÓN
// ============================================================================

export default UserInfoContact