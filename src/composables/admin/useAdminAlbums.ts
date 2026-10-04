import { ref } from 'vue'
import { adminService, type AlbumInput } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import type { Album, ApiError } from '@/types'

export function useAdminAlbums() {
  const toast = useToastStore()
  const albums = ref<Album[]>([])
  const loading = ref(false)

  async function load() {
    loading.value = true
    try {
      albums.value = await adminService.albums()
    } catch (e) {
      toast.error((e as ApiError).message)
    } finally {
      loading.value = false
    }
  }

  // El PATCH puede no traer los conteos: se conservan los que ya había.
  function replace(updated: Album) {
    albums.value = albums.value.map((a) => (a._id === updated._id ? { ...a, ...updated } : a))
  }

  async function create(input: AlbumInput): Promise<Album | null> {
    try {
      const album = await adminService.createAlbum(input)
      albums.value = [{ ...album, photoCount: album.photoCount ?? 0, hiddenCount: album.hiddenCount ?? 0 }, ...albums.value]
      toast.success('Álbum creado')
      return album
    } catch (e) {
      toast.error((e as ApiError).message)
      return null
    }
  }

  async function update(album: Album, patch: AlbumInput): Promise<boolean> {
    try {
      replace(await adminService.updateAlbum(album._id, patch))
      toast.success('Álbum actualizado')
      return true
    } catch (e) {
      toast.error((e as ApiError).message)
      return false
    }
  }

  async function togglePublished(album: Album) {
    const next = !album.isPublished
    // Optimista: el switch responde al toque y se revierte si el API falla.
    replace({ ...album, isPublished: next })
    try {
      replace(await adminService.updateAlbum(album._id, { isPublished: next }))
      toast.success(next ? 'Álbum publicado' : 'Álbum oculto del sitio')
    } catch (e) {
      replace({ ...album, isPublished: !next })
      toast.error((e as ApiError).message)
    }
  }

  async function remove(album: Album) {
    try {
      await adminService.deleteAlbum(album._id)
      albums.value = albums.value.filter((a) => a._id !== album._id)
      toast.success('Álbum eliminado')
    } catch (e) {
      // El 409 ("tiene fotos") ya viene redactado por el backend.
      toast.error((e as ApiError).message)
    }
  }

  return { albums, loading, load, create, update, togglePublished, remove }
}
