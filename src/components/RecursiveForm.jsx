const RecursiveForm = ({
  data,
  modelValue = {},
  formValidated = false,
  onUpdate
}) => {
  const addListItem = (key) => {
    const list = modelValue[key] ? [...modelValue[key]] : []
    list.push({})
    onUpdate({ ...modelValue, [key]: list })
  }

  const removeListItem = (key, index) => {
    const list = [...modelValue[key]]
    list.splice(index, 1)
    onUpdate({ ...modelValue, [key]: list })
  }

  const updateListItem = (key, index, newItem) => {
    const list = [...modelValue[key]]
    list[index] = newItem
    onUpdate({ ...modelValue, [key]: list })
  }

  const updateValue = (key, value) => {
    onUpdate({ ...modelValue, [key]: value })
  }

  const updateNestedValue = (key, newValue) => {
    onUpdate({ ...modelValue, [key]: newValue })
  }

  return (
    <div className='space-y-4 ml-3 border-l-2 border-base-300 pl-3'>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className='mb-3'>
          {/* Final form fields - Checkbox */}
          {value && typeof value === 'object' && 'final' in value && value.final && value.type === 'checkbox' && (
            <div className='form-control'>
              <label className='label cursor-pointer gap-3'>
                <input
                  type='checkbox'
                  className='checkbox checkbox-primary'
                  checked={modelValue[key] || false}
                  onChange={(e) => updateValue(key, e.target.checked)}
                  required={value.required}
                  id={value.id}
                />
                <span className='label-text'>{value.label || key}</span>
              </label>
              {formValidated && value.required && !modelValue[key] && (
                <div className='text-error text-sm mt-1'>{value.invalid_feedback || 'Este campo es requerido.'}</div>
              )}
            </div>
          )}

          {/* Final form fields - Input */}
          {value && typeof value === 'object' && 'final' in value && value.final && value.type !== 'checkbox' && (
            <div className='form-control w-full'>
              <label className='label' htmlFor={value.id}>
                <span className='label-text'>{value.label || key}</span>
              </label>
              <input
                id={value.id}
                placeholder={value.label || key}
                type={value.type || 'text'}
                className='input input-bordered w-full'
                value={modelValue[key] || ''}
                onChange={(e) => updateValue(key, e.target.value)}
                required={value.required}
                maxLength={value.maxlength || undefined}
                pattern={value.pattern || undefined}
                disabled={value.disabled || false}
              />
              {formValidated && value.required && !modelValue[key] && (
                <div className='text-error text-sm mt-1'>{value.invalid_feedback || 'Este campo es requerido.'}</div>
              )}
            </div>
          )}

          {/* List field */}
          {value && typeof value === 'object' && value.list && (
            <div className='ml-3 border-l-2 border-primary pl-3'>
              {key !== 'list' && (
                <label className='label' htmlFor={value.id}>
                  <span className='label-text font-semibold'>{value.label || key}:</span>
                </label>
              )}
              <div className='space-y-3'>
                {(modelValue[key] || []).map((item, index) => (
                  <div key={index} className='card bg-base-200 border border-base-300'>
                    <div className='card-body relative p-3'>
                      <button
                        type='button'
                        className='btn btn-ghost btn-sm btn-circle absolute top-2 right-2'
                        onClick={() => removeListItem(key, index)}
                        title='Eliminar'
                      >
                        ✕
                      </button>
                      <RecursiveForm
                        data={value}
                        modelValue={item}
                        formValidated={formValidated}
                        onUpdate={(newItem) => updateListItem(key, index, newItem)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                type='button'
                className='btn btn-outline btn-sm btn-primary mt-3'
                onClick={() => addListItem(key)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='w-4 h-4 stroke-current'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                </svg>
                Agregar {key}
              </button>
            </div>
          )}

          {/* Nested object field */}
          {value && typeof value === 'object' && !value.list && !('final' in value) && (
            <div className='ml-3 border-l-2 border-primary pl-3'>
              <label className='label' htmlFor={value.id}>
                <span className='label-text font-semibold'>{value.label || key}:</span>
              </label>
              <RecursiveForm
                data={value}
                modelValue={modelValue[key] || {}}
                formValidated={formValidated}
                onUpdate={(newValue) => updateNestedValue(key, newValue)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default RecursiveForm
