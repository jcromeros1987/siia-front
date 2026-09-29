// ============================================================
// ARCHIVO:
// C:\Proyectos\SIIA\siia-front\src\components\CVULoadingProgress.jsx
//
// DESCRIPCIÓN:
// Componente visual encargado de mostrar el progreso durante
// la carga y procesamiento de un archivo CVU.
//
// Este componente NO realiza llamadas a la API.
//
// Su única responsabilidad es representar visualmente el estado
// del proceso que le proporciona el componente padre.
//
// Estados contemplados:
//
// 1. Cargando:
//    - Muestra porcentaje.
//    - Muestra barra de progreso.
//    - Muestra etapa actual.
//    - Muestra las etapas completadas.
//
// 2. Éxito:
//    - Muestra 100 %.
//    - Muestra confirmación de CVU cargado correctamente.
//
// 3. Error:
//    - Muestra el mensaje de error.
//    - Permite visualizar que el proceso terminó con error.
//    - Permite cerrar el modal mediante el botón "Aceptar".
//
// IMPORTANTE:
// El componente es reutilizable y no depende de CVUUpload ni
// CVUInfo. La integración se realizará posteriormente.
// ============================================================


// ============================================================
// REACT
// ============================================================

import { useEffect, useState } from 'react'


// ============================================================
// ETAPAS DEL PROCESO
// ============================================================

// Estas etapas representan visualmente el flujo de carga.
//
// El porcentaje real será controlado posteriormente por
// CVUUpload.jsx.
//
// No se realizan llamadas al backend desde este componente.
// ============================================================

const DEFAULT_STAGES = [
  {
    id: 'validation',
    label: 'Validando archivo',
    description: 'Verificando el archivo CVU seleccionado'
  },
  {
    id: 'upload',
    label: 'Cargando CVU',
    description: 'Enviando la información al sistema'
  },
  {
    id: 'processing',
    label: 'Procesando información',
    description: 'Organizando la información académica'
  },
  {
    id: 'profile',
    label: 'Actualizando perfil',
    description: 'Preparando la información del investigador'
  }
]


// ============================================================
// NORMALIZACIÓN DEL PORCENTAJE
// ============================================================

// Evita valores inválidos como:
//
// - undefined
// - null
// - NaN
// - valores menores a 0
// - valores mayores a 100
//
// El resultado siempre será un número entero entre 0 y 100.
// ============================================================

const normalizeProgress = (value) => {
  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return 0
  }

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(numericValue)
    )
  )
}


// ============================================================
// OBTENER ÍNDICE DE LA ETAPA ACTUAL
// ============================================================

// Permite determinar visualmente qué etapas ya fueron
// completadas.
//
// Si no encontramos la etapa recibida, utilizamos -1.
// ============================================================

const getStageIndex = (stage, stages) => {
  if (!stage) {
    return -1
  }

  return stages.findIndex(
    (item) => item.id === stage
  )
}


// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

const CVULoadingProgress = ({
  isOpen = false,
  progress = 0,
  stage = 'validation',
  message = '',
  success = false,
  error = null,
  stages = DEFAULT_STAGES,

  // ==========================================================
  // CERRAR MODAL DE ERROR
  // ==========================================================
  //
  // Función proporcionada por el componente padre.
  //
  // Se ejecuta únicamente cuando el usuario presiona
  // el botón "Aceptar" después de un error.
  //
  // IMPORTANTE:
  // Este componente no decide qué hacer después de cerrar
  // el modal. El componente padre es responsable de limpiar
  // el estado correspondiente.
  // ==========================================================

  onClose = null
}) => {

  // ==========================================================
  // ESTADO VISUAL DEL PORCENTAJE
  // ==========================================================
  //
  // Utilizamos un pequeño estado local para suavizar visualmente
  // los cambios del porcentaje.
  //
  // El valor recibido continúa siendo la fuente de verdad.
  // ==========================================================

  const normalizedProgress = normalizeProgress(progress)

  const [displayProgress, setDisplayProgress] = useState(
    normalizedProgress
  )


  // ==========================================================
  // SINCRONIZAR PORCENTAJE
  // ==========================================================
  //
  // Cuando el componente padre cambia el progreso, actualizamos
  // el valor mostrado.
  //
  // La pequeña transición visual se consigue mediante CSS.
  // ==========================================================

  useEffect(() => {

    setDisplayProgress(
      normalizedProgress
    )

  }, [normalizedProgress])


  // ==========================================================
  // SI EL MODAL NO ESTÁ ABIERTO
  // ==========================================================
  //
  // No dejamos ningún elemento en el DOM cuando el proceso
  // todavía no ha comenzado.
  // ==========================================================

  if (!isOpen) {
    return null
  }


  // ==========================================================
  // PREPARAR ETAPAS
  // ==========================================================

  const safeStages = Array.isArray(stages) && stages.length > 0
    ? stages
    : DEFAULT_STAGES


  const currentStageIndex = getStageIndex(
    stage,
    safeStages
  )


  // ==========================================================
  // ESTADO FINAL
  // ==========================================================

  const isCompleted =
    success ||
    displayProgress >= 100


  const isError =
    Boolean(error) &&
    !isCompleted


  // ==========================================================
  // MENSAJE PRINCIPAL
  // ==========================================================

  let title = 'Cargando CVU'


  if (isCompleted) {
    title = 'CVU cargado correctamente'
  }


  if (isError) {
    title = 'No fue posible cargar el CVU'
  }


  // ==========================================================
  // MENSAJE SECUNDARIO
  // ==========================================================

  let currentMessage =
    message ||
    'Estamos procesando la información del investigador.'


  if (isCompleted) {
    currentMessage =
      'La información del investigador está lista.'
  }


  if (isError) {
    currentMessage =
      typeof error === 'string'
        ? error
        : 'Ocurrió un error durante la carga del CVU.'
  }


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className='fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-[2px]'
      role='dialog'
      aria-modal='true'
      aria-labelledby='cvu-loading-progress-title'
      aria-describedby='cvu-loading-progress-description'
    >

      {/* ======================================================
          CONTENEDOR PRINCIPAL
          ====================================================== */}

      <div
        className='w-full max-w-lg overflow-hidden rounded-3xl border border-[#D6D6EF] bg-white shadow-2xl'
      >

        {/* ====================================================
            CABECERA
            ==================================================== */}

        <div
          className='border-b border-[#D6D6EF] bg-gradient-to-r from-[#000080] to-[#15159A] px-6 py-5 text-white'
        >

          <div className='flex items-center gap-4'>

            {/* ==================================================
                ICONO SIIA / CVU
                ================================================== */}

            <div
              className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20'
              aria-hidden='true'
            >

              {isCompleted ? (

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='h-7 w-7 stroke-current'
                >

                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />

                </svg>

              ) : isError ? (

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='h-7 w-7 stroke-current'
                >

                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v4m0 4h.01M10.29 3.86l-7.4 12.8A2 2 0 004.62 20h14.76a2 2 0 001.73-3.34l-7.4-12.8a2 2 0 00-3.42 0z'
                  />

                </svg>

              ) : (

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='h-7 w-7 stroke-current'
                >

                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 3v12m0 0l-4-4m4 4l4-4M5 21h14'
                  />

                </svg>

              )}

            </div>


            {/* ==================================================
                TÍTULO
                ================================================== */}

            <div className='min-w-0'>

              <p className='text-xs font-semibold uppercase tracking-[0.18em] text-blue-100'>
                SIIA | CVU
              </p>

              <h2
                id='cvu-loading-progress-title'
                className='mt-1 text-lg font-bold sm:text-xl'
              >
                {title}
              </h2>

            </div>

          </div>

        </div>


        {/* ====================================================
            CONTENIDO
            ==================================================== */}

        <div className='px-6 py-7 sm:px-8 sm:py-8'>

          {/* ==================================================
              PORCENTAJE
              ================================================== */}

          <div className='text-center'>

            <div
              className={[
                'text-5xl font-extrabold tracking-tight transition-colors duration-300 sm:text-6xl',
                isCompleted
                  ? 'text-emerald-600'
                  : isError
                    ? 'text-red-600'
                    : 'text-[#000080]'
              ].join(' ')}
              aria-live='polite'
            >

              {displayProgress}%

            </div>


            <p
              id='cvu-loading-progress-description'
              className='mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600'
            >
              {currentMessage}
            </p>

          </div>


          {/* ==================================================
              BARRA DE PROGRESO
              ================================================== */}

          <div className='mt-7'>

            <div
              className='h-3 w-full overflow-hidden rounded-full bg-[#E8E8F7]'
              role='progressbar'
              aria-valuemin='0'
              aria-valuemax='100'
              aria-valuenow={displayProgress}
              aria-label='Progreso de carga del CVU'
            >

              <div
                className={[
                  'relative h-full rounded-full transition-all duration-500 ease-out',
                  isCompleted
                    ? 'bg-emerald-500'
                    : isError
                      ? 'bg-red-500'
                      : 'bg-[#000080]'
                ].join(' ')}
                style={{
                  width: `${displayProgress}%`
                }}
              >

                {/* =================================================
                    BRILLO SUTIL DE LA BARRA
                    ================================================= */}

                {!isCompleted && !isError && (

                  <div
                    className='absolute inset-0 overflow-hidden rounded-full'
                    aria-hidden='true'
                  >

                    <div
                      className='h-full w-1/3 animate-[cvu-progress-shimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent'
                    />

                  </div>

                )}

              </div>

            </div>


            {/* ==================================================
                ETIQUETAS DE PROGRESO
                ================================================== */}

            <div className='mt-2 flex items-center justify-between text-xs font-medium text-slate-400'>

              <span>Inicio</span>

              <span>100 %</span>

            </div>

          </div>


          {/* ==================================================
              ETAPAS
              ================================================== */}

          <div className='mt-8 space-y-3'>

            {safeStages.map((item, index) => {

              const completedStage =
                isCompleted ||
                index < currentStageIndex ||
                (
                  displayProgress >= 100 &&
                  index <= currentStageIndex
                )


              const activeStage =
                !isCompleted &&
                !isError &&
                index === currentStageIndex


              return (

                <div
                  key={item.id}
                  className={[
                    'flex items-start gap-3 rounded-xl border px-3 py-3 transition-all duration-300',
                    completedStage
                      ? 'border-emerald-100 bg-emerald-50/70'
                      : activeStage
                        ? 'border-[#D6D6EF] bg-[#F7F7FC]'
                        : 'border-slate-100 bg-slate-50/60'
                  ].join(' ')}
                >

                  {/* =================================================
                      INDICADOR DE ETAPA
                      ================================================= */}

                  <div
                    className={[
                      'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                      completedStage
                        ? 'bg-emerald-100 text-emerald-600'
                        : activeStage
                          ? 'bg-[#000080] text-white'
                          : 'bg-slate-200 text-slate-400'
                    ].join(' ')}
                    aria-hidden='true'
                  >

                    {completedStage ? (

                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='none'
                        className='h-4 w-4 stroke-current'
                      >

                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2.5}
                          d='M5 13l4 4L19 7'
                        />

                      </svg>

                    ) : activeStage ? (

                      <span className='h-2.5 w-2.5 animate-pulse rounded-full bg-white' />

                    ) : (

                      <span className='text-xs font-bold'>
                        {index + 1}
                      </span>

                    )}

                  </div>


                  {/* =================================================
                      INFORMACIÓN DE LA ETAPA
                      ================================================= */}

                  <div className='min-w-0'>

                    <p
                      className={[
                        'text-sm font-semibold',
                        completedStage
                          ? 'text-emerald-700'
                          : activeStage
                            ? 'text-[#000080]'
                            : 'text-slate-500'
                      ].join(' ')}
                    >

                      {item.label}

                    </p>


                    <p className='mt-0.5 text-xs leading-5 text-slate-400'>

                      {item.description}

                    </p>

                  </div>

                </div>

              )

            })}

          </div>


          {/* ==================================================
              ESTADO DE ERROR
              ================================================== */}

          {isError && (

            <div
              className='mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3'
              role='alert'
            >

              <p className='text-sm font-semibold text-red-700'>
                Error durante la carga
              </p>

              <p className='mt-1 text-xs leading-5 text-red-600'>
                {currentMessage}
              </p>

            </div>

          )}


          {/* ==================================================
              BOTÓN ACEPTAR ERROR
              ================================================== */}
          
          {isError && (

            <div className='mt-5 flex justify-end'>

              <button
                type='button'
                onClick={onClose}
                className='inline-flex items-center justify-center rounded-xl bg-[#000080] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#15159A] focus:outline-none focus:ring-2 focus:ring-[#000080]/30 disabled:cursor-not-allowed disabled:opacity-50'
                disabled={!onClose}
                aria-label='Aceptar y cerrar mensaje de error'
              >
                Aceptar
              </button>

            </div>

          )}


          {/* ==================================================
              ESTADO DE ÉXITO
              ================================================== */}

          {isCompleted && (

            <div
              className='mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3'
              role='status'
            >

              <div className='flex items-start gap-3'>

                <div className='mt-0.5 shrink-0 text-emerald-600'>

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    className='h-5 w-5 stroke-current'
                  >

                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2.5}
                      d='M5 13l4 4L19 7'
                    />

                  </svg>

                </div>


                <div>

                  <p className='text-sm font-semibold text-emerald-700'>
                    Información lista
                  </p>

                  <p className='mt-1 text-xs leading-5 text-emerald-600'>
                    El CVU del investigador fue procesado correctamente.
                  </p>

                </div>

              </div>

            </div>

          )}


          {/* ==================================================
              MENSAJE INFERIOR
              ================================================== */}

          {!isCompleted && !isError && (

            <div className='mt-6 flex items-center justify-center gap-2 text-xs text-slate-400'>

              <span
                className='h-2 w-2 animate-pulse rounded-full bg-[#000080]'
                aria-hidden='true'
              />

              <span>
                Por favor espera mientras procesamos el CVU...
              </span>

            </div>

          )}

        </div>

      </div>


      {/* ======================================================
          ESTILOS DE ANIMACIÓN
          ====================================================== */}

      <style>
        {`
          @keyframes cvu-progress-shimmer {
            0% {
              transform: translateX(-120%);
            }

            100% {
              transform: translateX(420%);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .animate-pulse,
            .animate-\\[cvu-progress-shimmer_1\\.6s_ease-in-out_infinite\\] {
              animation: none !important;
            }
          }
        `}
      </style>

    </div>
  )
}


// ============================================================
// EXPORTACIÓN
// ============================================================

export default CVULoadingProgress