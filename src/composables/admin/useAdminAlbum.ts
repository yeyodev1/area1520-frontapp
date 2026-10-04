import { ref, watch, type Ref } from 'vue'
import { adminService, type AlbumInput } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import type { Album, ApiError, Photo } from '@/types'

/** Un álbum del panel. El API no expone GET por id: se toma de la lista completa. */
export function useAdminAlbum(albumId: Ref<string>) {
  const toast = useToastStore()
  const album = ref<Album | null>(null)
  const loading = ref(true)
  const notFound = ref(false)

  async function load() {
    loading.value = true
    notFound.value = false
    try {
      const all = await adminService.albums()
      album.value = all.find((a) => a._id === albumId.value) ?? null
      notFound.value = !album.value
    } catch (e) {
      toast.error((e as ApiError).message)
    } finally {
      loading.value = false
    }
  }

  watch(albumId, load, { immediate: true })

  async function update(patch: AlbumInput, message = 'Álbum actualizado'): Promise<boolean> {
    if (!album.value) return false
    try {
      const updated = await adminService.updateAlbum(album.value._id, patch)
      album.value = { ...album.value, ...updated }
      toast.success(message)
      return true
    } catch (e) {
      toast.error((e as ApiError).message)
      return false
    }
  }

  const setCover = (photo: Photo) =>
    update({ coverPublicId: photo.publicId }, 'Portada del álbum actualizada')

  const togglePublished = () =>
    album.value &&
    update(
      { isPublished: !album.value.isPublished },
      album.value.isPublished ? 'Álbum oculto del sitio' : 'Álbum publicado',
    )

  return { album, loading, notFound, load, update, setCover, togglePublished }
}
