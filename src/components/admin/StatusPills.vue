<script setup lang="ts">
import { leadStatuses } from './adminCopy'
import type { LeadStatus } from '@/types'

defineProps<{ modelValue: LeadStatus | ''; counts?: Partial<Record<LeadStatus | '', number>> }>()
const emit = defineEmits<{ 'update:modelValue': [value: LeadStatus | ''] }>()

const options = [{ value: '' as const, label: 'Todos', icon: 'fa-solid fa-list' }, ...leadStatuses]
</script>

<template>
  <div class="pills" role="group" aria-label="Filtrar por estado">
    <button
      v-for="o in options"
      :key="o.value"
      type="button"
      class="pills__pill"
      :class="[`pills__pill--${o.value || 'all'}`, { 'is-active': modelValue === o.value }]"
      :aria-pressed="modelValue === o.value"
      @click="emit('update:modelValue', o.value)"
    >
      {{ o.label }}
      <span v-if="counts?.[o.value] !== undefined" class="pills__count">{{ counts[o.value] }}</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
$status-colors: (
  'all': $bone,
  'nuevo': $accent,
  'contactado': $info,
  'agendado': $warning,
  'inscrito': $success,
  'descartado': $bone-muted,
);

.pills {
  // En móvil se desliza en horizontal en vez de ocupar tres filas.
  @include flex(row, center, flex-start, 0.45rem);
  overflow-x: auto;
  scrollbar-width: none;
  margin-inline: -1rem;
  padding: 0.1rem 1rem 0.3rem;

  &::-webkit-scrollbar {
    display: none;
  }

  @include from('md') {
    flex-wrap: wrap;
    margin-inline: 0;
    padding-inline: 0;
  }

  &__pill {
    @include flex(row, center, center, 0.4rem);
    flex: 0 0 auto;
    min-height: 38px;
    padding: 0 0.95rem;
    border-radius: $radius-pill;
    border: 1px solid $line-strong;
    font-size: 0.78rem;
    font-weight: 600;
    color: $bone-soft;
    @include transition(background);

    @each $name, $color in $status-colors {
      &--#{$name}.is-active {
        color: if($name == 'all', $night, $color);
        background: if($name == 'all', $bone, rgba($color, 0.16));
        border-color: $color;
      }
    }
  }

  &__count {
    font-family: $font-mono;
    font-size: 0.68rem;
    padding: 0.05rem 0.4rem;
    border-radius: $radius-pill;
    background: rgba($white, 0.1);
  }
}
</style>
