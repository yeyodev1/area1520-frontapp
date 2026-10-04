<script setup lang="ts">
import { ref, toRef, watch } from 'vue'
import { useBodyScroll } from '@/composables/useBodyScroll'
import { useAlbumForm } from '@/composables/admin/useAlbumForm'
import type { AlbumInput } from '@/services/admin.service'
import type { Album } from '@/types'

const props = defineProps<{ open: boolean; album?: Album | null }>()
const emit = defineEmits<{ close: []; submit: [payload: AlbumInput] }>()

const { form, fill, payload } = useAlbumForm()
const titleInput = ref<HTMLInputElement | null>(null)

useBodyScroll(toRef(props, 'open'))

watch(
  () => props.open,
  (open) => {
    if (!open) return
    fill(props.album)
    setTimeout(() => titleInput.value?.focus(), 60)
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="album-form" @click.self="emit('close')" @keydown.esc="emit('close')">
        <form
          class="album-form__box"
          role="dialog"
          aria-modal="true"
          :aria-label="album ? 'Editar álbum' : 'Nuevo álbum'"
          @submit.prevent="emit('submit', payload())"
        >
          <header class="album-form__head">
            <h2 class="album-form__title">{{ album ? 'Editar álbum' : 'Nuevo álbum' }}</h2>
            <button type="button" class="album-form__close" aria-label="Cerrar" @click="emit('close')">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </header>

          <div class="album-form__field">
            <label for="album-title">Título *</label>
            <input id="album-title" ref="titleInput" v-model="form.title" required maxlength="120" placeholder="AREA Games 2026 · Día 1" />
          </div>
          <div class="album-form__row">
            <div class="album-form__field">
              <label for="album-event">Evento</label>
              <input id="album-event" v-model="form.eventName" maxlength="120" placeholder="AREA Games" />
            </div>
            <div class="album-form__field">
              <label for="album-date">Fecha</label>
              <input id="album-date" v-model="form.eventDate" type="date" />
            </div>
          </div>
          <div class="album-form__field">
            <label for="album-desc">Descripción</label>
            <textarea id="album-desc" v-model="form.description" rows="3" maxlength="600"></textarea>
          </div>

          <footer class="album-form__actions">
            <button type="button" class="btn btn--ghost" @click="emit('close')">Cancelar</button>
            <button type="submit" class="btn btn--primary" :disabled="!form.title.trim()">
              <i class="fa-solid fa-check"></i> {{ album ? 'Guardar' : 'Crear álbum' }}
            </button>
          </footer>
        </form>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.album-form {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: $overlay;
  backdrop-filter: blur(3px);
  @include flex(column, stretch, flex-end);

  @include from('sm') {
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  // Móvil: hoja desde abajo, a mano del pulgar.
  &__box {
    @include card;
    @include flex(column, stretch, flex-start, 0.9rem);
    width: 100%;
    max-height: 92vh;
    overflow-y: auto;
    padding: 1.25rem 1.1rem calc(1.25rem + env(safe-area-inset-bottom));
    border-radius: $radius-lg $radius-lg 0 0;
    box-shadow: $shadow-lg;

    @include from('sm') {
      max-width: 520px;
      border-radius: $radius-lg;
      padding: 1.6rem;
    }
  }

  &__head {
    @include flex(row, center, space-between, 1rem);
  }

  &__title {
    @include display($text-xl);
  }

  &__close {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: $bone-soft;

    &:hover {
      background: rgba($white, 0.06);
    }
  }

  &__row {
    @include flex-cards(180px, 0.9rem);
  }

  &__field textarea {
    resize: vertical;
  }

  &__actions {
    @include flex(row, center, flex-end, 0.5rem);
    flex-wrap: wrap;
    margin-top: 0.4rem;

    .btn {
      flex: 1 1 auto;

      @include from('sm') {
        flex: 0 0 auto;
      }
    }
  }
}
</style>
