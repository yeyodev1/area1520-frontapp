<script setup lang="ts">
import { cloudinaryThumb } from '@/utils/cloudinary'
import type { Photo } from '@/types'

defineProps<{
  number: string
  name: string
  tag: string
  text: string
  points: readonly string[]
  photo?: Photo
}>()
</script>

<template>
  <article class="program">
    <img
      v-if="photo"
      class="program__bg"
      :src="cloudinaryThumb(photo.publicId, 720, 900)"
      alt=""
      width="720"
      height="900"
      loading="lazy"
      decoding="async"
    />
    <div class="program__body">
      <div class="program__top">
        <span class="program__number">{{ number }}</span>
        <span class="program__tag">{{ tag }}</span>
      </div>
      <h3 class="program__name">{{ name }}</h3>
      <p class="program__text">{{ text }}</p>
      <ul class="program__points">
        <li v-for="point in points" :key="point">
          <i class="fa-solid fa-check"></i>
          {{ point }}
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped lang="scss">
.program {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  min-height: 420px;
  border: 1px solid $line;
  border-radius: $radius-md;
  background: $steel;
  @include flex(column, stretch, flex-end);
  // opacity también: la tarjeta entra con v-reveal y esta regla pisa su transición.
  transition:
    border-color 0.35s ease,
    opacity 0.8s $ease,
    transform 0.6s $ease;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(0deg, rgba($night, 0.97) 30%, rgba($night, 0.55) 70%, rgba($night, 0.35));
  }

  &__bg {
    position: absolute;
    inset: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1) brightness(0.7);
    transform: scale(1.04);
    transition:
      filter 0.7s ease,
      transform 1.2s $ease;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: $accent;
      transform: translateY(-4px);
    }

    &:hover &__bg {
      filter: grayscale(0) brightness(0.95);
      transform: scale(1.1);
    }

    &:hover &__number {
      color: $accent;
    }
  }

  &__body {
    @include flex(column, flex-start, flex-end, 0.9rem);
    padding: 1.6rem;
    flex: 1;

    @include from('md') {
      padding: 2rem;
    }
  }

  &__top {
    @include flex(row, center, space-between, 1rem);
    width: 100%;
    margin-bottom: auto;
  }

  &__number {
    font-family: $font-mono;
    font-size: 0.8rem;
    color: $bone-soft;
    transition: color 0.3s ease;
  }

  &__tag {
    font-family: $font-mono;
    font-size: 0.66rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    padding: 0.35rem 0.65rem;
    border: 1px solid $line-strong;
    border-radius: $radius-pill;
    background: rgba($night, 0.5);
    backdrop-filter: blur(6px);
  }

  &__name {
    @include display($display-md);
    font-size: clamp(2.4rem, 1.6rem + 3vw, 3.8rem);
  }

  &__text {
    color: $bone-soft;
    max-width: 30rem;
  }

  &__points {
    list-style: none;
    @include flex(row, center, flex-start, 0.4rem 1.1rem);
    flex-wrap: wrap;
    font-family: $font-mono;
    font-size: 0.72rem;
    color: $bone;

    i {
      color: $accent;
      margin-right: 0.3rem;
    }
  }
}
</style>
