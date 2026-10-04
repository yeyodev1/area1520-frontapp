import { computed, type Ref } from 'vue'
import type { Photo } from '@/types'

export interface MasonryItem {
  photo: Photo
  /** Posición en la lista original: el lightbox navega en este orden, no por columnas. */
  index: number
  ratio: number
}

/**
 * Reparte las fotos en N columnas flex, cada una a la columna más baja.
 * La altura relativa de una foto es height/width (todas las columnas miden lo mismo
 * de ancho), así que no hace falta medir el DOM ni esperar a que carguen.
 * A diferencia de column-count, al añadir una página las fotos ya colocadas no se mueven.
 */
export function useMasonry(photos: Ref<Photo[]>, columns: Ref<number>) {
  return computed<MasonryItem[][]>(() => {
    const count = Math.max(1, columns.value)
    const cols: MasonryItem[][] = Array.from({ length: count }, () => [])
    const heights = new Array<number>(count).fill(0)

    photos.value.forEach((photo, index) => {
      const ratio = photo.width && photo.height ? photo.height / photo.width : 1
      let target = 0
      for (let i = 1; i < count; i++) if (heights[i]! < heights[target]!) target = i
      cols[target]!.push({ photo, index, ratio })
      heights[target]! += ratio
    })

    return cols
  })
}
