const RecursiveDisplay = ({ data, spec = {} }) => {
  const isList = Array.isArray(data)

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
      return spec[key].label
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
            <li key={index} className='list-disc list-inside text-base-content'>
              {item != null && typeof item === 'object'
                ? (
                  <div className='ml-6 mt-2 pl-4 border-l-2 border-primary'>
                    <RecursiveDisplay data={item} spec={spec} />
                  </div>
                  )
                : (
                  <span>{typeof item === 'boolean' ? item.toString() : item}</span>
                  )}
            </li>
          ))}
        </ul>
      )
    }

    // Otherwise render as responsive table
    return (
      <div className='overflow-x-auto'>
        <table className='table table-sm table-zebra w-full border border-base-300'>
          {data.length > 0 && (
            <thead className='bg-base-200'>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className='text-base-content font-semibold text-sm'>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className='hover:bg-base-100'>
                {Object.entries(item).map(([key, value]) => (
                  <td key={key} className='text-sm text-base-content'>
                    {typeof value === 'object'
                      ? (
                        <RecursiveDisplay data={item[key]} spec={spec} />
                        )
                      : (
                        <span>{typeof value === 'boolean' ? value.toString() : value}</span>
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
        <li key={key} className='text-base-content'>
          <div className='flex flex-col gap-1'>
            <span className='font-semibold text-primary text-sm'>{getLabel(key)}:</span>
            {data[key] != null && typeof data[key] === 'object'
              ? (
                <div className='ml-4 pl-4 border-l-2 border-primary'>
                  {!Array.isArray(data[key]) &&
                  'list' in getChildSpec(key) &&
                  !getChildSpec(key).list
                    ? (
                      <div className='overflow-x-auto'>
                        <table className='table table-sm table-zebra w-full border border-base-300'>
                          <thead className='bg-base-200'>
                            <tr>
                              {Object.keys(data[key]).map((k) => (
                                <th key={k} className='text-base-content font-semibold text-sm'>
                                  {getLabel(k)}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr className='hover:bg-base-100'>
                              {Object.entries(data[key]).map(([k, value]) => (
                                <td key={k} className='text-sm text-base-content'>
                                  <span>{typeof value === 'boolean' ? value.toString() : value}</span>
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
                <span className='text-base-content ml-4'>
                  {typeof data[key] === 'boolean' ? data[key].toString() : data[key]}
                </span>
                )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default RecursiveDisplay
