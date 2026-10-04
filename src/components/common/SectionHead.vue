<script setup lang="ts">
// Encabezado de sección: eyebrow mono con el techo del escudo como marca, titular en Anton.
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    text?: string
    align?: 'left' | 'center'
    as?: 'h1' | 'h2'
    size?: 'md' | 'lg'
    titleId?: string
  }>(),
  { align: 'left', as: 'h2', size: 'lg', text: '' },
)
</script>

<template>
  <header class="section-head" :class="[`section-head--${align}`, `section-head--${size}`]">
    <p class="section-head__eyebrow" v-reveal>
      <svg class="section-head__roof" viewBox="0 0 20 10" aria-hidden="true">
        <path d="M1 9V5L10 1L19 5V9" fill="none" stroke="currentColor" stroke-width="2.4" />
      </svg>
      {{ eyebrow }}
    </p>
    <component :is="as" :id="titleId" class="section-head__title" v-reveal="80">{{ title }}</component>
    <p v-if="text" class="section-head__text" v-reveal="160">{{ text }}</p>
    <slot />
  </header>
</template>

<style scoped lang="scss">
.section-head {
  @include flex(column, flex-start, flex-start, 1rem);
  max-width: 52rem;

  &--center {
    align-items: center;
    text-align: center;
    margin-inline: auto;
  }

  &__eyebrow {
    @include eyebrow;
    @include flex(row, center, flex-start, 0.6rem);
  }

  &__roof {
    width: 1.1rem;
    height: auto;
    flex-shrink: 0;
  }

  &__title {
    @include display($display-lg);
    color: $bone;
  }

  &--md &__title {
    font-size: $display-md;
  }

  &__text {
    color: $bone-soft;
    font-size: $text-lg;
    max-width: 38rem;
    line-height: 1.55;
  }
}
</style>
