<script setup lang="ts">
import { toRef } from 'vue'
import { useMasonry } from '@/composables/useMasonry'
import { useBreakpointColumns } from '@/composables/useBreakpointColumns'
import { cloudinarySrcset, cloudinaryUrl } from '@/utils/cloudinary'
import { photoAlt } from '@/utils/photo'
import type { Photo } from '@/types'

const props = defineProps<{ photos: Photo[] }>()
const emit = defineEmits<{ open: [index: number] }>()

const columnCount = useBreakpointColumns()
const columns = useMasonry(toRef(props, 'photos'), columnCount)
</script>

<template>
  <div class="masonry">
    <div v-for="(column, c) in columns" :key="c" class="masonry__col">
      <button
        v-for="item in column"
        :key="item.photo._id"
        type="button"
        class="masonry__item"
        :style="{ aspectRatio: `${item.photo.width} / ${item.photo.height}` }"
        :aria-label="`Ver ${photoAlt(item.photo, item.index + 1).toLowerCase()} en grande`"
        @click="emit('open', item.index)"
      >
        <img
          :src="cloudinaryUrl(item.photo.publicId, { width: 520 })"
          :srcset="cloudinarySrcset(item.photo.publicId, [320, 520, 800])"
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 31vw, 48vw"
          :alt="photoAlt(item.photo, item.index + 1)"
          :width="item.photo.width"
          :height="item.photo.height"
          loading="lazy"
          decoding="async"
        />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.masonry {
  @include flex(row, flex-start, flex-start, 0.5rem);

  @include from('md') {
    gap: 0.75rem;
  }

  &__col {
    flex: 1 1 0;
    min-width: 0;
    @include flex(column, stretch, flex-start, 0.5rem);

    @include from('md') {
      gap: 0.75rem;
    }
  }

  &__item {
    position: relative;
    display: block;
    width: 100%;
    overflow: hidden;
    border-radius: $radius-sm;
    background: $steel;
    cursor: zoom-in;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition:
        transform 0.6s $ease,
        opacity 0.4s ease;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border: 2px solid transparent;
      border-radius: inherit;
      transition: border-color 0.2s ease;
      pointer-events: none;
    }

    &:focus-visible {
      outline: 2px solid $accent;
      outline-offset: 2px;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover img {
        transform: scale(1.04);
      }

      &:hover::after {
        border-color: $accent;
      }
    }
  }
}
</style>
