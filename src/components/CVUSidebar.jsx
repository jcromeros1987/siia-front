// ============================================================
// ARCHIVO:
// C:\Proyectos\SIIA\siia-front\src\components\CVUSidebar.jsx
//
// DESCRIPCIÓN:
// Panel derecho de navegación de productos del CVU.
//
// RESPONSABILIDADES:
// 1. Mostrar las categorías disponibles del CVU.
// 2. Mostrar el número de productos por categoría.
// 3. Permitir cambiar de categoría.
// 4. Mostrar visualmente la categoría activa.
// 5. Permitir buscar categorías.
// 6. Permitir solicitar la creación de un nuevo producto.
//
// INTEGRACIÓN:
// Este componente funciona como el panel derecho del diseño
// institucional aprobado para la pantalla principal del CVU.
//
// La lógica de productos, detalle, creación, edición y DynamicForm
// permanece en:
//
// C:\Proyectos\SIIA\siia-front\src\components\CVUInfo.jsx
//
// CVUSidebar solamente controla la navegación visual y comunica
// las acciones al componente padre.
//
// MÉTODOS / PROPS PRINCIPALES:
//
// cvuData
//    Datos completos del CVU.
//
// currentTab
//    Clave de la categoría actualmente seleccionada.
//
// changeTab
//    Función utilizada para cambiar la categoría.
//
// onNewProduct
//    Función utilizada para solicitar la creación de un producto.
//
// setSidebarOpen
//    Se conserva por compatibilidad con la versión anterior.
// ============================================================


// ============================================================
// REACT
// ============================================================

import { useMemo, useState } from 'react'


// ============================================================
// NORMALIZAR TEXTO
// ============================================================
//
// Convierte valores simples y objetos de catálogo a texto seguro
// para evitar errores de React cuando el backend devuelve objetos
// como:
//
// {
//   id: 1,
//   nombre: "Libro"
// }
//
// ============================================================

const getDisplayText = (value) => {

  // ----------------------------------------------------------
  // Valores vacíos
  // ----------------------------------------------------------

  if (
    value === null ||
    value === undefined
  ) {
    return ''
  }


  // ----------------------------------------------------------
  // String
  // ----------------------------------------------------------

  if (typeof value === 'string') {
    return value
  }


  // ----------------------------------------------------------
  // Número / booleano
  // ----------------------------------------------------------

  if (
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return String(value)
  }


  // ----------------------------------------------------------
  // Array
  // ----------------------------------------------------------

  if (Array.isArray(value)) {

    return value
      .map((item) => getDisplayText(item))
      .filter(Boolean)
      .join(', ')
  }


  // ----------------------------------------------------------
  // Objeto
  // ----------------------------------------------------------

  if (typeof value === 'object') {

    if (
      value.nombre !== null &&
      value.nombre !== undefined
    ) {
      return getDisplayText(value.nombre)
    }


    if (
      value.descripcion !== null &&
      value.descripcion !== undefined
    ) {
      return getDisplayText(value.descripcion)
    }


    if (
      value.label !== null &&
      value.label !== undefined
    ) {
      return getDisplayText(value.label)
    }


    if (
      value.name !== null &&
      value.name !== undefined
    ) {
      return getDisplayText(value.name)
    }


    return ''
  }


  return ''
}


// ============================================================
// OBTENER CANTIDAD DE PRODUCTOS
// ============================================================
//
// Soporta las dos estructuras que actualmente pueden aparecer:
//
// {
//   productos: []
// }
//
// o:
//
// []
//
// ============================================================

const getProductCount = (category) => {

  if (!category) {
    return 0
  }


  // Categoría directamente como array.
  if (Array.isArray(category)) {
    return category.length
  }


  // Categoría con propiedad productos.
  if (Array.isArray(category.productos)) {
    return category.productos.length
  }


  return 0
}


// ============================================================
// OBTENER NOMBRE DE CATEGORÍA
// ============================================================

const getCategoryName = (key, category) => {

  // Primero intentamos utilizar el nombre proporcionado
  // por el backend.

  const backendName = getDisplayText(
    category?.nombre
  )


  if (backendName) {
    return backendName
  }


  // Si no existe nombre, utilizamos la clave.
  return getDisplayText(key) || 'Sin nombre'
}


// ============================================================
// ICONOS
// ============================================================
//
// Se asignan iconos de acuerdo con el tipo de producto.
//
// No dependemos de una librería externa para evitar agregar
// dependencias innecesarias al proyecto.
// ============================================================

const getCategoryIcon = (categoryName, key) => {

  const text = (
    `${categoryName} ${key}`
  ).toLowerCase()


  // ----------------------------------------------------------
  // Artículos
  // ----------------------------------------------------------

  if (
    text.includes('artículo') ||
    text.includes('articulo')
  ) {

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        className='h-5 w-5 stroke-current'
      >

        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.8'
          d='M6 4.75A2.25 2.25 0 018.25 2.5h7.5A2.25 2.25 0 0118 4.75v14.5a2.25 2.25 0 01-2.25 2.25h-7.5A2.25 2.25 0 016 19.25V4.75z'
        />

        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.8'
          d='M9 7h6M9 11h6M9 15h4'
        />

      </svg>
    )
  }


  // ----------------------------------------------------------
  // Libros
  // ----------------------------------------------------------

  if (
    text.includes('libro') ||
    text.includes('book')
  ) {

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        className='h-5 w-5 stroke-current'
      >

        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.8'
          d='M5 4.5A2.5 2.5 0 017.5 2H19v17H7.5A2.5 2.5 0 015 16.5v-12z'
        />

        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.8'
          d='M5 16.5A2.5 2.5 0 017.5 14H19M9 6h6M9 9h6'
        />

      </svg>
    )
  }


  // ----------------------------------------------------------
  // Capítulos
  // ----------------------------------------------------------

  if (
    text.includes('capítulo') ||
    text.includes('capitulo')
  ) {

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        className='h-5 w-5 stroke-current'
      >

        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.8'
          d='M5 5.25A2.25 2.25 0 017.25 3H19v16H7.25A2.25 2.25 0 015 16.75v-11.5z'
        />

        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.8'
          d='M8.5 7h6M8.5 10h6M8.5 13h4'
        />

      </svg>
    )
  }


  // ----------------------------------------------------------
  // Propiedad intelectual
  // ----------------------------------------------------------

  if (
    text.includes('propiedad') ||
    text.includes('patente')
  ) {

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        className='h-5 w-5 stroke-current'
      >

        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.8'
          d='M12 3l7 3v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3z'
        />

        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.8'
          d='M9 12l2 2 4-4'
        />

      </svg>
    )
  }


  // ----------------------------------------------------------
  // Transferencia
  // ----------------------------------------------------------

  if (
    text.includes('transferencia') ||
    text.includes('tecnológica') ||
    text.includes('tecnologica')
  ) {

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        className='h-5 w-5 stroke-current'
      >

        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.8'
          d='M7 7h10M7 12h10M7 17h6'
        />

        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.8'
          d='M4 5.5A2.5 2.5 0 016.5 3h11A2.5 2.5 0 0120 5.5v13a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 18.5v-13z'
        />

      </svg>
    )
  }


  // ----------------------------------------------------------
  // Cursos
  // ----------------------------------------------------------

  if (
    text.includes('curso') ||
    text.includes('certific')
  ) {

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        className='h-5 w-5 stroke-current'
      >

        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.8'
          d='M4 5.5A2.5 2.5 0 016.5 3h11A2.5 2.5 0 0120 5.5v13a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 18.5v-13z'
        />

        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.8'
          d='M8 8h8M8 12h8M8 16h5'
        />

      </svg>
    )
  }


  // ----------------------------------------------------------
  // Congresos / eventos
  // ----------------------------------------------------------

  if (
    text.includes('congreso') ||
    text.includes('evento') ||
    text.includes('estancia')
  ) {

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        className='h-5 w-5 stroke-current'
      >

        <rect
          x='4'
          y='5'
          width='16'
          height='15'
          rx='2'
          strokeWidth='1.8'
        />

        <path
          strokeLinecap='round'
          strokeWidth='1.8'
          d='M8 3v4M16 3v4M4 9h16'
        />

        <path
          strokeLinecap='round'
          strokeWidth='1.8'
          d='M8 13h2M14 13h2M8 16h2'
        />

      </svg>
    )
  }


  // ----------------------------------------------------------
  // Idiomas / lenguas
  // ----------------------------------------------------------

  if (
    text.includes('idioma') ||
    text.includes('lengua')
  ) {

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        className='h-5 w-5 stroke-current'
      >

        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.8'
          d='M5 5h8M9 5v2M6 9c1.3 2.4 3.2 4.3 5.5 5.5'
        />

        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.8'
          d='M13 5c-.5 4-2.5 7.5-6 10'
        />

        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.8'
          d='M14 14l4.5 7M18.5 14L14 21M15.2 18h5.1'
        />

      </svg>
    )
  }


  // ----------------------------------------------------------
  // Trayectoria
  // ----------------------------------------------------------

  if (
    text.includes('trayectoria') ||
    text.includes('profesional') ||
    text.includes('académica') ||
    text.includes('academica')
  ) {

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        className='h-5 w-5 stroke-current'
      >

        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.8'
          d='M4 19V5M4 19h16'
        />

        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.8'
          d='M7 15l3-4 3 2 5-7'
        />

      </svg>
    )
  }


  // ----------------------------------------------------------
  // Logros
  // ----------------------------------------------------------

  if (
    text.includes('logro') ||
    text.includes('evaluacion') ||
    text.includes('evaluación')
  ) {

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        className='h-5 w-5 stroke-current'
      >

        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.8'
          d='M12 3l2.4 5 5.6.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.6-.8L12 3z'
        />

      </svg>
    )
  }


  // ----------------------------------------------------------
  // Icono genérico
  // ----------------------------------------------------------

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      className='h-5 w-5 stroke-current'
    >

      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.8'
        d='M5 4.5A2.5 2.5 0 017.5 2H19v17H7.5A2.5 2.5 0 015 16.5v-12z'
      />

      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.8'
        d='M9 7h6M9 11h6M9 15h4'
      />

    </svg>
  )
}


// ============================================================
// COMPONENTE
// ============================================================

export const CVUSidebar = ({
  cvuData,
  currentTab,
  changeTab,
  onNewProduct,
  setSidebarOpen
}) => {


  // ==========================================================
  // ESTADO DEL BUSCADOR
  // ==========================================================

  const [searchTerm, setSearchTerm] = useState('')


  // ==========================================================
  // PROTECCIÓN DE DATOS
  // ==========================================================

  const safeData =
    cvuData &&
    typeof cvuData === 'object'
      ? cvuData
      : {}


  // ==========================================================
  // CATEGORÍAS
  // ==========================================================
  //
  // Convertimos el objeto de categorías en un arreglo para poder
  // filtrarlo mediante el buscador.
  // ==========================================================

  const categories = useMemo(() => {

    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase()


    return Object.entries(safeData)
      .map(([key, category]) => {

        const name = getCategoryName(
          key,
          category
        )


        return {
          key,
          category,
          name,
          count: getProductCount(category)
        }
      })
      .filter((item) => {

        if (!normalizedSearch) {
          return true
        }


        return (
          item.name
            .toLowerCase()
            .includes(normalizedSearch) ||

          item.key
            .toLowerCase()
            .includes(normalizedSearch)
        )
      })

  }, [
    safeData,
    searchTerm
  ])


  // ==========================================================
  // CAMBIAR CATEGORÍA
  // ==========================================================

  const handleChangeTab = (key) => {

    // Delegamos la lógica real a CVUInfo/Home.
    // CVUInfo abre la categoría en un popup al recibir este cambio.
    if (typeof changeTab === 'function') {
      changeTab(key)
    }


    // Compatibilidad con el antiguo comportamiento móvil.
    if (
      typeof setSidebarOpen === 'function'
    ) {
      setSidebarOpen(false)
    }
  }


  // ==========================================================
  // NUEVO PRODUCTO
  // ==========================================================

  const handleNewProduct = () => {

    if (
      typeof onNewProduct === 'function'
    ) {

      onNewProduct()

      return
    }


    // Compatibilidad: si el padre todavía no proporciona
    // onNewProduct, no provocamos ningún error.
    console.warn(
      '[CVU] onNewProduct no fue proporcionado.'
    )
  }


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <aside
      className='
        flex
        w-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      '
    >


      {/* ======================================================
          ENCABEZADO AZUL
          ====================================================== */}

      <div
        className='
          px-5
          py-5
          text-white
        '
        style={{
          backgroundColor: '#002B7A'
        }}
      >

        <div className='flex items-center gap-3'>


          {/* --------------------------------------------------
              TÍTULO
              -------------------------------------------------- */}

          <div className='min-w-0'>

            <h2 className='text-lg font-bold leading-tight'>
              Productos del investigador
            </h2>

            <p className='mt-1 text-xs text-blue-100'>
              Registro y gestión de productos académicos
            </p>

          </div>

        </div>

      </div>


      {/* ======================================================
          CONTENIDO DEL PANEL
          ====================================================== */}

      <div className='flex flex-1 flex-col p-4'>


        {/* ====================================================
            BUSCADOR
            ==================================================== */}

        <div className='relative mb-4'>


          {/* --------------------------------------------------
              ICONO DE BÚSQUEDA
              -------------------------------------------------- */}

          <div
            className='
              pointer-events-none
              absolute
              inset-y-0
              left-0
              flex
              items-center
              pl-3
              text-slate-400
            '
          >

            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='h-4 w-4 stroke-current'
            >

              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m21 21-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z'
              />

            </svg>

          </div>


          {/* --------------------------------------------------
              INPUT
              -------------------------------------------------- */}

          <input
            type='text'
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(
                event.target.value
              )
            }}
            placeholder='Buscar categoría...'
            aria-label='Buscar categoría del CVU'
            className='
              h-10
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              pl-9
              pr-3
              text-sm
              text-slate-700
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-[#002B7A]
              focus:bg-white
              focus:ring-2
              focus:ring-[#002B7A]/10
            '
          />

        </div>


        {/* ====================================================
            ENCABEZADO DE CATEGORÍAS
            ==================================================== */}

        <div className='mb-3 flex items-center justify-between px-1'>

          <p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
            Categorías
          </p>


          <span className='text-xs text-slate-400'>
            {categories.length}
          </span>

        </div>


        {/* ====================================================
            LISTA DE CATEGORÍAS
            ==================================================== */}

        <nav
          className='
            flex
            max-h-[calc(100vh-430px)]
            flex-col
            gap-1.5
            overflow-y-auto
            pr-1
          '
          aria-label='Categorías de productos CVU'
        >


          {categories.map((item, index) => {

            const isActive =
              currentTab === item.key


            return (

              <button
                key={item.key}
                type='button'
                onClick={() => {
                  handleChangeTab(
                    item.key
                  )
                }}
                title={item.name}
                aria-current={
                  isActive
                    ? 'page'
                    : undefined
                }
                className={`
                  group
                  flex
                  min-h-[56px]
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  border
                  px-3
                  py-2.5
                  text-left
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? `
                        border-[#002B7A]
                        bg-[#002B7A]
                        text-white
                        shadow-sm
                      `
                      : `
                        border-transparent
                        bg-white
                        text-slate-600
                        hover:border-[#D1DCEB]
                        hover:bg-[#F6F8FB]
                        hover:text-[#002B7A]
                      `
                  }
                `}
              >


                {/* ==========================================
                    NÚMERO
                    ========================================== */}

                <span
                  className={`
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    text-xs
                    font-bold

                    ${
                      isActive
                        ? 'bg-white/15 text-white'
                        : 'bg-slate-100 text-[#002B7A]'
                    }
                  `}
                >

                  {index + 1}

                </span>


                {/* ==========================================
                    ICONO
                    ========================================== */}

                <span
                  className={`
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg

                    ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'bg-[#F1F1FA] text-[#002B7A]'
                    }
                  `}
                >

                  {getCategoryIcon(
                    item.name,
                    item.key
                  )}

                </span>


                {/* ==========================================
                    INFORMACIÓN
                    ========================================== */}

                <span className='min-w-0 flex-1'>


                  {/* ----------------------------------------
                      NOMBRE
                      ---------------------------------------- */}

                  <span
                    className={`
                      block
                      truncate
                      text-sm
                      font-medium

                      ${
                        isActive
                          ? 'text-white'
                          : 'text-slate-700 group-hover:text-[#002B7A]'
                      }
                    `}
                  >

                    {item.name}

                  </span>


                  {/* ----------------------------------------
                      CANTIDAD
                      ---------------------------------------- */}

                  <span
                    className={`
                      mt-0.5
                      block
                      text-xs

                      ${
                        isActive
                          ? 'text-blue-100'
                          : 'text-slate-400'
                      }
                    `}
                  >

                    {item.count === 1
                      ? '1 producto'
                      : `${item.count} productos`
                    }

                  </span>

                </span>


                {/* ==========================================
                    FLECHA
                    ========================================== */}

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className={`
                    h-4
                    w-4
                    shrink-0
                    transition-transform
                    duration-200

                    ${
                      isActive
                        ? 'translate-x-0.5 text-white'
                        : 'text-slate-300 group-hover:translate-x-0.5 group-hover:text-[#002B7A]'
                    }
                  `}
                >

                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m9 5 7 7-7 7'
                  />

                </svg>

              </button>

            )
          })}


          {/* ==================================================
              SIN RESULTADOS DE BÚSQUEDA
              ================================================== */}

          {categories.length === 0 && (

            <div
              className='
                rounded-xl
                border
                border-dashed
                border-slate-300
                bg-slate-50
                px-4
                py-6
                text-center
              '
            >

              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='mx-auto h-7 w-7 text-slate-400'
              >

                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.8'
                  d='m21 21-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z'
                />

              </svg>


              <p className='mt-2 text-sm font-medium text-slate-600'>
                No se encontraron categorías
              </p>


              <p className='mt-1 text-xs text-slate-400'>
                Intenta con otro término de búsqueda.
              </p>

            </div>

          )}


        </nav>


        {/* ====================================================
            SEPARADOR
            ==================================================== */}

        <div className='my-4 border-t border-slate-200' />


        {/* ====================================================
            BOTÓN NUEVO PRODUCTO
            ==================================================== */}

        <button
          type='button'
          onClick={handleNewProduct}
          disabled={
            !currentTab
          }
          className='
            flex
            min-h-[48px]
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            px-4
            py-3
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition-all
            duration-200
            disabled:cursor-not-allowed
            disabled:opacity-50
            hover:shadow-md
          '
          style={{
            backgroundColor: '#002B7A'
          }}
        >

          {/* --------------------------------------------------
              ICONO PLUS
              -------------------------------------------------- */}

          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='h-5 w-5 stroke-current'
          >

            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 5v14M5 12h14'
            />

          </svg>


          Nuevo producto

        </button>


        {/* ====================================================
            INFORMACIÓN DE CATEGORÍA ACTIVA
            ==================================================== */}

        {currentTab && safeData[currentTab] && (

          <div
            className='
              mt-3
              rounded-xl
              border
              border-[#D1DCEB]
              bg-[#F6F8FB]
              px-3
              py-2.5
            '
          >

            <p className='text-[11px] font-semibold uppercase tracking-wide text-slate-400'>
              Seleccionado
            </p>


            <p className='mt-0.5 truncate text-xs font-medium text-[#002B7A]'>
              {getCategoryName(
                currentTab,
                safeData[currentTab]
              )}
            </p>

          </div>

        )}

      </div>

    </aside>
  )
}