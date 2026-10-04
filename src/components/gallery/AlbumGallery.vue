<script setup lang="ts">
import { toRef } from 'vue'
import PhotoMasonry from './PhotoMasonry.vue'
import PhotoLightbox from './PhotoLightbox.vue'
import { useInfinitePhotos } from '@/composables/useInfinitePhotos'
import { useLightbox } from '@/composables/useLightbox'

// Masonry infinita + visor de un álbum. La usan /galeria/:slug y /area-games-2026.
const props = defineProps<{ slug: string }>()

const { photos, total, loading, error, sentinel, loadMore, hasMore } = useInfinitePhotos(toRef(props, 'slug'))
const setSentinel = (el: unknown) => (sentinel.value = el as HTMLElement | null)
const lightbox = useLightbox(photos, loadMore)
</script>

<template>
  <div class="album-gallery">
    <PhotoMasonry :photos="photos" @open="lightbox.open" />

    <div :ref="setSentinel" class="album-gallery__sentinel" aria-hidden="true"></div>

    <p v-if="loading" class="album-gallery__status" role="status">
      <i class="fa-solid fa-spinner fa-spin"></i> Cargando fotos…
    </p>
    <div v-else-if="error" class="album-gallery__status album-gallery__status--error" role="alert">
      <p>{{ error }}</p>
      <button type="button" class="btn btn--ghost btn--sm" @click="loadMore">Reintentar</button>
    </div>
    <p v-else-if="photos.length && !hasMore()" class="album-gallery__status">
      {{ total }} fotos · Fin del álbum
    </p>

    <PhotoLightbox
      :photo="lightbox.current.value ?? null"
      :index="lightbox.index.value"
      :total="total"
      :loaded="photos.length"
      @close="lightbox.close"
      @next="lightbox.next"
      @prev="lightbox.prev"
    />
  </div>
</template>

<style scoped lang="scss">
.album-gallery {
  &__sentinel {
    height: 1px;
  }

  &__status {
    @include flex(column, center, center, 0.8rem);
    padding-block: 2.5rem;
    font-family: $font-mono;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    color: $bone-muted;
    text-align: center;

    &--error {
      color: $danger;
    }
  }
}
</style>
