/** Formato COP desde pesos enteros (65000 → $65.000). */
export function formatCop(pesos: number, locale: string): string {
  const tag = locale.toLowerCase().startsWith('es') ? 'es-CO' : 'en-CO'
  return new Intl.NumberFormat(tag, {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(pesos)
}
