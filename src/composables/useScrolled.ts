import { onMounted, onUnmounted, ref } from 'vue'

/** true cuando la página bajó más de `threshold` px. Un solo listener pasivo con rAF. */
export function useScrolled(threshold = 24) {
  const scrolled = ref(false)
  let frame = 0

  function update() {
    frame = 0
    scrolled.value = window.scrollY > threshold
  }

  function onScroll() {
    if (!frame) frame = requestAnimationFrame(update)
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    if (frame) cancelAnimationFrame(frame)
  })

  return scrolled
}
