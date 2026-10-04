<script setup lang="ts">
import { site, whatsappLink } from '@/config/site'

const props = defineProps<{
  name: string
  badge: string
  area: string
  mapsUrl: string
  schedule: readonly { days: string; hours: readonly string[] }[]
}>()

const scheduleMessage = `Hola! Quisiera los horarios de la ${props.name}.`
</script>

<template>
  <article class="location">
    <header class="location__head">
      <span class="location__badge">{{ badge }}</span>
      <h3 class="location__name">{{ name }}</h3>
      <p class="location__area"><i class="fa-solid fa-location-dot"></i> {{ area }}</p>
    </header>

    <div v-if="schedule.length" class="location__board">
      <div v-for="block in schedule" :key="block.days" class="location__block">
        <p class="location__days">{{ block.days }}</p>
        <ul class="location__hours">
          <li v-for="hour in block.hours" :key="hour" class="location__hour">{{ hour }}</li>
        </ul>
      </div>
    </div>
    <div v-else class="location__empty">
      <i class="fa-regular fa-clock"></i>
      <p>{{ site.locations.noSchedule }}</p>
    </div>

    <footer class="location__actions">
      <a :href="mapsUrl" class="btn btn--ghost btn--sm" target="_blank" rel="noopener">
        <i class="fa-solid fa-route"></i> Cómo llegar
      </a>
      <a
        v-if="!schedule.length"
        :href="whatsappLink(scheduleMessage)"
        class="btn btn--primary btn--sm"
        target="_blank"
        rel="noopener"
      >
        <i class="fa-brands fa-whatsapp"></i> Pedir horarios
      </a>
    </footer>
  </article>
</template>

<style scoped lang="scss">
.location {
  @include flex(column, stretch, flex-start, 1.6rem);
  padding: 1.5rem;
  background: $steel;
  border: 1px solid $line;
  border-radius: $radius-md;
  transition:
    border-color 0.3s ease,
    opacity 0.8s $ease,
    transform 0.8s $ease;

  @include from('md') {
    padding: 2.2rem;
  }

  &:hover {
    border-color: $line-strong;
  }

  &__head {
    @include flex(column, flex-start, flex-start, 0.6rem);
  }

  &__badge {
    font-family: $font-mono;
    font-size: 0.66rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: $night;
    background: $tape;
    padding: 0.3rem 0.6rem;
    border-radius: 2px;
  }

  &__name {
    @include display($display-md);
  }

  &__area {
    color: $bone-soft;
    @include flex(row, center, flex-start, 0.5rem);

    i {
      color: $accent;
    }
  }

  // La pizarra del box: horarios en mono, como se escriben en el whiteboard.
  &__board {
    @include flex(column, stretch, flex-start, 1.1rem);
    padding: 1.2rem;
    border-radius: $radius-sm;
    background:
      repeating-linear-gradient(0deg, transparent 0 27px, rgba($bone, 0.03) 27px 28px),
      $night;
    border: 1px solid $line;
  }

  &__days {
    font-family: $font-mono;
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: $bone-muted;
    margin-bottom: 0.5rem;
  }

  &__hours {
    list-style: none;
    @include flex(row, center, flex-start, 0.4rem);
    flex-wrap: wrap;
  }

  &__hour {
    font-family: $font-mono;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0.35rem 0.6rem;
    border: 1px solid $line-strong;
    border-radius: $radius-sm;
    color: $bone;
    font-variant-numeric: tabular-nums;
  }

  &__empty {
    flex: 1;
    @include flex(column, flex-start, center, 0.8rem);
    padding: 1.6rem 1.2rem;
    border: 1px dashed $line-strong;
    border-radius: $radius-sm;
    color: $bone-soft;
    font-size: $text-lg;
    line-height: 1.45;

    i {
      font-size: 1.4rem;
      color: $accent;
    }
  }

  &__actions {
    @include flex(row, center, flex-start, 0.6rem);
    flex-wrap: wrap;
    margin-top: auto;
  }
}
</style>
