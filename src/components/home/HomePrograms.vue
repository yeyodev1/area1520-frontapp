<script setup lang="ts">
import { site } from '@/config/site'
import SectionHead from '@/components/common/SectionHead.vue'
import ProgramCard from './ProgramCard.vue'
import { useTaggedPhotos } from '@/composables/useTaggedPhotos'

const { photos } = useTaggedPhotos('featured', 24)

// Las tres primeras 'featured' ya están en el collage del box: se usan otras.
const photoFor = (i: number) => photos.value[3 + i]
const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <section id="programas" class="programs">
    <div class="programs__inner">
      <SectionHead :eyebrow="site.programs.eyebrow" :title="site.programs.title" />
      <div class="programs__list">
        <ProgramCard
          v-for="(program, i) in site.programs.items"
          :key="program.slug"
          v-reveal="(i % 2) * 100"
          :number="pad(i + 1)"
          :name="program.name"
          :tag="program.tag"
          :text="program.text"
          :points="program.points"
          :photo="photoFor(i)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.programs {
  padding-block: $space-section;

  &__inner {
    @include container(1320px);
  }

  &__list {
    @include flex-cards(300px, 1rem);
    margin-top: $space-lg;

    @include from('md') {
      > * {
        flex-basis: calc(50% - 0.5rem);
      }
    }
  }
}
</style>
