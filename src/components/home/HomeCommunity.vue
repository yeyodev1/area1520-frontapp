<script setup lang="ts">
import { site } from '@/config/site'
import SectionHead from '@/components/common/SectionHead.vue'
import { useTaggedPhotos } from '@/composables/useTaggedPhotos'
import { cloudinaryThumb } from '@/utils/cloudinary'
import { photoAlt } from '@/utils/photo'

const { photos } = useTaggedPhotos('community', 12)

// Alto fijo y ancho según la proporción real: verticales y horizontales conviven en la tira.
const H = 520
const widthFor = (w: number, h: number) => Math.round((H * w) / h)
</script>

<template>
  <section class="community" aria-labelledby="community-title">
    <div class="community__head">
      <SectionHead :eyebrow="site.community.eyebrow" :title="site.community.title" :text="site.community.text" title-id="community-title" />
    </div>

    <div class="community__viewport">
      <div class="community__track">
        <template v-for="copy in 2" :key="copy">
          <figure
            v-for="(photo, i) in photos"
            :key="`${copy}-${photo._id}`"
            class="community__item"
            :class="{ 'community__item--clone': copy === 2 }"
            :aria-hidden="copy === 2 ? 'true' : undefined"
          >
            <img
              :src="cloudinaryThumb(photo.publicId, widthFor(photo.width, photo.height), H)"
              :alt="copy === 1 ? photoAlt(photo, i + 1) : ''"
              :width="widthFor(photo.width, photo.height)"
              :height="H"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.community {
  padding-block: $space-section;
  background: $carbon;
  overflow: hidden;

  &__head {
    @include container(1320px);
    margin-bottom: $space-lg;
  }

  // Móvil: tira con scroll-snap que se maneja con el dedo.
  &__viewport {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    padding-inline: 1.25rem;
    scroll-padding-inline: 1.25rem;

    &::-webkit-scrollbar {
      display: none;
    }

    @include from('lg') {
      overflow: hidden;
      padding-inline: 0;
    }
  }

  &__track {
    @include flex(row, stretch, flex-start, 0.75rem);
    width: max-content;

    @include from('lg') {
      gap: 1rem;
      animation: drift 70s linear infinite;

      &:hover {
        animation-play-state: paused;
      }
    }
  }

  &__item {
    flex-shrink: 0;
    height: 260px;
    scroll-snap-align: start;
    border-radius: $radius-sm;
    overflow: hidden;
    background: $steel;

    @include from('lg') {
      height: 420px;
    }

    img {
      height: 100%;
      width: auto;
      object-fit: cover;
    }

    &--clone {
      display: none;

      @include from('lg') {
        display: block;
      }
    }
  }

  @include reduced-motion {
    &__track {
      animation: none;
    }

    &__viewport {
      @include from('lg') {
        overflow-x: auto;
      }
    }
  }
}

// Mitad del track = N fotos + N huecos de 1rem: por eso el medio rem extra.
@keyframes drift {
  to {
    transform: translate3d(calc(-50% - 0.5rem), 0, 0);
  }
}
</style>
