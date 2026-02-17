import { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import RecursiveForm from '@/components/RecursiveForm'

const DynamicForm = forwardRef(
  ({ initialData = null, initialSpecification = null, onSuccess = null }, ref) => {
    const formRef = useRef(null)
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
        return Promise.reject(new Error('Form validation failed'))
      }

      setSubmitLoading(true)
      setSubmitError(null)

      try {
        const data = {
          tipo: productType,
          data: cvuFormData
        }

        let response
        if (isEdit) {
          data.id = idEntry
          //response = await axiosInstance.patch('cvu/update-entry/', data)
        } else {
          // response = await axiosInstance.post('cvu/create-entry/', data)
        }

        if (onSuccess) {
          onSuccess(response)
        }

        return response
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

    return (
      <div className='space-y-4'>
        <div className='alert alert-warning shadow-lg'>
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
              d='M12 9v2m0 4v2m0 4v2m0-14H7a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-3.5'
            />
          </svg>
          <div>
            <h3 className='font-bold'>Atención</h3>
            <div className='text-sm'>
              Utilice este formulario únicamente si no se encuentra registrado en SECIHTI o si no puede obtener su CVU.
              En caso contrario, por favor actualice su CVU en el portal de SECIHTI, descargue el CVU actualizado y
              cárguelo con el botón "CVU" de la parte superior.
            </div>
          </div>
        </div>

        {submitError && (
          <div className='alert alert-error shadow-lg'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 flex-shrink-0 stroke-current'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2' />
            </svg>
            <span>{submitError}</span>
          </div>
        )}

        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault()
            submitForm()
          }}
          className='space-y-4'
          noValidate
        >
          {formSpecification && (
            <RecursiveForm
              data={formSpecification}
              modelValue={cvuFormData}
              formValidated={formValidated}
              onUpdate={setCvuFormData}
            />
          )}

          <div className='flex gap-2'>
            <button type='submit' className='btn btn-primary' disabled={submitLoading}>
              {submitLoading && <span className='loading loading-spinner loading-sm'></span>}
              {isEdit ? 'Actualizar' : 'Crear'}
            </button>
            <button
              type='button'
              className='btn btn-ghost'
              onClick={reset}
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>
    )
  }
)

DynamicForm.displayName = 'DynamicForm'

export default DynamicForm
