import { ref, type Ref } from 'vue'
import { adminService } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import type { ApiError, Photo } from '@/types'

export const MAX_FILES = 20
export const MAX_BYTES = 10 * 1024 * 1024

/** Valida y sube un lote de fotos; avisa de cada archivo que se descarta y por qué. */
export function usePhotoUpload(albumId: Ref<string>, onUploaded: (photos: Photo[]) => void) {
  const toast = useToastStore()
  const uploading = ref(false)
  const progress = ref(0)
  const count = ref(0)

  function validate(list: FileList | File[]): File[] {
    const files = Array.from(list)
    const valid: File[] = []
    for (const file of files) {
      if (!file.type.startsWith('image/')) toast.error(`${file.name} no es una imagen`)
      else if (file.size > MAX_BYTES) toast.error(`${file.name} pesa más de 10 MB`)
      else valid.push(file)
    }
    if (valid.length > MAX_FILES) {
      toast.info(`Se suben las primeras ${MAX_FILES}; el resto va en otro lote`)
      return valid.slice(0, MAX_FILES)
    }
    return valid
  }

  async function upload(list: FileList | File[]) {
    if (uploading.value) return
    const files = validate(list)
    if (!files.length) return

    uploading.value = true
    progress.value = 0
    count.value = files.length
    try {
      const photos = await adminService.uploadPhotos(albumId.value, files, (p) => {
        progress.value = p
      })
      onUploaded(photos)
      toast.success(`${photos.length} foto(s) subidas`)
    } catch (e) {
      toast.error((e as ApiError).message)
    } finally {
      uploading.value = false
    }
  }

  return { uploading, progress, count, upload }
}
