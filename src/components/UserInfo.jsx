// ============================================================================
// ARCHIVO:
// C:\Proyectos\SIIA\siia-front\src\components\UserInfo.jsx
// ============================================================================
//
// DESCRIPCIÓN:
// Componente encargado de coordinar y mostrar la información académica
// del investigador.
//
// RESPONSABILIDAD ACTUAL:
// -----------------------------------------------------------------------------
// UserInfo ya NO construye una página completa.
//
// La composición general de la aplicación pertenece a:
//
//     C:\Proyectos\SIIA\siia-front\src\pages\Home.jsx
//
// Home.jsx es responsable de:
//
//     - Header institucional.
//     - Layout general.
//     - Columna izquierda.
//     - Columna central.
//     - Columna derecha.
//     - Footer general.
//
// UserInfo únicamente representa el contenido de la columna central
// correspondiente al perfil del investigador.
//
// SECCIONES COORDINADAS:
// -----------------------------------------------------------------------------
// 1. Información principal.
// 2. Información de contacto.
// 3. Habilidades.
// 4. Intereses.
// 5. Área de conocimiento.
// 6. Información de sistema.
//
// IMPORTANTE:
// -----------------------------------------------------------------------------
// No se modifica la información recibida desde la API.
//
// Tampoco se modifica la lógica de los componentes especializados.
//
// Los componentes:
//
//     UserInfoHeader
//     UserInfoContact
//     UserInfoSkills
//     UserInfoInterests
//     UserInfoKnowledgeArea
//     UserInfoSystemInfo
//
// continúan siendo responsables de presentar sus propios datos.
//
// ============================================================================


// ============================================================================
// COMPONENTES DEL PERFIL
// ============================================================================

import UserInfoHeader from '@/components/UserInfoHeader'
import UserInfoContact from '@/components/UserInfoContact'
import UserInfoSkills from '@/components/UserInfoSkills'
import UserInfoInterests from '@/components/UserInfoInterests'
import UserInfoKnowledgeArea from '@/components/UserInfoKnowledgeArea'
import UserInfoSystemInfo from '@/components/UserInfoSystemInfo'
import CVUUpload from '@/components/CVUUpload'


// ============================================================================
// LIBRERÍAS
// ============================================================================

import { useState } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


// ============================================================================
// AUTENTICACIÓN Y NAVEGACIÓN
// ============================================================================



// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const UserInfo = ({
  userData,
  cvuData = null,
  isLoading = false,
  fetchCVUData = null
}) => {

  // ==========================================================================
  // DESCARGA DEL CVU
  // ==========================================================================

  const [showDownloadConfirm, setShowDownloadConfirm] = useState(false)


  const handleDownloadCVU = () => {

    if (!cvuData || typeof cvuData !== 'object') {
      return
    }

    // ------------------------------------------------------------
    // La descarga debe conservar EXACTAMENTE la estructura del
    // archivo CVU_estructura_correcta.json:
    //
    // {
    //   usuario_id: ...,
    //   perfil: {
    //     cvu: ...,
    //     nivelAcademico: ...,
    //     titulo: ...,
    //     principal: { ... },
    //     correoAlternativo: ...
    //   }
    // }
    //
    // No se descarga directamente cvuData porque cvuData es la
    // estructura interna utilizada por la interfaz y contiene
    // categorías/productos que no forman parte de la estructura
    // solicitada para el archivo CVU.
    // ------------------------------------------------------------

    const sourceProfile =
      cvuData?.perfil &&
      typeof cvuData.perfil === 'object'
        ? cvuData.perfil
        : (userData || {})

    const sourcePrincipal =
      sourceProfile?.principal &&
      typeof sourceProfile.principal === 'object'
        ? sourceProfile.principal
        : (userData || {})

    const sourceArea =
      sourcePrincipal?.areaConocimiento &&
      typeof sourcePrincipal.areaConocimiento === 'object'
        ? sourcePrincipal.areaConocimiento
        : (userData?.area_conocimiento || {})

    const normalizeCatalog = (value) => {
      if (!value || typeof value !== 'object') {
        return value ?? null
      }

      const result = {}

      if ('id' in value) {
        result.id = value.id
      }

      if ('clave' in value) {
        result.clave = value.clave
      }

      if ('nombre' in value) {
        result.nombre = value.nombre
      }

      if ('version' in value) {
        result.version = value.version
      }

      return result
    }

    const usuarioId =
      cvuData?.usuario_id ??
      userData?.usuario_id ??
      userData?.usuarioId ??
      null

    const cvuExport = {
      usuario_id: usuarioId,
      perfil: {
        cvu: sourceProfile?.cvu ?? userData?.cvu ?? null,
        nivelAcademico:
          sourceProfile?.nivelAcademico ??
          userData?.nivel_academico ??
          null,
        titulo:
          sourceProfile?.titulo ??
          userData?.titulo ??
          null,
        principal: {
          nombre:
            sourcePrincipal?.nombre ??
            userData?.nombre ??
            null,
          primerApellido:
            sourcePrincipal?.primerApellido ??
            userData?.primer_apellido ??
            null,
          segundoApellido:
            sourcePrincipal?.segundoApellido ??
            userData?.segundo_apellido ??
            null,
          fotografia: sourcePrincipal?.fotografia ??
            userData?.fotografia ??
            null,
          semblanza:
            sourcePrincipal?.semblanza ??
            userData?.semblanza ??
            null,
          linkedin:
            sourcePrincipal?.linkedin ??
            userData?.linkedin ??
            null,
          orcId:
            sourcePrincipal?.orcId ??
            sourcePrincipal?.orcid ??
            userData?.orcid ??
            null,
          intereses:
            Array.isArray(sourcePrincipal?.intereses)
              ? sourcePrincipal.intereses
              : (Array.isArray(userData?.intereses)
                ? userData.intereses
                : []),
          habilidades:
            Array.isArray(sourcePrincipal?.habilidades)
              ? sourcePrincipal.habilidades
              : (Array.isArray(userData?.habilidades)
                ? userData.habilidades
                : []),
          curp:
            sourcePrincipal?.curp ??
            userData?.curp ??
            null,
          rfc:
            sourcePrincipal?.rfc ??
            userData?.rfc ??
            null,
          fechaNacimiento:
            sourcePrincipal?.fechaNacimiento ??
            userData?.fecha_nacimiento ??
            null,
          sexo: sourcePrincipal?.sexo ??
            userData?.sexo ??
            null,
          paisNacimiento:
            sourcePrincipal?.paisNacimiento ??
            userData?.pais_nacimiento ??
            null,
          entidadFederativa:
            sourcePrincipal?.entidadFederativa ??
            userData?.entidad_federativa ??
            null,
          estadoCivil:
            sourcePrincipal?.estadoCivil ??
            userData?.estado_civil ??
            null,
          nacionalidad:
            sourcePrincipal?.nacionalidad ??
            userData?.nacionalidad ??
            null,
          areaConocimiento: {
            area: normalizeCatalog(
              sourceArea?.area ??
              userData?.area_conocimiento?.area
            ),
            campo: normalizeCatalog(
              sourceArea?.campo ??
              userData?.area_conocimiento?.campo
            ),
            disciplina: normalizeCatalog(
              sourceArea?.disciplina ??
              userData?.area_conocimiento?.disciplina
            ),
            subdisciplina: normalizeCatalog(
              sourceArea?.subdisciplina ??
              userData?.area_conocimiento?.subdisciplina
            )
          }
        },
        correoAlternativo:
          sourceProfile?.correoAlternativo ??
          userData?.correo_alternativo ??
          null
      }
    }

    const jsonContent = JSON.stringify(
      cvuExport,
      null,
      2
    )

    const blob = new Blob(
      [jsonContent],
      { type: 'application/json;charset=utf-8' }
    )

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'CVU.json'
    link.style.display = 'none'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
    setShowDownloadConfirm(false)
  }


  // ==========================================================================
  // ESTADO SIN INFORMACIÓN
  // ==========================================================================

  // --------------------------------------------------------------------------
  // Si terminó la carga y no existe información del usuario, mostramos un
  // estado controlado.
  //
  // No intentamos acceder a propiedades de userData porque podría ser null
  // o undefined.
  // --------------------------------------------------------------------------

  if (!userData && !isLoading) {

    return (

      <div className='rounded-2xl border border-amber-200 bg-white shadow-sm'>

        {/* --------------------------------------------------------------------
            Franja visual de advertencia
            -------------------------------------------------------------------- */}

        <div className='h-1.5 bg-gradient-to-r from-amber-500 to-orange-500' />


        <div className='flex flex-col items-center px-6 py-12 text-center sm:px-10'>

          {/* ------------------------------------------------------------------
              Icono
              ------------------------------------------------------------------ */}

          <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-700'>

            <svg
              className='h-7 w-7'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              aria-hidden='true'
            >

              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v4'
              />

              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 17h.01'
              />

              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10.3 3.5L2.7 17a2 2 0 001.74 3h15.12a2 2 0 001.74-3L13.7 3.5a2 2 0 00-3.4 0z'
              />

            </svg>

          </div>


          {/* ------------------------------------------------------------------
              Mensaje
              ------------------------------------------------------------------ */}

          <h2 className='text-xl font-bold text-slate-900'>
            No hay información disponible
          </h2>


          <p className='mt-2 max-w-md text-sm leading-6 text-slate-500'>
            No se encontraron datos de usuario para mostrar en el perfil
            académico.
          </p>

        </div>

      </div>

    )
  }


  // ==========================================================================
  // RENDER PRINCIPAL
  // ==========================================================================

  return (

    <SkeletonTheme
      baseColor='rgba(79, 70, 229, 0.08)'
      highlightColor='rgba(124, 58, 237, 0.16)'
    >

      {/* ======================================================================
          CONTENEDOR DEL PERFIL
          ======================================================================

          Este contenedor NO utiliza min-h-screen.

          La altura general de la página ahora pertenece a Home.jsx.

          De esta manera UserInfo puede vivir correctamente dentro de la
          columna central del nuevo layout de tres columnas.
          ====================================================================== */}

      <div className='min-w-0 space-y-6'>


        {/* ====================================================================
            ACCIONES DEL PERFIL
            ====================================================================

            Como eliminamos de UserInfo el antiguo header, no debemos perder
            las funcionalidades que anteriormente estaban colocadas dentro
            de ese header.

            Por esta razón conservamos aquí las acciones funcionales:

                - Actualizar/Cargar CVU.
                - Descargar el CVU completo.

            La sesión se controla desde el header único de Home.jsx.
            ==================================================================== */}

        <div className='flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between'>

          {/* ------------------------------------------------------------------
              Contexto del perfil
              ------------------------------------------------------------------ */}

          <div className='min-w-0'>

            <p className='text-xs font-bold uppercase tracking-[0.12em] text-[#000080]'>
              Perfil del investigador
            </p>

            <p className='mt-1 truncate text-sm text-slate-500'>
              Información académica y datos personales
            </p>

          </div>


          {/* ------------------------------------------------------------------
              Acciones
              ------------------------------------------------------------------ */}

          <div className='flex shrink-0 items-center gap-2'>

            {/* ================================================================
                CARGAR / ACTUALIZAR CVU
                ================================================================ */}

            {fetchCVUData && (

              <CVUUpload
                onSuccess={() => fetchCVUData({ skipCache: true })}
                onError={(error) => {

                  // ------------------------------------------------------------
                  // El componente CVUUpload controla visualmente su propio
                  // estado de error.
                  //
                  // Aquí únicamente registramos el problema para facilitar
                  // diagnóstico durante desarrollo.
                  // ------------------------------------------------------------

                  console.error(
                    'Error uploading CVU file:',
                    error
                  )

                }}
              />

            )}


            {/* ================================================================
                DESCARGAR CVU
                ================================================================ */}

            <button
              type='button'
              className='inline-flex h-10 items-center gap-2 rounded-xl border border-[#000080] bg-white px-3 text-sm font-semibold text-[#000080] shadow-sm transition-colors hover:bg-[#F3F3FC] focus:outline-none focus:ring-2 focus:ring-[#000080]/20 disabled:cursor-not-allowed disabled:opacity-50'
              title='Descargar CVU completo en formato JSON'
              aria-label='Descargar CVU completo en formato JSON'
              disabled={isLoading}
              onClick={() => setShowDownloadConfirm(true)}
            >

              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.8'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 3v12'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8 11l4 4 4-4'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M5 21h14'
                />
              </svg>

              <span>
                Descargar CVU
              </span>

            </button>




          </div>

        </div>


        {/* ====================================================================
            INFORMACIÓN PRINCIPAL
            ====================================================================

            Esta sección contiene:

                - fotografía;
                - nombre;
                - título;
                - nivel académico;
                - CVU;
                - ORCID;
                - semblanza;
                - información general;
                - CURP;
                - RFC.

            La implementación detallada continúa perteneciendo a
            UserInfoHeader.jsx.
            ==================================================================== */}

        <section
          id='perfil-principal'
          className='scroll-mt-24'
          aria-label='Perfil principal del investigador'
        >

          <UserInfoHeader
            userData={userData}
            isLoading={isLoading}
          />

        </section>


        {/* ====================================================================
            INFORMACIÓN DE CONTACTO
            ==================================================================== */}

        <section
          id='contacto'
          className='scroll-mt-24'
          aria-label='Información de contacto'
        >

          <UserInfoContact
            userData={userData}
            isLoading={isLoading}
          />

        </section>


        {/* ====================================================================
            HABILIDADES
            ==================================================================== */}

        <section
          id='habilidades'
          className='scroll-mt-24'
          aria-label='Habilidades del investigador'
        >

          <UserInfoSkills
            userData={userData}
            isLoading={isLoading}
          />

        </section>


        {/* ====================================================================
            INTERESES
            ==================================================================== */}

        <section
          id='intereses'
          className='scroll-mt-24'
          aria-label='Intereses del investigador'
        >

          <UserInfoInterests
            userData={userData}
            isLoading={isLoading}
          />

        </section>


        {/* ====================================================================
            ÁREA DE CONOCIMIENTO
            ==================================================================== */}

        <section
          id='area-conocimiento'
          className='scroll-mt-24'
          aria-label='Área de conocimiento del investigador'
        >

          <UserInfoKnowledgeArea
            userData={userData}
            isLoading={isLoading}
          />

        </section>


        {/* ====================================================================
            INFORMACIÓN DE SISTEMA
            ==================================================================== */}

        <section
          id='informacion-sistema'
          className='scroll-mt-24'
          aria-label='Información de sistema'
        >

          <UserInfoSystemInfo
            userData={userData}
            isLoading={isLoading}
          />

        </section>


        {/* ====================================================================
            IDENTIDAD DEL PERFIL
            ====================================================================

            Este pequeño bloque sustituye únicamente al footer interno que
            existía en la versión anterior.

            No representa el footer general de la aplicación; ese footer
            corresponde a Home.jsx.
            ==================================================================== */}

        <div className='border-t border-slate-200 pt-5'>

          <div className='flex flex-col gap-1 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between'>

            <span>
              Perfil académico
            </span>

            <span>
              Currículum Vitae Único
            </span>

          </div>

        </div>

      </div>


      {/* ====================================================================
          CONFIRMACIÓN DE DESCARGA DEL CVU
          ==================================================================== */}

      {showDownloadConfirm && (

        <div
          className='fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4'
          role='dialog'
          aria-modal='true'
          aria-labelledby='download-cvu-title'
        >

          <div className='w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl'>

            <h3
              id='download-cvu-title'
              className='text-lg font-bold text-[#000080]'
            >
              Descargar CVU
            </h3>

            <p className='mt-2 text-sm leading-6 text-gray-600'>
              ¿Está seguro de descargar todo el CVU en formato JSON?
            </p>

            <div className='mt-6 flex justify-end gap-3'>

              <button
                type='button'
                className='rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300'
                onClick={() => setShowDownloadConfirm(false)}
              >
                Cancelar
              </button>

              <button
                type='button'
                className='rounded-xl bg-[#000080] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#15159A] focus:outline-none focus:ring-2 focus:ring-[#000080]/30'
                onClick={handleDownloadCVU}
              >
                Aceptar
              </button>

            </div>

          </div>

        </div>

      )}

    </SkeletonTheme>

  )
}


// ============================================================================
// EXPORTACIÓN
// ============================================================================

export default UserInfo