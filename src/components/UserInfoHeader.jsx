// ============================================================================
// UserInfoHeader.jsx
// ============================================================================
//
// Componente encargado de mostrar la información principal del investigador.
//
// Este componente representa la "cabecera" del perfil CVU y contiene:
//   - Fotografía del investigador.
//   - Nombre completo.
//   - Título o nombramiento.
//   - Nivel académico.
//   - Número CVU.
//   - Semblanza.
//   - Información general:
//       * Sexo.
//       * Nacionalidad.
//       * Fecha de nacimiento.
//       * País de nacimiento.
//       * Entidad de nacimiento.
//       * Estado civil.
//   - CURP.
//   - RFC.
//
// El componente recibe toda la información mediante la propiedad:
//     userData
//
// También recibe:
//     isLoading
//
// Cuando isLoading === true se muestran skeletons para evitar que la pantalla
// "salte" mientras se obtiene la información desde la API.
//
// ============================================================================

import { useFormatDate } from '@/hooks/useFormatDate'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


// ============================================================================
// CONVERTIR VALORES DE CATÁLOGO A TEXTO
// ============================================================================
// Algunos campos del perfil llegan como objetos, por ejemplo:
// { id: '...', nombre: 'Masculino' }
// React no puede renderizar directamente un objeto.
// Esta función obtiene el texto visible de forma segura.
// ============================================================================

const getDisplayValue = (value) => {
  if (value === null || value === undefined || value === '') {
    return ''
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return String(value)
  }

  if (typeof value === 'boolean') {
    return value ? 'Sí' : 'No'
  }

  if (Array.isArray(value)) {
    return value.map(getDisplayValue).filter(Boolean).join(', ')
  }

  if (typeof value === 'object') {
    if (value.nombre !== null && value.nombre !== undefined) {
      return getDisplayValue(value.nombre)
    }

    if (value.descripcion !== null && value.descripcion !== undefined) {
      return getDisplayValue(value.descripcion)
    }

    if (value.label !== null && value.label !== undefined) {
      return getDisplayValue(value.label)
    }

    if (value.name !== null && value.name !== undefined) {
      return getDisplayValue(value.name)
    }
  }

  return ''
}


// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const UserInfoHeader = ({ userData, isLoading = false }) => {
  // --------------------------------------------------------------------------
  // Formateamos la fecha de nacimiento.
  //
  // Se mantiene el hook existente del proyecto para conservar exactamente
  // el comportamiento que ya tenía la aplicación para las fechas.
  // --------------------------------------------------------------------------

  const fechaNacimiento = useFormatDate(userData?.fecha_nacimiento)


  // --------------------------------------------------------------------------
  // Obtiene la URL de la fotografía.
  //
  // La API actualmente proporciona la fotografía dentro de:
  //
  //     userData.fotografia.uri
  //
  // Se utilizan optional chaining (?) para evitar errores si:
  //
  //     userData
  //     userData.fotografia
  //     userData.fotografia.uri
  //
  // todavía no existen.
  //
  // Si no existe una fotografía válida, se devuelve null y posteriormente
  // mostramos un avatar alternativo.
  // --------------------------------------------------------------------------

  const getFotoURL = () => {
    return userData?.fotografia?.uri || null
  }


  // --------------------------------------------------------------------------
  // Obtenemos la URL de la fotografía.
  // --------------------------------------------------------------------------

  const fotoURL = getFotoURL()


  // --------------------------------------------------------------------------
  // Mientras se está cargando la información mostramos una estructura
  // visual similar a la tarjeta definitiva.
  //
  // Esto mejora la experiencia de usuario porque evita mostrar una tarjeta
  // vacía o cambiar bruscamente el diseño cuando llega la información.
  // --------------------------------------------------------------------------

  if (isLoading) {
    return (
      <section className='mb-6'>
        <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>

          {/* ---------------------------------------------------------------
              Franja superior decorativa.
              --------------------------------------------------------------- */}

          <div className='h-2 bg-gradient-to-r from-[#00005C] via-[#000080] to-[#000080]' />

          <div className='p-6 sm:p-8'>

            {/* -------------------------------------------------------------
                Cabecera del perfil.
                ------------------------------------------------------------- */}

            <div className='flex flex-col gap-6 md:flex-row md:items-center'>

              {/* Fotografía de carga */}

              <div className='shrink-0'>
                <Skeleton
                  circle
                  width={128}
                  height={128}
                />
              </div>


              {/* Información principal de carga */}

              <div className='min-w-0 flex-1'>

                <Skeleton
                  width='65%'
                  height={20}
                  className='mb-3'
                />

                <Skeleton
                  width='85%'
                  height={34}
                  className='mb-3'
                />

                <Skeleton
                  width={160}
                  height={28}
                  className='mb-4'
                />

                <div className='flex flex-wrap gap-3'>
                  <Skeleton width={120} height={24} />
                  <Skeleton width={170} height={24} />
                </div>

              </div>

            </div>


            {/* -------------------------------------------------------------
                Semblanza de carga.
                ------------------------------------------------------------- */}

            <div className='mt-8 border-t border-slate-100 pt-6'>

              <Skeleton
                width={120}
                height={18}
                className='mb-3'
              />

              <Skeleton count={3} />

            </div>


            {/* -------------------------------------------------------------
                Información general de carga.
                ------------------------------------------------------------- */}

            <div className='mt-8 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-3'>

              <Skeleton height={64} />
              <Skeleton height={64} />
              <Skeleton height={64} />
              <Skeleton height={64} />
              <Skeleton height={64} />
              <Skeleton height={64} />

            </div>

          </div>
        </div>
      </section>
    )
  }


  // --------------------------------------------------------------------------
  // Si no existe información del usuario no intentamos acceder a sus
  // propiedades.
  //
  // Esto evita errores como:
  //
  //     Cannot read properties of null
  //
  // cuando la API todavía no devuelve información.
  // --------------------------------------------------------------------------

  if (!userData) {
    return null
  }


  // ==========================================================================
  // RENDER PRINCIPAL
  // ==========================================================================

  return (
    <section className='mb-6'>

      {/* ====================================================================
          TARJETA PRINCIPAL
          ====================================================================

          La tarjeta utiliza:
            - Fondo blanco.
            - Bordes suaves.
            - Sombra discreta.
            - Bordes redondeados.
            - Una franja superior institucional.

          El objetivo es darle al perfil una apariencia más profesional sin
          modificar la información que ya proporciona el backend.
      ==================================================================== */}

      <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md'>

        {/* ------------------------------------------------------------------
            Franja superior.

            Utilizamos un degradado azul marino → índigo → morado para
            identificar visualmente la sección principal del CVU.
        ------------------------------------------------------------------ */}

        <div className='h-2 bg-gradient-to-r from-[#00005C] via-[#000080] to-[#000080]' />


        <div className='p-6 sm:p-8'>

          {/* =================================================================
              BLOQUE PRINCIPAL DEL INVESTIGADOR
              ================================================================= */}

          <div className='flex flex-col gap-6 md:flex-row md:items-center'>

            {/* ---------------------------------------------------------------
                FOTOGRAFÍA
                ---------------------------------------------------------------

                Si existe una fotografía válida, mostramos la imagen.

                Si no existe:
                  - Mostramos un avatar con las iniciales "CVU".
                  - Evitamos mostrar una imagen rota.
            --------------------------------------------------------------- */}

            <div className='shrink-0'>

              {fotoURL ? (
                <div className='relative'>

                  {/* Borde exterior decorativo */}

                  <div className='flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#00005C] to-[#000080] p-1 shadow-md'>

                    {/* Imagen real */}

                    <img
                      src={fotoURL}
                      alt={`Fotografía de ${userData.nombre || 'investigador'}`}
                      className='h-full w-full rounded-full object-cover bg-white'
                      onError={(event) => {
                        // Si la URL de la fotografía no es válida,
                        // ocultamos la imagen para evitar mostrar un icono
                        // de imagen rota.
                        event.currentTarget.style.display = 'none'
                      }}
                    />

                  </div>

                </div>
              ) : (

                /* -----------------------------------------------------------
                   Avatar alternativo cuando no existe fotografía.
                ----------------------------------------------------------- */

                <div className='flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#00005C] to-[#000080] text-3xl font-bold text-white shadow-md'>
                  CVU
                </div>

              )}

            </div>


            {/* =================================================================
                INFORMACIÓN PRINCIPAL
                ================================================================= */}

            <div className='min-w-0 flex-1'>

              {/* -------------------------------------------------------------
                  Etiqueta institucional.
                  ------------------------------------------------------------- */}

              <div className='mb-2 flex items-center gap-2'>

                <span className='inline-flex items-center rounded-full bg-[#F3F3FC] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#000080]'>
                  Perfil del investigador
                </span>

              </div>


              {/* -------------------------------------------------------------
                  NOMBRE COMPLETO
                  -------------------------------------------------------------

                  El orden conserva la estructura original:

                      título
                      nombre
                      primer apellido
                      segundo apellido

                  Solo cambia la presentación visual.
              ------------------------------------------------------------- */}

              {userData.titulo && (
                <p className='mb-1 text-base font-semibold tracking-wide text-[#000080] sm:text-lg'>
                  {userData.titulo}
                </p>
              )}

              <h1 className='break-words text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl'>
                {[
                  userData.nombre,
                  userData.primer_apellido,
                  userData.segundo_apellido,
                ]
                  .filter(Boolean)
                  .join(' ')}
              </h1>


              {/* -------------------------------------------------------------
                  NIVEL ACADÉMICO
                  -------------------------------------------------------------

                  Solo se muestra cuando existe información.
              ------------------------------------------------------------- */}

              {userData.nivel_academico && (
                <div className='mt-3'>

                  <span className='inline-flex items-center rounded-full border border-[#D6D6EF] bg-[#F3F3FC] px-3 py-1.5 text-sm font-semibold text-[#000080]'>
                    {userData.nivel_academico}
                  </span>

                </div>
              )}


              {/* -------------------------------------------------------------
                  IDENTIFICADORES PRINCIPALES
                  -------------------------------------------------------------

                  Aquí mostramos el CVU y, cuando exista, el ORCID.

                  No se modifica ningún dato; únicamente se presenta de
                  manera más clara.
              ------------------------------------------------------------- */}

              <div className='mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm'>

                {/* CVU */}

                {userData.cvu && (
                  <div className='flex items-center gap-2 text-slate-600'>

                    <svg
                      className='h-4 w-4 text-[#000080]'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h6l4 4v12a2 2 0 01-2 2z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M13 3v4h4'
                      />
                    </svg>

                    <span>
                      <span className='font-medium text-slate-500'>CVU:</span>{' '}
                      <span className='font-semibold text-slate-800'>
                        {userData.cvu}
                      </span>
                    </span>

                  </div>
                )}


                {/* ORCID */}

                {userData.orcid && (
                  <div className='flex items-center gap-2 text-slate-600'>

                    <svg
                      className='h-4 w-4 text-[#000080]'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      aria-hidden='true'
                    >
                      <circle
                        cx='12'
                        cy='12'
                        r='9'
                      />
                      <path
                        strokeLinecap='round'
                        d='M9 9v6'
                      />
                      <path
                        strokeLinecap='round'
                        d='M12 9h1.5a3 3 0 010 6H12V9z'
                      />
                    </svg>

                    <span>
                      <span className='font-medium text-slate-500'>ORCID:</span>{' '}
                      <span className='font-semibold text-slate-800'>
                        {userData.orcid}
                      </span>
                    </span>

                  </div>
                )}

              </div>

            </div>

          </div>


          {/* =================================================================
              SEMBLANZA
              ================================================================= */}

          {userData.semblanza && (
            <div className='mt-8 border-t border-slate-100 pt-6'>

              {/* Encabezado */}

              <div className='mb-3 flex items-center gap-3'>

                <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F3F3FC] text-[#000080]'>

                  <svg
                    className='h-5 w-5'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8 10h8M8 14h5'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z'
                    />

                  </svg>

                </div>

                <h2 className='text-lg font-bold text-slate-900'>
                  Semblanza
                </h2>

              </div>


              {/* Texto de semblanza */}

              <div className='rounded-xl bg-slate-50 p-5'>

                <p className='whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base'>
                  {userData.semblanza}
                </p>

              </div>

            </div>
          )}


          {/* =================================================================
              INFORMACIÓN GENERAL
              ================================================================= */}

          <div className='mt-8 border-t border-slate-100 pt-6'>

            {/* ---------------------------------------------------------------
                Título de la sección.
            --------------------------------------------------------------- */}

            <div className='mb-5 flex items-center gap-3'>

              <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F3F3FC] text-[#000080]'>

                <svg
                  className='h-5 w-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  aria-hidden='true'
                >
                  <circle
                    cx='12'
                    cy='8'
                    r='3'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M5 20a7 7 0 0114 0'
                  />
                </svg>

              </div>

              <h2 className='text-lg font-bold text-slate-900'>
                Información general
              </h2>

            </div>


            {/* ---------------------------------------------------------------
                GRID DE INFORMACIÓN.

                El grid se adapta según el tamaño de pantalla:

                  móvil:
                    1 columna

                  tablet:
                    2 columnas

                  escritorio:
                    3 columnas

                Esto hace que el componente sea responsive.
            --------------------------------------------------------------- */}

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>

              {/* Sexo */}

              <InfoItem
                label='Sexo'
                value={userData.sexo}
              />


              {/* Nacionalidad */}

              <InfoItem
                label='Nacionalidad'
                value={userData.nacionalidad}
              />


              {/* Fecha de nacimiento */}

              <InfoItem
                label='Fecha de nacimiento'
                value={fechaNacimiento}
              />


              {/* País de nacimiento */}

              <InfoItem
                label='País de nacimiento'
                value={userData.pais_nacimiento}
              />


              {/* Entidad de nacimiento */}

              <InfoItem
                label='Entidad de nacimiento'
                value={userData.entidad_nacimiento}
              />


              {/* Estado civil */}

              <InfoItem
                label='Estado civil'
                value={userData.estado_civil}
              />

            </div>

          </div>


          {/* =================================================================
              DATOS DE IDENTIFICACIÓN
              ================================================================= */}

          {(userData.curp || userData.rfc) && (
            <div className='mt-6 grid grid-cols-1 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-2'>

              {/* CURP */}

              {userData.curp && (
                <InfoItem
                  label='CURP'
                  value={userData.curp}
                />
              )}


              {/* RFC */}

              {userData.rfc && (
                <InfoItem
                  label='RFC'
                  value={userData.rfc}
                />
              )}

            </div>
          )}

        </div>

      </div>

    </section>
  )
}


// ============================================================================
// COMPONENTE AUXILIAR: InfoItem
// ============================================================================
//
// Este pequeño componente evita repetir el mismo HTML para cada dato.
//
// Ejemplo:
//
//     <InfoItem
//       label='Nacionalidad'
//       value={userData.nacionalidad}
//     />
//
// Si el dato no existe, simplemente no se muestra.
//
// Esto es importante porque algunos perfiles pueden no tener todos los campos
// completos.
//
// ============================================================================

const InfoItem = ({ label, value }) => {

  // --------------------------------------------------------------------------
  // Si no existe valor, no mostramos una tarjeta vacía.
  // --------------------------------------------------------------------------

  if (
    value === null ||
    value === undefined ||
    value === ''
  ) {
    return null
  }


  // --------------------------------------------------------------------------
  // Render del dato.
  // --------------------------------------------------------------------------

  return (
    <div className='rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 transition-colors duration-150 hover:border-[#BFBFE6] hover:bg-[#F3F3FC]'>

      {/* Etiqueta */}

      <p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
        {label}
      </p>


      {/* Valor */}

      <p className='mt-1 break-words text-sm font-medium text-slate-800'>
        {getDisplayValue(value)}
      </p>

    </div>
  )
}


// ============================================================================
// EXPORTACIÓN
// ============================================================================
//
// Permitimos que UserInfo.jsx importe este componente mediante:
//
//     import UserInfoHeader from '@/components/UserInfoHeader'
//
// ============================================================================

export default UserInfoHeader