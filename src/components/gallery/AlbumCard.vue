<script setup lang="ts">
import { computed } from 'vue'
import { cloudinaryThumb } from '@/utils/cloudinary'
import { formatDate } from '@/utils/format'
import type { Album } from '@/types'

const props = defineProps<{ album: Album }>()

const date = computed(() => (props.album.eventDate ? formatDate(props.album.eventDate) : ''))
const count = computed(() => new Intl.NumberFormat('es-EC').format(props.album.photoCount))
</script>

<template>
  <RouterLink :to="`/galeria/${album.slug}`" class="album-card">
    <div class="album-card__cover">
      <img
        v-if="album.coverPublicId"
        :src="cloudinaryThumb(album.coverPublicId, 800, 1000)"
        :srcset="`${cloudinaryThumb(album.coverPublicId, 480, 600)} 480w, ${cloudinaryThumb(album.coverPublicId, 800, 1000)} 800w`"
        sizes="(min-width: 768px) 45vw, 92vw"
        :alt="`Portada del álbum ${album.title} de ${album.eventName}`"
        width="800"
        height="1000"
        loading="lazy"
        decoding="async"
      />
      <span class="album-card__count"><i class="fa-regular fa-images"></i> {{ count }} fotos</span>
    </div>
    <div class="album-card__body">
      <p class="album-card__event">{{ album.eventName }}<template v-if="date"> · {{ date }}</template></p>
      <h2 class="album-card__title">{{ album.title }}</h2>
      <span class="album-card__arrow" aria-hidden="true"><i class="fa-solid fa-arrow-right"></i></span>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.album-card {
  position: relative;
  display: block;
  border-radius: $radius-md;
  overflow: hidden;
  background: $steel;
  border: 1px solid $line;
  transition:
    border-color 0.3s ease,
    opacity 0.8s $ease,
    transform 0.8s $ease;

  &__cover {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(0deg, rgba($night, 0.95), rgba($night, 0) 55%);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 1s $ease;
    }
  }

  &__count {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 1;
    font-family: $font-mono;
    font-size: 0.72rem;
    padding: 0.35rem 0.7rem;
    border-radius: $radius-pill;
    background: rgba($night, 0.7);
    backdrop-filter: blur(6px);
  }

  &__body {
    position: absolute;
    inset: auto 0 0;
    // Deja libre el carril de la flecha.
    padding: 1.5rem 5.5rem 1.5rem 1.5rem;
    @include flex(column, flex-start, flex-end, 0.4rem);
  }

  &__event {
    @include eyebrow;
  }

  &__title {
    @include display($display-md);
    font-size: clamp(2.6rem, 1.8rem + 3vw, 4.2rem);
  }

  &__arrow {
    position: absolute;
    right: 1.5rem;
    bottom: 1.6rem;
    @include flex(row, center, center);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: $accent;
    color: $white;
    transition: transform 0.4s $ease;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: $accent;
    }

    &:hover img {
      transform: scale(1.05);
    }

    &:hover .album-card__arrow {
      transform: rotate(-45deg);
    }
  }
}
</style>
