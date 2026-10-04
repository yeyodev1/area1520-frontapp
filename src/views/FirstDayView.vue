<script setup lang="ts">
import { computed } from 'vue'
import { site, whatsappLink, firstDayMessage } from '@/config/site'
import LeadForm from '@/components/lead/LeadForm.vue'
import { useTaggedPhotos } from '@/composables/useTaggedPhotos'
import { cloudinaryThumb } from '@/utils/cloudinary'
import { photoAlt } from '@/utils/photo'

// Lista corta sacada de la respuesta "¿Qué llevo a mi primera clase?" de site.faq.
const BRING = [
  { icon: 'fa-solid fa-shirt', label: 'Ropa deportiva' },
  { icon: 'fa-solid fa-shoe-prints', label: 'Zapatos de entrenamiento' },
  { icon: 'fa-solid fa-rug', label: 'Una toalla' },
  { icon: 'fa-solid fa-bottle-water', label: 'Tu botella de agua' },
]
const bringTitle = site.faq.items[2]?.q ?? ''

const { photos } = useTaggedPhotos('featured', 24)
// Una vertical de atleta en acción: las dos primeras 'featured' son podio y medallas.
const photo = computed(() => photos.value.filter((p) => p.height > p.width)[2] ?? photos.value[0])
</script>

<template>
  <div class="first-day">
    <div class="first-day__media">
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
      <p class="first-day__stamp" aria-hidden="true">{{ site.cta.label }}</p>
    </div>

    <div class="first-day__panel">
      <header class="first-day__head">
        <p class="first-day__eyebrow">{{ site.lead.eyebrow }}</p>
        <h1 class="first-day__title">{{ site.lead.title }}</h1>
        <p class="first-day__text">{{ site.lead.text }}</p>
      </header>

      <LeadForm />

      <div class="first-day__bring">
        <h2 class="first-day__bring-title">{{ bringTitle }}</h2>
        <ul>
          <li v-for="item in BRING" :key="item.label"><i :class="item.icon"></i> {{ item.label }}</li>
        </ul>
        <p class="first-day__note"><i class="fa-solid fa-stopwatch"></i> {{ site.locations.scheduleNote }}</p>
      </div>

      <a :href="whatsappLink(firstDayMessage)" class="first-day__wa" target="_blank" rel="noopener">
        <i class="fa-brands fa-whatsapp"></i>
        <span>
          <small>¿Prefieres hablar directo?</small>
          {{ site.hero.secondary }}
        </span>
        <i class="fa-solid fa-arrow-right"></i>
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.first-day {
  @include flex(column, stretch, flex-start);

  @include from('lg') {
    flex-direction: row;
    align-items: flex-start;
  }

  &__media {
    position: relative;
    height: 56svh;
    overflow: hidden;
    background: $steel;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(0deg, $night, rgba($night, 0) 50%), linear-gradient(180deg, rgba($night, 0.6), transparent 30%);
    }

    @include from('lg') {
      position: sticky;
      top: 0;
      flex: 0 0 45%;
      height: 100svh;

      &::after {
        background: linear-gradient(90deg, rgba($night, 0) 60%, $night), linear-gradient(180deg, rgba($night, 0.6), transparent 25%);
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__stamp {
    position: absolute;
    left: 1.25rem;
    bottom: 1.5rem;
    z-index: 1;
    font-family: $font-display;
    font-size: clamp(2rem, 1rem + 4vw, 3.5rem);
    line-height: 1;
    text-transform: uppercase;
    color: $night;
    background: $accent;
    padding: 0.2em 0.35em 0.15em;
    transform: rotate(-3deg);

    @include from('lg') {
      left: 2rem;
      bottom: 2.5rem;
    }
  }

  &__panel {
    flex: 1;
    min-width: 0;
    @include flex(column, stretch, flex-start, $space-lg);
    padding: $space-lg 1.25rem $space-section;
    max-width: 720px;
    width: 100%;
    margin-inline: auto;

    @include from('lg') {
      padding: calc(76px + #{$space-lg}) 4rem $space-section;
    }
  }

  &__head {
    @include flex(column, flex-start, flex-start, 1rem);
  }

  &__eyebrow {
    @include eyebrow;
  }

  &__title {
    @include display($display-lg);
    font-size: clamp(2.8rem, 1.6rem + 4.5vw, 5.4rem);
  }

  &__text {
    color: $bone-soft;
    font-size: $text-lg;
    line-height: 1.55;
  }

  &__bring {
    padding: 1.5rem;
    border: 1px solid $line;
    border-radius: $radius-md;
    background: $carbon;

    ul {
      list-style: none;
      @include flex-cards(200px, 0.75rem 1.25rem);
      margin-block: 1rem;
    }

    li {
      @include flex(row, center, flex-start, 0.7rem);
      font-weight: 500;
    }

    li i {
      width: 1.2rem;
      text-align: center;
      color: $accent;
    }
  }

  &__bring-title {
    font-family: $font-principal;
    font-size: $text-lg;
    font-weight: 700;
    text-transform: none;
  }

  &__note {
    font-family: $font-mono;
    font-size: 0.75rem;
    color: $bone-soft;

    i {
      color: $accent;
      margin-right: 0.4rem;
    }
  }

  &__wa {
    @include flex(row, center, flex-start, 1rem);
    padding: 1.2rem 1.4rem;
    border: 1px solid $line-strong;
    border-radius: $radius-md;
    font-weight: 700;
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease;

    > i:first-child {
      font-size: 1.8rem;
      color: #25d366;
    }

    > i:last-child {
      margin-left: auto;
      transition: transform 0.3s $ease;
    }

    small {
      display: block;
      font-family: $font-mono;
      font-size: 0.7rem;
      font-weight: 400;
      color: $bone-muted;
    }

    &:hover {
      border-color: $accent;
      background: $accent-soft;

      > i:last-child {
        transform: translateX(4px);
      }
    }
  }
}
</style>
