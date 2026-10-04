import { onUnmounted, ref, watch, type Ref } from 'vue'

/** Copia de `source` que se actualiza cuando el usuario deja de escribir. */
export function useDebounced<T>(source: Ref<T>, delay = 350): Ref<T> {
  const value = ref(source.value) as Ref<T>
  let timer: ReturnType<typeof setTimeout> | undefined

  watch(source, (next) => {
    clearTimeout(timer)
    timer = setTimeout(() => (value.value = next), delay)
  })

  onUnmounted(() => clearTimeout(timer))
  return value
}
