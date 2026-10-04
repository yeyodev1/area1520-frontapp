<script setup lang="ts">
import { ref } from 'vue'
import SectionHead from '@/components/common/SectionHead.vue'
import PhotoLightbox from '@/components/gallery/PhotoLightbox.vue'
import { useTaggedPhotos } from '@/composables/useTaggedPhotos'
import { useLightbox } from '@/composables/useLightbox'
import { cloudinaryThumb } from '@/utils/cloudinary'
import { photoAlt } from '@/utils/photo'

const COPY = { eyebrow: 'Ganadores', title: 'Podios' }

const { photos } = useTaggedPhotos('podium', 8)
const lightbox = useLightbox(photos)
const strip = ref<HTMLElement | null>(null)

function scroll(direction: 1 | -1) {
  const el = strip.value
  if (!el) return
  el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
}
</script>

<template>
  <section v-if="photos.length" class="podiums" aria-labelledby="podiums-title">
    <div class="podiums__head">
      <SectionHead :eyebrow="COPY.eyebrow" :title="COPY.title" size="md" title-id="podiums-title" />
      <div class="podiums__arrows">
        <button type="button" class="podiums__arrow" aria-label="Podios anteriores" @click="scroll(-1)">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <button type="button" class="podiums__arrow" aria-label="Más podios" @click="scroll(1)">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>

    <div ref="strip" class="podiums__strip">
      <button
        v-for="(photo, i) in photos"
        :key="photo._id"
        type="button"
        class="podiums__item"
        :aria-label="`Ver ${photoAlt(photo, i + 1).toLowerCase()} en grande`"
        @click="lightbox.open(i)"
      >
        <img
          :src="cloudinaryThumb(photo.publicId, 480, 640)"
          :alt="photoAlt(photo, i + 1)"
          width="480"
          height="640"
          loading="lazy"
          decoding="async"
        />
        <span class="podiums__index" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
      </button>
    </div>

    <PhotoLightbox
      :photo="lightbox.current.value ?? null"
      :index="lightbox.index.value"
      :total="photos.length"
      :loaded="photos.length"
      @close="lightbox.close"
      @next="lightbox.next"
      @prev="lightbox.prev"
    />
  </section>
</template>

<style scoped lang="scss">
.podiums {
  padding-block: $space-section 0;

  &__head {
    @include container(1320px);
    @include flex(row, flex-end, space-between, 1rem);
    margin-bottom: $space-lg;
  }

  &__arrows {
    display: none;

    @include from('md') {
      @include flex(row, center, flex-end, 0.5rem);
    }
  }

  &__arrow {
    @include flex(row, center, center);
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 1px solid $line-strong;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease,
      transform 0.15s ease-out;

    &:hover {
      background: $accent;
      border-color: $accent;
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &__strip {
    @include flex(row, stretch, flex-start, 0.75rem);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    padding-inline: max(1.25rem, calc((100vw - 1320px) / 2 + 2rem));
    scroll-padding-inline: max(1.25rem, calc((100vw - 1320px) / 2 + 2rem));

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__item {
    position: relative;
    flex: 0 0 68%;
    max-width: 340px;
    aspect-ratio: 3 / 4;
    scroll-snap-align: start;
    overflow: hidden;
    border-radius: $radius-sm;
    background: $steel;
    cursor: zoom-in;

    @include from('md') {
      flex-basis: 30%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.8s $ease;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover img {
        transform: scale(1.05);
      }
    }
  }

  &__index {
    position: absolute;
    left: 0.8rem;
    bottom: 0.7rem;
    font-family: $font-display;
    font-size: 2.6rem;
    line-height: 1;
    color: $bone;
    text-shadow: 0 2px 20px rgba(#000, 0.6);
  }
}
</style>
