// ============================================================================
// ARCHIVO:
// C:\Proyectos\SIIA\siia-front\src\pages\Home.jsx
// ============================================================================
//
// DESCRIPCIÓN:
// Componente principal de la pantalla CVU.
//
// RESPONSABILIDADES:
// 1. Obtener la información del investigador.
// 2. Obtener la información de los productos CVU.
// 3. Mostrar el estado de carga.
// 4. Mostrar el estado de CVU no encontrado.
// 5. Mostrar errores generales.
// 6. Construir el layout principal de la aplicación.
// 7. Mantener un único encabezado institucional.
// 8. Integrar la navegación académica.
// 9. Integrar UserInfo.
// 10. Integrar CVUInfo.
// 11. Integrar CVUSidebar.
// 12. Mantener una única instancia de CVUInfo.
//
// IMPORTANTE:
// -----------------------------------------------------------------------------
// Home.jsx es responsable únicamente de la COMPOSICIÓN general de la pantalla.
//
// UserInfo.jsx:
//     Maneja la información general del investigador.
//
// CVUInfo.jsx:
//     Maneja categorías, productos, detalle, alta, edición y formularios.
//
// CVUSidebar.jsx:
//     Funciona como navegador visual de las categorías de productos.
//
// En esta etapa NO se duplica CVUInfo.
//
// La comunicación entre CVUSidebar y CVUInfo se realiza mediante una referencia
// (ref), de manera que el estado real de productos continúe perteneciendo a
// CVUInfo.
//
// ============================================================================


// ============================================================================
// IMPORTACIONES
// ============================================================================

import { useEffect, useRef, useState } from 'react'

import { useFetchCVU } from '@/hooks/useFetchCVU'
import { useToken } from '@/hooks/useToken'
import { useNavigate } from 'react-router-dom'

import UserInfo from '@/components/UserInfo'
import { CVUInfo } from '@/components/CVUInfo'
import { CVUSidebar } from '@/components/CVUSidebar'
import CVUNotFound from '@/components/CVUNotFound'


// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const Home = () => {

  // ==========================================================================
  // DATOS DEL CVU
  // ==========================================================================

  // Hook principal utilizado por Home para obtener:
  //
  // userData:
  //     Información general del investigador.
  //
  // cvuData:
  //     Categorías y productos registrados en el CVU.
  //
  // fetchCVUData:
  //     Función para volver a consultar la información.
  //
  // isLoading:
  //     Indica si existe una petición en proceso.
  //
  // error:
  //     Contiene el error producido por la consulta.
  //
  const {
    userData,
    cvuData,
    fetchCVUData,
    isLoading,
    error
  } = useFetchCVU()


  // ==========================================================================
  // REFERENCIA DE CVUINFO
  // ==========================================================================

  // --------------------------------------------------------------------------
  // Esta referencia permite que CVUSidebar pueda solicitar acciones a CVUInfo
  // sin duplicar su estado.
  //
  // CVUInfo expondrá:
  //
  //     changeCategory(key)
  //
  // De esta manera CVUSidebar funciona como navegador y CVUInfo conserva
  // toda la lógica de productos.
  // --------------------------------------------------------------------------

  const cvuInfoRef = useRef(null)


  // ==========================================================================
  // CATEGORÍA ACTIVA
  // ==========================================================================

  // --------------------------------------------------------------------------
  // Home mantiene únicamente una copia del identificador de la categoría
  // activa para mantener sincronizado visualmente CVUSidebar.
  //
  // El estado funcional de productos continúa dentro de CVUInfo.
  // --------------------------------------------------------------------------

  const [activeCategoryKey, setActiveCategoryKey] = useState(null)

  // ==========================================================================
  // MENÚ DEL INVESTIGADOR
  // ==========================================================================

  // Controla la apertura/cierre del menú que aparece al pulsar la flecha
  // ubicada junto al nombre del investigador.
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  // Referencia al contenedor del menú para poder cerrarlo cuando el usuario
  // haga clic fuera de él.
  const userMenuRef = useRef(null)

  // Accedemos a la misma función de limpieza de sesión que ya utilizaba
  // UserInfo.jsx. No se crea una lógica de autenticación diferente.
  const { clearTokens } = useToken()

  // Hook utilizado para regresar al flujo de logout existente.
  const navigate = useNavigate()

  // ==========================================================================
  // CERRAR SESIÓN
  // ==========================================================================

  const handleLogout = () => {

    // Eliminamos los tokens de autenticación de la sesión actual.
    clearTokens()

    // Conservamos exactamente la ruta de logout que ya utilizaba el sistema.
    navigate('/logout')
  }


  // ==========================================================================
  // CARGA INICIAL
  // ==========================================================================

  useEffect(() => {

    // ------------------------------------------------------------------------
    // Solicitamos la información del CVU cuando Home se monta.
    //
    // Se conserva el comportamiento existente de comunicación con el backend.
    // ------------------------------------------------------------------------

    fetchCVUData()

  }, [])


  // ==========================================================================
  // SINCRONIZACIÓN INICIAL DE CATEGORÍA
  // ==========================================================================

  useEffect(() => {

    // ------------------------------------------------------------------------
    // Mientras CVUInfo establece su categoría interna, Home establece también
    // una categoría inicial para que CVUSidebar pueda representar correctamente
    // el estado activo.
    //
    // Solo se establece automáticamente cuando todavía no existe una categoría
    // seleccionada.
    // ------------------------------------------------------------------------

    if (
      !activeCategoryKey &&
      cvuData &&
      typeof cvuData === 'object' &&
      !Array.isArray(cvuData)
    ) {

      const categoryKeys = Object.keys(cvuData)

      if (categoryKeys.length > 0) {

        setActiveCategoryKey(categoryKeys[0])

      }

    }

  }, [cvuData, activeCategoryKey])


  // ==========================================================================
  // CIERRE DEL MENÚ AL HACER CLIC FUERA
  // ==========================================================================

  useEffect(() => {

    if (!userMenuOpen) {
      return
    }

    const handleOutsideClick = (event) => {

      // Si el clic ocurrió fuera del contenedor del menú, lo cerramos.
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setUserMenuOpen(false)
      }

    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

  }, [userMenuOpen])


  // ==========================================================================
  // ESTADO DE CARGA
  // ==========================================================================

  if (isLoading && !cvuData) {

    return (

      <div className='min-h-screen bg-slate-50'>

        {/* ====================================================================
            ENCABEZADO INSTITUCIONAL
            ==================================================================== */}

        <header className='border-b border-slate-200 bg-white'>

          <div className='mx-auto flex min-h-16 max-w-[1600px] items-center px-4 sm:px-6 lg:px-8'>

            <div className='flex min-w-0 items-center gap-3'>

              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#002B7A] text-sm font-black text-white shadow-sm'>
                CVU
              </div>

              <div className='min-w-0'>

                <p className='truncate text-sm font-bold text-slate-900 sm:text-base'>
                  Currículum Vitae Único
                </p>

                <p className='hidden truncate text-xs text-slate-500 sm:block'>
                  Sistema Institucional de Información Académica
                </p>

              </div>

            </div>

          </div>

        </header>


        {/* ====================================================================
            CONTENIDO DE CARGA
            ==================================================================== */}

        <main className='flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12'>

          <div className='w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm'>

            <div className='mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#F1F5FA]'>

              <span
                className='loading loading-spinner loading-lg text-[#002B7A]'
                aria-label='Cargando'
              />

            </div>

            <h1 className='text-xl font-bold text-slate-900'>
              Cargando información
            </h1>

            <p className='mt-2 text-sm leading-6 text-slate-500'>
              Estamos consultando la información académica del investigador.
            </p>

          </div>

        </main>

      </div>

    )
  }


  // ==========================================================================
  // CVU NO ENCONTRADO
  // ==========================================================================

  if (error === 404) {

    return (

      <CVUNotFound
        fetchCVUData={fetchCVUData}
        isLoading={isLoading}
      />

    )

  }


  // ==========================================================================
  // ERROR GENERAL
  // ==========================================================================

  if (error) {

    return (

      <div className='min-h-screen bg-slate-50'>

        {/* ====================================================================
            ENCABEZADO
            ==================================================================== */}

        <header className='border-b border-slate-200 bg-white'>

          <div className='mx-auto flex min-h-16 max-w-[1600px] items-center px-4 sm:px-6 lg:px-8'>

            <div className='flex min-w-0 items-center gap-3'>

              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#002B7A] text-sm font-black text-white shadow-sm'>
                CVU
              </div>

              <div className='min-w-0'>

                <p className='truncate text-sm font-bold text-slate-900 sm:text-base'>
                  Currículum Vitae Único
                </p>

                <p className='hidden truncate text-xs text-slate-500 sm:block'>
                  Sistema Institucional de Información Académica
                </p>

              </div>

            </div>

          </div>

        </header>


        {/* ====================================================================
            MENSAJE DE ERROR
            ==================================================================== */}

        <main className='flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12'>

          <div className='w-full max-w-lg overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm'>

            <div className='h-1.5 bg-red-600' />

            <div className='p-8 text-center'>

              <div className='mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600'>

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-7 w-7'
                  fill='none'
                  viewBox='0 0 24 24'
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

              <h1 className='text-xl font-bold text-slate-900'>
                Error al cargar los datos
              </h1>

              <p className='mt-2 text-sm leading-6 text-slate-500'>
                Ha ocurrido un problema al consultar la información del CVU.
                Por favor, intenta recargar la página.
              </p>

              <button
                type='button'
                className='mt-6 inline-flex items-center gap-2 rounded-xl bg-[#002B7A] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#001F5B] focus:outline-none focus:ring-2 focus:ring-[#002B7A]/30 focus:ring-offset-2'
                onClick={() => fetchCVUData({ skipCache: true })}
              >

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                  aria-hidden='true'
                >

                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 4v5h5'
                  />

                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M20 20v-5h-5'
                  />

                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M5.5 15a7 7 0 0011.9 1.5L20 14'
                  />

                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M18.5 9A7 7 0 006.6 7.5L4 10'
                  />

                </svg>

                Reintentar

              </button>

            </div>

          </div>

        </main>

      </div>

    )
  }


  // ==========================================================================
  // VISTA PRINCIPAL
  // ==========================================================================

  return (

    <div className='min-h-screen bg-slate-50'>

      {/* ======================================================================
          HEADER INSTITUCIONAL ÚNICO
          ====================================================================== */}

      <header className='sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur'>

        <div className='mx-auto flex min-h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8'>

          {/* ------------------------------------------------------------------
              IDENTIDAD SIIA / CVU
              ------------------------------------------------------------------ */}

          <div className='flex min-w-0 items-center gap-3'>

            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#002B7A] text-sm font-black text-white shadow-sm'>
              CVU
            </div>

            <div className='min-w-0'>

              <p className='truncate text-sm font-bold text-slate-900 sm:text-base'>
                SIIA | CVU
              </p>

              <p className='hidden truncate text-xs text-slate-500 sm:block'>
                Currículum Vitae Único
              </p>

            </div>

          </div>


          {/* ------------------------------------------------------------------
              INFORMACIÓN DEL INVESTIGADOR
              ------------------------------------------------------------------ */}

          <div className='flex shrink-0 items-center gap-3'>

            <div className='hidden items-center gap-2 rounded-full border border-[#D1DCEB] bg-[#F1F5FA] px-3 py-1.5 text-xs font-semibold text-[#002B7A] lg:flex'>

              <span className='h-2 w-2 rounded-full bg-emerald-500' />

              Investigador

            </div>


            {/* Avatar */}

            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#002B7A] text-sm font-bold text-white shadow-sm'>

              {userData
                ? `${userData.nombre?.[0] || ''}${userData.primer_apellido?.[0] || ''}`.toUpperCase()
                : 'RV'}

            </div>


            {/* Nombre */}

            <div className='hidden min-w-0 xl:block'>

              <p className='max-w-44 truncate text-sm font-semibold text-slate-800'>

                {[
                  userData?.nombre,
                  userData?.primer_apellido,
                  userData?.segundo_apellido
                ]
                  .filter(Boolean)
                  .join(' ') || 'Investigador'}

              </p>

              <p className='text-xs text-slate-500'>
                Investigador
              </p>

            </div>


            {/* =================================================================
                MENÚ DEL INVESTIGADOR
                =================================================================

                La flecha abre el menú de usuario. La opción "Salir" utiliza
                exactamente el mismo flujo de cierre de sesión que existía
                anteriormente en UserInfo.jsx.
            ================================================================== */}

            <div
              ref={userMenuRef}
              className='relative'
            >

              <button
                type='button'
                className='flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#002B7A] focus:outline-none focus:ring-2 focus:ring-[#002B7A]/20'
                aria-label='Abrir menú de usuario'
                aria-haspopup='menu'
                aria-expanded={userMenuOpen}
                title='Menú de usuario'
                onClick={() => setUserMenuOpen((current) => !current)}
              >

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='1.8'
                  aria-hidden='true'
                >

                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 9l6 6 6-6'
                  />

                </svg>

              </button>


              {userMenuOpen && (

                <div
                  className='absolute right-0 top-full z-[60] mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg'
                  role='menu'
                  aria-label='Opciones del investigador'
                >

                  <button
                    type='button'
                    className='flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/20'
                    role='menuitem'
                    onClick={() => {
                      setUserMenuOpen(false)
                      handleLogout()
                    }}
                  >

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='1.8'
                      aria-hidden='true'
                    >

                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M17 16l4-4m0 0l-4-4'
                      />

                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 12H7'
                      />

                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M13 5v-1a2 2 0 00-2-2H6a2 2 0 00-2 2v16a2 2 0 002 2h5a2 2 0 002-2v-1'
                      />

                    </svg>

                    <span>
                      Salir
                    </span>

                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </header>


      {/* ======================================================================
          NAVEGACIÓN MÓVIL / TABLET
          ====================================================================== */}

      <div className='border-b border-slate-200 bg-white xl:hidden'>

        <nav
          aria-label='Navegación académica'
          className='mx-auto flex max-w-[1600px] gap-2 overflow-x-auto px-3 py-3 sm:px-5 lg:px-6'
        >

          <a
            href='#perfil'
            className='shrink-0 rounded-lg bg-[#F1F5FA] px-3 py-2 text-xs font-semibold text-[#002B7A]'
          >
            Perfil principal
          </a>

          <a
            href='#contacto'
            className='shrink-0 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50'
          >
            Contacto
          </a>

          <a
            href='#habilidades'
            className='shrink-0 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50'
          >
            Habilidades
          </a>

          <a
            href='#intereses'
            className='shrink-0 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50'
          >
            Intereses
          </a>

          <a
            href='#area-conocimiento'
            className='shrink-0 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50'
          >
            Área de conocimiento
          </a>

          {/* <a
            href='#informacion-sistema'
            className='shrink-0 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50'
          >
            Información de sistema
          </a> */}

        </nav>

      </div>


      {/* ======================================================================
          CONTENEDOR PRINCIPAL
          ====================================================================== */}

      <main className='mx-auto w-full max-w-[1600px] px-3 py-4 sm:px-5 lg:px-6 lg:py-6'>

        {/* ====================================================================
            GRID PRINCIPAL
            ====================================================================

            Escritorio:

                250px      contenido flexible       330px
                ┌──────┬────────────────────────┬──────────┐
                │      │                        │          │
                │ menú │ UserInfo + CVUInfo     │ sidebar  │
                │      │                        │ productos│
                │      │                        │          │
                └──────┴────────────────────────┴──────────┘

            Importante:
            --------------------------------------------------------------------
            Solo existe UNA instancia de CVUInfo.
            -------------------------------------------------------------------- */}

        <div className='grid grid-cols-1 gap-5 xl:grid-cols-[250px_minmax(0,1fr)_330px] xl:items-start'>


          {/* ==================================================================
              COLUMNA IZQUIERDA
              ================================================================== */}

          <aside
            aria-label='Navegación de información académica'
            className='hidden xl:block'
          >

            <div className='sticky top-[88px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>

              {/* ----------------------------------------------------------------
                  ENCABEZADO
                  ---------------------------------------------------------------- */}

              <div className='border-b border-slate-100 px-5 py-4'>

                <p className='text-[11px] font-bold uppercase tracking-wider text-[#002B7A]'>
                  Información académica
                </p>

                <p className='mt-1 text-xs text-slate-500'>
                  Perfil del investigador
                </p>

              </div>


              {/* ----------------------------------------------------------------
                  NAVEGACIÓN
                  ---------------------------------------------------------------- */}

              <nav
                className='p-2'
                aria-label='Secciones del perfil'
              >

                <a
                  href='#perfil'
                  className='flex items-center gap-3 rounded-xl bg-[#F1F5FA] px-3 py-2.5 text-sm font-semibold text-[#002B7A]'
                >

                  <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-white'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='1.8'
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
                  </span>

                  Perfil principal

                </a>


                <a
                  href='#contacto'
                  className='mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#002B7A]'
                >

                  <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50'>

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='1.8'
                      aria-hidden='true'
                    >

                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 11.5a8.38 8.38 0 01-9 8.3 8.38 8.38 0 01-3.5-.75L3 21l1.95-4.95A8.38 8.38 0 013.5 11.5a8.5 8.5 0 0117 0z'
                      />

                    </svg>

                  </span>

                  Contacto

                </a>


                <a
                  href='#habilidades'
                  className='mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#002B7A]'
                >

                  <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50'>

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='1.8'
                      aria-hidden='true'
                    >

                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 3v18M3 12h18'
                      />

                    </svg>

                  </span>

                  Habilidades

                </a>


                <a
                  href='#intereses'
                  className='mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#002B7A]'
                >

                  <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50'>

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='1.8'
                      aria-hidden='true'
                    >

                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z'
                      />

                    </svg>

                  </span>

                  Intereses

                </a>


                <a
                  href='#area-conocimiento'
                  className='mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#002B7A]'
                >

                  <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50'>

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='1.8'
                      aria-hidden='true'
                    >

                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 3l8 4.5-8 4.5-8-4.5L12 3z'
                      />

                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4 12l8 4.5 8-4.5'
                      />

                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4 16.5l8 4.5 8-4.5'
                      />

                    </svg>

                  </span>

                  Área de conocimiento

                </a>


                {/* <a
                  href='#informacion-sistema'
                  className='mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#002B7A]'
                >

                  <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50'>

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='1.8'
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

                      <path
                        strokeLinecap='round'
                        d='M12 7h.01'
                      />

                    </svg>

                  </span>

                  Información de sistema

                </a> */}

              </nav>


              {/* ----------------------------------------------------------------
                  INFORMACIÓN CVU
                  ---------------------------------------------------------------- */}

              <div className='border-t border-slate-100 p-4'>

                <div className='rounded-xl bg-[#F1F5FA] p-4'>

                  <p className='text-xs font-bold uppercase tracking-wider text-[#002B7A]'>
                    Perfil CVU
                  </p>

                  <p className='mt-2 text-xs leading-5 text-slate-500'>
                    Información académica y productos registrados en el
                    Currículum Vitae Único.
                  </p>

                </div>

              </div>

            </div>

          </aside>


          {/* ==================================================================
              COLUMNA CENTRAL
              ================================================================== */}

          <section
            id='perfil'
            aria-label='Perfil del investigador'
            className='min-w-0'
          >

            {/* ----------------------------------------------------------------
                INFORMACIÓN DEL INVESTIGADOR
                ---------------------------------------------------------------- */}

            <UserInfo
              userData={userData}
              isLoading={isLoading}
              fetchCVUData={fetchCVUData}
            />


            {/* ----------------------------------------------------------------
                PRODUCTOS CVU
                ----------------------------------------------------------------

                IMPORTANTE:
                ---------------------------------------------------------------
                Esta es la ÚNICA instancia de CVUInfo en Home.
                --------------------------------------------------------------- */}

            <div
              id='cvu-info'
              className='min-w-0'
            >

              <CVUInfo
                ref={cvuInfoRef}
                cvuData={cvuData}
                fetchCVUData={fetchCVUData}
                isLoading={isLoading}
                onCategoryChange={setActiveCategoryKey}
              />

            </div>

          </section>


          {/* ==================================================================
              COLUMNA DERECHA
              ================================================================== */}

          <aside
            id='productos-cvu'
            aria-label='Productos del investigador'
            className='min-w-0'
          >

            {/* ----------------------------------------------------------------
                CVUSidebar no administra productos.

                Su función es navegar entre las categorías.

                Esto evita duplicar estados y mantiene una única fuente de
                verdad para los productos.
                ---------------------------------------------------------------- */}

            <CVUSidebar
              cvuData={cvuData}
              currentTab={activeCategoryKey}
              changeTab={(key) => {

                // Actualizamos el estado visual de Home.

                setActiveCategoryKey(key)


                // Solicitamos a CVUInfo que cambie realmente de categoría.

                cvuInfoRef.current?.changeCategory(key)

              }}
            />

          </aside>

        </div>

      </main>


      {/* ======================================================================
          PIE DE PÁGINA
          ====================================================================== */}

      <footer className='border-t border-slate-200 bg-white'>

        <div className='mx-auto flex max-w-[1600px] flex-col gap-2 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8'>

          <p>
            Sistema Institucional de Información Académica
          </p>

          <p>
            Currículum Vitae Único
          </p>

        </div>

      </footer>

    </div>

  )
}


// ============================================================================
// EXPORTACIÓN
// ============================================================================

export default Home