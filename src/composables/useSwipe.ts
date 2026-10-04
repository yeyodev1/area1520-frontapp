import { ref } from 'vue'

interface SwipeHandlers {
  onLeft: () => void
  onRight: () => void
  onDown?: () => void
}

/**
 * Swipe táctil con pointer events. Un gesto rápido basta aunque sea corto
 * (velocidad), y un arrastre lento cuenta si supera el umbral de distancia.
 */
export function useSwipe(handlers: SwipeHandlers) {
  const offset = ref(0)
  let startX = 0
  let startY = 0
  let startTime = 0
  let pointerId: number | null = null

  function onPointerDown(event: PointerEvent) {
    if (event.pointerType === 'mouse' || pointerId !== null) return
    pointerId = event.pointerId
    startX = event.clientX
    startY = event.clientY
    startTime = performance.now()
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerId !== pointerId) return
    offset.value = event.clientX - startX
  }

  function onPointerUp(event: PointerEvent) {
    if (event.pointerId !== pointerId) return
    const dx = event.clientX - startX
    const dy = event.clientY - startY
    const velocity = Math.abs(dx) / Math.max(1, performance.now() - startTime)
    pointerId = null
    offset.value = 0

    if (Math.abs(dy) > Math.abs(dx) * 1.4 && dy > 90) {
      handlers.onDown?.()
      return
    }
    if (Math.abs(dx) < 60 && velocity < 0.4) return
    if (dx < 0) handlers.onLeft()
    else handlers.onRight()
  }

  function onPointerCancel() {
    pointerId = null
    offset.value = 0
  }

  return { offset, onPointerDown, onPointerMove, onPointerUp, onPointerCancel }
}
