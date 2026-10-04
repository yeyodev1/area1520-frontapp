import { ref, watch } from 'vue'
import { adminService } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import { useAdminStats } from './useAdminStats'
import { useDebounced } from './useDebounced'
import type { ApiError, Lead, LeadStatus } from '@/types'

const PAGE_SIZE = 20

export function useAdminLeads() {
  const toast = useToastStore()
  const { refreshStats } = useAdminStats()

  const items = ref<Lead[]>([])
  const total = ref(0)
  const page = ref(1)
  const pages = ref(1)
  const loading = ref(false)
  const status = ref<LeadStatus | ''>('')
  const search = ref('')
  const query = useDebounced(search)

  async function load() {
    loading.value = true
    try {
      const res = await adminService.leads({
        status: status.value,
        q: query.value.trim(),
        page: page.value,
        limit: PAGE_SIZE,
      })
      items.value = res.items
      total.value = res.total
      pages.value = Math.max(1, res.pages)
    } catch (e) {
      toast.error((e as ApiError).message)
    } finally {
      loading.value = false
    }
  }

  // Cambiar filtro o búsqueda vuelve a la primera página.
  watch([status, query], () => {
    if (page.value === 1) load()
    else page.value = 1
  })
  watch(page, load)

  function replace(updated: Lead) {
    items.value = items.value.map((l) => (l._id === updated._id ? updated : l))
  }

  async function changeStatus(lead: Lead, next: LeadStatus) {
    if (lead.status === next) return
    try {
      replace(await adminService.updateLead(lead._id, { status: next }))
      toast.success('Estado actualizado')
      refreshStats()
    } catch (e) {
      toast.error((e as ApiError).message)
    }
  }

  async function saveNotes(lead: Lead, notes: string) {
    if (lead.notes === notes) return
    try {
      replace(await adminService.updateLead(lead._id, { notes }))
      toast.success('Nota guardada')
    } catch (e) {
      toast.error((e as ApiError).message)
    }
  }

  async function remove(lead: Lead) {
    try {
      await adminService.deleteLead(lead._id)
      toast.success('Interesado eliminado')
      refreshStats()
      // Si era el último de la página, se retrocede una.
      if (items.value.length === 1 && page.value > 1) page.value -= 1
      else load()
    } catch (e) {
      toast.error((e as ApiError).message)
    }
  }

  return { items, total, page, pages, loading, status, search, load, changeStatus, saveNotes, remove }
}
