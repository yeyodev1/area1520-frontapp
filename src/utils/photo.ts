import type { Photo } from '@/types'

const EVENT = 'AREA Games 2026'

/** Texto alternativo a partir de las etiquetas: todas las fotos vienen del mismo evento. */
export function photoAlt(photo: Photo, position?: number): string {
  let base = `Atleta en ${EVENT}`
  if (photo.tags.includes('coach')) base = `Cristóbal Germán, head coach, en ${EVENT}`
  else if (photo.tags.includes('podium')) base = `Podio de ${EVENT}`
  else if (photo.tags.includes('medals')) base = `Medallas de ${EVENT}`
  else if (photo.tags.includes('community')) base = `Comunidad AREA1520 en ${EVENT}`
  return position ? `${base}, foto ${position}` : base
}
