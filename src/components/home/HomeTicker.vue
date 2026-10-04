<script setup lang="ts">
import { site } from '@/config/site'
</script>

<template>
  <div class="ticker" role="region" aria-label="Lo que somos">
    <p class="visually-hidden">{{ site.ticker.join(', ') }}</p>
    <!-- Dos copias idénticas: al moverse -50% la segunda ocupa el lugar de la primera sin salto. -->
    <div class="ticker__track" aria-hidden="true">
      <div v-for="copy in 2" :key="copy" class="ticker__group">
        <span v-for="item in site.ticker" :key="item" class="ticker__item">
          {{ item }}
          <i class="fa-solid fa-star ticker__star"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ticker {
  position: relative;
  z-index: 2;
  background: $accent;
  color: $night;
  transform: rotate(-2deg) scale(1.04);
  margin-block: -1.6rem;
  overflow: hidden;
  padding-block: 0.9rem;
  box-shadow: 0 20px 50px rgba(#000, 0.45);

  @include from('md') {
    padding-block: 1.1rem;
  }

  &__track {
    @include flex(row, center, flex-start);
    width: max-content;
    animation: marquee 38s linear infinite;
  }

  &:hover &__track {
    animation-play-state: paused;
  }

  &__group {
    @include flex(row, center, flex-start);
    flex-shrink: 0;
  }

  &__item {
    @include flex(row, center, flex-start, 1.6rem);
    padding-right: 1.6rem;
    font-family: $font-display;
    font-size: clamp(1.4rem, 1rem + 2vw, 2.6rem);
    line-height: 1;
    text-transform: uppercase;
    white-space: nowrap;
  }

  &__star {
    font-size: 0.45em;
  }

  @include reduced-motion {
    &__track {
      animation: none;
    }
  }
}

@keyframes marquee {
  to {
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
