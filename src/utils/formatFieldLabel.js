const FIELD_LABELS = {
  titulo: 'Título',
  eje: 'Eje',
  nombre: 'Nombre',
  descripcion: 'Descripción',
  escritura: 'Escritura',
  lectura: 'Lectura',
  conversacion: 'Conversación',
  comprension: 'Comprensión',
  esCertificado: 'Es certificado',
  nombreInstitucion: 'Nombre de institución',
  migracionId: 'Id de migración',
  institucion: 'Institución',
  pais: 'País',
  anio: 'Año',
  paginas: 'Páginas',
  palabrasClave: 'Palabras clave',
  fechaInicio: 'Fecha de inicio',
  fechaFin: 'Fecha de fin',
  esActual: 'Es actual',
  esPrincipal: 'Es principal',
  logros: 'Logros',
  autores: 'Autores',
  editorial: 'Editorial',
  volumen: 'Volumen',
  resumen: 'Resumen'
}

const humanizeKey = (value) => {
  const text = String(value || '')
    .replace(/[_-]+/g, ' ')
    .replace(/([a-záéíóúñü])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .trim()

  if (!text) {
    return ''
  }

  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const formatFieldLabel = (key, label) => {
  const rawKey = typeof key === 'string' ? key.trim() : ''
  const rawLabel = typeof label === 'string' ? label.trim() : ''

  if (FIELD_LABELS[rawKey]) {
    return FIELD_LABELS[rawKey]
  }

  if (rawLabel && FIELD_LABELS[rawLabel]) {
    return FIELD_LABELS[rawLabel]
  }

  if (rawLabel && rawLabel !== rawKey && /\s/.test(rawLabel)) {
    return rawLabel
  }

  return humanizeKey(rawLabel || rawKey)
}
