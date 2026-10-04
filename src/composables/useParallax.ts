import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Desplazamiento vertical leve según la posición del elemento en el viewport.
 * Escribe el transform directamente (no una variable CSS heredable) y se apaga
 * con prefers-reduced-motion.
 */
export function useParallax(el: Ref<HTMLElement | null>, strength = 40) {
  let frame = 0
  let active = false

  function update() {
    frame = 0
    const node = el.value
    if (!node) return
    const rect = node.getBoundingClientRect()
    const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight
    node.style.transform = `translate3d(0, ${(-progress * strength).toFixed(1)}px, 0)`
  }

  function onScroll() {
    if (!frame) frame = requestAnimationFrame(update)
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    active = true
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    if (active) window.removeEventListener('scroll', onScroll)
    cancelAnimationFrame(frame)
  })
}
