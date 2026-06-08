/**
 * Construye URL de WhatsApp con mensaje prellenado (adaptador de salida).
 * El número debe ser dígitos E.164 sin símbolo + (ej. 15125551234).
 */
export function buildWhatsAppOrderUrl(
  phoneDigits: string,
  message: string,
): string {
  const cleaned = phoneDigits.replace(/\D/g, '')
  const base = `https://wa.me/${cleaned}`
  return `${base}?text=${encodeURIComponent(message)}`
}
