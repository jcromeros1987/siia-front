export const CVUSidebar = ({ cvuData, currentTab, changeTab, setSidebarOpen }) => {
  const safeData = cvuData || {}

  return (
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
                {list.productos && (
                  <span className='badge badge-secondary ml-auto mr-2 rounded-full font-bold'>{list.productos.length}</span>
                )}
                {list.nombre}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
