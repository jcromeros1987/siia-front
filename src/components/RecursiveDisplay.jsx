const getDisplayValue = (value) => {
  if (value === null || value === undefined) return 'N/A'

  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  if (typeof value === 'boolean') return value ? 'Sí' : 'No'

  if (Array.isArray(value)) {
    return value
      .map((item) => getDisplayValue(item))
      .filter((item) => item !== 'N/A' && item !== '')
      .join(', ')
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

    return Object.entries(value)
      .map(([key, item]) => {
        const display = getDisplayValue(item)
        return display === 'N/A' || display === ''
          ? ''
          : `${key}: ${display}`
      })
      .filter(Boolean)
      .join(' | ')
  }

  return String(value)
}

const RecursiveDisplay = ({ data, spec = {} }) => {
  const isList = Array.isArray(data)

  if (data === null || data === undefined) {
    return <span className='text-slate-400'>N/A</span>
  }

  if (typeof data !== 'object' && !isList) {
    return <span className='font-bold text-black'>{getDisplayValue(data)}</span>
  }

  const getSortedKeys = () => {
    if (isList) return []

    const keys = Object.keys(data)
    if (!spec || Object.keys(spec).length === 0) {
      return keys
    }

    return keys.sort((a, b) => {
      const orderA = spec[a]?.order ?? 9999
      const orderB = spec[b]?.order ?? 9999
      return orderA - orderB
    })
  }

  const getLabel = (key) => {
    if (spec && spec[key] && spec[key].label) {
      return getDisplayValue(spec[key].label)
    }
    return key
  }

  const getChildSpec = (key) => {
    if (spec && spec[key]) {
      return spec[key]
    }
    return {}
  }

  const sortedKeys = getSortedKeys()

  if (isList) {
    // If it's a list with 'list' spec, render as simple list
    if ('list' in spec && spec.list) {
      return (
        <ul className='space-y-2'>
          {data.map((item, index) => (
            <li key={index} className='list-disc list-inside text-black'>
              {item != null && typeof item === 'object'
                ? (
                  <div className='ml-6 mt-2 pl-4 border-l-2 border-[#002B7A]'>
                    <RecursiveDisplay data={item} spec={spec} />
                  </div>
                  )
                : (
                  <span className='font-bold text-black'>{getDisplayValue(item)}</span>
                  )}
            </li>
          ))}
        </ul>
      )
    }

    // Otherwise render as responsive table
    return (
      <div className='overflow-x-auto'>
        <table className='table table-sm w-full border border-[#D1DCEB]'>
          {data.length > 0 && (
            <thead className='bg-[#F1F5FA]'>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className='text-black font-semibold text-sm'>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className='hover:bg-[#F7F9FC]'>
                {Object.entries(item).map(([key, value]) => (
                  <td key={key} className='text-sm text-black'>
                    {typeof value === 'object'
                      ? (
                        <RecursiveDisplay data={item[key]} spec={spec} />
                        )
                      : (
                        <span className='font-bold text-black'>{getDisplayValue(value)}</span>
                        )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // For objects
  return (
    <ul className='space-y-2'>
      {sortedKeys.map((key) => (
        <li key={key} className='text-black'>
          <div className='flex flex-col gap-1'>
            <span className='font-semibold text-[#002B7A] text-sm'>{getLabel(key)}:</span>
            {data[key] != null && typeof data[key] === 'object'
              ? (
                <div className='ml-4 pl-4 border-l-2 border-[#002B7A]'>
                  {!Array.isArray(data[key]) &&
                  'list' in getChildSpec(key) &&
                  !getChildSpec(key).list
                    ? (
                      <div className='overflow-x-auto'>
                        <table className='table table-sm w-full border border-[#D1DCEB]'>
                          <thead className='bg-[#F1F5FA]'>
                            <tr>
                              {Object.keys(data[key]).map((k) => (
                                <th key={k} className='text-black font-semibold text-sm'>
                                  {getLabel(k)}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr className='hover:bg-[#F7F9FC]'>
                              {Object.entries(data[key]).map(([k, value]) => (
                                <td key={k} className='text-sm text-black'>
                                  <span className='font-bold text-black'>{getDisplayValue(value)}</span>
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      )
                    : (
                      <RecursiveDisplay data={data[key]} spec={getChildSpec(key)} />
                      )}
                </div>
                )
              : (
                <span className='font-bold text-black ml-4'>
                  {getDisplayValue(data[key])}
                </span>
                )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default RecursiveDisplay
