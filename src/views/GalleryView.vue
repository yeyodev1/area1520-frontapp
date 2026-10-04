<script setup lang="ts">
import { site } from '@/config/site'
import PageIntro from '@/components/common/PageIntro.vue'
import AlbumCard from '@/components/gallery/AlbumCard.vue'
import { useAlbums } from '@/composables/useAlbums'

// La galería no tiene copy propio en site.ts: se reutiliza el de comunidad.
const INTRO = { eyebrow: 'Galería', title: 'Fotos del box' }

const { albums, loading, error, reload } = useAlbums()
</script>

<template>
  <div class="gallery">
    <PageIntro :eyebrow="INTRO.eyebrow" :title="INTRO.title" :text="site.community.text" />

    <section class="gallery__body" aria-label="Álbumes">
      <div v-if="loading" class="gallery__list" aria-hidden="true">
        <div v-for="n in 2" :key="n" class="gallery__skeleton"></div>
      </div>
      <div v-else-if="error" class="gallery__state" role="alert">
        <p>{{ error }}</p>
        <button type="button" class="btn btn--ghost btn--sm" @click="reload">Reintentar</button>
      </div>
      <p v-else-if="!albums.length" class="gallery__state">Pronto subimos las fotos del próximo evento.</p>
      <div v-else class="gallery__list">
        <AlbumCard v-for="(album, i) in albums" :key="album._id" v-reveal="i * 100" :album="album" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.gallery {
  &__body {
    @include container(1320px);
    padding-block: $space-lg $space-section;
  }

  &__list {
    @include flex-cards(300px, 1rem);

    @include from('md') {
      > * {
        flex-basis: calc(50% - 0.5rem);
        flex-grow: 0;
      }
    }
  }

  &__skeleton {
    aspect-ratio: 4 / 5;
    border-radius: $radius-md;
    background: linear-gradient(100deg, $steel 30%, $iron 50%, $steel 70%) 0 0 / 200% 100%;
    animation: shimmer 1.4s linear infinite;
  }

  &__state {
    @include flex(column, flex-start, flex-start, 1rem);
    color: $bone-soft;
    padding-block: $space-lg;
  }
}

@keyframes shimmer {
  to {
    background-position: -200% 0;
  }
}
</style>
