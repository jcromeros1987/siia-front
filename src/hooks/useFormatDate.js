export const useFormatDate = (dateString) => {
  if (!dateString) return 'N/A'

  // Las fechas YYYY-MM-DD deben tratarse como fecha calendario,
  // evitando la conversión de zona horaria de JavaScript.
  const [year, month, day] = dateString.split('-')

  if (year && month && day) {
    return `${parseInt(day)}/${parseInt(month)}/${year}`
  }

  return new Date(dateString).toLocaleDateString('es-MX')
}