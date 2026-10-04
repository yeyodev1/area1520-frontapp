<script setup lang="ts">
import { computed } from 'vue'
import { site } from '@/config/site'
import { useTaggedPhotos } from '@/composables/useTaggedPhotos'
import { cloudinaryThumb } from '@/utils/cloudinary'
import { photoAlt } from '@/utils/photo'

const medals = useTaggedPhotos('medals', 3).photos
const podium = useTaggedPhotos('podium', 8).photos
const photo = computed(() => medals.value[0] ?? podium.value[0])

const [teamA, teamB] = site.games.title.split(' vs ')
</script>

<template>
  <section class="games-hero">
    <div class="games-hero__media">
      <img
        v-if="photo"
        :src="cloudinaryThumb(photo.publicId, 900, 1200)"
        :srcset="`${cloudinaryThumb(photo.publicId, 600, 800)} 600w, ${cloudinaryThumb(photo.publicId, 900, 1200)} 900w`"
        sizes="(min-width: 1024px) 45vw, 100vw"
        :alt="photoAlt(photo)"
        width="900"
        height="1200"
        fetchpriority="high"
      />
    </div>

    <div class="games-hero__inner">
      <div class="games-hero__copy">
        <p class="games-hero__eyebrow">{{ site.games.eyebrow }}</p>
        <h1 class="games-hero__title">
          <span>{{ teamA }}</span>
          <span class="games-hero__vs">vs</span>
          <span>{{ teamB }}</span>
        </h1>
        <p class="games-hero__date"><i class="fa-regular fa-calendar"></i> {{ site.games.date }}</p>
        <p class="games-hero__text">{{ site.games.text }}</p>
        <dl class="games-hero__highlights">
          <div v-for="item in site.games.highlights" :key="item.label">
            <dt>{{ item.label }}</dt>
            <dd>{{ item.value }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.games-hero {
  position: relative;
  isolation: isolate;
  min-height: 92svh;
  @include flex(column, stretch, flex-end);
  overflow: hidden;
  background: $night;

  &__media {
    position: absolute;
    inset: 0;
    z-index: -1;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(0deg, $night 12%, rgba($night, 0.75) 45%, rgba($night, 0.2));
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 20%;
    }

    @include from('lg') {
      left: auto;
      width: 46%;

      &::after {
        background: linear-gradient(90deg, $night, rgba($night, 0.1) 40%, rgba($night, 0) 80%);
      }
    }
  }

  &__inner {
    @include container(1320px);
    padding-top: 140px;
    padding-bottom: $space-xl;
  }

  &__copy {
    @include flex(column, flex-start, flex-start, 1.1rem);
    max-width: 44rem;
  }

  &__eyebrow {
    @include eyebrow;
    color: $tape;
  }

  &__title {
    @include flex(column, flex-start, flex-start);
    font-family: $font-display;
    font-size: clamp(3.6rem, 1rem + 11vw, 9.5rem);
    line-height: 0.88;
  }

  &__vs {
    font-family: $font-mono;
    font-size: 0.22em;
    line-height: 1;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: $night;
    background: $accent;
    padding: 0.35em 0.6em;
    margin-block: 0.3em;
  }

  &__date {
    font-family: $font-mono;
    font-size: 0.9rem;
    @include flex(row, center, flex-start, 0.5rem);

    i {
      color: $accent;
    }
  }

  &__text {
    color: $bone-soft;
    font-size: $text-lg;
    line-height: 1.55;
  }

  &__highlights {
    @include flex(row, stretch, flex-start);
    width: 100%;
    margin-top: 0.5rem;
    border-top: 1px solid $line-strong;

    > div {
      flex: 1;
      @include flex(column-reverse, flex-start, flex-end, 0.3rem);
      padding: 1rem 0.5rem 0 0;
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
}
</style>
