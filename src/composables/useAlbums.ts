import { onMounted, ref, watch, type Ref } from 'vue'
import { galleryService } from '@/services/gallery.service'
import type { Album, ApiError } from '@/types'

export function useAlbums() {
  const albums = ref<Album[]>([])
  const loading = ref(true)
  const error = ref('')

  async function load() {
    loading.value = true
    error.value = ''
    try {
      albums.value = await galleryService.albums()
    } catch (e) {
      error.value = (e as ApiError).message
    } finally {
      loading.value = false
    }
  }

  onMounted(load)

  return { albums, loading, error, reload: load }
}

export function useAlbum(slug: Ref<string>) {
  const album = ref<Album | null>(null)
  const loading = ref(true)
  const notFound = ref(false)
  const error = ref('')

  watch(
    slug,
    async (value) => {
      loading.value = true
      notFound.value = false
      error.value = ''
      album.value = null
      try {
        album.value = await galleryService.album(value)
      } catch (e) {
        const err = e as ApiError
        if (err.status === 404) notFound.value = true
        else error.value = err.message
      } finally {
        loading.value = false
      }
    },
    { immediate: true },
  )

  return { album, loading, notFound, error }
}
