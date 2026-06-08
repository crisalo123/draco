import { formatOrderMessage } from '@/application/order/formatOrderMessage'
import { buildWhatsAppOrderUrl } from '@/application/whatsapp/buildWhatsAppOrderUrl'
import { productPriceParts } from '@/presentation/formatting/productPriceLabel'
import { useTranslation } from 'react-i18next'
import { useCart } from '@/presentation/hooks/useCart'

export function useWhatsAppOrder() {
  const { t, i18n } = useTranslation()
  const { lines } = useCart()
  const rawPhone = import.meta.env.VITE_WHATSAPP_PHONE as string | undefined

  const openOrder = () => {
    const phone = rawPhone?.trim() ?? ''
    const message = formatOrderMessage(
      t('whatsapp.intro'),
      lines,
      (id) => {
        const name = t(`products.${id}.name`)
        const { label } = productPriceParts(id, i18n.language, t)
        return label ? `${name} (${label})` : name
      },
      t('whatsapp.outro'),
    )
    if (!phone) {
      window.alert(t('cart.configure_phone'))
      return
    }
    const url = buildWhatsAppOrderUrl(phone, message)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return {
    openOrder,
    hasPhone: Boolean(rawPhone?.replace(/\D/g, '')),
  }
}
