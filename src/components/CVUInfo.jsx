// ============================================================
// ARCHIVO:
// C:\Proyectos\SIIA\siia-front\src\components\CVUInfo.jsx
//
// DESCRIPCIÓN:
// Componente principal que muestra la información de los
// productos del CVU.
//
// RESPONSABILIDADES:
// 1. Mostrar los productos de la categoría seleccionada.
// 2. Permitir expandir y contraer un registro.
// 3. Mostrar el detalle de un registro.
// 4. Permitir agregar un nuevo registro.
// 5. Permitir editar un registro creado manualmente.
// 6. Permitir cargar un archivo CVU.
// 7. Mostrar el formulario dinámico.
// 8. Actualizar la información después de guardar/cargar datos.
//
// INTEGRACIÓN 9.5.2:
// El selector de categorías deja de pertenecer visualmente a
// este componente. La navegación de categorías será controlada
// posteriormente por CVUSidebar.jsx.
//
// Para permitir que Home.jsx y CVUSidebar.jsx controlen este
// componente, se utiliza forwardRef/useImperativeHandle.
//
// Métodos expuestos:
//   - openNewProduct()
//   - changeCategory(key)
// ============================================================


// ------------------------------------------------------------
// SERVICIOS Y COMPONENTES
// ------------------------------------------------------------

// Servicio utilizado para solicitar al backend la especificación
// del formulario correspondiente al tipo de producto seleccionado.
import { getFormSpecification } from '@/services/cvuApi'

// Componente que recibe los datos y una especificación y construye
// visualmente el detalle de manera recursiva.
import RecursiveDisplay from '@/components/RecursiveDisplay'

// Formulario dinámico utilizado para crear y editar registros CVU.
import DynamicForm from '@/components/DynamicForm'

// Componente encargado de seleccionar y cargar el archivo JSON del CVU.
import CVUUpload from '@/components/CVUUpload'


// ------------------------------------------------------------
// REACT
// ------------------------------------------------------------

// forwardRef:
// Permite que el componente padre obtenga una referencia pública
// hacia este componente.
//
// useImperativeHandle:
// Permite definir exactamente qué métodos serán accesibles
// desde la referencia.
//
// useState:
// Maneja los estados internos.
//
// useRef:
// Conserva la referencia al DynamicForm.
//
// useEffect:
// Ejecuta lógica cuando cambia cvuData.
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect
} from 'react'


// ------------------------------------------------------------
// API
// ------------------------------------------------------------

// Hook utilizado para obtener la instancia configurada de Axios/API.
import { useApi } from '@/hooks/useApi'


// ============================================================
// NORMALIZACIÓN DE VALORES
// ============================================================

// Normaliza valores que pueden llegar como:
//
// - string
// - number
// - boolean
// - array
// - objeto de catálogo { id, nombre }
//
// Nunca debemos enviar un objeto directamente al JSX.
const getSafeText = (value) => {
  if (value === null || value === undefined) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  if (
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return String(value)
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => getSafeText(item))
      .filter(Boolean)
      .join(', ')
  }

  if (typeof value === 'object') {
    if (
      value.nombre !== null &&
      value.nombre !== undefined
    ) {
      return getSafeText(value.nombre)
    }

    if (
      value.descripcion !== null &&
      value.descripcion !== undefined
    ) {
      return getSafeText(value.descripcion)
    }

    if (
      value.label !== null &&
      value.label !== undefined
    ) {
      return getSafeText(value.label)
    }

    if (
      value.name !== null &&
      value.name !== undefined
    ) {
      return getSafeText(value.name)
    }

    return ''
  }

  return String(value)
}


// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

export const CVUInfo = forwardRef(({
  cvuData,
  fetchCVUData,
  isLoading,
  onCategoryChange
}, ref) => {


  // ==========================================================
  // ESTADOS DEL COMPONENTE
  // ==========================================================

  // ----------------------------------------------------------
  // selectedList
  //
  // Contiene los productos pertenecientes a la categoría
  // actualmente seleccionada.
  // ----------------------------------------------------------
  const [selectedList, setSelectedList] = useState(null)


  // ----------------------------------------------------------
  // currentTab
  //
  // Guarda la clave de la categoría actualmente seleccionada.
  // ----------------------------------------------------------
  const [currentTab, setCurrentTab] = useState(null)


  // ----------------------------------------------------------
  // selectedIsFormFile
  //
  // Indica si el registro seleccionado proviene del archivo CVU.
  //
  // true:
  //    El registro viene del archivo.
  //
  // false:
  //    El registro fue creado/registrado manualmente.
  //
  // Esto determina si se muestra el botón "Editar".
  // ----------------------------------------------------------
  const [selectedIsFormFile, setSelectedIsFormFile] = useState(true)


  // ----------------------------------------------------------
  // expandedProductId
  //
  // Guarda el ID del producto actualmente expandido.
  // ----------------------------------------------------------
  const [expandedProductId, setExpandedProductId] = useState(null)


  // ----------------------------------------------------------
  // formModalOpen
  //
  // Determina si el modal del DynamicForm está visible.
  // ----------------------------------------------------------
  const [formModalOpen, setFormModalOpen] = useState(false)


  // ----------------------------------------------------------
  // categoryModalOpen
  //
  // Controla la ventana emergente donde se muestran los productos
  // de la categoría seleccionada desde CVUSidebar.
  // De esta manera el usuario puede consultar y editar la categoría
  // sin desplazarse hasta la sección inferior de la pantalla.
  // ----------------------------------------------------------
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)


  // ----------------------------------------------------------
  // showDownloadConfirm
  //
  // Controla la ventana de confirmación para descargar el CVU.
  // ----------------------------------------------------------
  const [showDownloadConfirm, setShowDownloadConfirm] = useState(false)


  // ----------------------------------------------------------
  // formSpecification
  //
  // Contiene la especificación del formulario obtenida desde
  // el backend.
  // ----------------------------------------------------------
  const [formSpecification, setFormSpecification] = useState(null)


  // ----------------------------------------------------------
  // cvuFormData
  //
  // Contiene los datos iniciales utilizados por DynamicForm.
  // ----------------------------------------------------------
  const [cvuFormData, setCvuFormData] = useState({})


  // ==========================================================
  // API
  // ==========================================================

  const api = useApi()


  // ==========================================================
  // REFERENCIA AL FORMULARIO DINÁMICO
  // ==========================================================

  const dynamicFormRef = useRef(null)


  // ==========================================================
  // PROTECCIÓN CONTRA cvuData NULL/UNDEFINED
  // ==========================================================

  const safeData = cvuData || {}


  // ==========================================================
  // OBTENER PRODUCTOS DE UNA CATEGORÍA
  // ==========================================================

  const getProductsByCategory = (key) => {
    if (
      !key ||
      !cvuData ||
      !cvuData[key]
    ) {
      return []
    }

    return cvuData[key]?.productos || []
  }


  // ==========================================================
  // CAMBIAR CATEGORÍA
  // ==========================================================

  const changeTab = (key, openModal = true) => {

    if (
      !key ||
      !cvuData ||
      !cvuData[key]
    ) {
      return
    }


    console.log(
      '[CVU] changeTab to',
      key
    )


    // Actualizamos la categoría activa.
    setCurrentTab(key)


    // Cuando el cambio proviene de CVUSidebar abrimos directamente
    // la categoría en una ventana emergente.
    if (openModal) {
      setCategoryModalOpen(true)
    }


    // Cargamos los productos correspondientes.
    setSelectedList(
      getProductsByCategory(key)
    )


    // Al cambiar de categoría cerramos cualquier producto
    // que estuviera expandido.
    setExpandedProductId(null)


    // Al cambiar de categoría asumimos inicialmente que
    // no estamos editando un registro manual.
    setSelectedIsFormFile(true)


    console.log(
      '[CVU] selectedList for tab',
      key,
      '=',
      getProductsByCategory(key)
    )


    // Notificamos al componente padre.
    //
    // CVUSidebar utilizará posteriormente esta información
    // para mantener sincronizado el elemento activo.
    if (typeof onCategoryChange === 'function') {
      onCategoryChange(key)
    }
  }


  // ==========================================================
  // SELECCIONAR AUTOMÁTICAMENTE LA PRIMERA CATEGORÍA
  // ==========================================================

  useEffect(() => {

    if (
      cvuData &&
      Object.keys(cvuData).length > 0
    ) {

      const availableKeys = Object.keys(cvuData)

      const firstKey = availableKeys[0]

      // Si todavía no existe una categoría seleccionada,
      // seleccionamos la primera.
      if (!currentTab) {

        changeTab(firstKey, false)

        return
      }


      // Si la categoría seleccionada ya no existe,
      // regresamos a la primera disponible.
      if (!cvuData[currentTab]) {

        changeTab(firstKey, false)

        return
      }


      // Si la categoría continúa existiendo, actualizamos
      // solamente su lista de productos.
      setSelectedList(
        cvuData[currentTab]?.productos || []
      )
    }

  }, [cvuData])


  // ==========================================================
  // EXPONER MÉTODOS AL COMPONENTE PADRE
  // ==========================================================

  useImperativeHandle(ref, () => ({

    // --------------------------------------------------------
    // openNewProduct()
    //
    // Permite que Home.jsx o CVUSidebar.jsx soliciten la apertura
    // del formulario para crear un nuevo producto.
    // --------------------------------------------------------
    openNewProduct: () => {

      if (!currentTab) {

        console.warn(
          '[CVU] No hay una categoría seleccionada para crear un producto.'
        )

        return
      }

      setCategoryModalOpen(true)
      addNewCVUEntry(false)
    },


    // --------------------------------------------------------
    // changeCategory(key)
    //
    // Permite cambiar de categoría desde CVUSidebar.
    // --------------------------------------------------------
    changeCategory: (key) => {

      changeTab(key)
    }

  }), [
    currentTab,
    cvuData,
    selectedList,
    expandedProductId,
    onCategoryChange
  ])


  // ==========================================================
  // EXPANDIR / CONTRAER PRODUCTO
  // ==========================================================

  const toggleCollapse = (id) => {

    console.log(
      '[CVU] toggleCollapse called for id=',
      id,
      'current expanded=',
      expandedProductId
    )


    // --------------------------------------------------------
    // Si hacemos clic nuevamente sobre el mismo producto,
    // lo cerramos.
    // --------------------------------------------------------

    if (expandedProductId === id) {

      setExpandedProductId(null)

      return
    }


    // --------------------------------------------------------
    // Si seleccionamos un producto diferente,
    // lo expandimos.
    // --------------------------------------------------------

    setExpandedProductId(id)


    // Buscamos el producto seleccionado.
    const item = selectedList?.find(
      (item) => item.id === id
    )


    if (item) {

      setSelectedIsFormFile(
        item.is_from_file
      )


      console.log(
        '[CVU] selectedIsFormFile=',
        item.is_from_file
      )
    }
  }


  // ==========================================================
  // OBTENER DATOS REALES DEL PRODUCTO
  // ==========================================================

  const getProductoData = (producto) => {

    // Algunos productos tienen la estructura:
    //
    // {
    //    id: "...",
    //    titulo: "...",
    //    contenido: {...}
    // }
    //
    // En ese caso queremos mostrar "contenido".
    //
    // Si no existe contenido utilizamos directamente producto.

    return (
      producto &&
      producto.contenido !== undefined
    )
      ? producto.contenido
      : producto
  }


  // ==========================================================
  // OBTENER ESPECIFICACIÓN DE VISUALIZACIÓN
  // ==========================================================

  const getCurrentSpec = () => {

    return (
      cvuData &&
      currentTab &&
      cvuData[currentTab] &&
      cvuData[currentTab].display_spec
    )
      ? cvuData[currentTab].display_spec
      : {}
  }


  // ==========================================================
  // CREAR / EDITAR REGISTRO CVU
  // ==========================================================

  const addNewCVUEntry = (isEdit = false) => {

    console.log(
      '[CVU] Opening form for product type:',
      currentTab,
      'isEdit:',
      isEdit
    )


    // No intentamos solicitar un formulario si todavía
    // no existe una categoría seleccionada.
    if (!currentTab) {

      console.warn(
        '[CVU] No currentTab available.'
      )

      return
    }


    // --------------------------------------------------------
    // Solicitamos al backend la especificación del formulario.
    // --------------------------------------------------------

    getFormSpecification({
      api,
      productType: currentTab
    })

      .then((response) => {

        const spec = response.data


        console.log(
          '[CVU] Form specification fetched:',
          spec
        )


        // ------------------------------------------------------
        // Construimos los datos iniciales.
        // ------------------------------------------------------

        const initialData = isEdit

          // ====================================================
          // MODO EDICIÓN
          // ====================================================
          ? {

              // Tipo de producto.
              product_type: currentTab,

              // Indicamos edición.
              isEdit: true,

              // ID del producto.
              id: expandedProductId,

              // Datos actuales.
              data: getProductoData(
                selectedList?.find(
                  (item) =>
                    item.id === expandedProductId
                )
              )

            }

          // ====================================================
          // MODO CREACIÓN
          // ====================================================
          : {

              // Tipo de producto seleccionado.
              product_type: currentTab,

              // Indicamos creación.
              isEdit: false

            }


        // Guardamos los datos iniciales.
        setCvuFormData(initialData)


        // Guardamos la especificación.
        setFormSpecification(spec)


        // Abrimos el modal.
        setFormModalOpen(true)

      })

      .catch((error) => {

        console.error(
          '[CVU] Error fetching form specification:',
          error
        )

      })
  }


  // ==========================================================
  // CERRAR MODAL
  // ==========================================================

  const closeFormModal = () => {

    setFormModalOpen(false)

    setFormSpecification(null)

    setCvuFormData({})

  }


  // ==========================================================
  // DESCARGAR CVU COMPLETO
  // ==========================================================

  const handleDownloadCVU = () => {

    // No descargamos si todavía no existe información del CVU.
    if (!cvuData || typeof cvuData !== 'object') {
      return
    }

    // Convertimos todo el CVU cargado a JSON legible.
    const jsonContent = JSON.stringify(cvuData, null, 2)

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

    // Cerramos la confirmación después de iniciar la descarga.
    setShowDownloadConfirm(false)
  }


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div className='w-full'>


      {/* ======================================================
          CABECERA PRINCIPAL
          ====================================================== */}

      <div className='mb-6 flex flex-col gap-4'>

        <div className='flex flex-col gap-1'>

          <h2 className='text-xl font-bold text-[#000080] md:text-2xl'>
            Productos del investigador
          </h2>

          <p className='text-sm text-slate-500'>
            Selecciona una categoría en el panel derecho para consultar sus
            productos sin desplazarte por la página.
          </p>

        </div>


        <div className='flex flex-wrap items-center gap-2'>

          {/* ==================================================
              CARGAR CVU
              ==================================================

              La carga del CVU permanece fuera de la ventana de
              categoría porque afecta al conjunto completo del CVU.
          ================================================== */}

          <CVUUpload
            onSuccess={() => {
              fetchCVUData({
                skipCache: true
              })
            }}
            onError={(error) => {
              console.error(
                '[CVU] Error uploading CVU file:',
                error
              )
            }}
          />

          <button
            type='button'
            className='inline-flex items-center gap-2 rounded-xl border border-[#000080] bg-white px-4 py-2.5 text-sm font-semibold text-[#000080] shadow-sm transition-colors hover:bg-[#F3F3FC] focus:outline-none focus:ring-2 focus:ring-[#000080]/20 disabled:cursor-not-allowed disabled:opacity-50'
            title='Descargar CVU completo en formato JSON'
            disabled={
              isLoading ||
              !cvuData ||
              Object.keys(cvuData).length === 0
            }
            onClick={() => setShowDownloadConfirm(true)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='h-5 w-5 stroke-current'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 3v12m0 0l-4-4m4 4l4-4M5 21h14'
              />
            </svg>
            Descargar CVU
          </button>

        </div>

      </div>


      {/* ======================================================
          ESTADO DE CATEGORÍA
          ====================================================== */}

      <div className='rounded-2xl border border-[#D6D6EF] bg-white p-6 shadow-sm'>

        <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between'>

          <div>

            <p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
              Productos CVU
            </p>

            <h3 className='mt-1 text-lg font-bold text-[#000080]'>
              Selecciona una categoría
            </h3>

            <p className='mt-1 max-w-2xl text-sm leading-6 text-slate-500'>
              Al seleccionar una categoría desde «Productos del investigador»
              se abrirá aquí mismo una ventana con sus registros, detalle y
              acciones disponibles.
            </p>

          </div>

          <div className='shrink-0 rounded-full border border-[#D6D6EF] bg-[#F3F3FC] px-4 py-2 text-sm font-semibold text-[#000080]'>
            {Object.keys(safeData).length} categorías
          </div>

        </div>

      </div>


      {/* ======================================================
          POPUP DE CATEGORÍA
          ======================================================

          La categoría se presenta como una ventana emergente en lugar
          de insertar su contenido debajo del perfil. Así se evita el
          desplazamiento automático y se conserva el contexto del usuario.
      ====================================================== */}

      {categoryModalOpen && currentTab && (

        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-3 sm:p-5'
          role='dialog'
          aria-modal='true'
          aria-labelledby='cvu-category-modal-title'
        >

          <div
            className='relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#D6D6EF] bg-slate-50 shadow-2xl'
          >

            {/* ==================================================
                ENCABEZADO DEL POPUP
                ================================================== */}

            <div className='shrink-0 border-b border-[#D6D6EF] bg-white px-5 py-4 sm:px-6'>

              <div className='flex items-start justify-between gap-4'>

                <div className='min-w-0'>

                  <p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
                    Categoría seleccionada
                  </p>

                  <h2
                    id='cvu-category-modal-title'
                    className='mt-1 break-words text-xl font-bold text-[#000080]'
                  >
                    {getSafeText(
                      cvuData?.[currentTab]?.nombre ||
                      currentTab
                    )}
                  </h2>

                  <p className='mt-1 text-sm text-slate-500'>
                    {getSafeText(
                      cvuData?.[currentTab]?.descripcion
                    ) || 'Registro y gestión de productos académicos'}
                  </p>

                </div>


                <button
                  type='button'
                  className='shrink-0 rounded-full border border-[#D6D6EF] bg-[#F3F3FC] px-3 py-1 text-[#000080] transition-colors hover:bg-[#E8E8F7]'
                  onClick={() => setCategoryModalOpen(false)}
                  aria-label='Cerrar categoría'
                  title='Cerrar'
                >
                  ✕
                </button>

              </div>


              {/* ==================================================
                  ACCIONES DE LA CATEGORÍA
                  ================================================== */}

              <div className='mt-4 flex flex-wrap items-center gap-2'>

                <span className='rounded-full border border-[#D6D6EF] bg-[#F3F3FC] px-3 py-1.5 text-sm font-semibold text-[#000080]'>
                  {selectedList?.length || 0} productos
                </span>

                <button
                  type='button'
                  className='inline-flex items-center gap-2 rounded-xl bg-[#000080] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#000066] focus:outline-none focus:ring-2 focus:ring-[#000080]/20 disabled:cursor-not-allowed disabled:opacity-50'
                  title='Crear nuevo registro'
                  disabled={isLoading || !currentTab}
                  onClick={() => addNewCVUEntry(false)}
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
                      strokeWidth={2}
                      d='M12 4v16m8-8H4'
                    />
                  </svg>

                  Agregar

                </button>


                {/* ------------------------------------------------
                    EDITAR

                    Solamente aparece cuando el registro seleccionado
                    es editable y existe un producto expandido.
                    No se agrega ninguna opción de eliminar.
                ------------------------------------------------ */}

                {!selectedIsFormFile && expandedProductId !== null && (

                  <button
                    type='button'
                    className='inline-flex items-center gap-2 rounded-xl border border-[#000080] bg-white px-4 py-2.5 text-sm font-semibold text-[#000080] shadow-sm transition-colors hover:bg-[#F3F3FC] focus:outline-none focus:ring-2 focus:ring-[#000080]/20'
                    title='Editar'
                    onClick={() => addNewCVUEntry(true)}
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
                        strokeWidth={2}
                        d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                      />
                    </svg>

                    Editar

                  </button>

                )}

              </div>
            </div>

            {/* ==================================================
                CONTENIDO DE LA CATEGORÍA
                ================================================== */}

            <div className='min-h-0 flex-1 overflow-y-auto p-4 sm:p-6'>

              {selectedList && selectedList.length > 0

                ? (

                  <div className='space-y-3'>

                    {selectedList.map((producto) => {

                      const productoId = getSafeText(producto.id)

                      const isExpanded =
                        expandedProductId === producto.id


                      return (

                        <div
                          key={productoId}
                          className='collapse collapse-plus overflow-hidden rounded-xl border border-[#D6D6EF] bg-white shadow-sm transition-shadow hover:shadow-md'
                        >

                          <input
                            type='checkbox'
                            checked={isExpanded}
                            onChange={() => toggleCollapse(producto.id)}
                          />


                          {/* --------------------------------------
                              CABECERA DEL REGISTRO
                              -------------------------------------- */}

                          <div className='collapse-title bg-white px-4 py-4 pr-12'>

                            <div className='min-w-0'>

                              <span className='block text-xs font-medium text-slate-500'>
                                Registro #{productoId}
                              </span>

                              <span className='mt-1 block break-words text-sm font-bold text-[#000080] md:text-base'>
                                {getSafeText(producto.titulo)}
                              </span>

                            </div>

                          </div>


                          {/* --------------------------------------
                              DETALLE DEL REGISTRO
                              -------------------------------------- */}

                          <div className='collapse-content bg-white px-4'>

                            {isExpanded && (

                              <div className='border-t border-[#D6D6EF] pb-2 pt-4'>

                                <RecursiveDisplay
                                  data={getProductoData(producto)}
                                  spec={getCurrentSpec()}
                                />

                              </div>

                            )}

                          </div>

                        </div>

                      )
                    })}

                  </div>

                )

                : (

                  <div className='rounded-xl border border-[#D6D6EF] bg-[#F3F3FC] p-6'>

                    <div className='flex items-start gap-3'>

                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        className='mt-0.5 h-6 w-6 shrink-0 text-[#000080]'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>

                      <div>
                        <p className='font-semibold text-[#000080]'>
                          No hay datos disponibles
                        </p>

                        <p className='mt-1 text-sm text-slate-600'>
                          Esta categoría todavía no contiene productos registrados.
                        </p>
                      </div>

                    </div>

                  </div>

                )}

            </div>

          </div>

        </div>

      )}


      {/* ======================================================
          CONFIRMACIÓN DE DESCARGA DEL CVU
          ====================================================== */}

      {showDownloadConfirm && (

        <div
          className='fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4'
          role='dialog'
          aria-modal='true'
          aria-labelledby='download-cvu-title'
        >

          <div className='w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl'>

            <div className='flex items-start gap-4'>

              <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3F3FC] text-[#000080]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='h-6 w-6 stroke-current'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v3.75m0 3.25h.01M10.29 3.86l-7.5 13A1.5 1.5 0 004.09 19h15.82a1.5 1.5 0 001.3-2.14l-7.5-13a1.5 1.5 0 00-2.62 0z'
                  />
                </svg>
              </div>

              <div>
                <h3
                  id='download-cvu-title'
                  className='text-lg font-bold text-[#000080]'
                >
                  Descargar CVU
                </h3>

                <p className='mt-2 text-sm leading-6 text-gray-600'>
                  ¿Está seguro de descargar todo el CVU en formato JSON?
                </p>
              </div>

            </div>

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


      {/* ======================================================
          MODAL DEL FORMULARIO DINÁMICO
          ====================================================== */}

      {formModalOpen && (

        <div className='modal modal-open'>


          {/* ==================================================
              CONTENEDOR DEL MODAL
              ================================================== */}

          <div
            className='modal-box w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#D6D6EF] bg-white shadow-xl'
          >


            {/* =================================================
                BOTÓN CERRAR
                ================================================= */}

            <button
              type='button'
              className='btn btn-sm btn-circle border-0 bg-[#F3F3FC] text-[#000080] absolute right-2 top-2 hover:bg-[#E8E8F7]'
              onClick={closeFormModal}
              aria-label='Cerrar formulario'
            >

              ✕

            </button>


            {/* =================================================
                TÍTULO DEL MODAL
                ================================================= */}

            <h3 className='mb-1 pr-10 text-lg font-bold text-[#000080]'>

              {cvuFormData?.isEdit
                ? 'Editar registro CVU'
                : 'Crear nuevo registro CVU'
              }

            </h3>


            {/* =================================================
                CATEGORÍA DEL PRODUCTO
                ================================================= */}

            <p className='mb-4 text-sm text-slate-500'>

              {getSafeText(
                cvuData?.[currentTab]?.nombre ||
                currentTab
              )}

            </p>


            {/* =================================================
                FORMULARIO DINÁMICO
                ================================================= */}

            <DynamicForm

              // Referencia para poder solicitar reset() cuando
              // DynamicForm lo exponga.
              ref={dynamicFormRef}

              // Especificación recibida desde el backend.
              initialSpecification={
                formSpecification
              }

              // Datos iniciales del formulario.
              initialData={
                cvuFormData
              }

              // =================================================
              // EVENTO DE ÉXITO
              // =================================================

              onSuccess={(response) => {

                console.log(
                  '[CVU] Formulario enviado exitosamente:',
                  response
                )


                // Cerramos el modal.
                setFormModalOpen(false)


                // Limpiamos la especificación.
                setFormSpecification(null)


                // Limpiamos los datos.
                setCvuFormData({})


                // Si DynamicForm expone reset(), lo ejecutamos.
                if (
                  dynamicFormRef.current &&
                  typeof dynamicFormRef.current.reset === 'function'
                ) {

                  dynamicFormRef.current.reset()

                }


                // Volvemos a consultar el CVU evitando caché.
                fetchCVUData({
                  skipCache: true
                })

              }}

            />

          </div>


          {/* ==================================================
              FONDO DEL MODAL
              ==================================================

              Al hacer clic fuera del formulario se cierra.
          ================================================== */}

          <div
            className='modal-backdrop'
            onClick={closeFormModal}
          />

        </div>

      )}

    </div>

  )
})


// ============================================================
// NOMBRE DEL COMPONENTE
// ============================================================
//
// Facilita la identificación del componente en React DevTools.
// ============================================================

CVUInfo.displayName = 'CVUInfo'
