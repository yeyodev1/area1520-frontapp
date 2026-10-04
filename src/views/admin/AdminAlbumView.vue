<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AlbumFormModal from '@/components/admin/AlbumFormModal.vue'
import AlbumHeader from '@/components/admin/AlbumHeader.vue'
import PhotoSelectionBar from '@/components/admin/PhotoSelectionBar.vue'
import PhotoTagSheet from '@/components/admin/PhotoTagSheet.vue'
import PhotoTile from '@/components/admin/PhotoTile.vue'
import UploadZone from '@/components/admin/UploadZone.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import { photoFilters } from '@/components/admin/adminCopy'
import { useAdminAlbum } from '@/composables/admin/useAdminAlbum'
import { useAlbumPhotos } from '@/composables/admin/useAlbumPhotos'
import { usePhotoUpload } from '@/composables/admin/usePhotoUpload'
import type { AlbumInput } from '@/services/admin.service'
import type { Photo } from '@/types'

const route = useRoute()
const albumId = computed(() => String(route.params.id))

const { album, loading, notFound, update, setCover, togglePublished } = useAdminAlbum(albumId)
const p = useAlbumPhotos(albumId)
const { uploading, progress, count, upload } = usePhotoUpload(albumId, p.prepend)
p.reload()

const editOpen = ref(false)
const toDelete = ref<Photo | null>(null)
// Se guarda el id y no la foto: así la hoja muestra las etiquetas recién guardadas.
const tagPhotoId = ref<string | null>(null)
const tagPhoto = computed(() => p.photos.value.find((ph) => ph._id === tagPhotoId.value) ?? null)

async function saveAlbum(payload: AlbumInput) {
  if (await update(payload)) editOpen.value = false
}

async function confirmDelete() {
  const photo = toDelete.value
  toDelete.value = null
  if (photo) await p.remove(photo)
}
</script>

<template>
  <section class="album">
    <p v-if="loading && !album" class="album__empty"><i class="fa-solid fa-spinner fa-spin"></i> Cargando álbum…</p>
    <div v-else-if="notFound" class="album__empty">
      <p>Ese álbum no existe o fue eliminado.</p>
      <RouterLink :to="{ name: 'AdminAlbums' }" class="btn btn--ghost btn--sm">Volver a la galería</RouterLink>
    </div>

    <template v-else-if="album">
      <AlbumHeader :album="album" @edit="editOpen = true" @publish="togglePublished" />

      <UploadZone :uploading="uploading" :progress="progress" :count="count" @files="upload" />

      <div class="album__toolbar">
        <div class="album__filters" role="group" aria-label="Filtrar fotos">
          <button
            v-for="f in photoFilters"
            :key="f.value"
            type="button"
            class="album__filter"
            :class="{ 'is-active': p.filter.value === f.value }"
            :aria-pressed="p.filter.value === f.value"
            @click="p.filter.value = f.value"
          >
            {{ f.label }}
          </button>
        </div>
        <p class="album__count">
          {{ p.total.value }} foto(s)
          <button v-if="p.photos.value.length" type="button" class="album__select-all" @click="p.selectAll">
            Seleccionar todas
          </button>
        </p>
      </div>

      <p v-if="p.loading.value && !p.photos.value.length" class="album__empty">
        <i class="fa-solid fa-spinner fa-spin"></i> Cargando fotos…
      </p>
      <p v-else-if="!p.photos.value.length" class="album__empty">
        <i class="fa-regular fa-images"></i>
        {{ p.filter.value === 'all' ? 'Este álbum aún no tiene fotos. Sube las primeras arriba.' : 'Ninguna foto con ese filtro.' }}
      </p>

      <div v-else class="album__grid">
        <PhotoTile
          v-for="photo in p.photos.value"
          :key="photo._id"
          :photo="photo"
          :selected="p.selected.value.has(photo._id)"
          :is-cover="album.coverPublicId === photo.publicId"
          @select="p.toggleSelect(photo)"
          @hide="p.toggleHidden(photo)"
          @tags="tagPhotoId = photo._id"
          @cover="setCover(photo)"
          @remove="toDelete = photo"
        />
      </div>

      <div v-if="p.hasMore.value" class="album__more">
        <button type="button" class="btn btn--ghost" :disabled="p.loading.value" @click="p.loadMore">
          <i :class="p.loading.value ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-angles-down'"></i>
          Cargar más
        </button>
      </div>

      <PhotoSelectionBar
        :count="p.selected.value.size"
        :batch="p.batch.value"
        @hide="p.setHiddenBatch(true)"
        @show="p.setHiddenBatch(false)"
        @clear="p.clearSelection"
      />

      <PhotoTagSheet :photo="tagPhoto" @close="tagPhotoId = null" @toggle="tagPhoto && p.toggleTag(tagPhoto, $event)" />

      <AlbumFormModal :open="editOpen" :album="album" @close="editOpen = false" @submit="saveAlbum" />

      <BaseModal
        :open="!!toDelete"
        danger
        title="¿Eliminar foto?"
        message="Se borra del álbum y de Cloudinary. No se puede deshacer; si solo quieres sacarla del sitio, ocúltala."
        confirm-label="Eliminar"
        @cancel="toDelete = null"
        @confirm="confirmDelete"
      />
    </template>
  </section>
</template>

<style scoped lang="scss">
.album {
  // Deja aire para que la barra de selección no tape la última fila.
  padding-bottom: 4rem;

  &__toolbar {
    @include flex(row, center, space-between, 0.75rem);
    flex-wrap: wrap;
    margin: 1.25rem 0 0.9rem;
  }

  &__filters {
    @include flex(row, center, flex-start, 0.35rem);
    flex-wrap: wrap;
  }

  &__filter {
    min-height: 36px;
    padding: 0 0.85rem;
    border-radius: $radius-pill;
    border: 1px solid $line-strong;
    font-size: 0.76rem;
    font-weight: 600;
    color: $bone-soft;

    &.is-active {
      background: $bone;
      border-color: $bone;
      color: $night;
    }
  }

  &__count {
    @include flex(row, center, flex-start, 0.75rem);
    font-family: $font-mono;
    font-size: $text-xs;
    color: $bone-muted;
  }

  &__select-all {
    font-family: $font-principal;
    font-weight: 700;
    color: $accent;
    min-height: 36px;
  }

  // flex-cards da el wrap y el gap; el ancho fijo por breakpoint evita que
  // la última fila se estire a lo ancho.
  &__grid {
    @include flex-cards(140px, 0.6rem);

    > * {
      flex: 0 0 calc((100% - 0.6rem) / 2);

      @include from('sm') {
        flex-basis: calc((100% - 1.2rem) / 3);
      }

      @include from('lg') {
        flex-basis: calc((100% - 2.4rem) / 5);
      }

      @include from('xl') {
        flex-basis: calc((100% - 3rem) / 6);
      }
    }
  }

  &__more {
    @include flex(row, center, center);
    margin-top: 1.5rem;
  }

  &__empty {
    @include card;
    @include flex(column, center, center, 0.8rem);
    padding: 2.5rem 1rem;
    text-align: center;
    color: $bone-soft;
  }
}
</style>
