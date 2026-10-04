<script setup lang="ts">
import { leadStatuses } from './adminCopy'
import type { LeadStatus } from '@/types'

defineProps<{ modelValue: LeadStatus; label?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: LeadStatus] }>()
</script>

<template>
  <select
    class="status-select"
    :class="`status-select--${modelValue}`"
    :value="modelValue"
    :aria-label="label || 'Estado'"
    @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value as LeadStatus)"
  >
    <option v-for="s in leadStatuses" :key="s.value" :value="s.value">{{ s.label }}</option>
  </select>
</template>

<style scoped lang="scss">
// El color dice en qué etapa va el interesado sin tener que leer.
$status-colors: (
  'nuevo': $accent,
  'contactado': $info,
  'agendado': $warning,
  'inscrito': $success,
  'descartado': $bone-muted,
);

.status-select {
  width: auto;
  min-width: 8.5rem;
  min-height: 38px;
  padding: 0.4rem 2rem 0.4rem 0.8rem;
  border-radius: $radius-pill;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23b8b2a8'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.85rem center;

  @each $name, $color in $status-colors {
    &--#{$name} {
      color: $color;
      background-color: rgba($color, 0.14);
      border-color: rgba($color, 0.4);
    }
  }

  option {
    background: $iron;
    color: $bone;
  }
}
</style>
