import { reactive } from 'vue'
import type { AlbumInput } from '@/services/admin.service'
import type { Album } from '@/types'

/** Estado del formulario de álbum: el mismo sirve para crear y para editar. */
export function useAlbumForm() {
  const form = reactive({ title: '', eventName: '', eventDate: '', description: '' })

  function fill(album?: Album | null) {
    form.title = album?.title ?? ''
    form.eventName = album?.eventName ?? ''
    // El input date quiere YYYY-MM-DD; el API manda ISO completo.
    form.eventDate = album?.eventDate ? album.eventDate.slice(0, 10) : ''
    form.description = album?.description ?? ''
  }

  function payload(): AlbumInput {
    return {
      title: form.title.trim(),
      eventName: form.eventName.trim(),
      eventDate: form.eventDate || null,
      description: form.description.trim(),
    }
  }

  return { form, fill, payload }
}
