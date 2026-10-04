<script setup lang="ts">
defineProps<{ label: string; value: number | string; icon: string; hint?: string; highlight?: boolean }>()
</script>

<template>
  <article class="stat" :class="{ 'stat--highlight': highlight }">
    <span class="stat__icon"><i :class="icon"></i></span>
    <p class="stat__value">{{ value }}</p>
    <p class="stat__label">{{ label }}</p>
    <p v-if="hint" class="stat__hint">{{ hint }}</p>
  </article>
</template>

<style scoped lang="scss">
.stat {
  @include card;
  position: relative;
  padding: 1.1rem 1.1rem 1rem;
  overflow: hidden;

  &--highlight {
    border-color: rgba($accent, 0.45);
    background: linear-gradient(160deg, rgba($accent, 0.16), $steel 60%);
  }

  &__icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: $bone-muted;
  }

  &--highlight &__icon {
    color: $accent;
  }

  &__value {
    font-family: $font-display;
    font-size: clamp(2rem, 1.6rem + 1.5vw, 2.8rem);
    line-height: 1;
  }

  &__label {
    @include eyebrow;
    color: $bone-soft;
    margin-top: 0.5rem;
    letter-spacing: 0.14em;
  }

  &__hint {
    font-size: $text-xs;
    color: $bone-muted;
    margin-top: 0.25rem;
  }
}
</style>
