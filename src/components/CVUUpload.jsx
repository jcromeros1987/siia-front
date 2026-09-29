// ============================================================
// ARCHIVO:
// C:\Proyectos\SIIA\siia-front\src\components\CVUUpload.jsx
//
// DESCRIPCIÓN:
// Componente encargado de seleccionar y cargar un archivo JSON
// que contiene la información completa de un CVU.
//
// Además de realizar la carga del archivo, este componente
// controla la experiencia visual de progreso mediante:
//
//     CVULoadingProgress.jsx
//
// El progreso se divide en etapas visuales:
//
// 1. Validando archivo
// 2. Preparando carga
// 3. Cargando CVU
// 4. Procesando información
// 5. Organizando información
// 6. Actualizando perfil
// 7. Finalización
//
// IMPORTANTE:
// El progreso es visual y representa las diferentes etapas del
// flujo. El 100 % NO se establece hasta que:
//
//     uploadCVU()
//             +
//     onSuccess()
//             +
//     actualización del CVU
//
// hayan terminado correctamente.
//
// De esta forma evitamos mostrar "100 %" mientras el sistema
// todavía está actualizando la información.
//
// ============================================================


// ============================================================
// IMPORTACIONES
// ============================================================

// useState:
// Permite manejar los estados internos del componente.
//
// useRef:
// Permite conservar referencias al input de archivo y a los
// temporizadores del progreso.
//
// useEffect:
// Permite limpiar los temporizadores cuando el componente
// desaparece.
import {
  useEffect,
  useRef,
  useState
} from 'react'


// ============================================================
// SERVICIO DE CARGA
// ============================================================

// Servicio encargado de realizar la petición HTTP al backend.
import { uploadCVU } from '@/services/cvuApi'


// ============================================================
// COMPONENTE DE PROGRESO
// ============================================================

// Modal visual que muestra el porcentaje y las etapas de carga.
import CVULoadingProgress from '@/components/CVULoadingProgress'


// ============================================================
// AUTENTICACIÓN
// ============================================================

// Hook que proporciona información del usuario autenticado,
// incluyendo el userId que será enviado al backend.
import { useToken } from '@/hooks/useToken'


// ============================================================
// API
// ============================================================

// Hook que devuelve la instancia configurada de Axios.
import { useApi } from '@/hooks/useApi'


// ============================================================
// COMPONENTE CVUUpload
// ============================================================

const CVUUpload = ({
  // ----------------------------------------------------------
  // onSuccess
  //
  // Función opcional ejecutada cuando la carga del archivo
  // termina correctamente.
  //
  // IMPORTANTE:
  // Puede devolver una Promise.
  //
  // Esto permite que CVUInfo.jsx espere a que termine
  // fetchCVUData() antes de permitir que el progreso llegue
  // al 100 %.
  // ----------------------------------------------------------
  onSuccess = null,


  // ----------------------------------------------------------
  // onError
  //
  // Función opcional ejecutada cuando ocurre un error.
  // ----------------------------------------------------------
  onError = null
}) => {


  // ==========================================================
  // REFERENCIA AL INPUT DE ARCHIVO
  // ==========================================================

  const fileInputRef = useRef(null)


  // ==========================================================
  // REFERENCIA A LOS TEMPORIZADORES
  // ==========================================================
  //
  // Durante la carga utilizamos diferentes etapas visuales.
  //
  // Guardamos las referencias para poder cancelarlas si:
  //
  // - la petición termina antes;
  // - ocurre un error;
  // - el componente se desmonta.
  // ==========================================================

  const progressTimersRef = useRef([])


  // ==========================================================
  // ESTADO DE CARGA
  // ==========================================================

  const [isLoading, setIsLoading] = useState(false)


  // ==========================================================
  // ESTADO DEL ERROR
  // ==========================================================

  const [error, setError] = useState(null)


  // ==========================================================
  // PROGRESO
  // ==========================================================

  const [progress, setProgress] = useState(0)


  // ==========================================================
  // ETAPA ACTUAL
  // ==========================================================

  const [progressStage, setProgressStage] = useState(
    'validation'
  )


  // ==========================================================
  // MENSAJE ACTUAL
  // ==========================================================

  const [progressMessage, setProgressMessage] = useState(
    'Verificando el archivo CVU seleccionado.'
  )


  // ==========================================================
  // ESTADO DE ÉXITO
  // ==========================================================

  const [progressSuccess, setProgressSuccess] = useState(false)


  // ==========================================================
  // API
  // ==========================================================

  const api = useApi()


  // ==========================================================
  // USUARIO AUTENTICADO
  // ==========================================================

  const { userId } = useToken()


  // ==========================================================
  // LIMPIAR TEMPORIZADORES
  // ==========================================================
  //
  // Esta función cancela todos los temporizadores pendientes.
  // ==========================================================

  const clearProgressTimers = () => {

    progressTimersRef.current.forEach(
      (timerId) => clearTimeout(timerId)
    )

    progressTimersRef.current = []
  }


  // ==========================================================
  // LIMPIAR TEMPORIZADORES AL DESMONTAR
  // ==========================================================

  useEffect(() => {

    return () => {

      clearProgressTimers()

    }

  }, [])


  // ==========================================================
  // ACTUALIZAR PROGRESO
  // ==========================================================
  //
  // Centralizamos aquí la actualización visual para evitar
  // repetir setState en diferentes lugares.
  // ==========================================================

  const updateProgress = ({
    value,
    stage,
    message
  }) => {

    setProgress(
      Math.min(
        95,
        Math.max(
          0,
          Math.round(value)
        )
      )
    )

    setProgressStage(stage)

    setProgressMessage(message)

  }


  // ==========================================================
  // INICIAR PROGRESO VISUAL
  // ==========================================================
  //
  // El progreso no llega a 100 % mediante temporizadores.
  //
  // El máximo automático es 95 %.
  //
  // El 100 % será responsabilidad del flujo de éxito real.
  // ==========================================================

  const startProgressAnimation = () => {

    // --------------------------------------------------------
    // Limpiar cualquier progreso anterior.
    // --------------------------------------------------------

    clearProgressTimers()


    // --------------------------------------------------------
    // Estado inicial.
    // --------------------------------------------------------

    updateProgress({
      value: 8,
      stage: 'validation',
      message:
        'Verificando el archivo CVU seleccionado.'
    })


    // --------------------------------------------------------
    // 20 %
    // --------------------------------------------------------

    progressTimersRef.current.push(
      setTimeout(() => {

        updateProgress({
          value: 20,
          stage: 'validation',
          message:
            'Validando la estructura del archivo CVU.'
        })

      }, 350)
    )


    // --------------------------------------------------------
    // 32 %
    // --------------------------------------------------------

    progressTimersRef.current.push(
      setTimeout(() => {

        updateProgress({
          value: 32,
          stage: 'upload',
          message:
            'Preparando la información para enviarla al sistema.'
        })

      }, 800)
    )


    // --------------------------------------------------------
    // 48 %
    // --------------------------------------------------------

    progressTimersRef.current.push(
      setTimeout(() => {

        updateProgress({
          value: 48,
          stage: 'upload',
          message:
            'Cargando la información del CVU.'
        })

      }, 1400)
    )


    // --------------------------------------------------------
    // 63 %
    // --------------------------------------------------------

    progressTimersRef.current.push(
      setTimeout(() => {

        updateProgress({
          value: 63,
          stage: 'processing',
          message:
            'Procesando la información académica.'
        })

      }, 2200)
    )


    // --------------------------------------------------------
    // 76 %
    // --------------------------------------------------------

    progressTimersRef.current.push(
      setTimeout(() => {

        updateProgress({
          value: 76,
          stage: 'processing',
          message:
            'Organizando los productos del investigador.'
        })

      }, 3200)
    )


    // --------------------------------------------------------
    // 87 %
    // --------------------------------------------------------

    progressTimersRef.current.push(
      setTimeout(() => {

        updateProgress({
          value: 87,
          stage: 'profile',
          message:
            'Preparando la información del perfil.'
        })

      }, 4500)
    )


    // --------------------------------------------------------
    // 95 %
    //
    // Aquí nos detenemos.
    //
    // No avanzamos a 100 % hasta que:
    //
    // uploadCVU()
    //
    // y posteriormente:
    //
    // onSuccess()
    //
    // hayan terminado.
    // --------------------------------------------------------

    progressTimersRef.current.push(
      setTimeout(() => {

        updateProgress({
          value: 95,
          stage: 'profile',
          message:
            'Finalizando la actualización del CVU.'
        })

      }, 6000)
    )

  }


  // ==========================================================
  // FINALIZAR PROGRESO CON ÉXITO
  // ==========================================================

  const completeProgress = () => {

    // --------------------------------------------------------
    // Cancelamos cualquier temporizador pendiente.
    // --------------------------------------------------------

    clearProgressTimers()


    // --------------------------------------------------------
    // Mostramos el 100 %.
    // --------------------------------------------------------

    setProgress(100)


    // --------------------------------------------------------
    // Indicamos que el proceso terminó correctamente.
    // --------------------------------------------------------

    setProgressStage('profile')

    setProgressMessage(
      'La información del investigador está lista.'
    )

    setProgressSuccess(true)

  }


  // ==========================================================
  // SELECCIÓN DEL ARCHIVO
  // ==========================================================

  const handleFileSelect = (event) => {

    // --------------------------------------------------------
    // Obtener el primer archivo seleccionado.
    // --------------------------------------------------------

    const file = event.target.files?.[0]


    // --------------------------------------------------------
    // Si el usuario canceló el selector, no hacemos nada.
    // --------------------------------------------------------

    if (!file) {
      return
    }


    // --------------------------------------------------------
    // Limpiar estados anteriores.
    // --------------------------------------------------------

    setError(null)

    setProgressSuccess(false)

    setProgress(0)


    // ========================================================
    // VALIDACIÓN DEL TIPO DE ARCHIVO
    // ========================================================

    if (!file.type.includes('json')) {

      const message =
        'Por favor, selecciona un archivo JSON válido'


      setError(message)

      onError?.(message)

      return

    }


    // ========================================================
    // VALIDACIÓN DEL TAMAÑO
    // ========================================================

    const maxSize =
      10 * 1024 * 1024


    if (file.size > maxSize) {

      const message =
        'El archivo es demasiado grande. Máximo 10MB'


      setError(message)

      onError?.(message)

      return

    }


    // ========================================================
    // INICIAR CARGA
    // ========================================================

    handleUpload(file)

  }


  // ==========================================================
  // CARGAR ARCHIVO AL BACKEND
  // ==========================================================

  const handleUpload = async (file) => {

    // --------------------------------------------------------
    // Activar estado de carga.
    // --------------------------------------------------------

    setIsLoading(true)


    // --------------------------------------------------------
    // Limpiar errores anteriores.
    // --------------------------------------------------------

    setError(null)


    // --------------------------------------------------------
    // Reiniciar estado visual.
    // --------------------------------------------------------

    setProgressSuccess(false)

    setProgress(0)

    setProgressStage('validation')

    setProgressMessage(
      'Verificando el archivo CVU seleccionado.'
    )


    // --------------------------------------------------------
    // Iniciar progreso visual.
    // --------------------------------------------------------

    startProgressAnimation()


    try {

      // ======================================================
      // VALIDAR USUARIO DEL CVU
      // ======================================================
      //
      // El archivo debe contener un usuario_id en la raíz.
      // Este valor debe coincidir con el usuario autenticado
      // antes de enviar el archivo al backend.
      //
      // El backend repite esta validación contra la BD; esta
      // validación en frontend evita una petición innecesaria
      // cuando el archivo no corresponde al usuario actual.

      let cvuJson

      try {

        const fileContent = await file.text()

        cvuJson = JSON.parse(fileContent)

      } catch (parseError) {

        // Dejamos que el backend maneje la validación completa
        // del JSON para conservar el comportamiento existente.
        cvuJson = null

      }

      if (cvuJson) {

        const cvuUsuarioId =
          cvuJson?.usuario_id

        if (!cvuUsuarioId) {

          const message =
            'No se puede cargar el CVU porque el archivo no contiene el usuario_id requerido.'

          clearProgressTimers()

          setProgress(0)
          setProgressStage('validation')
          setProgressMessage(message)
          setProgressSuccess(false)
          setError(message)
          setIsLoading(true)

          onError?.(message)

          return

        }

        if (
          String(cvuUsuarioId).trim() !==
          String(userId).trim()
        ) {

          const message =
            'No se puede cargar el CVU porque el usuario_id del archivo no corresponde al usuario actual.'

          clearProgressTimers()

          setProgress(0)
          setProgressStage('validation')
          setProgressMessage(message)
          setProgressSuccess(false)
          setError(message)
          setIsLoading(true)

          onError?.(message)

          return

        }

      }


      // ======================================================
      // CREAR FORMDATA
      // ======================================================

      const formData = new FormData()


      // ------------------------------------------------------
      // ARCHIVO CVU
      // ------------------------------------------------------

      formData.append(
        'cvuFile',
        file
      )


      // ------------------------------------------------------
      // USUARIO
      //
      // El usuario autenticado es quien recibe la información
      // del CVU cargado.
      // ------------------------------------------------------

      formData.append(
        'usuario',
        userId
      )


      // ======================================================
      // DEBUG
      // ======================================================

      console.log(
        '[CVUUpload] Archivo seleccionado:',
        file.name
      )


      console.log(
        '[CVUUpload] Tamaño del archivo:',
        file.size,
        'bytes'
      )


      console.log(
        '[CVUUpload] Usuario destino:',
        userId
      )


      // ======================================================
      // ENVÍO AL BACKEND
      // ======================================================

      updateProgress({
        value: 35,
        stage: 'upload',
        message:
          'Enviando el archivo CVU al sistema.'
      })


      const response = await uploadCVU({
        api,
        file: formData
      })


      // ======================================================
      // RESPUESTA EXITOSA DEL BACKEND
      // ======================================================

      console.log(
        '[CVUUpload] CVU file uploaded successfully:',
        response
      )


      // ------------------------------------------------------
      // Nos colocamos en 90 %.
      //
      // Todavía NO estamos en 100 % porque CVUInfo deberá
      // actualizar nuevamente la información del CVU.
      // ------------------------------------------------------

      updateProgress({
        value: 90,
        stage: 'profile',
        message:
          'CVU recibido. Actualizando la información del investigador.'
      })


      // ======================================================
      // NOTIFICAR AL COMPONENTE PADRE
      // ======================================================
      //
      // IMPORTANTE:
      //
      // Esperamos la Promise que pueda devolver onSuccess().
      //
      // Esto permitirá que CVUInfo haga:
      //
      //     await fetchCVUData(...)
      //
      // antes de que nosotros mostremos 100 %.
      // ======================================================

      if (typeof onSuccess === 'function') {

        await onSuccess(response)

      }


      // ======================================================
      // 100 %
      // ======================================================
      //
      // Llegamos aquí solamente después de:
      //
      // 1. Cargar el archivo correctamente.
      // 2. Recibir respuesta del backend.
      // 3. Ejecutar onSuccess().
      // 4. Finalizar la actualización del CVU.
      // ======================================================

      completeProgress()


      // ======================================================
      // LIMPIAR INPUT
      // ======================================================

      if (fileInputRef.current) {

        fileInputRef.current.value = ''

      }


      // ======================================================
      // CERRAR MODAL
      // ======================================================
      //
      // Dejamos visible brevemente el 100 % para que el usuario
      // pueda percibir la finalización.
      //
      // Posteriormente ocultamos el progreso.
      // ======================================================

      setTimeout(() => {

        setIsLoading(false)

        setProgressSuccess(false)

        setProgress(0)

      }, 900)

    } catch (err) {

      // ======================================================
      // ERROR
      // ======================================================

      console.error(
        '[CVUUpload] Error completo:',
        err
      )


      // ------------------------------------------------------
      // Cancelar temporizadores.
      // ------------------------------------------------------

      clearProgressTimers()


      // ------------------------------------------------------
      // Obtener status HTTP.
      // ------------------------------------------------------

      console.error(
        '[CVUUpload] HTTP status:',
        err?.response?.status
      )


      // ------------------------------------------------------
      // Obtener respuesta del backend.
      // ------------------------------------------------------

      console.error(
        '[CVUUpload] Backend response:',
        err?.response?.data
      )


      // ======================================================
      // DETERMINAR MENSAJE
      // ======================================================

      let message =
        'Error al cargar el archivo CVU'


      const backendData =
        err?.response?.data


      // ------------------------------------------------------
      // Caso 1:
      //
      // {
      //   message: "..."
      // }
      // ------------------------------------------------------

      if (
        backendData &&
        typeof backendData.message === 'string' &&
        backendData.message.trim() !== ''
      ) {

        message =
          backendData.message

      }


      // ------------------------------------------------------
      // Caso 2:
      //
      // {
      //   detail: "..."
      // }
      // ------------------------------------------------------

      else if (
        backendData &&
        typeof backendData.detail === 'string' &&
        backendData.detail.trim() !== ''
      ) {

        message =
          backendData.detail

      }


      // ------------------------------------------------------
      // Caso 3:
      //
      // Backend devuelve directamente un string.
      // ------------------------------------------------------

      else if (
        typeof backendData === 'string' &&
        backendData.trim() !== ''
      ) {

        message =
          backendData

      }


      // ------------------------------------------------------
      // Caso 4:
      //
      // Utilizamos el mensaje de JavaScript/Axios.
      // ------------------------------------------------------

      else if (
        typeof err?.message === 'string' &&
        err.message.trim() !== ''
      ) {

        message =
          err.message

      }


      // ======================================================
      // GUARDAR ERROR
      // ======================================================

      setError(message)


      // ======================================================
      // INFORMAR AL COMPONENTE PADRE
      // ======================================================

      onError?.(err)


      // ======================================================
      // MOSTRAR ESTADO DE ERROR EN EL PROGRESO
      // ======================================================

      setProgressMessage(message)


      // ------------------------------------------------------
      // Permitimos que CVULoadingProgress muestre el error.
      // ------------------------------------------------------

      setIsLoading(true)


    } finally {

      // ======================================================
      // IMPORTANTE
      // ======================================================
      //
      // No hacemos aquí:
      //
      //     setIsLoading(false)
      //
      // porque en caso de éxito queremos mantener abierto el
      // modal hasta mostrar brevemente el 100 %.
      //
      // En caso de error se mantiene abierto para mostrar
      // claramente el problema.
      //
      // El cierre normal ocurre después de mostrar el 100 %.
      // ======================================================

      clearProgressTimers()

    }

  }


  // ==========================================================
  // CERRAR ERROR Y REINICIAR CARGA
  // ==========================================================
  //
  // Permite cerrar el mensaje de error mediante el botón
  // "Aceptar" de CVULoadingProgress.jsx sin recargar la página.
  //
  // También limpia el input para permitir seleccionar
  // nuevamente el mismo archivo si el usuario lo desea.
  // ==========================================================

  const handleCloseError = () => {

    clearProgressTimers()

    setIsLoading(false)

    setError(null)

    setProgress(0)

    setProgressStage('validation')

    setProgressMessage(
      'Verificando el archivo CVU seleccionado.'
    )

    setProgressSuccess(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

  }


  // ==========================================================
  // ABRIR SELECTOR DE ARCHIVOS
  // ==========================================================

  const handleClick = () => {

    // --------------------------------------------------------
    // Evitamos abrir otro selector durante una carga.
    // --------------------------------------------------------

    if (isLoading) {
      return
    }


    // --------------------------------------------------------
    // Abrimos el selector de Windows.
    // --------------------------------------------------------

    fileInputRef.current?.click()

  }


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <>

      {/* ======================================================
          INPUT REAL DE ARCHIVO
          ====================================================== */}

      <input
        ref={fileInputRef}
        type='file'
        accept='.json'
        onChange={handleFileSelect}
        className='hidden'
        disabled={isLoading}
      />


      {/* ======================================================
          BOTÓN CVU
          ====================================================== */}

      <button
        type='button'
        className='inline-flex items-center gap-2 rounded-xl border border-[#000080] bg-white px-4 py-2.5 text-sm font-semibold text-[#000080] shadow-sm transition-colors hover:bg-[#F3F3FC] focus:outline-none focus:ring-2 focus:ring-[#000080]/20 disabled:cursor-not-allowed disabled:opacity-50'
        title='Cargar CVU desde archivo JSON'
        onClick={handleClick}
        disabled={isLoading}
      >

        {isLoading ? (

          <>

            {/* ==================================================
                SPINNER
                ================================================== */}

            <span
              className='loading loading-spinner loading-sm'
              aria-hidden='true'
            />


            Cargando...

          </>

        ) : (

          <>

            {/* ==================================================
                ICONO DEL DOCUMENTO
                ================================================== */}

            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='h-5 w-5 stroke-current'
              aria-hidden='true'
            >

              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              />

            </svg>


            Cargar CVU

          </>

        )}

      </button>


      {/* ======================================================
          MENSAJE DE ERROR
          ====================================================== */}

      {error && !isLoading && (

        <div
          className='alert alert-error mt-3 border border-error/20 shadow-md'
          role='alert'
        >

          {/* ==================================================
              ICONO
              ================================================== */}

          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 shrink-0 stroke-current'
            fill='none'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >

            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />

          </svg>


          {/* ==================================================
              TEXTO
              ================================================== */}

          <div>

            <h3 className='font-semibold'>
              Error al cargar CVU
            </h3>

            <span className='text-sm'>
              {error}
            </span>

          </div>

        </div>

      )}


      {/* ======================================================
          MODAL DE PROGRESO
          ====================================================== */}

      <CVULoadingProgress
        isOpen={isLoading}
        progress={progress}
        stage={progressStage}
        message={progressMessage}
        success={progressSuccess}
        error={error}
        onClose={handleCloseError}
      />

    </>

  )
}


// ============================================================
// EXPORTACIÓN
// ============================================================

export default CVUUpload