<script setup lang="ts">
import { ref } from 'vue'
import { useCountUp } from '@/composables/useCountUp'

const props = defineProps<{ value: string; label: string }>()

const el = ref<HTMLElement | null>(null)
const display = useCountUp(el, props.value)
</script>

<template>
  <div ref="el" class="stat">
    <!-- El lector de pantalla oye el valor final, no la cuenta. -->
    <p class="stat__value" aria-hidden="true">{{ display }}</p>
    <p class="visually-hidden">{{ value }}</p>
    <p class="stat__label">{{ label }}</p>
  </div>
</template>

<style scoped lang="scss">
.stat {
  @include flex(column, flex-start, flex-end, 0.5rem);
  padding: 1.4rem 0 0;
  border-top: 1px solid $line-strong;

  &__value {
    font-family: $font-display;
    font-size: clamp(3.4rem, 1.6rem + 6vw, 7rem);
    line-height: 0.85;
    color: $bone;
    font-variant-numeric: tabular-nums;
  }

  &__label {
    font-family: $font-mono;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: $bone-muted;
  }
}
</style>
