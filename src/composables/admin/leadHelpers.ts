import type { Lead } from '@/types'
import { locationNames } from '@/components/admin/adminCopy'

const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })

const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 31536000],
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
]

/** "hace 2 horas", "ayer"… Basta para saber qué tan frío está un interesado. */
export function timeAgo(value: string): string {
  const seconds = (new Date(value).getTime() - Date.now()) / 1000
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit)
  }
  return 'hace un momento'
}

export function locationName(slug: string): string {
  return locationNames[slug as keyof typeof locationNames] ?? slug
}

/** wa.me quiere el número en formato internacional, solo dígitos. */
export function whatsappUrl(lead: Pick<Lead, 'name' | 'phone' | 'location'>): string {
  let digits = lead.phone.replace(/\D/g, '')
  // Celulares de Ecuador escritos a la local (09…): se pasan a 5939…
  if (digits.startsWith('0') && digits.length === 10) digits = `593${digits.slice(1)}`
  const firstName = lead.name.trim().split(/\s+/)[0] ?? ''
  const text = `Hola ${firstName}! Te escribimos de AREA1520 por tu primer día gratis en la sede ${locationName(lead.location)}. ¿Qué día te gustaría venir?`
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}
