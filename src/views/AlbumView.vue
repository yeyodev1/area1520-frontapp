<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { site } from '@/config/site'
import PageIntro from '@/components/common/PageIntro.vue'
import AlbumGallery from '@/components/gallery/AlbumGallery.vue'
import { useAlbum } from '@/composables/useAlbums'
import { formatDate } from '@/utils/format'

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))
const { album, loading, notFound, error } = useAlbum(slug)

const meta = computed(() => {
  if (!album.value) return ''
  const date = album.value.eventDate ? ` · ${formatDate(album.value.eventDate)}` : ''
  return `${album.value.eventName}${date}`
})

watch(album, (value) => {
  if (value) document.title = `${value.title} · ${value.eventName} — ${site.name}`
})
</script>

<template>
  <div class="album">
    <template v-if="album">
      <PageIntro :eyebrow="meta" :title="album.title" :text="album.description">
        <template #before>
          <RouterLink to="/galeria" class="album__back"><i class="fa-solid fa-arrow-left"></i> Galería</RouterLink>
        </template>
        <p class="album__meta">
          <span><i class="fa-regular fa-images"></i> {{ album.photoCount }} fotos</span>
          <a v-if="album.photographer" :href="album.photographerUrl || undefined" target="_blank" rel="noopener">
            <i class="fa-solid fa-camera"></i> Fotografía: {{ album.photographer }}
          </a>
        </p>
      </PageIntro>
      <section class="album__body" aria-label="Fotos del álbum">
        <AlbumGallery :slug="album.slug" />
      </section>
    </template>

    <div v-else-if="notFound" class="album__missing">
      <p class="album__code">404</p>
      <h1 class="album__missing-title">Este álbum no existe</h1>
      <p>Puede que lo hayan movido o que el enlace esté mal escrito.</p>
      <RouterLink to="/galeria" class="btn btn--primary">Ver todos los álbumes</RouterLink>
    </div>

    <div v-else-if="error" class="album__missing" role="alert">
      <p>{{ error }}</p>
      <RouterLink to="/galeria" class="btn btn--ghost">Volver a la galería</RouterLink>
    </div>

    <p v-else-if="loading" class="album__loading" role="status">
      <i class="fa-solid fa-spinner fa-spin"></i> Cargando álbum…
    </p>
  </div>
</template>

<style scoped lang="scss">
.album {
  &__back {
    @include flex(row, center, flex-start, 0.5rem);
    font-family: $font-mono;
    font-size: 0.75rem;
    color: $bone-soft;
    padding-block: 0.4rem;
    margin-bottom: 0.5rem;

    &:hover {
      color: $bone;
    }
  }

  &__meta {
    @include flex(row, center, flex-start, 0.5rem 1.5rem);
    flex-wrap: wrap;
    font-family: $font-mono;
    font-size: 0.78rem;
    color: $bone-soft;

    i {
      color: $accent;
      margin-right: 0.3rem;
    }

    a {
      text-decoration: underline;
      text-underline-offset: 4px;
      text-decoration-color: $line-strong;
      padding-block: 0.4rem;

      &:hover {
        color: $bone;
      }
    }
  }

  &__body {
    @include container(1600px);
    padding-block: $space-md $space-section;
  }

  &__missing {
    @include container(640px);
    @include flex(column, center, center, 1rem);
    min-height: 80svh;
    padding-top: 76px;
    text-align: center;
    color: $bone-soft;
  }

  &__code {
    font-family: $font-display;
    font-size: clamp(6rem, 30vw, 12rem);
    line-height: 0.85;
    color: transparent;
    -webkit-text-stroke: 2px $accent;
  }

  &__missing-title {
    @include display($display-md);
    color: $bone;
  }

  &__loading {
    min-height: 80svh;
    @include flex(row, center, center, 0.6rem);
    font-family: $font-mono;
    font-size: 0.8rem;
    color: $bone-muted;
  }
}
</style>
