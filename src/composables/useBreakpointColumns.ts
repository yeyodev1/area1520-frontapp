import { onMounted, onUnmounted, ref } from 'vue'

// Igual que los breakpoints de _mixins.scss: 2 columnas en móvil, 3 desde md, 4 desde xl.
const QUERIES: [string, number][] = [
  ['(min-width: 1280px)', 4],
  ['(min-width: 768px)', 3],
]

export function useBreakpointColumns(fallback = 2) {
  const columns = ref(fallback)
  const lists: MediaQueryList[] = []

  function sync() {
    const i = lists.findIndex((list) => list.matches)
    columns.value = QUERIES[i]?.[1] ?? fallback
  }

  onMounted(() => {
    for (const [query] of QUERIES) {
      const list = window.matchMedia(query)
      list.addEventListener('change', sync)
      lists.push(list)
    }
    sync()
  })

  onUnmounted(() => lists.forEach((list) => list.removeEventListener('change', sync)))

  return columns
}
