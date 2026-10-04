import { onMounted, ref } from 'vue'
import { galleryService } from '@/services/gallery.service'
import type { Photo, PhotoTag } from '@/types'

// Varias secciones piden las mismas fotos 'featured': se comparte la petición.
const cache = new Map<string, Promise<Photo[]>>()

function fetchTag(tag: PhotoTag, limit: number, album?: string): Promise<Photo[]> {
  const key = `${tag}:${limit}:${album ?? ''}`
  let request = cache.get(key)
  if (!request) {
    request = galleryService.photosByTag(tag, limit, album).catch((error) => {
      // Un fallo no queda cacheado: la próxima visita reintenta.
      cache.delete(key)
      throw error
    })
    cache.set(key, request)
  }
  return request
}

export function useTaggedPhotos(tag: PhotoTag, limit = 12, album?: string) {
  const photos = ref<Photo[]>([])
  const loading = ref(true)
  const failed = ref(false)

  onMounted(async () => {
    try {
      photos.value = await fetchTag(tag, limit, album)
    } catch {
      failed.value = true
    } finally {
      loading.value = false
    }
  })

  return { photos, loading, failed }
}
