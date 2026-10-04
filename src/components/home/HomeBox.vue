<script setup lang="ts">
import { site } from '@/config/site'
import SectionHead from '@/components/common/SectionHead.vue'
import StatCounter from './StatCounter.vue'
import PhotoCollage from './PhotoCollage.vue'
import { useTaggedPhotos } from '@/composables/useTaggedPhotos'

const { photos } = useTaggedPhotos('featured', 24)
</script>

<template>
  <section id="box" class="box">
    <div class="box__inner">
      <div class="box__split">
        <div class="box__copy">
          <SectionHead :eyebrow="site.box.eyebrow" :title="site.box.title" />
          <div class="box__paragraphs">
            <p v-for="(text, i) in site.box.paragraphs" :key="i" v-reveal="i * 80">{{ text }}</p>
          </div>
          <ul class="box__pillars">
            <li v-for="(pillar, i) in site.box.pillars" :key="pillar.title" class="box__pillar" v-reveal="i * 90">
              <span class="box__icon"><i :class="pillar.icon"></i></span>
              <div>
                <h3 class="box__pillar-title">{{ pillar.title }}</h3>
                <p class="box__pillar-text">{{ pillar.text }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="box__visual" v-reveal="120">
          <PhotoCollage :photos="photos" />
        </div>
      </div>

      <div class="box__stats">
        <StatCounter v-for="stat in site.stats" :key="stat.label" :value="stat.value" :label="stat.label" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.box {
  background: $carbon;
  padding-block: calc(#{$space-section} + 1.6rem) $space-section;

  &__inner {
    @include container(1320px);
  }

  &__split {
    @include flex(column, stretch, flex-start, $space-xl);

    @include from('lg') {
      flex-direction: row;
      align-items: center;
      gap: 5rem;
    }
  }

  &__copy {
    flex: 1 1 55%;
    min-width: 0;
  }

  &__visual {
    flex: 1 1 45%;
    min-width: 0;
    max-width: 560px;
    width: 100%;
    margin-inline: auto;
  }

  &__paragraphs {
    @include flex(column, stretch, flex-start, 1rem);
    margin-top: 1.75rem;
    color: $bone-soft;
    max-width: 40rem;
  }

  &__pillars {
    list-style: none;
    @include flex(column, stretch, flex-start);
    margin-top: 2.5rem;
    border-top: 1px solid $line;
  }

  &__pillar {
    @include flex(row, flex-start, flex-start, 1.1rem);
    padding-block: 1.25rem;
    border-bottom: 1px solid $line;
  }

  &__icon {
    @include flex(row, center, center);
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border-radius: $radius-sm;
    background: $accent-soft;
    color: $accent;
  }

  &__pillar-title {
    font-family: $font-principal;
    font-weight: 700;
    font-size: $text-lg;
    text-transform: none;
    margin-bottom: 0.25rem;
  }

  &__pillar-text {
    color: $bone-soft;
    font-size: $text-sm;
  }

  &__stats {
    @include flex-cards(150px, 2rem 1.5rem);
    margin-top: $space-xl;

    > * {
      flex-basis: calc(50% - 0.75rem);

      @include from('lg') {
        flex-basis: 0;
      }
    }
  }
}
</style>
