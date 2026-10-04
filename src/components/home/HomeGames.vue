<script setup lang="ts">
import { computed } from 'vue'
import { site } from '@/config/site'
import { useTaggedPhotos } from '@/composables/useTaggedPhotos'
import { cloudinaryThumb } from '@/utils/cloudinary'
import { photoAlt } from '@/utils/photo'
import type { Photo } from '@/types'

const featured = useTaggedPhotos('featured', 24).photos
const podium = useTaggedPhotos('podium', 8).photos
const medals = useTaggedPhotos('medals', 3).photos

// Mosaico en tres columnas flex; cada columna con su propio ritmo de alturas.
const columns = computed(() => {
  const pick = (list: Photo[], i: number) => list[i]
  const cols: { photo: Photo | undefined; h: number }[][] = [
    [
      { photo: pick(featured.value, 6), h: 300 },
      { photo: pick(medals.value, 0), h: 420 },
    ],
    [
      { photo: pick(podium.value, 0), h: 520 },
      { photo: pick(featured.value, 8), h: 260 },
    ],
    [
      { photo: pick(featured.value, 7), h: 420 },
      { photo: pick(podium.value, 2), h: 300 },
    ],
  ]
  return cols.map((col) => col.filter((cell) => cell.photo) as { photo: Photo; h: number }[])
})
</script>

<template>
  <section class="games" aria-labelledby="games-title">
    <div class="games__inner">
      <div class="games__copy">
        <p class="games__eyebrow" v-reveal>
          <span class="games__live" aria-hidden="true"></span>
          {{ site.games.eyebrow }}
        </p>
        <h2 id="games-title" class="games__title" v-reveal="80">{{ site.games.title }}</h2>
        <p class="games__date" v-reveal="120">
          <i class="fa-regular fa-calendar"></i> {{ site.games.date }}
        </p>
        <p class="games__text" v-reveal="160">{{ site.games.text }}</p>

        <dl class="games__highlights" v-reveal="200">
          <div v-for="item in site.games.highlights" :key="item.label" class="games__highlight">
            <dt>{{ item.label }}</dt>
            <dd>{{ item.value }}</dd>
          </div>
        </dl>

        <div class="games__actions" v-reveal="240">
          <RouterLink to="/area-games-2026" class="btn btn--primary">
            {{ site.games.cta }} <i class="fa-solid fa-arrow-right"></i>
          </RouterLink>
          <a :href="site.games.creditUrl" class="games__credit" target="_blank" rel="noopener">
            <i class="fa-solid fa-camera"></i> {{ site.games.credit }}
          </a>
        </div>
      </div>

      <RouterLink to="/area-games-2026" class="games__mosaic" aria-label="Ver la galería de AREA Games 2026">
        <div v-for="(col, c) in columns" :key="c" class="games__col">
          <div v-for="cell in col" :key="cell.photo._id" class="games__cell" :style="{ aspectRatio: `400 / ${cell.h}` }">
            <img
              :src="cloudinaryThumb(cell.photo.publicId, 400, cell.h)"
              :alt="photoAlt(cell.photo)"
              width="400"
              :height="cell.h"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.games {
  position: relative;
  background:
    radial-gradient(ellipse 60% 50% at 85% 20%, rgba($navy, 0.7), transparent 70%),
    $night;
  padding-block: $space-section;
  overflow: hidden;
  border-block: 1px solid $line;

  &__inner {
    @include container(1320px);
    @include flex(column, stretch, flex-start, $space-xl);

    @include from('lg') {
      flex-direction: row;
      align-items: center;
      gap: 4rem;
    }
  }

  &__copy {
    flex: 1 1 45%;
    min-width: 0;
    @include flex(column, flex-start, flex-start, 1.2rem);
  }

  &__eyebrow {
    @include eyebrow;
    color: $tape;
    @include flex(row, center, flex-start, 0.6rem);
  }

  &__live {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $tape;
  }

  &__title {
    @include display($display-lg);
  }

  &__date {
    font-family: $font-mono;
    font-size: 0.85rem;
    color: $bone;
    @include flex(row, center, flex-start, 0.5rem);

    i {
      color: $accent;
    }
  }

  &__text {
    color: $bone-soft;
    max-width: 34rem;
  }

  &__highlights {
    @include flex(row, stretch, flex-start);
    width: 100%;
    margin-block: 0.8rem;
    border-block: 1px solid $line-strong;
  }

  &__highlight {
    flex: 1;
    @include flex(column-reverse, flex-start, flex-end, 0.3rem);
    padding: 1rem 0.75rem 1rem 0;

    & + & {
      padding-left: 1rem;
      border-left: 1px solid $line;
    }

    dd {
      font-family: $font-display;
      font-size: clamp(2.2rem, 1.4rem + 3vw, 3.6rem);
      line-height: 0.9;
    }

    dt {
      font-family: $font-mono;
      font-size: 0.66rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: $bone-muted;
    }
  }

  &__actions {
    @include flex(column, flex-start, flex-start, 1.1rem);

    @include from('sm') {
      flex-direction: row;
      align-items: center;
      gap: 1.6rem;
    }
  }

  &__credit {
    font-family: $font-mono;
    font-size: 0.75rem;
    color: $bone-soft;
    text-decoration: underline;
    text-decoration-color: $line-strong;
    text-underline-offset: 4px;
    padding-block: 0.5rem;

    &:hover {
      color: $bone;
    }
  }

  &__mosaic {
    flex: 1 1 55%;
    min-width: 0;
    @include flex(row, flex-start, flex-start, 0.6rem);

    @include from('md') {
      gap: 0.9rem;
    }
  }

  &__col {
    flex: 1;
    min-width: 0;
    @include flex(column, stretch, flex-start, 0.6rem);

    @include from('md') {
      gap: 0.9rem;
    }

    &:nth-child(2) {
      margin-top: 2.5rem;
    }
  }

  &__cell {
    overflow: hidden;
    border-radius: $radius-sm;
    background: $steel;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.9s $ease;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &__mosaic:hover &__cell img {
      transform: scale(1.05);
    }
  }
}
</style>
