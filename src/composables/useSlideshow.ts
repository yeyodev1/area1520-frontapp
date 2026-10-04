import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/** Índice que avanza solo cada `interval` ms; se pausa con la pestaña oculta. */
export function useSlideshow(count: Ref<number>, interval = 6500) {
  const index = ref(0)
  let timer = 0

  function tick() {
    if (count.value > 1 && !document.hidden) index.value = (index.value + 1) % count.value
  }

  onMounted(() => {
    timer = window.setInterval(tick, interval)
  })

  onUnmounted(() => window.clearInterval(timer))

  return index
}
