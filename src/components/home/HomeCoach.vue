<script setup lang="ts">
import { computed } from 'vue'
import { site } from '@/config/site'
import { useTaggedPhotos } from '@/composables/useTaggedPhotos'
import { cloudinaryThumb } from '@/utils/cloudinary'
import { photoAlt } from '@/utils/photo'

const { photos } = useTaggedPhotos('coach', 4)
const main = computed(() => photos.value[0])
const nameParts = site.coach.name.split(' ')
</script>

<template>
  <section class="coach" aria-labelledby="coach-title">
    <div class="coach__inner">
      <div class="coach__media" v-reveal>
        <div class="coach__frame">
          <img
            v-if="main"
            :src="cloudinaryThumb(main.publicId, 720, 900)"
            :srcset="`${cloudinaryThumb(main.publicId, 480, 600)} 480w, ${cloudinaryThumb(main.publicId, 720, 900)} 720w`"
            sizes="(min-width: 1024px) 40vw, 90vw"
            :alt="photoAlt(main)"
            width="720"
            height="900"
            loading="lazy"
            decoding="async"
          />
        </div>
        <span class="coach__badge">{{ site.coach.eyebrow }}</span>
      </div>

      <div class="coach__copy">
        <p class="coach__eyebrow" v-reveal>{{ site.coach.title }}</p>
        <h2 id="coach-title" class="coach__name" v-reveal="80">
          <span v-for="part in nameParts" :key="part">{{ part }}</span>
        </h2>
        <a :href="site.coach.instagram" class="coach__handle" target="_blank" rel="noopener" v-reveal="140">
          <i class="fa-brands fa-instagram"></i> {{ site.coach.handle }}
        </a>
        <p class="coach__text" v-reveal="180">{{ site.coach.text }}</p>
        <ul class="coach__credentials">
          <li v-for="(item, i) in site.coach.credentials" :key="item.label" v-reveal="200 + i * 70">
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.coach {
  background: $carbon;
  padding-block: $space-section;
  overflow: hidden;

  &__inner {
    @include container(1320px);
    @include flex(column, stretch, flex-start, $space-xl);

    @include from('lg') {
      flex-direction: row;
      align-items: center;
      gap: 5rem;
    }
  }

  &__media {
    position: relative;
    flex: 0 0 auto;
    width: min(calc(100% - 14px), 460px);
    margin-inline: auto;

    @include from('lg') {
      width: 40%;
      max-width: 500px;
    }
  }

  &__frame {
    position: relative;
    aspect-ratio: 4 / 5;
    border-radius: $radius-sm;
    overflow: hidden;
    background: $steel;
    // Bloque naranja desplazado detrás: el "techo" del escudo hecho marco.
    box-shadow: 10px 10px 0 $accent;

    @include from('md') {
      box-shadow: 14px 14px 0 $accent;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__badge {
    position: absolute;
    left: -0.5rem;
    top: 1.5rem;
    background: $bone;
    color: $night;
    font-family: $font-mono;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 0.45rem 0.8rem;
  }

  &__copy {
    flex: 1;
    min-width: 0;
    @include flex(column, flex-start, flex-start, 1.2rem);
  }

  &__eyebrow {
    @include eyebrow;
  }

  &__name {
    @include flex(column, flex-start, flex-start);
    font-family: $font-display;
    font-size: clamp(3.4rem, 1.2rem + 9vw, 8.5rem);
    // Aire para las tildes (CRISTÓBAL, GERMÁN): con 0.88 se montan sobre la línea de arriba.
    line-height: 0.98;
    padding-top: 0.12em;

    span:last-child {
      color: transparent;
      -webkit-text-stroke: 2px $bone;
    }
  }

  &__handle {
    @include flex(row, center, flex-start, 0.5rem);
    font-family: $font-mono;
    font-size: 0.85rem;
    color: $accent;
    padding: 0.4rem 0;
    transition: color 0.2s ease;

    &:hover {
      color: $bone;
    }
  }

  &__text {
    color: $bone-soft;
    font-size: $text-lg;
    max-width: 36rem;
    line-height: 1.55;
  }

  &__credentials {
    list-style: none;
    width: 100%;
    max-width: 36rem;
    border-top: 1px solid $line;

    li {
      @include flex(row, center, flex-start, 0.9rem);
      padding-block: 0.85rem;
      border-bottom: 1px solid $line;
      font-weight: 500;
    }

    i {
      width: 1.2rem;
      color: $accent;
      text-align: center;
    }
  }
}
</style>
