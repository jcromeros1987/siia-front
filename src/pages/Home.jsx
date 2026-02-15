import { useEffect, useState } from 'react'
import { useToken } from '@/hooks/useToken'
import { fetchCVU } from '@/repository/cvuRepository'
import RecursiveDisplay from '@/components/RecursiveDisplay'

const Home = () => {
  const { token, userId } = useToken()

  const [cvuData, setCvuData] = useState({})
  const [selectedList, setSelectedList] = useState(null)
  const [currentTab, setCurrentTab] = useState(null)
  const [selectedIsFormFile, setSelectedIsFormFile] = useState(true)
  const [expandedProductId, setExpandedProductId] = useState(null)

  useEffect(() => {
    fetchCVU({ token, userId })
      .then((response) => {
        console.log('CVU data fetched:', response.data)
        const data = response.data.data || {}
        setCvuData(data)

        const keys = Object.keys(data)
        const newTab = !currentTab || !keys.includes(currentTab) ? keys[0] : currentTab
        setCurrentTab(newTab)
        setSelectedList(data[newTab]?.productos || [])
        setExpandedProductId(null)
      })
      .catch((error) => console.error('Error fetching CVU data:', error))
  }, [token, userId])

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

  return (
    <>
      <div className='row mt-3'>
        {/* Tab content CVU */}
        <div className='col-md-3 mb-3 cl-bx'>
          <h6>Contenido</h6>
          <ul id='bx-pill' className='nav nav-pills flex-column bx-pill-v' role='tablist'>
            {Object.entries(cvuData).map(([key, list]) => (
              <li className='nav-item' key={key}>
                <a
                  className={`nav-link nav-link-p ${currentTab === key ? 'active' : ''}`}
                  href='#'
                  onClick={(e) => {
                    e.preventDefault()
                    changeTab(key)
                  }}
                >
                  {list.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className='col-md-9'>
          <div className='col-md-12'>
            <h4>
              Detalle de contenido
              <div>
                <button
                  type='button'
                  className='btn btnAct-add me-2'
                  title='Mostrar formulario'
                >
                  Mostrar formulario
                </button>
                {!selectedIsFormFile && (
                  <button
                    type='button'
                    className='btn btnAct-edit'
                    title='Mostrar formulario'
                  >
                    <i className='fa fa-pencil' aria-hidden='true' />
                  </button>
                )}
              </div>
            </h4>

            {/* Collapse items */}
            {selectedList && selectedList.length > 0
              ? selectedList.map((producto) => (
                <div key={producto.id}>
                  <p>
                    <a
                      href='#'
                      onClick={(e) => {
                        e.preventDefault()
                        toggleCollapse(producto.id)
                      }}
                    >
                      {producto.id}
                    </a>
                  </p>
                  <div
                    id={'collapse' + producto.id}
                    className={`collapse ${expandedProductId === producto.id ? 'show' : ''}`}
                  >
                    <div>
                      <div>
                        {expandedProductId === producto.id && (
                          <RecursiveDisplay data={getProductoData(producto)} spec={getCurrentSpec()} />
                        )}
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
              : (
                <p>No data available</p>
                )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
