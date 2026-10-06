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
              <label className='flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-[#F1F5FA]'>
                <input
                  type='checkbox'
                  className='checkbox border-[#002B7A] [--chk:#002B7A]'
                  checked={modelValue[key] || false}
                  onChange={(e) => updateValue(key, e.target.checked)}
                  required={value.required}
                  id={value.id}
                />
                <span className='font-medium text-slate-700'>{value.label || key}</span>
                {value.required && <span className='ml-auto text-sm text-red-600'>*</span>}
              </label>

              {formValidated && value.required && !modelValue[key] && (
                <div className='mt-2 rounded-md bg-red-50 px-3 py-1 text-xs text-red-600'>
                  {value.invalid_feedback || 'Este campo es requerido.'}
                </div>
              )}
            </div>
          )}

          {/* Final form fields - Input */}
          {value && typeof value === 'object' && 'final' in value && value.final && value.type !== 'checkbox' && (
            <div className='form-control w-full'>
              <label className='mb-1 block' htmlFor={value.id}>
                <span className='font-semibold text-slate-700'>
                  {value.label || key}
                  {value.required && <span className='ml-1 text-red-600'>*</span>}
                </span>
              </label>

              <input
                id={value.id}
                placeholder={value.label || key}
                type={value.type || 'text'}
                className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#002B7A] focus:ring-2 focus:ring-[#002B7A]/15 disabled:cursor-not-allowed disabled:bg-slate-100'
                value={modelValue[key] || ''}
                onChange={(e) => updateValue(key, e.target.value)}
                required={value.required}
                maxLength={value.maxlength || undefined}
                pattern={value.pattern || undefined}
                disabled={value.disabled || false}
              />

              {formValidated && value.required && !modelValue[key] && (
                <div className='mt-2 rounded-md bg-red-50 px-3 py-1 text-xs text-red-600'>
                  {value.invalid_feedback || 'Este campo es requerido.'}
                </div>
              )}
            </div>
          )}

          {/* List field */}
          {value && typeof value === 'object' && value.list && (
            <div className='space-y-4 rounded-xl border border-[#D1DCEB] bg-[#F7F9FC] p-4'>
              {key !== 'list' && (
                <div className='mb-4'>
                  <label className='block' htmlFor={value.id}>
                    <div className='flex items-center justify-between gap-3'>
                      <span className='text-lg font-bold text-[#002B7A]'>{value.label || key}</span>
                      <span className='rounded bg-[#F1F5FA] px-2 py-1 text-xs text-slate-600'>
                        {(modelValue[key] || []).length} registro{(modelValue[key] || []).length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </label>
                </div>
              )}

              <div className='space-y-3'>
                {(modelValue[key] || []).map((item, index) => (
                  <div
                    key={index}
                    className='rounded-xl border border-[#D1DCEB] bg-white shadow-sm transition-shadow hover:shadow-md'
                  >
                    <div className='relative p-4'>
                      <div className='absolute right-3 top-3 text-xs font-semibold text-slate-400'>
                        #{index + 1}
                      </div>

                      <button
                        type='button'
                        className='absolute right-12 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-200 bg-white text-red-600 transition-colors hover:bg-red-50'
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
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 01-1-1h-4a1 1 0 01-1 1v3M4 7h16' />
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
                className='inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#002B7A] bg-white px-4 py-2.5 text-sm font-semibold text-[#002B7A] transition-colors hover:bg-[#F1F5FA] focus:outline-none focus:ring-2 focus:ring-[#002B7A]/20'
                onClick={() => addListItem(key)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='h-5 w-5 stroke-current'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                </svg>
                Agregar nuevo {key}
              </button>
            </div>
          )}

          {/* Nested object field */}
          {value && typeof value === 'object' && !value.list && !('final' in value) && (
            <div className='space-y-4 rounded-xl border border-[#D1DCEB] bg-[#F7F9FC] p-4'>
              <label className='block' htmlFor={value.id}>
                <span className='text-lg font-bold text-[#002B7A]'>{value.label || key}</span>
              </label>

              <div className='rounded-lg border border-[#E6E6F2] bg-white p-4'>
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
