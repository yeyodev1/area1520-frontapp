<script setup lang="ts">
import { computed } from 'vue'
import AdminSwitch from './AdminSwitch.vue'
import { cloudinaryThumb } from '@/utils/cloudinary'
import { formatDate } from '@/utils/format'
import type { Album } from '@/types'

const props = defineProps<{ album: Album }>()
const emit = defineEmits<{ publish: []; edit: []; remove: [] }>()

const hidden = computed(() => props.album.hiddenCount ?? 0)
const visible = computed(() => Math.max(0, props.album.photoCount - hidden.value))
</script>

<template>
  <article class="album-card">
    <RouterLink :to="{ name: 'AdminAlbum', params: { id: album._id } }" class="album-card__cover">
      <img v-if="album.coverPublicId" :src="cloudinaryThumb(album.coverPublicId, 480, 300)" :alt="album.title" loading="lazy" />
      <span v-else class="album-card__placeholder"><i class="fa-regular fa-image"></i> Sin portada</span>
      <span v-if="!album.isPublished" class="album-card__draft">Borrador</span>
    </RouterLink>

    <div class="album-card__body">
      <p v-if="album.eventName || album.eventDate" class="album-card__event">
        {{ album.eventName }}<template v-if="album.eventName && album.eventDate"> · </template>
        <template v-if="album.eventDate">{{ formatDate(album.eventDate) }}</template>
      </p>
      <RouterLink :to="{ name: 'AdminAlbum', params: { id: album._id } }" class="album-card__title">
        {{ album.title }}
      </RouterLink>
      <p class="album-card__counts">
        <span><i class="fa-regular fa-eye"></i> {{ visible }} visibles</span>
        <span><i class="fa-regular fa-eye-slash"></i> {{ hidden }} ocultas</span>
      </p>

      <footer class="album-card__foot">
        <AdminSwitch
          :model-value="album.isPublished"
          :label="album.isPublished ? 'Publicado' : 'No publicado'"
          show-label
          @update:model-value="emit('publish')"
        />
        <div class="album-card__tools">
          <button type="button" class="album-card__tool" aria-label="Editar álbum" @click="emit('edit')">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button type="button" class="album-card__tool album-card__tool--danger" aria-label="Eliminar álbum" @click="emit('remove')">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </footer>
    </div>
  </article>
</template>

<style scoped lang="scss">
.album-card {
  @include card;
  @include flex(column, stretch, flex-start);
  overflow: hidden;

  &__cover {
    position: relative;
    display: block;
    aspect-ratio: 16 / 10;
    background: $iron;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__placeholder {
    @include flex(row, center, center, 0.5rem);
    height: 100%;
    color: $bone-muted;
    font-size: $text-sm;
  }

  &__draft {
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
    padding: 0.2rem 0.6rem;
    border-radius: $radius-pill;
    background: rgba($night, 0.85);
    color: $warning;
    font-family: $font-mono;
    font-size: 0.64rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  &__body {
    @include flex(column, stretch, flex-start, 0.35rem);
    flex: 1;
    padding: 0.95rem 1rem 0.75rem;
  }

  &__event {
    @include eyebrow;
    font-size: 0.64rem;
  }

  &__title {
    @include display($text-lg);
    line-height: 1.1;
  }

  &__counts {
    @include flex(row, center, flex-start, 0.9rem);
    flex-wrap: wrap;
    font-size: $text-xs;
    color: $bone-soft;

    i {
      color: $bone-muted;
      margin-right: 0.2rem;
    }
  }

  &__foot {
    @include flex(row, center, space-between, 0.5rem);
    margin-top: auto;
    padding-top: 0.6rem;
    border-top: 1px solid $line;
  }

  &__tools {
    @include flex(row, center, flex-end, 0.25rem);
  }

  &__tool {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: $bone-soft;
    @include transition(background);

    &:hover {
      background: rgba($white, 0.06);
      color: $bone;
    }

    &--danger:hover {
      background: $danger-bg;
      color: $danger;
    }
  }
}
</style>
