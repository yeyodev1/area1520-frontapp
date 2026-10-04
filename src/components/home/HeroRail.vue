<script setup lang="ts">
// Contador de la portada (sí es una secuencia: foto 02 de 05) + indicador de scroll.
defineProps<{ count: number; active: number }>()

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div class="hero-rail">
    <p v-if="count > 1" class="hero-rail__counter" aria-hidden="true">
      <span>{{ pad(active + 1) }}</span>
      <span class="hero-rail__bars">
        <span
          v-for="i in count"
          :key="i"
          class="hero-rail__bar"
          :class="{ 'hero-rail__bar--active': i - 1 === active, 'hero-rail__bar--done': i - 1 < active }"
        ></span>
      </span>
      <span>{{ pad(count) }}</span>
    </p>
    <a href="#box" class="hero-rail__scroll">
      <span>Desliza</span>
      <span class="hero-rail__line" aria-hidden="true"></span>
    </a>
  </div>
</template>

<style scoped lang="scss">
.hero-rail {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 1.4rem;
  @include container(1320px);
  @include flex(row, center, space-between);

  @include from('lg') {
    bottom: auto;
    top: 50%;
    left: auto;
    right: 0;
    width: auto;
    flex-direction: column;
    gap: 2rem;
    transform: translateY(-50%);
  }

  &__counter {
    @include flex(row, center, flex-start, 0.75rem);
    font-family: $font-mono;
    font-size: 0.7rem;
    color: $bone-soft;

    @include from('lg') {
      flex-direction: column;
    }
  }

  &__bars {
    @include flex(row, center, flex-start, 4px);

    @include from('lg') {
      flex-direction: column;
    }
  }

  &__bar {
    width: 18px;
    height: 2px;
    background: rgba($bone, 0.25);
    transition: background-color 0.4s ease;

    @include from('lg') {
      width: 2px;
      height: 18px;
    }

    &--done {
      background: rgba($bone, 0.6);
    }

    &--active {
      background: $accent;
    }
  }

  &__scroll {
    @include flex(row, center, flex-start, 0.6rem);
    font-family: $font-mono;
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: $bone-soft;
    padding: 0.5rem 0;

    @include from('lg') {
      flex-direction: column;
      writing-mode: vertical-rl;
    }
  }

  &__line {
    position: relative;
    width: 36px;
    height: 1px;
    background: rgba($bone, 0.25);
    overflow: hidden;

    @include from('lg') {
      width: 1px;
      height: 48px;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: $accent;
      animation: scroll-hint 2.2s $ease infinite;
    }
  }
}

@keyframes scroll-hint {
  from {
    transform: translate(-100%, -100%);
  }
  to {
    transform: translate(100%, 100%);
  }
}
</style>
