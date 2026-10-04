<script setup lang="ts">
import { site } from '@/config/site'
import SectionHead from '@/components/common/SectionHead.vue'
import LocationCard from './LocationCard.vue'
</script>

<template>
  <section id="sedes" class="locations">
    <div class="locations__inner">
      <SectionHead :eyebrow="site.locations.eyebrow" :title="site.locations.title" />
      <div class="locations__list">
        <LocationCard
          v-for="(loc, i) in site.locations.items"
          :key="loc.slug"
          v-reveal="i * 100"
          :name="loc.name"
          :badge="loc.badge"
          :area="loc.area"
          :maps-url="loc.mapsUrl"
          :schedule="loc.schedule"
        />
      </div>
      <p class="locations__note">
        <i class="fa-solid fa-stopwatch"></i>
        {{ site.locations.scheduleNote }}
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.locations {
  padding-block: $space-section;

  &__inner {
    @include container(1320px);
  }

  &__list {
    @include flex-cards(320px, 1rem);
    margin-top: $space-lg;
  }

  &__note {
    @include flex(row, center, flex-start, 0.6rem);
    margin-top: 1.5rem;
    font-family: $font-mono;
    font-size: 0.78rem;
    color: $bone-soft;

    i {
      color: $accent;
    }
  }
}
</style>
