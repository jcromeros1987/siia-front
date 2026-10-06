// ============================================================================
// ARCHIVO:
// C:\Proyectos\SIIA\siia-front\src\components\UserInfoSkills.jsx
//
// DESCRIPCIÓN:
// Componente encargado de mostrar las habilidades del investigador.
//
// DISEÑO:
//   - Fondo blanco.
//   - Azul institucional #002B7A.
//   - Tonos azules suaves para fondos y bordes.
//   - Morado únicamente como color secundario.
//   - Tarjetas modernas.
//   - Barras de progreso visuales.
//   - Diseño responsive.
//
// COMPATIBILIDAD DE DATOS:
// El componente puede recibir habilidades con diferentes estructuras:
//
// 1. Objeto:
//    {
//      nombre: "JavaScript",
//      porcentaje: 90
//    }
//
// 2. Objeto con otros nombres de propiedades:
//
//    {
//      descripcion: "JavaScript",
//      nivel: 90
//    }
//
// 3. Cadena JSON:
//
//    '{"descripcion":"JavaScript","nivel":90}'
//
// 4. Cadena JSON antigua con comillas simples.
//
// 5. Texto simple.
//
// IMPORTANTE:
// No modificamos los datos originales.
// Únicamente normalizamos su representación para poder mostrarlos.
// ============================================================================

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


// ============================================================================
// SKELETON DE CARGA
// ============================================================================
//
// Mientras la información del investigador está siendo obtenida desde la API,
// mostramos una estructura visual similar a la tarjeta definitiva.
// ============================================================================

const UserInfoSkillsSkeleton = () => (
  <section className='mb-6'>

    <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>

      {/* --------------------------------------------------------------
          Franja institucional
          -------------------------------------------------------------- */}

      <div className='h-2 bg-[#002B7A]' />

      <div className='p-6 sm:p-8'>

        {/* ------------------------------------------------------------
            Encabezado
            ------------------------------------------------------------ */}

        <div className='mb-6 flex items-center gap-3'>

          <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1F5FA]'>

            <Skeleton
              width={20}
              height={20}
            />

          </div>

          <div>

            <Skeleton
              width={140}
              height={24}
            />

            <Skeleton
              width={220}
              height={14}
              className='mt-2'
            />

          </div>

        </div>


        {/* ------------------------------------------------------------
            Habilidades de ejemplo durante la carga
            ------------------------------------------------------------ */}

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>

          {[0, 1, 2, 3].map((item) => (

            <div
              key={item}
              className='rounded-xl border border-slate-200 bg-slate-50/70 p-4'
            >

              <Skeleton
                width={150}
                height={18}
              />

              <Skeleton
                width='100%'
                height={8}
                className='mt-3'
              />

              <Skeleton
                width={60}
                height={14}
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
// NORMALIZAR NIVEL
// ============================================================================
//
// Convierte diferentes representaciones del nivel a un número entre 0 y 100.
//
// Ejemplos:
//
//   80       -> 80
//   "80"     -> 80
//   "80%"    -> 80
//   null     -> 0
//   120      -> 100
//   -10      -> 0
//
// ============================================================================

const normalizeLevel = (value) => {

  if (
    value === null ||
    value === undefined ||
    value === ''
  ) {
    return 0
  }


  // --------------------------------------------------------------
  // Convertimos el valor a número.
  // --------------------------------------------------------------

  const numericValue = Number(
    String(value).replace('%', '').trim()
  )


  // --------------------------------------------------------------
  // Si no es un número válido, regresamos cero.
  // --------------------------------------------------------------

  if (Number.isNaN(numericValue)) {
    return 0
  }


  // --------------------------------------------------------------
  // Limitamos el resultado al rango 0 - 100.
  // --------------------------------------------------------------

  return Math.min(
    100,
    Math.max(0, numericValue)
  )
}


// ============================================================================
// NORMALIZAR HABILIDAD
// ============================================================================
//
// Convierte cualquier formato soportado a una estructura uniforme:
//
// {
//   nombre: "...",
//   nivel: 80
// }
//
// De esta forma el HTML no necesita conocer todas las variantes posibles
// que puede enviar el backend.
// ============================================================================

const normalizeSkill = (habilidad) => {

  // --------------------------------------------------------------------------
  // Caso 1:
  // La habilidad ya es un objeto.
  // --------------------------------------------------------------------------

  if (
    habilidad !== null &&
    typeof habilidad === 'object' &&
    !Array.isArray(habilidad)
  ) {

    const nombre =
      habilidad.descripcion ??
      habilidad.nombre ??
      habilidad.name ??
      habilidad.titulo ??
      habilidad.label ??
      'Habilidad'


    const nivel =
      habilidad.porcentaje ??
      habilidad.nivel ??
      habilidad.valor ??
      0


    return {
      nombre: String(nombre),
      nivel: normalizeLevel(nivel)
    }
  }


  // --------------------------------------------------------------------------
  // Caso 2:
  // La habilidad viene como cadena.
  // --------------------------------------------------------------------------

  if (typeof habilidad === 'string') {

    const texto = habilidad.trim()


    // ------------------------------------------------------------
    // Intentamos interpretar la cadena como JSON.
    // ------------------------------------------------------------

    if (texto) {

      try {

        // Primero intentamos JSON estándar.

        const parsed = JSON.parse(texto)

        // Si el resultado es un objeto, volvemos a utilizar
        // la misma lógica de normalización.

        if (
          parsed !== null &&
          typeof parsed === 'object' &&
          !Array.isArray(parsed)
        ) {

          return normalizeSkill(parsed)
        }

      } catch (error) {

        // --------------------------------------------------------
        // Algunos datos antiguos utilizan comillas simples.
        // --------------------------------------------------------

        try {

          const parsed = JSON.parse(
            texto.replace(/'/g, '"')
          )


          if (
            parsed !== null &&
            typeof parsed === 'object' &&
            !Array.isArray(parsed)
          ) {

            return normalizeSkill(parsed)
          }

        } catch (legacyError) {

          // ------------------------------------------------------
          // Si tampoco es JSON válido, continuamos como texto
          // simple.
          // ------------------------------------------------------

        }
      }
    }


    // ------------------------------------------------------------
    // La cadena puede contener el nombre de la habilidad junto con
    // su porcentaje, por ejemplo:
    //
    //   "PHP (75%)"
    //   "JAVA (60%)"
    //
    // El JSON actual utiliza este formato, por lo que extraemos
    // el porcentaje antes de mostrar la habilidad.
    // ------------------------------------------------------------

    const porcentajeMatch = texto.match(/\((\d+(?:\.\d+)?)%\)\s*$/)

    if (porcentajeMatch) {
      const porcentaje = porcentajeMatch[1]

      // Quitamos únicamente la parte "(75%)" del nombre visible.
      const nombre = texto
        .replace(/\s*\(\d+(?:\.\d+)?%\)\s*$/, '')
        .trim()

      return {
        nombre: nombre || 'Habilidad',
        nivel: normalizeLevel(porcentaje)
      }
    }


    // ------------------------------------------------------------
    // Si la cadena no contiene un porcentaje, se conserva como
    // nombre de la habilidad y se mantiene el nivel en cero.
    // ------------------------------------------------------------

    return {
      nombre: texto || 'Habilidad',
      nivel: 0
    }
  }


  // --------------------------------------------------------------------------
  // Cualquier otro tipo de dato.
  // --------------------------------------------------------------------------

  return {
    nombre: 'Habilidad',
    nivel: 0
  }
}


// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const UserInfoSkills = ({
  userData,
  isLoading = false
}) => {

  // --------------------------------------------------------------------------
  // Estado de carga.
  // --------------------------------------------------------------------------

  if (isLoading) {
    return <UserInfoSkillsSkeleton />
  }


  // --------------------------------------------------------------------------
  // Validamos que exista información del usuario.
  // --------------------------------------------------------------------------

  if (!userData) {
    return null
  }


  // --------------------------------------------------------------------------
  // Obtenemos las habilidades.
  //
  // Se utiliza Array.isArray() porque el componente espera una colección.
  // Si la API no devuelve una colección válida, simplemente no mostramos
  // esta sección.
  // --------------------------------------------------------------------------

  const habilidades = Array.isArray(
    userData.habilidades
  )
    ? userData.habilidades
    : []


  // --------------------------------------------------------------------------
  // Si no existen habilidades, no mostramos una tarjeta vacía.
  // --------------------------------------------------------------------------

  if (habilidades.length === 0) {
    return null
  }


  // --------------------------------------------------------------------------
  // Normalizamos todas las habilidades antes de renderizarlas.
  // --------------------------------------------------------------------------

  const habilidadesNormalizadas = habilidades
    .map(normalizeSkill)
    .filter(
      (habilidad) =>
        habilidad.nombre &&
        habilidad.nombre.trim() !== ''
    )


  // --------------------------------------------------------------------------
  // Si después de normalizar no quedó ninguna habilidad válida,
  // ocultamos la sección.
  // --------------------------------------------------------------------------

  if (habilidadesNormalizadas.length === 0) {
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
                Icono de habilidades
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
                  d='M12 3l1.9 5.7H20l-4.9 3.6 1.9 5.7-5-3.5-5 3.5 1.9-5.7L4 8.7h6.1L12 3z'
                />

              </svg>

            </div>


            {/* --------------------------------------------------------------
                Título
                -------------------------------------------------------------- */}

            <div>

              <h2 className='text-xl font-bold tracking-tight text-slate-900'>
                Habilidades
              </h2>

              <p className='mt-1 text-sm text-slate-500'>
                Competencias y nivel de dominio registrados en el CVU
              </p>

            </div>

          </div>


          {/* ==================================================================
              LISTA DE HABILIDADES
              ================================================================== */}

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>

            {habilidadesNormalizadas.map(
              (habilidad, index) => (

                <div
                  key={`${habilidad.nombre}-${index}`}
                  className='group rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-[#D1DCEB] hover:bg-[#F1F5FA]/60 hover:shadow-sm'
                >

                  {/* ----------------------------------------------------------
                      ENCABEZADO DE LA HABILIDAD
                      ---------------------------------------------------------- */}

                  <div className='mb-3 flex items-center justify-between gap-4'>

                    <div className='min-w-0'>

                      <p className='truncate text-sm font-semibold text-slate-800'>
                        {habilidad.nombre}
                      </p>

                    </div>


                    {/* --------------------------------------------------------
                        Porcentaje
                        -------------------------------------------------------- */}

                    <span className='shrink-0 rounded-full bg-[#F1F5FA] px-2.5 py-1 text-xs font-bold text-[#002B7A]'>

                      {habilidad.nivel}%

                    </span>

                  </div>


                  {/* ==========================================================
                      BARRA DE PROGRESO
                      ========================================================== */}

                  <div
                    className='h-2 overflow-hidden rounded-full bg-slate-100'
                    role='progressbar'
                    aria-valuenow={habilidad.nivel}
                    aria-valuemin='0'
                    aria-valuemax='100'
                    aria-label={`Nivel de ${habilidad.nombre}`}
                  >

                    <div
                      className='h-full rounded-full bg-[#002B7A] transition-all duration-500'
                      style={{
                        width: `${habilidad.nivel}%`
                      }}
                    />

                  </div>


                  {/* ----------------------------------------------------------
                      Indicador inferior
                      ---------------------------------------------------------- */}

                  <div className='mt-2 flex items-center justify-between'>

                    <span className='text-xs text-slate-400'>
                      Nivel de dominio
                    </span>

                    <span className='text-xs font-medium text-slate-500'>
                      {habilidad.nivel} de 100
                    </span>

                  </div>

                </div>

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

export default UserInfoSkills