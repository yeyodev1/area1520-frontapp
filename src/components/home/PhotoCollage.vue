<script setup lang="ts">
import { computed, ref } from 'vue'
import { cloudinaryThumb } from '@/utils/cloudinary'
import { photoAlt } from '@/utils/photo'
import { useParallax } from '@/composables/useParallax'
import type { Photo } from '@/types'

// Tres recortes distintos de fotos 'featured'; la segunda flota con parallax leve.
const props = defineProps<{ photos: Photo[] }>()

const floating = ref<HTMLElement | null>(null)
useParallax(floating, 50)

const crops = [
  { w: 640, h: 860 },
  { w: 560, h: 420 },
  { w: 360, h: 360 },
] as const

const frames = computed(() =>
  props.photos.slice(0, 3).map((photo, i) => {
    const crop = crops[i] ?? crops[0]
    return {
      photo,
      ...crop,
      src: cloudinaryThumb(photo.publicId, crop.w, crop.h),
      srcset: `${cloudinaryThumb(photo.publicId, crop.w / 2, crop.h / 2)} ${crop.w / 2}w, ${cloudinaryThumb(photo.publicId, crop.w, crop.h)} ${crop.w}w`,
    }
  }),
)
</script>

<template>
  <div class="collage">
    <figure
      v-for="(frame, i) in frames"
      :key="frame.photo._id"
      class="collage__frame"
      :class="`collage__frame--${i + 1}`"
    >
      <div :ref="i === 1 ? (el) => (floating = el as HTMLElement) : undefined" class="collage__inner">
        <img
          :src="frame.src"
          :srcset="frame.srcset"
          sizes="(min-width: 1024px) 30vw, 60vw"
          :alt="photoAlt(frame.photo)"
          :width="frame.w"
          :height="frame.h"
          loading="lazy"
          decoding="async"
        />
      </div>
    </figure>
  </div>
</template>

<style scoped lang="scss">
.collage {
  position: relative;
  width: 100%;
  aspect-ratio: 5 / 6;

  &__frame {
    position: absolute;
    overflow: hidden;
    border-radius: $radius-sm;
    background: $steel;
    box-shadow: $shadow-md;

    &--1 {
      top: 0;
      right: 0;
      width: 72%;
      aspect-ratio: 640 / 860;
    }

    &--2 {
      bottom: 4%;
      left: 0;
      width: 56%;
      aspect-ratio: 4 / 3;
      z-index: 2;
      overflow: visible;
      background: none;
      box-shadow: none;
    }

    &--3 {
      top: 6%;
      left: 4%;
      width: 26%;
      aspect-ratio: 1;
      filter: grayscale(1) contrast(1.1);
    }
  }

  &__inner {
    width: 100%;
    height: 100%;
    will-change: transform;
  }

  &__frame--2 &__inner {
    border-radius: $radius-sm;
    overflow: hidden;
    outline: 6px solid $carbon;
    box-shadow: $shadow-lg;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
