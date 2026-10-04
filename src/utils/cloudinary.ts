import { site } from '@/config/site'

interface ImageOptions {
  width?: number
  height?: number
  /** fill recorta al tamaño exacto; limit solo reduce. */
  crop?: 'fill' | 'limit'
  quality?: 'auto' | 'auto:good' | 'auto:eco'
}

/**
 * Las fotos se guardan con publicId y la entrega se arma aquí: f_auto sirve
 * AVIF/WebP según el navegador y q_auto ajusta el peso sin que se note.
 */
export function cloudinaryUrl(publicId: string, opts: ImageOptions = {}): string {
  const { width, height, crop = 'limit', quality = 'auto' } = opts
  const parts = ['f_auto', `q_${quality}`, `c_${crop}`]
  if (crop === 'fill') parts.push('g_auto')
  if (width) parts.push(`w_${width}`)
  if (height) parts.push(`h_${height}`)
  return `https://res.cloudinary.com/${site.cloudinaryCloud}/image/upload/${parts.join(',')}/${publicId}`
}

/** srcset de anchos para <img sizes="…">. */
export function cloudinarySrcset(publicId: string, widths = [480, 800, 1200, 1600]): string {
  return widths.map((w) => `${cloudinaryUrl(publicId, { width: w })} ${w}w`).join(', ')
}

/** Miniatura cuadrada/recortada para mosaicos. */
export function cloudinaryThumb(publicId: string, width: number, height = width): string {
  return cloudinaryUrl(publicId, { width, height, crop: 'fill' })
}
