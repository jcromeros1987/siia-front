// ============================================================================
// ARCHIVO:
// C:\Proyectos\SIIA\siia-front\src\components\UserInfoInterests.jsx
//
// DESCRIPCIÓN:
// Muestra las áreas de interés académico y profesional del investigador.
//
// DISEÑO:
//   - Fondo blanco.
//   - Azul institucional #002B7A.
//   - Fondos azules muy suaves.
//   - Bordes institucionales.
//   - Etiquetas tipo "chip" modernas.
//   - Diseño responsive.
//
// COMPATIBILIDAD:
// Los intereses pueden llegar como:
//
//   "Inteligencia Artificial"
//
// o como:
//
//   {
//     nombre: "Inteligencia Artificial"
//   }
//
// o:
//
//   {
//     descripcion: "Inteligencia Artificial"
//   }
//
// IMPORTANTE:
// Nunca se intenta renderizar directamente un objeto de JavaScript.
// Siempre se transforma a texto antes de enviarlo al JSX.
// ============================================================================

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


// ============================================================================
// SKELETON DE CARGA
// ============================================================================

const UserInfoInterestsSkeleton = () => (
  <section className='mb-6'>

    <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>

      {/* ------------------------------------------------------------------
          Franja institucional
          ------------------------------------------------------------------ */}

      <div className='h-2 bg-[#002B7A]' />

      <div className='p-6 sm:p-8'>

        {/* ----------------------------------------------------------------
            Encabezado
            ---------------------------------------------------------------- */}

        <div className='mb-6 flex items-center gap-3'>

          <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1F5FA]'>

            <Skeleton
              width={20}
              height={20}
            />

          </div>

          <div>

            <Skeleton
              width={120}
              height={24}
            />

            <Skeleton
              width={240}
              height={14}
              className='mt-2'
            />

          </div>

        </div>


        {/* ----------------------------------------------------------------
            Chips de carga
            ---------------------------------------------------------------- */}

        <div className='flex flex-wrap gap-2'>

          {[0, 1, 2, 3, 4].map((item) => (

            <Skeleton
              key={item}
              width={120}
              height={36}
              borderRadius={999}
            />

          ))}

        </div>

      </div>

    </div>

  </section>
)


// ============================================================================
// NORMALIZAR INTERÉS
// ============================================================================
//
// Convierte un interés recibido desde la API en texto seguro para React.
//
// Esto evita errores como:
//
// "Objects are not valid as a React child"
//
// cuando el backend devuelve:
//
// { id: 1, nombre: "Fotografía" }
//
// ============================================================================

const normalizeInterest = (interes) => {

  // --------------------------------------------------------------------------
  // Si es null o undefined no existe información válida.
  // --------------------------------------------------------------------------

  if (
    interes === null ||
    interes === undefined
  ) {
    return ''
  }


  // --------------------------------------------------------------------------
  // Si ya es una cadena, la utilizamos directamente.
  // --------------------------------------------------------------------------

  if (typeof interes === 'string') {

    return interes.trim()
  }


  // --------------------------------------------------------------------------
  // Si es un número, podemos convertirlo a texto.
  // --------------------------------------------------------------------------

  if (typeof interes === 'number') {

    return String(interes)
  }


  // --------------------------------------------------------------------------
  // Si recibimos un objeto, buscamos la propiedad que contenga
  // la descripción legible del interés.
  // --------------------------------------------------------------------------

  if (
    typeof interes === 'object' &&
    !Array.isArray(interes)
  ) {

    const valor =
      interes.nombre ??
      interes.descripcion ??
      interes.name ??
      interes.titulo ??
      interes.label ??
      interes.valor ??
      ''


    // --------------------------------------------------------------
    // Si la propiedad encontrada vuelve a ser un objeto,
    // evitamos renderizarlo directamente.
    // --------------------------------------------------------------

    if (
      valor !== null &&
      typeof valor === 'object'
    ) {

      if (valor.nombre) {
        return String(valor.nombre)
      }

      if (valor.descripcion) {
        return String(valor.descripcion)
      }

      return ''
    }


    return String(valor).trim()
  }


  // --------------------------------------------------------------------------
  // Si por alguna razón recibimos un arreglo como interés individual,
  // convertimos sus elementos a texto.
  // --------------------------------------------------------------------------

  if (Array.isArray(interes)) {

    return interes
      .map(normalizeInterest)
      .filter(Boolean)
      .join(', ')
  }


  // --------------------------------------------------------------------------
  // Último recurso.
  // --------------------------------------------------------------------------

  return ''
}


// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const UserInfoInterests = ({
  userData,
  isLoading = false
}) => {

  // --------------------------------------------------------------------------
  // Estado de carga.
  // --------------------------------------------------------------------------

  if (isLoading) {
    return <UserInfoInterestsSkeleton />
  }


  // --------------------------------------------------------------------------
  // Validamos la información del investigador.
  // --------------------------------------------------------------------------

  if (!userData) {
    return null
  }


  // --------------------------------------------------------------------------
  // Obtenemos la colección de intereses.
  //
  // Si la API devuelve algo diferente a un arreglo, no intentamos ejecutar
  // .map() sobre el valor para evitar errores en tiempo de ejecución.
  // --------------------------------------------------------------------------

  const intereses = Array.isArray(
    userData.intereses
  )
    ? userData.intereses
    : []


  // --------------------------------------------------------------------------
  // Normalizamos los intereses.
  //
  // filter(Boolean) elimina valores vacíos.
  // --------------------------------------------------------------------------

  const interesesNormalizados = intereses
    .map(normalizeInterest)
    .filter(Boolean)


  // --------------------------------------------------------------------------
  // Si no hay intereses válidos, no mostramos una tarjeta vacía.
  // --------------------------------------------------------------------------

  if (
    interesesNormalizados.length === 0
  ) {
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

        <div className='h-2 bg-[#002B7A]' />


        <div className='p-6 sm:p-8'>

          {/* ==================================================================
              ENCABEZADO
              ================================================================== */}

          <div className='mb-6 flex items-center gap-3'>

            {/* --------------------------------------------------------------
                Icono
                -------------------------------------------------------------- */}

            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1F5FA] text-[#002B7A]'>

              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.8'
                className='h-5 w-5'
                aria-hidden='true'
              >

                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 3.5a4 4 0 014 4c0 1.5-.8 2.8-2 3.5 2.9.8 5 3.1 5 5.8v.7H5v-.7c0-2.7 2.1-5 5-5.8-1.2-.7-2-2-2-3.5a4 4 0 014-4z'
                />

                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.5 18.5h7'
                />

              </svg>

            </div>


            {/* --------------------------------------------------------------
                Título
                -------------------------------------------------------------- */}

            <div>

              <h2 className='text-xl font-bold tracking-tight text-slate-900'>
                Intereses
              </h2>

              <p className='mt-1 text-sm text-slate-500'>
                Áreas de interés académico y profesional
              </p>

            </div>

          </div>


          {/* ==================================================================
              LISTA DE INTERESES
              ================================================================== */}

          <div className='flex flex-wrap gap-2.5'>

            {interesesNormalizados.map(
              (interes, index) => (

                <span
                  key={`${interes}-${index}`}
                  className='inline-flex items-center gap-2 rounded-full border border-[#D1DCEB] bg-[#F1F5FA] px-3.5 py-2 text-sm font-semibold text-[#002B7A] transition-all duration-200 hover:border-[#002B7A] hover:bg-[#E6EDF5] hover:shadow-sm'
                >

                  {/* --------------------------------------------------------
                      Indicador institucional
                      -------------------------------------------------------- */}

                  <span
                    className='h-2 w-2 shrink-0 rounded-full bg-[#002B7A]'
                    aria-hidden='true'
                  />


                  {/* --------------------------------------------------------
                      Texto del interés
                      -------------------------------------------------------- */}

                  <span>
                    {interes}
                  </span>

                </span>

              )
            )}

          </div>

        </div>

      </div>

    </section>
  )
}


// ============================================================================
// EXPORTACIÓN
// ============================================================================

export default UserInfoInterests