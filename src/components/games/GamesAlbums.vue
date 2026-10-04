<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { site } from '@/config/site'
import SectionHead from '@/components/common/SectionHead.vue'
import AlbumGallery from '@/components/gallery/AlbumGallery.vue'
import { useAlbums } from '@/composables/useAlbums'

const COPY = { eyebrow: 'Galería oficial', title: 'Todas las fotos' }

const { albums, loading, error, reload } = useAlbums()
// Solo los álbumes del evento; el primero queda elegido al cargar.
const eventAlbums = computed(() => albums.value.filter((a) => a.slug.startsWith('area-games-2026')))
const selected = ref('')
watch(eventAlbums, (list) => {
  if (!selected.value && list[0]) selected.value = list[0].slug
})
const current = computed(() => eventAlbums.value.find((a) => a.slug === selected.value))

function onKey(event: KeyboardEvent, i: number) {
  const list = eventAlbums.value
  const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
  if (!step) return
  const next = list[(i + step + list.length) % list.length]
  if (!next) return
  selected.value = next.slug
  document.getElementById(`tab-${next.slug}`)?.focus()
}
</script>

<template>
  <section class="games-albums" aria-labelledby="albums-title">
    <div class="games-albums__head">
      <SectionHead :eyebrow="COPY.eyebrow" :title="COPY.title" size="md" title-id="albums-title" />

      <div v-if="eventAlbums.length" class="games-albums__tabs" role="tablist" aria-label="Álbumes del evento">
        <button
          v-for="(album, i) in eventAlbums"
          :id="`tab-${album.slug}`"
          :key="album.slug"
          type="button"
          role="tab"
          class="games-albums__tab"
          :class="{ 'games-albums__tab--on': album.slug === selected }"
          :aria-selected="album.slug === selected"
          :tabindex="album.slug === selected ? 0 : -1"
          aria-controls="album-panel"
          @click="selected = album.slug"
          @keydown="onKey($event, i)"
        >
          {{ album.title }}
          <span>{{ album.photoCount }}</span>
        </button>
      </div>
      <p v-else-if="error" class="games-albums__error" role="alert">
        {{ error }} <button type="button" class="btn btn--ghost btn--sm" @click="reload">Reintentar</button>
      </p>
      <p v-else-if="loading" class="games-albums__loading">Cargando álbumes…</p>

      <a :href="current?.photographerUrl || site.games.creditUrl" class="games-albums__credit" target="_blank" rel="noopener">
        <i class="fa-solid fa-camera"></i>
        {{ current?.photographer ? `Fotografía: ${current.photographer}` : site.games.credit }}
      </a>
    </div>

    <div
      v-if="current"
      id="album-panel"
      class="games-albums__panel"
      role="tabpanel"
      :aria-labelledby="`tab-${current.slug}`"
    >
      <AlbumGallery :slug="current.slug" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.games-albums {
  padding-block: $space-section;

  &__head {
    @include container(1320px);
    @include flex(column, flex-start, flex-start, 1.4rem);
    margin-bottom: $space-lg;
  }

  &__tabs {
    @include flex(row, center, flex-start, 0.25rem);
    padding: 0.3rem;
    border: 1px solid $line-strong;
    border-radius: $radius-pill;
    background: $carbon;
  }

  &__tab {
    @include flex(row, center, center, 0.55rem);
    min-height: 44px;
    padding: 0.5rem 1.2rem;
    border-radius: $radius-pill;
    font-weight: 700;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: $bone-soft;
    transition:
      background-color 0.25s ease,
      color 0.25s ease;

    span {
      font-family: $font-mono;
      font-weight: 400;
      font-size: 0.72rem;
      letter-spacing: 0;
      opacity: 0.7;
    }

    &:hover {
      color: $bone;
    }

    &--on {
      background: $accent;
      color: $white;

      &:hover {
        color: $white;
      }
    }
  }

  &__credit {
    font-family: $font-mono;
    font-size: 0.75rem;
    color: $bone-soft;
    text-decoration: underline;
    text-decoration-color: $line-strong;
    text-underline-offset: 4px;
    padding-block: 0.4rem;

    i {
      color: $accent;
      margin-right: 0.3rem;
    }

    &:hover {
      color: $bone;
    }
  }

  &__error,
  &__loading {
    font-family: $font-mono;
    font-size: 0.8rem;
    color: $bone-muted;
  }

  &__panel {
    @include container(1600px);
  }
}
</style>
