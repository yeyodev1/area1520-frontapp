import { onUnmounted, ref, watch, type Ref } from 'vue'
import { galleryService } from '@/services/gallery.service'
import type { ApiError, Photo } from '@/types'

const PAGE_SIZE = 40

/**
 * Fotos de un álbum de 40 en 40. Un sentinel al final de la lista dispara la
 * siguiente página cuando se acerca al viewport (con margen para no ver el corte).
 */
export function useInfinitePhotos(slug: Ref<string | null | undefined>) {
  const photos = ref<Photo[]>([])
  const total = ref(0)
  const page = ref(0)
  const pages = ref(1)
  const loading = ref(false)
  const error = ref('')
  const sentinel = ref<HTMLElement | null>(null)

  // Si cambia el álbum mientras carga una página, la respuesta vieja se descarta.
  let generation = 0
  let observer: IntersectionObserver | null = null

  const hasMore = () => page.value < pages.value

  async function loadMore() {
    const current = slug.value
    if (!current || loading.value || !hasMore()) return
    const gen = generation
    loading.value = true
    error.value = ''
    try {
      const result = await galleryService.albumPhotos(current, page.value + 1, PAGE_SIZE)
      if (gen !== generation) return
      photos.value = [...photos.value, ...result.items]
      total.value = result.total
      page.value = result.page
      pages.value = result.pages
    } catch (e) {
      if (gen === generation) error.value = (e as ApiError).message
    } finally {
      if (gen === generation) loading.value = false
      // Si el sentinel sigue visible (pantallas altas), se pide otra página.
      if (gen === generation && !error.value) queueMicrotask(checkSentinel)
    }
  }

  function checkSentinel() {
    const el = sentinel.value
    if (!el || !hasMore()) return
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight + 800) loadMore()
  }

  function reset() {
    generation += 1
    photos.value = []
    total.value = 0
    page.value = 0
    pages.value = 1
    loading.value = false
    error.value = ''
  }

  watch(
    slug,
    () => {
      reset()
      loadMore()
    },
    { immediate: true },
  )

  watch(sentinel, (el, old) => {
    if (old) observer?.unobserve(old)
    if (!el) return
    observer ??= new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) loadMore()
      },
      { rootMargin: '0px 0px 800px 0px' },
    )
    observer.observe(el)
  })

  onUnmounted(() => observer?.disconnect())

  return { photos, total, loading, error, sentinel, loadMore, hasMore }
}
