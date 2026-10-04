<script setup lang="ts">
// Cabecera de páginas internas: deja aire para el header fijo y fija el titular de la página.
defineProps<{ eyebrow: string; title: string; text?: string }>()
</script>

<template>
  <header class="intro">
    <div class="intro__inner">
      <slot name="before" />
      <p class="intro__eyebrow">{{ eyebrow }}</p>
      <h1 class="intro__title">{{ title }}</h1>
      <p v-if="text" class="intro__text">{{ text }}</p>
      <slot />
    </div>
  </header>
</template>

<style scoped lang="scss">
.intro {
  padding-top: calc(76px + #{$space-xl});
  padding-bottom: $space-lg;
  border-bottom: 1px solid $line;
  background: radial-gradient(ellipse 70% 80% at 10% 0%, rgba($navy, 0.55), transparent 70%);

  &__inner {
    @include container(1320px);
    @include flex(column, flex-start, flex-start, 1rem);
  }

  &__eyebrow {
    @include eyebrow;
    animation: intro-in 0.7s $ease both;
  }

  &__title {
    @include display($display-lg);
    font-size: clamp(3.2rem, 1.4rem + 8vw, 8.5rem);
    line-height: 0.9;
    animation: intro-in 0.8s $ease 0.08s both;
  }

  &__text {
    color: $bone-soft;
    font-size: $text-lg;
    max-width: 40rem;
    animation: intro-in 0.8s $ease 0.16s both;
  }
}

@keyframes intro-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
}
</style>
