<script setup lang="ts">
import { computed } from 'vue'
import { site, whatsappLink, firstDayMessage } from '@/config/site'
import { useTaggedPhotos } from '@/composables/useTaggedPhotos'
import { useSlideshow } from '@/composables/useSlideshow'
import HeroMedia from './HeroMedia.vue'
import HeroRail from './HeroRail.vue'

const { photos } = useTaggedPhotos('hero', 5)
const count = computed(() => photos.value.length)
const active = useSlideshow(count, 7000)
</script>

<template>
  <section class="hero" aria-label="Portada">
    <HeroMedia :photos="photos" :active="active" />

    <div class="hero__content">
      <p class="hero__eyebrow">
        <span class="hero__dot" aria-hidden="true"></span>
        {{ site.hero.eyebrow }}
      </p>
      <h1 class="hero__title">
        <span v-for="(line, i) in site.hero.title" :key="line" class="hero__line">
          <span class="hero__line-inner" :class="{ 'hero__line-inner--outline': i === 1 }" :style="{ '--i': i }">
            {{ line }}
          </span>
        </span>
      </h1>
      <div class="hero__bottom">
        <p class="hero__lead">{{ site.hero.lead }}</p>
        <div class="hero__ctas">
          <RouterLink :to="site.cta.to" class="btn btn--primary">
            {{ site.hero.primary }} <i class="fa-solid fa-arrow-right"></i>
          </RouterLink>
          <a :href="whatsappLink(firstDayMessage)" class="btn btn--ghost hero__ghost" target="_blank" rel="noopener">
            <i class="fa-brands fa-whatsapp"></i> {{ site.hero.secondary }}
          </a>
        </div>
      </div>
    </div>

    <HeroRail :count="count" :active="active" />
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 100svh;
  @include flex(column, stretch, flex-end);
  overflow: hidden;
  isolation: isolate;
  background: $carbon;

  &__content {
    @include container(1320px);
    padding-top: 110px;
    padding-bottom: 5.5rem;

    @include from('lg') {
      padding-bottom: 4rem;
    }
  }

  &__eyebrow {
    @include eyebrow;
    color: $bone;
    @include flex(row, center, flex-start, 0.6rem);
    margin-bottom: 1.2rem;
    animation: fade-up 0.8s $ease 0.1s both;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $accent;
    box-shadow: 0 0 0 4px rgba($accent, 0.25);
  }

  &__title {
    font-family: $font-display;
    font-size: min(max(#{$display-xl}, 22vw), 19svh);
    line-height: 0.88;
    letter-spacing: 0.005em;
    @include flex(column, flex-start, flex-start);
    margin-bottom: 1.6rem;
  }

  &__line {
    display: block;
    overflow: hidden;
    // Anton tiene ascendentes altas: sin este aire la máscara corta las tildes.
    padding-top: 0.06em;
  }

  &__line-inner {
    display: block;
    animation: line-up 1s $ease both;
    animation-delay: calc(var(--i) * 110ms + 200ms);

    &--outline {
      color: transparent;
      -webkit-text-stroke: 2px $bone;

      @include from('md') {
        -webkit-text-stroke-width: 3px;
      }
    }
  }

  &__bottom {
    @include flex(column, flex-start, flex-start, 1.6rem);
    animation: fade-up 0.9s $ease 0.65s both;

    @include from('lg') {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
      gap: 3rem;
    }
  }

  &__lead {
    max-width: 34rem;
    color: rgba($bone, 0.86);
    font-size: $text-lg;
    line-height: 1.5;
  }

  &__ctas {
    @include flex(column, stretch, flex-start, 0.75rem);
    width: 100%;

    @include from('sm') {
      flex-direction: row;
      width: auto;
      flex-wrap: wrap;
    }
  }

  &__ghost {
    background: rgba($night, 0.35);
    backdrop-filter: blur(8px);
  }
}

@keyframes line-up {
  from {
    transform: translateY(105%);
  }
  to {
    transform: none;
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
