import { computed, ref, watch, type Ref } from 'vue'
import { adminService, type PhotoFilter } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import type { ApiError, Photo, PhotoTag } from '@/types'

const PAGE_SIZE = 60

/** ¿La foto sigue perteneciendo al filtro activo después de editarla? */
function matches(photo: Photo, filter: PhotoFilter): boolean {
  if (filter === 'visible') return !photo.isHidden
  if (filter === 'hidden') return photo.isHidden
  if (filter === 'tagged') return photo.tags.length > 0
  return true
}

export function useAlbumPhotos(albumId: Ref<string>) {
  const toast = useToastStore()
  const photos = ref<Photo[]>([])
  const total = ref(0)
  const page = ref(1)
  const pages = ref(1)
  const filter = ref<PhotoFilter>('all')
  const loading = ref(false)
  const selected = ref<Set<string>>(new Set())
  const batch = ref<{ done: number; total: number } | null>(null)

  const hasMore = computed(() => page.value < pages.value)

  async function fetchPage(next: number) {
    loading.value = true
    try {
      const res = await adminService.albumPhotos(albumId.value, {
        page: next,
        limit: PAGE_SIZE,
        filter: filter.value,
      })
      photos.value = next === 1 ? res.items : [...photos.value, ...res.items]
      total.value = res.total
      page.value = res.page
      pages.value = Math.max(1, res.pages)
    } catch (e) {
      toast.error((e as ApiError).message)
    } finally {
      loading.value = false
    }
  }

  const reload = () => {
    selected.value = new Set()
    return fetchPage(1)
  }
  const loadMore = () => hasMore.value && !loading.value && fetchPage(page.value + 1)

  watch([albumId, filter], reload)

  function apply(updated: Photo) {
    if (matches(updated, filter.value)) {
      photos.value = photos.value.map((p) => (p._id === updated._id ? updated : p))
    } else {
      photos.value = photos.value.filter((p) => p._id !== updated._id)
      total.value -= 1
    }
  }

  async function patch(photo: Photo, data: { isHidden?: boolean; tags?: PhotoTag[] }) {
    try {
      apply(await adminService.updatePhoto(photo._id, data))
      return true
    } catch (e) {
      toast.error((e as ApiError).message)
      return false
    }
  }

  async function toggleHidden(photo: Photo) {
    const ok = await patch(photo, { isHidden: !photo.isHidden })
    if (ok) toast.success(photo.isHidden ? 'La foto vuelve a verse' : 'Foto oculta del sitio')
  }

  async function toggleTag(photo: Photo, tag: PhotoTag) {
    const tags = photo.tags.includes(tag) ? photo.tags.filter((t) => t !== tag) : [...photo.tags, tag]
    await patch(photo, { tags })
  }

  async function remove(photo: Photo) {
    try {
      await adminService.deletePhoto(photo._id)
      photos.value = photos.value.filter((p) => p._id !== photo._id)
      total.value -= 1
      toast.success('Foto eliminada')
    } catch (e) {
      toast.error((e as ApiError).message)
    }
  }

  function toggleSelect(photo: Photo) {
    const next = new Set(selected.value)
    if (next.has(photo._id)) next.delete(photo._id)
    else next.add(photo._id)
    selected.value = next
  }

  const clearSelection = () => (selected.value = new Set())
  const selectAll = () => (selected.value = new Set(photos.value.map((p) => p._id)))

  /** En serie y no en paralelo: no satura el API y deja mostrar el avance real. */
  async function setHiddenBatch(isHidden: boolean) {
    const targets = photos.value.filter((p) => selected.value.has(p._id) && p.isHidden !== isHidden)
    if (!targets.length) {
      toast.info(isHidden ? 'Esas fotos ya están ocultas' : 'Esas fotos ya están visibles')
      return
    }
    batch.value = { done: 0, total: targets.length }
    let failed = 0
    for (const photo of targets) {
      try {
        apply(await adminService.updatePhoto(photo._id, { isHidden }))
      } catch {
        failed += 1
      }
      batch.value = { done: batch.value.done + 1, total: targets.length }
    }
    batch.value = null
    clearSelection()
    if (failed) toast.error(`${failed} foto(s) no se pudieron actualizar`)
    else toast.success(`${targets.length} foto(s) ${isHidden ? 'ocultas' : 'visibles'}`)
  }

  function prepend(uploaded: Photo[]) {
    const fresh = uploaded.filter((p) => matches(p, filter.value))
    photos.value = [...fresh, ...photos.value]
    total.value += fresh.length
  }

  return {
    photos,
    total,
    filter,
    loading,
    hasMore,
    selected,
    batch,
    reload,
    loadMore,
    toggleHidden,
    toggleTag,
    remove,
    toggleSelect,
    clearSelection,
    selectAll,
    setHiddenBatch,
    prepend,
  }
}
