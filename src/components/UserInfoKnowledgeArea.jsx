// ============================================================================
// ARCHIVO:
// C:\Proyectos\SIIA\siia-front\src\components\UserInfoKnowledgeArea.jsx
//
// DESCRIPCIÓN:
// Muestra el área de conocimiento del investigador.
//
// ESTRUCTURA ESPERADA:
//
// area_conocimiento
// ├── area
// ├── campo
// ├── disciplina
// └── subdisciplina
//
// Cada elemento puede contener, por ejemplo:
//
// {
//   nombre: "Ingeniería y Tecnología",
//   clave: "8"
// }
//
// DISEÑO:
// Identidad institucional azul basada en #000080.
// ============================================================================

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


// ============================================================================
// COMPONENTE SKELETON
// ============================================================================

const UserInfoKnowledgeAreaSkeleton = () => (
  <section className='mb-6'>

    <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>

      {/* Franja institucional */}
      <div className='h-2 bg-[#000080]' />

      <div className='p-6 sm:p-8'>

        {/* Encabezado */}

        <div className='mb-6 flex items-center gap-3'>

          <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F3FC]'>

            <Skeleton
              width={20}
              height={20}
            />

          </div>

          <div>

            <Skeleton
              width={190}
              height={24}
            />

            <Skeleton
              width={260}
              height={14}
              className='mt-2'
            />

          </div>

        </div>


        {/* Elementos */}

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>

          {[0, 1, 2, 3].map((item) => (

            <div
              key={item}
              className='rounded-xl border border-slate-200 bg-slate-50 p-4'
            >

              <Skeleton
                width={90}
                height={13}
              />

              <Skeleton
                width={190}
                height={20}
                className='mt-2'
              />

              <Skeleton
                width={60}
                height={12}
                className='mt-2'
              />

            </div>

          ))}

        </div>

      </div>

    </div>

  </section>
)


// ============================================================================
// OBTENER TEXTO SEGURO
// ============================================================================
//
// Evita intentar renderizar directamente objetos dentro de JSX.
//
// Por ejemplo:
//
//     { id: 8, nombre: "Ingeniería y Tecnología" }
//
// debe convertirse en:
//
//     "Ingeniería y Tecnología"
//
// Esto también ayuda a prevenir el error:
//
// "Objects are not valid as a React child"
// ============================================================================

const getSafeText = (value) => {

  // --------------------------------------------------------------------------
  // Valores inexistentes.
  // --------------------------------------------------------------------------

  if (
    value === null ||
    value === undefined
  ) {
    return ''
  }


  // --------------------------------------------------------------------------
  // Texto.
  // --------------------------------------------------------------------------

  if (typeof value === 'string') {
    return value.trim()
  }


  // --------------------------------------------------------------------------
  // Números.
  // --------------------------------------------------------------------------

  if (typeof value === 'number') {
    return String(value)
  }


  // --------------------------------------------------------------------------
  // Booleanos.
  // --------------------------------------------------------------------------

  if (typeof value === 'boolean') {
    return value ? 'Sí' : 'No'
  }


  // --------------------------------------------------------------------------
  // Objetos.
  // --------------------------------------------------------------------------

  if (
    typeof value === 'object' &&
    !Array.isArray(value)
  ) {

    // --------------------------------------------------------------
    // Prioridad para propiedades descriptivas.
    // --------------------------------------------------------------

    const text =
      value.nombre ??
      value.descripcion ??
      value.name ??
      value.titulo ??
      value.label ??
      value.valor ??
      value.codigo ??
      value.clave


    if (
      text !== null &&
      text !== undefined &&
      typeof text !== 'object'
    ) {
      return String(text).trim()
    }


    // --------------------------------------------------------------
    // Si la propiedad encontrada también es un objeto,
    // intentamos obtener su nombre.
    // --------------------------------------------------------------

    if (
      text &&
      typeof text === 'object'
    ) {

      return (
        text.nombre ??
        text.descripcion ??
        text.name ??
        text.label ??
        ''
      ).toString().trim()

    }


    return ''
  }


  // --------------------------------------------------------------------------
  // Arreglos.
  // --------------------------------------------------------------------------

  if (Array.isArray(value)) {

    return value
      .map(getSafeText)
      .filter(Boolean)
      .join(', ')
  }


  // --------------------------------------------------------------------------
  // Último recurso.
  // --------------------------------------------------------------------------

  return String(value)
}


// ============================================================================
// OBTENER CLAVE
// ============================================================================
//
// Las estructuras pueden utilizar:
//
// clave
// codigo
// id
//
// Se intenta respetar el valor disponible sin modificar los datos.
// ============================================================================

const getKey = (value) => {

  if (
    !value ||
    typeof value !== 'object'
  ) {
    return ''
  }


  const key =
    value.clave ??
    value.codigo ??
    value.key ??
    value.id


  if (
    key === null ||
    key === undefined
  ) {
    return ''
  }


  return String(key)
}


// ============================================================================
// COMPONENTE PARA CADA NIVEL
// ============================================================================

const KnowledgeItem = ({
  label,
  value
}) => {

  const nombre = getSafeText(value)
  const clave = getKey(value)


  // --------------------------------------------------------------------------
  // Si no existe información para este nivel, no mostramos una tarjeta vacía.
  // --------------------------------------------------------------------------

  if (!nombre && !clave) {
    return null
  }


  return (
    <div className='group rounded-xl border border-[#D6D6EF] bg-white p-4 transition-all duration-200 hover:border-[#000080] hover:bg-[#F3F3FC] hover:shadow-sm'>

      <div className='flex items-start gap-3'>

        {/* ------------------------------------------------------------------
            Indicador visual institucional
            ------------------------------------------------------------------ */}

        <div className='mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F3F3FC] text-[#000080] transition-colors duration-200 group-hover:bg-[#000080] group-hover:text-white'>

          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            className='h-4.5 w-4.5'
            aria-hidden='true'
          >

            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v11a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 17.5v-11z'
            />

            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8 8h8M8 12h8M8 16h5'
            />

          </svg>

        </div>


        {/* ------------------------------------------------------------------
            Información
            ------------------------------------------------------------------ */}

        <div className='min-w-0 flex-1'>

          <p className='text-xs font-semibold uppercase tracking-wider text-slate-500'>
            {label}
          </p>


          {nombre && (
            <p className='mt-1 break-words text-base font-semibold leading-snug text-slate-900'>
              {nombre}
            </p>
          )}


          {clave && (
            <div className='mt-2'>

              <span className='inline-flex items-center rounded-full border border-[#D6D6EF] bg-[#F3F3FC] px-2.5 py-1 text-xs font-semibold text-[#000080]'>

                Clave: {clave}

              </span>

            </div>
          )}

        </div>

      </div>

    </div>
  )
}


// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const UserInfoKnowledgeArea = ({
  userData,
  isLoading = false
}) => {

  // --------------------------------------------------------------------------
  // Estado de carga.
  // --------------------------------------------------------------------------

  if (isLoading) {
    return <UserInfoKnowledgeAreaSkeleton />
  }


  // --------------------------------------------------------------------------
  // Validamos que exista información del usuario.
  // --------------------------------------------------------------------------

  if (!userData) {
    return null
  }


  // --------------------------------------------------------------------------
  // Obtenemos el área de conocimiento.
  // --------------------------------------------------------------------------

  const areaConocimiento =
    userData.area_conocimiento


  if (
    !areaConocimiento ||
    typeof areaConocimiento !== 'object'
  ) {
    return null
  }


  // --------------------------------------------------------------------------
  // Definición de los cuatro niveles que actualmente utiliza el CVU.
  // --------------------------------------------------------------------------

  const niveles = [
    {
      key: 'area',
      label: 'Área',
      value: areaConocimiento.area,
    },
    {
      key: 'campo',
      label: 'Campo',
      value: areaConocimiento.campo,
    },
    {
      key: 'disciplina',
      label: 'Disciplina',
      value: areaConocimiento.disciplina,
    },
    {
      key: 'subdisciplina',
      label: 'Subdisciplina',
      value: areaConocimiento.subdisciplina,
    },
  ]


  // --------------------------------------------------------------------------
  // Verificamos si existe al menos un nivel con información.
  // --------------------------------------------------------------------------

  const tieneInformacion =
    niveles.some(({ value }) => {

      return Boolean(
        getSafeText(value) ||
        getKey(value)
      )

    })


  if (!tieneInformacion) {
    return null
  }


  return (
    <section className='mb-6'>

      {/* ====================================================================
          TARJETA PRINCIPAL
          ==================================================================== */}

      <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md'>

        {/* ------------------------------------------------------------------
            FRANJA INSTITUCIONAL
            ------------------------------------------------------------------ */}

        <div className='h-2 bg-[#000080]' />


        <div className='p-6 sm:p-8'>

          {/* ==================================================================
              ENCABEZADO
              ================================================================== */}

          <div className='mb-6 flex items-center gap-3'>

            {/* --------------------------------------------------------------
                Icono
                -------------------------------------------------------------- */}

            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F3FC] text-[#000080]'>

              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.8'
                className='h-5 w-5'
                aria-hidden='true'
              >

                {/* Birrete académico */}

                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3 9.5L12 5l9 4.5L12 14 3 9.5z'
                />

                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M7 11.5V16c2.7 2 7.3 2 10 0v-4.5'
                />

                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 9.5v5'
                />

              </svg>

            </div>


            {/* --------------------------------------------------------------
                Título
                -------------------------------------------------------------- */}

            <div>

              <h2 className='text-xl font-bold tracking-tight text-slate-900'>
                Área de conocimiento
              </h2>

              <p className='mt-1 text-sm text-slate-500'>
                Clasificación académica y disciplinaria
              </p>

            </div>

          </div>


          {/* ==================================================================
              NIVELES DE CONOCIMIENTO
              ================================================================== */}

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>

            {niveles.map((nivel) => (

              <KnowledgeItem
                key={nivel.key}
                label={nivel.label}
                value={nivel.value}
              />

            ))}

          </div>


          {/* ==================================================================
              INDICADOR INSTITUCIONAL
              ================================================================== */}

          <div className='mt-6 flex items-start gap-3 rounded-xl border border-[#D6D6EF] bg-[#F3F3FC] p-4'>

            <div className='mt-0.5 shrink-0 text-[#000080]'>

              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.8'
                className='h-5 w-5'
                aria-hidden='true'
              >

                <circle
                  cx='12'
                  cy='12'
                  r='9'
                />

                <path
                  strokeLinecap='round'
                  d='M12 10v6'
                />

                <circle
                  cx='12'
                  cy='7'
                  r='0.5'
                  fill='currentColor'
                  stroke='none'
                />

              </svg>

            </div>


            <p className='text-sm leading-relaxed text-slate-600'>

              Esta clasificación permite identificar el campo académico,
              disciplina y subdisciplina asociados al perfil del investigador.

            </p>

          </div>

        </div>

      </div>

    </section>
  )
}


// ============================================================================
// EXPORTACIÓN
// ============================================================================

export default UserInfoKnowledgeArea