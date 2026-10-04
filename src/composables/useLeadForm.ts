import { computed, reactive, ref, watch } from 'vue'
import { site, whatsappLink } from '@/config/site'
import { leadService } from '@/services/lead.service'
import { useToastStore } from '@/stores/toast'
import type { ApiError, LeadInput, LocationSlug } from '@/types'

interface LeadForm {
  name: string
  phone: string
  email: string
  location: LocationSlug | ''
  preferredSchedule: string
  goal: string
  experience: string
  website: string
}

export function useLeadForm() {
  const toast = useToastStore()

  const form = reactive<LeadForm>({
    name: '',
    phone: '',
    email: '',
    location: '',
    preferredSchedule: '',
    goal: '',
    experience: '',
    website: '',
  })

  const sending = ref(false)
  const error = ref('')
  const sent = ref(false)
  const touched = ref(false)

  const location = computed(() => site.locations.items.find((item) => item.slug === form.location))
  const scheduleBlocks = computed(() => location.value?.schedule ?? [])
  const hasSchedule = computed(() => scheduleBlocks.value.length > 0)

  // Cambiar de sede invalida el horario elegido en la otra.
  watch(
    () => form.location,
    () => (form.preferredSchedule = ''),
  )

  const phoneDigits = computed(() => form.phone.replace(/\D/g, ''))
  const errors = computed(() => ({
    name: form.name.trim().length < 2 ? 'Escribe tu nombre.' : '',
    phone: phoneDigits.value.length < 9 ? 'Escribe un WhatsApp válido (ej. 0991234567).' : '',
    email:
      form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
        ? 'Revisa el correo o déjalo vacío.'
        : '',
    location: form.location ? '' : 'Elige una sede.',
  }))
  const isValid = computed(() => Object.values(errors.value).every((message) => !message))

  function toggleGoal(goal: string) {
    form.goal = form.goal === goal ? '' : goal
  }

  // Mensaje de WhatsApp armado con lo que la persona llenó: el box no tiene que volver a preguntar.
  const whatsappUrl = computed(() => {
    const lines = [
      `Hola! Soy ${form.name.trim()} y acabo de reservar mi primer día *GRATUITO* desde la web.`,
      location.value ? `Sede: ${location.value.name}` : '',
      form.preferredSchedule ? `Horario: ${form.preferredSchedule}` : '',
      form.goal ? `Objetivo: ${form.goal}` : '',
      form.experience ? `Experiencia: ${form.experience}` : '',
    ]
    return whatsappLink(lines.filter(Boolean).join('\n'))
  })

  async function submit() {
    touched.value = true
    error.value = ''
    if (!isValid.value || !form.location) return

    const payload: LeadInput = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      location: form.location,
      website: form.website,
    }
    if (form.email.trim()) payload.email = form.email.trim()
    if (form.preferredSchedule.trim()) payload.preferredSchedule = form.preferredSchedule.trim()
    if (form.goal) payload.goal = form.goal
    if (form.experience) payload.experience = form.experience

    sending.value = true
    try {
      await leadService.create(payload)
      sent.value = true
      toast.success(site.lead.success)
    } catch (e) {
      error.value = (e as ApiError).message
    } finally {
      sending.value = false
    }
  }

  return {
    form,
    errors,
    touched,
    sending,
    error,
    sent,
    scheduleBlocks,
    hasSchedule,
    whatsappUrl,
    toggleGoal,
    submit,
  }
}
