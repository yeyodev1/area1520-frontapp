<script setup lang="ts">
import AdminSwitch from './AdminSwitch.vue'
import { cloudinaryThumb } from '@/utils/cloudinary'
import { formatDate } from '@/utils/format'
import type { Album } from '@/types'

defineProps<{ album: Album }>()
const emit = defineEmits<{ edit: []; publish: [] }>()
</script>

<template>
  <header class="album-head">
    <RouterLink :to="{ name: 'AdminAlbums' }" class="album-head__back">
      <i class="fa-solid fa-arrow-left"></i> Álbumes
    </RouterLink>

    <div class="album-head__main">
      <div class="album-head__cover">
        <img v-if="album.coverPublicId" :src="cloudinaryThumb(album.coverPublicId, 200)" alt="Portada del álbum" />
        <i v-else class="fa-regular fa-image"></i>
      </div>

      <div class="album-head__text">
        <p v-if="album.eventName || album.eventDate" class="album-head__event">
          {{ album.eventName }}<template v-if="album.eventName && album.eventDate"> · </template>
          <template v-if="album.eventDate">{{ formatDate(album.eventDate) }}</template>
        </p>
        <h1 class="album-head__title">{{ album.title }}</h1>
        <p v-if="album.description" class="album-head__desc">{{ album.description }}</p>
      </div>
    </div>

    <div class="album-head__actions">
      <AdminSwitch
        :model-value="album.isPublished"
        :label="album.isPublished ? 'Publicado' : 'No publicado'"
        show-label
        @update:model-value="emit('publish')"
      />
      <button type="button" class="btn btn--ghost btn--sm" @click="emit('edit')">
        <i class="fa-solid fa-pen"></i> Editar
      </button>
      <a
        v-if="album.isPublished && album.slug"
        :href="`/galeria/${album.slug}`"
        target="_blank"
        rel="noopener"
        class="btn btn--ghost btn--sm"
      >
        <i class="fa-solid fa-arrow-up-right-from-square"></i> Ver
      </a>
    </div>
  </header>
</template>

<style scoped lang="scss">
.album-head {
  margin-bottom: 1.25rem;

  &__back {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 36px;
    font-size: $text-xs;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: $bone-soft;

    &:hover {
      color: $accent;
    }
  }

  &__main {
    @include flex(row, center, flex-start, 0.9rem);
    margin: 0.5rem 0 0.9rem;
  }

  &__cover {
    @include flex(row, center, center);
    flex: 0 0 auto;
    width: 64px;
    height: 64px;
    border-radius: $radius-md;
    overflow: hidden;
    background: $iron;
    color: $bone-muted;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @include from('md') {
      width: 88px;
      height: 88px;
    }
  }

  &__text {
    min-width: 0;
  }

  &__event {
    @include eyebrow;
    margin-bottom: 0.35rem;
  }

  &__title {
    @include display($display-sm);
    overflow-wrap: anywhere;
  }

  &__desc {
    margin-top: 0.4rem;
    font-size: $text-sm;
    color: $bone-soft;
    max-width: 60ch;
  }

  &__actions {
    @include flex(row, center, flex-start, 0.5rem 0.75rem);
    flex-wrap: wrap;
  }
}
</style>
