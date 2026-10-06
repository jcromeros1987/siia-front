import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef
} from 'react'
import RecursiveForm from '@/components/RecursiveForm'
import { updateEntry, addEntry } from '@/services/cvuApi'
import { useApi } from '@/hooks/useApi'

/**
 * Error Boundary para capturar errores producidos
 * durante el renderizado del formulario dinámico.
 *
 * Su objetivo es evitar que un problema de estructura
 * en los datos de origen derribe toda la aplicación.
 */
class FormStructureErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      error: null,
      showPopup: false
    }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
      showPopup: true
    }
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      '[CVU] Error al cargar el formulario de edición:',
      error
    )

    console.error(
      '[CVU] Información del componente:',
      errorInfo
    )
  }

  handleClose = () => {
    this.setState({
      showPopup: false
    })
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <>
        {/* Mensaje de respaldo */}
        <div className='rounded-lg border border-[#E5B94C] bg-[#FFF8E6] p-4'>
          <div className='flex items-start gap-3'>
            <div className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#FFF0C2] text-[#9A6700]'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z'
                />
              </svg>
            </div>

            <div>
              <p className='font-semibold text-[#6B4E00]'>
                Registro no disponible para edición
              </p>

              <p className='mt-1 text-sm text-[#6B7280]'>
                La estructura de los datos de origen no coincide
                con la estructura esperada por el formulario.
              </p>
            </div>
          </div>
        </div>

        {/* Popup */}
        {this.state.showPopup && (
          <div
            className='fixed inset-0 z-[9999] flex items-center justify-center bg-[#000000]/50 p-4'
            role='presentation'
          >
            <div
              className='w-full max-w-md overflow-hidden rounded-xl border border-[#D9E2EC] bg-white shadow-2xl'
              role='alertdialog'
              aria-modal='true'
              aria-labelledby='form-structure-error-title'
            >
              {/* Encabezado */}
              <div className='border-b border-[#E5E7EB] bg-white px-6 py-5'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#FFF4D6] text-[#9A6700]'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z'
                      />
                    </svg>
                  </div>

                  <h3
                    id='form-structure-error-title'
                    className='text-lg font-bold text-[#002B7A]'
                  >
                    No es posible modificar este registro
                  </h3>
                </div>
              </div>

              {/* Contenido */}
              <div className='px-6 py-6'>
                <p className='text-sm leading-6 text-[#374151]'>
                  La estructura de los datos de origen no coincide
                  con la estructura esperada por el formulario de
                  edición.
                </p>

                <div className='mt-4 rounded-lg border border-[#D9E2EC] bg-[#F5F7FB] p-4'>
                  <p className='text-sm font-semibold text-[#1F2937]'>
                    El registro no ha sido modificado.
                  </p>

                  <p className='mt-2 text-sm leading-6 text-[#6B7280]'>
                    Se requiere revisar y corregir la estructura
                    de los datos de origen antes de poder editar
                    este registro.
                  </p>
                </div>
              </div>

              {/* Acción */}
              <div className='flex justify-end border-t border-[#E5E7EB] bg-[#FAFBFC] px-6 py-4'>
                <button
                  type='button'
                  className='rounded-lg bg-[#002B7A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#001F5B] focus:outline-none focus:ring-2 focus:ring-[#002B7A]/30'
                  onClick={this.handleClose}
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
}

const DynamicForm = forwardRef(
  (
    {
      initialData = null,
      initialSpecification = null,
      onSuccess = null
    },
    ref
  ) => {
    const formRef = useRef(null)
    const api = useApi()

    const [cvuFormData, setCvuFormData] = useState(
      initialData?.data || {}
    )

    const [formSpecification, setFormSpecification] =
      useState(initialSpecification)

    const [productType, setProductType] = useState(
      initialData?.product_type || ''
    )

    const [isEdit, setIsEdit] = useState(
      initialData?.isEdit || false
    )

    const [idEntry, setIdEntry] = useState(
      initialData?.id || null
    )

    const [formValidated, setFormValidated] = useState(false)

    const [submitLoading, setSubmitLoading] = useState(false)

    const [submitError, setSubmitError] = useState(null)

    /**
     * Mantiene la compatibilidad con los componentes
     * que utilizan DynamicForm mediante ref.
     */
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

    /**
     * Envía el formulario para crear o actualizar
     * un registro CVU.
     */
    const submitForm = async () => {
      setFormValidated(true)

      if (!formRef.current?.checkValidity()) {
        setSubmitError(
          'Por favor, complete todos los campos requeridos correctamente.'
        )

        return Promise.reject(
          new Error('Form validation failed')
        )
      }

      setSubmitLoading(true)
      setSubmitError(null)

      try {
        const data = {
          tipo: productType,
          data: cvuFormData
        }

        const repoMethod = isEdit
          ? updateEntry
          : addEntry

        if (isEdit) {
          data.id = idEntry
        }

        repoMethod({
          api,
          entryData: data
        })
          .then((res) => {
            onSuccess && onSuccess(res)
          })
          .catch((err) => {
            setSubmitError(
              err.message ||
              'Error al enviar el formulario'
            )
          })
          .finally(() => {
            setSubmitLoading(false)
          })
      } catch (error) {
        setSubmitError(
          error.message ||
          'Error al enviar el formulario'
        )

        throw error
      } finally {
        setSubmitLoading(false)
      }
    }

    /**
     * Reinicia el formulario.
     */
    const reset = () => {
      setCvuFormData({})
      setFormSpecification(null)
      setFormValidated(false)
      setSubmitError(null)
    }

    /**
     * Limpia los datos capturados.
     */
    const cleanData = () => {
      setCvuFormData({})
    }

    return (
      <div className='space-y-6 bg-white p-6 text-[#1F2937]'>

        {/* Aviso informativo */}
        <div className='flex items-start gap-3 rounded-xl border border-[#D9E2EC] bg-[#F5F7FB] p-4 shadow-sm'>
          <div className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#E8EEF8] text-[#002B7A]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>

          <div className='flex flex-col gap-1'>
            <h3 className='text-base font-bold text-[#002B7A]'>
              Atención importante
            </h3>

            <p className='text-sm leading-relaxed text-[#4B5563]'>
              Utilice este formulario únicamente si no se
              encuentra registrado en SECIHTI o si no puede
              obtener su CVU. En caso contrario, por favor
              actualice su CVU en el portal de SECIHTI,
              descargue el CVU actualizado y cárguelo con
              el botón "CVU" de la parte superior.
            </p>
          </div>
        </div>

        {/* Error de envío */}
        {submitError && (
          <div className='flex items-start gap-3 rounded-xl border border-[#E8B4B4] bg-[#FFF5F5] p-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 flex-shrink-0 text-[#B42318]'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>

            <div>
              <h3 className='font-semibold text-[#991B1B]'>
                Error al enviar
              </h3>

              <span className='text-sm text-[#7F1D1D]'>
                {submitError}
              </span>
            </div>
          </div>
        )}

        {/* Formulario */}
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault()
            submitForm()
          }}
          className='space-y-6 rounded-xl border border-[#D9E2EC] bg-white p-6 shadow-sm'
          noValidate
        >
          {formSpecification
            ? (
              <>
                <div>
                  <h2 className='mb-6 border-b border-[#E5E7EB] pb-4 text-2xl font-bold text-[#002B7A]'>
                    {isEdit
                      ? 'Editar registro'
                      : 'Crear nuevo registro'}
                  </h2>

                  {/* 
                    Si RecursiveForm encuentra una estructura
                    incompatible, el Error Boundary captura
                    el error y muestra el popup.
                  */}
                  <FormStructureErrorBoundary>
                    <RecursiveForm
                      data={formSpecification}
                      modelValue={cvuFormData}
                      formValidated={formValidated}
                      onUpdate={setCvuFormData}
                    />
                  </FormStructureErrorBoundary>
                </div>
              </>
              )
            : (
              <div className='py-8 text-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='mx-auto mb-4 h-12 w-12 text-[#CBD5E1]'
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

                <p className='text-[#6B7280]'>
                  Cargando formulario...
                </p>
              </div>
              )}

          {/* Botones */}
          {formSpecification && (
            <div className='flex gap-3 border-t border-[#E5E7EB] pt-4'>
              <button
                type='submit'
                className='flex-1 rounded-lg bg-[#002B7A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#001F5B] disabled:cursor-not-allowed disabled:opacity-60'
                disabled={submitLoading}
              >
                {submitLoading
                  ? (
                    <span className='flex items-center justify-center gap-2'>
                      <span className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                      Enviando...
                    </span>
                    )
                  : (
                    <span className='flex items-center justify-center gap-2'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M5 13l4 4L19 7'
                        />
                      </svg>

                      {isEdit
                        ? 'Actualizar'
                        : 'Crear'}
                    </span>
                    )}
              </button>

              <button
                type='button'
                className='rounded-lg border border-[#CBD5E1] bg-white px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[#F5F7FB] disabled:cursor-not-allowed disabled:opacity-60'
                onClick={cleanData}
                disabled={submitLoading}
              >
                <span className='flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                    />
                  </svg>

                  Limpiar
                </span>
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