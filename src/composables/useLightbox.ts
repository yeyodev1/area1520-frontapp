import { computed, ref, watch, type Ref } from 'vue'
import { useBodyScroll } from './useBodyScroll'
import { cloudinaryUrl } from '@/utils/cloudinary'
import type { Photo } from '@/types'

/** Ancho de entrega en el lightbox: nítido en retina sin bajar el original. */
export const LIGHTBOX_WIDTH = 2000

export function lightboxSrc(photo: Photo): string {
  return cloudinaryUrl(photo.publicId, { width: LIGHTBOX_WIDTH, quality: 'auto:good' })
}

/**
 * Estado del visor a pantalla completa. Navega sobre la lista ya cargada y
 * avisa (onNeedMore) cuando se acerca al final para que la masonry pida otra página.
 */
export function useLightbox(photos: Ref<Photo[]>, onNeedMore?: () => void) {
  const index = ref<number | null>(null)
  const isOpen = computed(() => index.value !== null)
  const current = computed(() => (index.value === null ? null : photos.value[index.value]))

  useBodyScroll(isOpen)

  let opener: HTMLElement | null = null

  function open(i: number) {
    opener = document.activeElement as HTMLElement | null
    index.value = i
  }

  function close() {
    index.value = null
    // El foco vuelve a la miniatura que abrió el visor.
    opener?.focus?.()
    opener = null
  }

  function go(step: number) {
    if (index.value === null) return
    const count = photos.value.length
    const nextIndex = index.value + step
    if (nextIndex < 0 || nextIndex >= count) return
    index.value = nextIndex
  }

  const next = () => go(1)
  const prev = () => go(-1)

  // Precarga la siguiente y la anterior: al pasar, la foto ya está en caché.
  watch(index, (i) => {
    if (i === null) return
    for (const j of [i + 1, i - 1]) {
      const photo = photos.value[j]
      if (photo) new Image().src = lightboxSrc(photo)
    }
    if (onNeedMore && i >= photos.value.length - 4) onNeedMore()
  })

  return { index, isOpen, current, open, close, next, prev }
}
