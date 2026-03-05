import { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import RecursiveForm from '@/components/RecursiveForm'
import { updateEntry, addEntry } from '@/services/cvuApi'
import { useApi } from '@/hooks/useApi'

const DynamicForm = forwardRef(
  ({ initialData = null, initialSpecification = null, onSuccess = null }, ref) => {
    const formRef = useRef(null)
    const api = useApi()
    const [cvuFormData, setCvuFormData] = useState(initialData?.data || {})
    const [formSpecification, setFormSpecification] = useState(initialSpecification)
    const [productType, setProductType] = useState(initialData?.product_type || '')
    const [isEdit, setIsEdit] = useState(initialData?.isEdit || false)
    const [idEntry, setIdEntry] = useState(initialData?.id || null)
    const [formValidated, setFormValidated] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [submitError, setSubmitError] = useState(null)

    // Backwards compatibility: expose load function via ref
    useImperativeHandle(ref, () => ({
      load: ({ formData, formSpecification: spec }) => {
        console.log(formData)
        setCvuFormData(formData.data || {})
        setProductType(formData.product_type || '')
        setIsEdit(formData.isEdit || false)
        setIdEntry(formData.id || null)
        setFormSpecification(spec)
      },
      submitForm,
      reset
    }))

    const submitForm = async () => {
      setFormValidated(true)
      if (!formRef.current?.checkValidity()) {
        setSubmitError('Por favor, complete todos los campos requeridos correctamente.')
        return Promise.reject(new Error('Form validation failed'))
      }

      setSubmitLoading(true)
      setSubmitError(null)

      try {
        const data = {
          tipo: productType,
          data: cvuFormData
        }

        const repoMethod = isEdit ? updateEntry : addEntry
        if (isEdit) {
          data.id = idEntry
        }

        repoMethod({ api, entryData: data })
          .then((res) => {
            onSuccess && onSuccess(res)
          })
          .catch((err) => {
            setSubmitError(err.message || 'Error al enviar el formulario')
          })
          .finally(() => {
            setSubmitLoading(false)
          })
      } catch (error) {
        setSubmitError(error.message || 'Error al enviar el formulario')
        throw error
      } finally {
        setSubmitLoading(false)
      }
    }

    const reset = () => {
      setCvuFormData({})
      setFormSpecification(null)
      setFormValidated(false)
      setSubmitError(null)
    }

    const cleanData = () => {
      setCvuFormData({})
    }

    return (
      <div className='space-y-6 p-6'>
        {/* Warning Alert */}
        <div className='alert alert-warning shadow-md border border-warning/20'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 flex-shrink-0 stroke-current'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <div className='flex flex-col gap-1'>
            <h3 className='font-bold text-lg'>Atención importante</h3>
            <p className='text-sm leading-relaxed'>
              Utilice este formulario únicamente si no se encuentra registrado en SECIHTI o si no puede obtener su CVU.
              En caso contrario, por favor actualice su CVU en el portal de SECIHTI, descargue el CVU actualizado y
              cárguelo con el botón "CVU" de la parte superior.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {submitError && (
          <div className='alert alert-error shadow-md border border-error/20 animate-pulse'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 flex-shrink-0 stroke-current'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <div>
              <h3 className='font-semibold'>Error al enviar</h3>
              <span className='text-sm'>{submitError}</span>
            </div>
          </div>
        )}

        {/* Form Card */}
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault()
            submitForm()
          }}
          className='space-y-6 bg-base-100 p-6 rounded-lg border border-base-200 shadow-sm'
          noValidate
        >
          {formSpecification
            ? (
              <>
                <div>
                  <h2 className='text-2xl font-bold text-primary mb-6'>
                    {isEdit ? 'Editar registro' : 'Crear nuevo registro'}
                  </h2>
                  <RecursiveForm
                    data={formSpecification}
                    modelValue={cvuFormData}
                    formValidated={formValidated}
                    onUpdate={setCvuFormData}
                  />
                </div>
              </>
              )
            : (
              <div className='py-8 text-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-12 w-12 mx-auto text-base-300 mb-4'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
                <p className='text-base-content/60'>Cargando formulario...</p>
              </div>
              )}

          {/* Action Buttons */}
          {formSpecification && (
            <div className='flex gap-3 pt-4 border-t border-base-200'>
              <button
                type='submit'
                className='btn btn-primary flex-1 gap-2'
                disabled={submitLoading}
              >
                {submitLoading
                  ? (
                    <>
                      <span className='loading loading-spinner loading-sm' />
                      Enviando...
                    </>
                    )
                  : (
                    <>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                      </svg>
                      {isEdit ? 'Actualizar' : 'Crear'}
                    </>
                    )}
              </button>
              <button
                type='button'
                className='btn btn-outline btn-ghost'
                onClick={cleanData}
                disabled={submitLoading}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                </svg>
                Limpiar
              </button>
            </div>
          )}
        </form>
      </div>
    )
  }
)

DynamicForm.displayName = 'DynamicForm'

export default DynamicForm
