import { computed, ref } from 'vue'
import { adminService } from '@/services/admin.service'
import type { AdminStats } from '@/types'

// Estado de módulo: el layout (badge de "nuevos") y el panel leen lo mismo.
const stats = ref<AdminStats | null>(null)
const loading = ref(false)

async function refreshStats() {
  loading.value = true
  try {
    stats.value = await adminService.stats()
  } catch {
    // El badge no es crítico: si falla se queda con el último valor.
  } finally {
    loading.value = false
  }
}

export function useAdminStats() {
  const newLeads = computed(() => stats.value?.leads.nuevo ?? 0)
  return { stats, loading, newLeads, refreshStats }
}
