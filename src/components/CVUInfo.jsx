import { getFormSpecification } from '@/services/cvuApi'
import RecursiveDisplay from '@/components/RecursiveDisplay'
import DynamicForm from '@/components/DynamicForm'
import CVUUpload from '@/components/CVUUpload'
import { useState, useRef, useEffect } from 'react'
import { useApi } from '@/hooks/useApi'

export const CVUInfo = ({ cvuData, fetchCVUData, isLoading }) => {
  const [selectedList, setSelectedList] = useState(null)
  const [currentTab, setCurrentTab] = useState(null)
  const [selectedIsFormFile, setSelectedIsFormFile] = useState(true)
  const [expandedProductId, setExpandedProductId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [formSpecification, setFormSpecification] = useState(null)
  const [cvuFormData, setCvuFormData] = useState({})
  const api = useApi()
  const dynamicFormRef = useRef(null)

  const safeData = cvuData || {}

  useEffect(() => {
    if (cvuData && Object.keys(cvuData).length > 0) {
      const firstKey = Object.keys(cvuData)[0]
      setCurrentTab(firstKey)
      setSelectedList(cvuData[firstKey]?.productos || [])
    }
  }, [cvuData])

  const toggleCollapse = (id) => {
    console.log('[CVU] toggleCollapse called for id=', id, 'current expanded=', expandedProductId)
    if (expandedProductId === id) {
      setExpandedProductId(null)
    } else {
      setExpandedProductId(id)
      const item = selectedList?.find((item) => item.id === id)
      if (item) {
        setSelectedIsFormFile(item.is_from_file)
        console.log('selectedIsFormFile=', item.is_from_file)
      }
    }
  }

  const getProductoData = (producto) => {
    return producto && producto.contenido !== undefined ? producto.contenido : producto
  }

  const getCurrentSpec = () => {
    return cvuData && currentTab && cvuData[currentTab] && cvuData[currentTab].display_spec
      ? cvuData[currentTab].display_spec
      : {}
  }

  const changeTab = (key) => {
    console.log('[CVU] changeTab to', key)
    setCurrentTab(key)
    setSelectedList(cvuData[key]?.productos || [])
    console.log('selectedList for tab', key, '=', cvuData[key]?.productos || [])
    setExpandedProductId(null)
    setSelectedIsFormFile(true)
  }

  const addNewCVUEntry = (isEdit = false) => {
    console.log('Adding new CVU entry for product type:', currentTab)
    getFormSpecification({ api, productType: currentTab })
      .then((response) => {
        const spec = response.data
        console.log('Form specification fetched:', spec)
        const initialData = isEdit
          ? {
              product_type: currentTab,
              isEdit: true,
              id: expandedProductId,
              data: getProductoData(selectedList.find((item) => item.id === expandedProductId))
            }
          : {
              product_type: currentTab,
              isEdit: false
            }
        setCvuFormData(initialData)
        setFormSpecification(spec)
        setFormModalOpen(true)
      })
      .catch((error) => console.error('Error fetching form specification:', error))
  }

  return (
    <div className='drawer lg:drawer-open min-h-screen bg-gradient-to-br from-base-100 to-base-200'>
      <input
        id='sidebar-drawer'
        type='checkbox'
        className='drawer-toggle'
        checked={sidebarOpen}
        onChange={(e) => setSidebarOpen(e.target.checked)}
      />

      {/* Main Content Area */}
      <div className='drawer-content flex flex-col p-6'>
        {/* Top header with title and CVU button */}
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold text-primary lg:hidden'>Contenido</h1>
          <div className='flex items-center gap-2 ml-auto lg:ml-0'>
            <CVUUpload
              onSuccess={() => fetchCVUData({ skipCache: true })}
              onError={(error) => {
                console.error('Error uploading CVU file:', error)
              }}
            />
            <label htmlFor='sidebar-drawer' className='btn btn-circle btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='w-6 h-6 stroke-current'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </label>
          </div>
        </div>

        <div className='max-w-7xl mx-auto w-full'>
          <div className='card bg-base-100 shadow-lg'>
            <div className='card-body p-6'>
              <div className='flex flex-col gap-4 mb-6'>
                <div className='flex items-center justify-between'>
                  <h1 className='card-title text-2xl text-primary'>Detalle de contenido</h1>
                </div>
                <div className='flex gap-2 flex-wrap'>
                  <button
                    type='button'
                    className='btn btn-primary gap-2'
                    title='Crear nuevo registro'
                    onClick={addNewCVUEntry}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      className='w-4 h-4 stroke-current'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                    </svg>
                    Agregar
                  </button>
                  {!selectedIsFormFile && (
                    <button
                      type='button'
                      className='btn btn-outline btn-primary gap-2'
                      title='Editar'
                      onClick={() => addNewCVUEntry(true)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        className='w-4 h-4 stroke-current'
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

              {/* Collapse items */}
              <div className='space-y-3'>
                {selectedList && selectedList.length > 0
                  ? selectedList.map((producto) => (
                    <div key={producto.id} className='collapse collapse-plus bg-base-200 border border-base-300'>
                      <input
                        type='checkbox'
                        checked={expandedProductId === producto.id}
                        onChange={() => toggleCollapse(producto.id)}
                      />
                      <div className='collapse-title font-semibold text-sm md:text-base text-primary px-2 md:px-2 py-2 md:py-2 line-clamp-2'>
                        <span className='block'>{producto.id}</span>
                        <span className='block'>{producto.titulo}</span>
                      </div>
                      <div className='collapse-content'>
                        {expandedProductId === producto.id && (
                          <div className='pt-4 border-t border-base-300'>
                            <RecursiveDisplay data={getProductoData(producto)} spec={getCurrentSpec()} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                  : (
                    <div className='alert alert-info'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        className='w-6 h-6 stroke-current'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                      <span>No hay datos disponibles</span>
                    </div>
                    )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Tab Navigation */}
      <div className='drawer-side z-40'>
        <label htmlFor='sidebar-drawer' className='drawer-overlay' />
        <div className='w-80 bg-base-100'>
          <div className='p-6 sticky top-0'>
            <h2 className='card-title text-lg text-primary mb-4'>Contenido</h2>
            <div className='menu menu-compact w-full p-0'>
              {Object.entries(safeData).map(([key, list]) => (
                <button
                  key={key}
                  onClick={() => {
                    changeTab(key)
                    setSidebarOpen(false)
                  }}
                  className={`menu-item justify-start text-left px-4 py-3 rounded-lg transition-all ${
                    currentTab === key
                      ? 'bg-primary text-primary-content font-semibold'
                      : 'text-base-content hover:bg-base-200'
                  }`}
                >
                  {list.nombre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para DynamicForm */}
      {formModalOpen && (
        <div className='modal modal-open'>
          <div className='modal-box w-full max-w-2xl max-h-screen overflow-y-auto'>
            <button
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              onClick={() => setFormModalOpen(false)}
            >
              ✕
            </button>
            <h3 className='font-bold text-lg mb-4'>Crear nuevo registro CVU</h3>
            <DynamicForm
              ref={dynamicFormRef}
              initialSpecification={formSpecification}
              initialData={cvuFormData}
              onSuccess={(response) => {
                console.log('Formulario enviado exitosamente:', response)
                setFormModalOpen(false)
                setFormSpecification(null)
                setCvuFormData(null)
                if (dynamicFormRef.current) {
                  dynamicFormRef.current.reset()
                }
                fetchCVUData({ skipCache: true })
              }}
            />
          </div>
          <div className='modal-backdrop' onClick={() => setFormModalOpen(false)} />
        </div>
      )}
    </div>
  )
}
