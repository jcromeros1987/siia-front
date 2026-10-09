import { formatFieldLabel } from '@/utils/formatFieldLabel'

const isHiddenKey = (key) => String(key).toLowerCase() === 'id'

const isEmptyValue = (value) => (
  value === null ||
  value === undefined ||
  value === ''
)

const isRecord = (value) => (
  value !== null &&
  typeof value === 'object' &&
  !Array.isArray(value)
)

const formatScalar = (value) => {
  if (typeof value === 'boolean') {
    return value ? 'Sí' : 'No'
  }

  if (typeof value === 'string') {
    const date = value.match(/^(\d{4})-(\d{2})-(\d{2})/)

    if (date) {
      return `${date[3]}/${date[2]}/${date[1]}`
    }
  }

  return String(value)
}

const catalogText = (value) => {
  if (!isRecord(value)) {
    return null
  }

  const visibleEntries = Object.entries(value).filter(
    ([key, item]) => !isHiddenKey(key) && !isEmptyValue(item)
  )

  const simpleKeys = ['nombre', 'clave', 'version', 'descripcion', 'label', 'name']
  const nombre = value.nombre ?? value.label ?? value.name

  if (
    !isEmptyValue(nombre) &&
    visibleEntries.every(([key]) => simpleKeys.includes(key))
  ) {
    return formatScalar(nombre)
  }

  if (visibleEntries.length === 0 && !isEmptyValue(value.id)) {
    return formatScalar(value.id)
  }

  return null
}

const FieldValue = ({ value }) => {
  const text = formatScalar(value)
  const isLong = typeof value === 'string' && value.length > 80

  return (
    <p className={`mt-1 font-semibold text-slate-800 ${isLong ? 'text-sm leading-6' : 'text-sm'}`}>
      {text}
    </p>
  )
}

const RecursiveDisplay = ({ data, spec = {} }) => {
  if (isEmptyValue(data)) {
    return <span className='text-sm text-slate-400'>Sin información</span>
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return <span className='text-sm text-slate-400'>Sin información</span>
    }

    const objects = data.every((item) => isRecord(item))

    if (!objects) {
      return (
        <div className='flex flex-wrap gap-2'>
          {data.filter((item) => !isEmptyValue(item)).map((item, index) => (
            <span
              key={index}
              className='rounded-full bg-[#F1F5FA] px-3 py-1 text-sm font-medium text-[#002B7A]'
            >
              {formatScalar(item)}
            </span>
          ))}
        </div>
      )
    }

    return (
      <div className='space-y-3'>
        {data.map((item, index) => (
          <div
            key={index}
            className='rounded-xl border border-[#D1DCEB] bg-white p-4'
          >
            <RecursiveDisplay data={item} spec={spec} />
          </div>
        ))}
      </div>
    )
  }

  if (!isRecord(data)) {
    return <FieldValue value={data} />
  }

  const summarized = catalogText(data)

  if (summarized !== null && Object.keys(spec).length === 0) {
    return <FieldValue value={summarized} />
  }

  const keys = Object.keys(data)
    .filter((key) => !isHiddenKey(key) && !isEmptyValue(data[key]))
    .sort((a, b) => {
      const orderA = spec?.[a]?.order ?? 9999
      const orderB = spec?.[b]?.order ?? 9999
      return orderA - orderB
    })

  if (keys.length === 0) {
    if (!isEmptyValue(data.id)) {
      return <FieldValue value={data.id} />
    }

    return <span className='text-sm text-slate-400'>Sin información</span>
  }

  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
      {keys.map((key) => {
        const value = data[key]
        const label = formatFieldLabel(
          key,
          typeof spec?.[key]?.label === 'string' ? spec[key].label : ''
        )
        const childSpec = spec?.[key] && typeof spec[key] === 'object'
          ? spec[key]
          : {}
        const summary = catalogText(value)
        const nested = summary === null && (isRecord(value) || Array.isArray(value))
        const wide = nested || (typeof value === 'string' && value.length > 80)

        return (
          <div
            key={key}
            className={`rounded-xl border border-[#D1DCEB] px-4 py-3 ${
              wide
                ? 'bg-white sm:col-span-2'
                : 'bg-[#F7F9FC]'
            }`}
          >
            <p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
              {label}
            </p>

            <div className={nested ? 'mt-3' : ''}>
              {summary !== null
                ? <FieldValue value={summary} />
                : nested
                  ? <RecursiveDisplay data={value} spec={childSpec} />
                  : <FieldValue value={value} />}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RecursiveDisplay
