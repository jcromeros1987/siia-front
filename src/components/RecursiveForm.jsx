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
    <div className='space-y-5'>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          {/* Final form fields - Checkbox */}
          {value && typeof value === 'object' && 'final' in value && value.final && value.type === 'checkbox' && (
            <div className='form-control'>
              <label className='label cursor-pointer gap-3 hover:bg-base-200 p-3 rounded-lg transition-colors'>
                <input
                  type='checkbox'
                  className='checkbox checkbox-primary'
                  checked={modelValue[key] || false}
                  onChange={(e) => updateValue(key, e.target.checked)}
                  required={value.required}
                  id={value.id}
                />
                <span className='label-text font-medium'>{value.label || key}</span>
                {value.required && <span className='text-error ml-auto text-sm'>*</span>}
              </label>
              {formValidated && value.required && !modelValue[key] && (
                <div className='text-error text-xs mt-2 px-3 py-1 bg-error/10 rounded-md'>
                  {value.invalid_feedback || 'Este campo es requerido.'}
                </div>
              )}
            </div>
          )}

          {/* Final form fields - Input */}
          {value && typeof value === 'object' && 'final' in value && value.final && value.type !== 'checkbox' && (
            <div className='form-control w-full'>
              <label className='label py-2' htmlFor={value.id}>
                <span className='label-text font-semibold text-base-content'>
                  {value.label || key}
                  {value.required && <span className='text-error ml-1'>*</span>}
                </span>
              </label>
              <input
                id={value.id}
                placeholder={value.label || key}
                type={value.type || 'text'}
                className='input input-bordered w-full focus:input-primary transition-colors'
                value={modelValue[key] || ''}
                onChange={(e) => updateValue(key, e.target.value)}
                required={value.required}
                maxLength={value.maxlength || undefined}
                pattern={value.pattern || undefined}
                disabled={value.disabled || false}
              />
              {formValidated && value.required && !modelValue[key] && (
                <div className='text-error text-xs mt-2 px-3 py-1 bg-error/10 rounded-md'>
                  {value.invalid_feedback || 'Este campo es requerido.'}
                </div>
              )}
            </div>
          )}

          {/* List field */}
          {value && typeof value === 'object' && value.list && (
            <div className='bg-base-100 p-4 rounded-lg border-l-4 border-primary space-y-4'>
              {key !== 'list' && (
                <div className='mb-4'>
                  <label className='label' htmlFor={value.id}>
                    <span className='label-text font-bold text-lg text-primary'>{value.label || key}</span>
                    <span className='text-xs text-base-content/60 bg-base-200 px-2 py-1 rounded'>
                      {(modelValue[key] || []).length} registro{(modelValue[key] || []).length !== 1 ? 's' : ''}
                    </span>
                  </label>
                </div>
              )}
              <div className='space-y-3'>
                {(modelValue[key] || []).map((item, index) => (
                  <div
                    key={index}
                    className='card bg-gradient-to-br from-base-200 to-base-100 border-l-4 border-secondary shadow-sm hover:shadow-md transition-shadow'
                  >
                    <div className='card-body relative p-4'>
                      <div className='absolute top-3 right-3 text-xs text-base-content/50 font-semibold'>
                        #{index + 1}
                      </div>
                      <button
                        type='button'
                        className='btn btn-error btn-sm btn-circle absolute top-2 right-12 hover:scale-110 transition-transform'
                        onClick={() => removeListItem(key, index)}
                        title='Eliminar este registro'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                        </svg>
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
                className='btn btn-outline btn-secondary w-full gap-2 hover:scale-105 transition-transform'
                onClick={() => addListItem(key)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='w-5 h-5 stroke-current'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                </svg>
                Agregar nuevo {key}
              </button>
            </div>
          )}

          {/* Nested object field */}
          {value && typeof value === 'object' && !value.list && !('final' in value) && (
            <div className='bg-base-100 p-4 rounded-lg border-l-4 border-accent space-y-4'>
              <label className='label' htmlFor={value.id}>
                <span className='label-text font-bold text-lg text-accent'>{value.label || key}</span>
              </label>
              <div className='bg-base-200/30 p-4 rounded-md'>
                <RecursiveForm
                  data={value}
                  modelValue={modelValue[key] || {}}
                  formValidated={formValidated}
                  onUpdate={(newValue) => updateNestedValue(key, newValue)}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default RecursiveForm
