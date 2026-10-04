<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminPageHead from '@/components/admin/AdminPageHead.vue'
import AlbumCard from '@/components/admin/AlbumCard.vue'
import AlbumFormModal from '@/components/admin/AlbumFormModal.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import { useAdminAlbums } from '@/composables/admin/useAdminAlbums'
import type { AlbumInput } from '@/services/admin.service'
import type { Album } from '@/types'

const router = useRouter()
const { albums, loading, load, create, update, togglePublished, remove } = useAdminAlbums()

const formOpen = ref(false)
const editing = ref<Album | null>(null)
const toDelete = ref<Album | null>(null)

function openCreate() {
  editing.value = null
  formOpen.value = true
}

function openEdit(album: Album) {
  editing.value = album
  formOpen.value = true
}

async function submit(payload: AlbumInput) {
  if (editing.value) {
    if (await update(editing.value, payload)) formOpen.value = false
    return
  }
  // Un álbum nuevo se crea en borrador y se entra directo a subirle fotos.
  const album = await create({ ...payload, isPublished: false })
  if (album) {
    formOpen.value = false
    router.push({ name: 'AdminAlbum', params: { id: album._id } })
  }
}

async function confirmDelete() {
  const album = toDelete.value
  toDelete.value = null
  if (album) await remove(album)
}

onMounted(load)
</script>

<template>
  <section class="albums">
    <AdminPageHead
      eyebrow="Galería"
      title="Álbumes"
      subtitle="Los álbumes publicados aparecen en /galeria. Entra a uno para subir y ordenar fotos."
    >
      <button type="button" class="btn btn--primary btn--sm" @click="openCreate">
        <i class="fa-solid fa-plus"></i> Nuevo álbum
      </button>
    </AdminPageHead>

    <p v-if="loading && !albums.length" class="albums__empty">
      <i class="fa-solid fa-spinner fa-spin"></i> Cargando álbumes…
    </p>
    <div v-else-if="!albums.length" class="albums__empty">
      <p><i class="fa-regular fa-images"></i> Todavía no hay álbumes.</p>
      <button type="button" class="btn btn--ghost btn--sm" @click="openCreate">Crear el primero</button>
    </div>

    <div v-else class="albums__grid">
      <AlbumCard
        v-for="album in albums"
        :key="album._id"
        :album="album"
        @publish="togglePublished(album)"
        @edit="openEdit(album)"
        @remove="toDelete = album"
      />
    </div>

    <AlbumFormModal :open="formOpen" :album="editing" @close="formOpen = false" @submit="submit" />

    <BaseModal
      :open="!!toDelete"
      danger
      title="¿Eliminar álbum?"
      :message="toDelete ? `Se eliminará «${toDelete.title}». Solo se puede borrar un álbum vacío.` : ''"
      confirm-label="Eliminar"
      @cancel="toDelete = null"
      @confirm="confirmDelete"
    />
  </section>
</template>

<style scoped lang="scss">
.albums {
  &__grid {
    @include flex-cards(260px, 1rem);

    // Sin esto, la última tarjeta suelta se estira a todo el ancho.
    > * {
      max-width: 100%;

      @include from('lg') {
        max-width: calc(50% - 0.5rem);
      }

      @include from('xl') {
        max-width: calc(33.333% - 0.67rem);
      }
    }
  }

  &__empty {
    @include card;
    @include flex(column, center, center, 0.9rem);
    padding: 2.5rem 1rem;
    text-align: center;
    color: $bone-soft;

    i {
      margin-right: 0.4rem;
    }
  }
}
</style>
