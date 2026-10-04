<script setup lang="ts">
import { ref } from 'vue'
import { cloudinarySrcset, cloudinaryThumb, cloudinaryUrl } from '@/utils/cloudinary'
import type { Photo } from '@/types'

defineProps<{ photos: Photo[]; active: number }>()

// Las demás fotos se piden cuando la primera ya pintó: el LCP no compite con ellas.
const warmed = ref(false)
// Los originales del evento miden 1024 px de ancho: pedir más solo haría upscaling.
</script>

<template>
  <div class="hero-media" aria-hidden="true">
    <picture
      v-for="(photo, i) in photos"
      :key="photo._id"
      class="hero-media__slide"
      :class="{ 'hero-media__slide--active': i === active }"
    >
      <template v-if="i === 0 || warmed">
        <source
          media="(max-width: 767px)"
          :srcset="cloudinaryThumb(photo.publicId, 400, 683)"
        />
        <img
          :src="cloudinaryUrl(photo.publicId, { width: 1024 })"
          :srcset="cloudinarySrcset(photo.publicId, [640, 1024])"
          sizes="100vw"
          alt=""
          :width="photo.width"
          :height="photo.height"
          :loading="i === 0 ? 'eager' : 'lazy'"
          :fetchpriority="i === 0 ? 'high' : 'low'"
          @load="i === 0 && (warmed = true)"
        />
      </template>
    </picture>
    <div class="hero-media__shade"></div>
  </div>
</template>

<style scoped lang="scss">
.hero-media {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: $carbon;

  &__slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 1.8s ease;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1.02);
    }

    &--active {
      opacity: 1;

      img {
        animation: kenburns 9s ease-out forwards;
      }
    }
  }

  &__shade {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba($night, 0.5) 0%, rgba($night, 0) 30%),
      linear-gradient(0deg, rgba($night, 0.96) 0%, rgba($night, 0.6) 38%, rgba($night, 0.1) 70%),
      linear-gradient(90deg, rgba($night, 0.55) 0%, rgba($night, 0) 60%);
  }

  @include reduced-motion {
    &__slide--active img {
      animation: none;
    }
  }
}

@keyframes kenburns {
  from {
    transform: scale(1.12) translate3d(-1%, 1%, 0);
  }
  to {
    transform: scale(1.02);
  }
}
</style>
