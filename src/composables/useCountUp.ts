import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/**
 * Cuenta hasta el número de un stat ('2014', '6K+') cuando el elemento entra en
 * pantalla. Lo que no es dígito (K+, %) se conserva como sufijo.
 */
export function useCountUp(target: Ref<HTMLElement | null>, value: string, duration = 1400) {
  const match = value.match(/^(\D*)(\d+)(.*)$/)
  const display = ref(value)
  if (!match) return display

  const [, prefix, digits, suffix] = match
  const end = Number(digits)
  let observer: IntersectionObserver | null = null
  let frame = 0

  function run() {
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // ease-out fuerte: arranca rápido y se asienta en el número real
      const eased = 1 - Math.pow(1 - t, 4)
      display.value = `${prefix}${Math.round(end * eased)}${suffix}`
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
  }

  onMounted(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !target.value || !('IntersectionObserver' in window)) return
    display.value = `${prefix}0${suffix}`
    observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        observer?.disconnect()
        run()
      },
      { threshold: 0.6 },
    )
    observer.observe(target.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
    cancelAnimationFrame(frame)
  })

  return display
}
