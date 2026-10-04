<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useSwipe } from '@/composables/useSwipe'
import { lightboxSrc } from '@/composables/useLightbox'
import { site } from '@/config/site'
import { photoAlt } from '@/utils/photo'
import type { Photo } from '@/types'

const props = defineProps<{ photo: Photo | null; index: number | null; total: number; loaded: number }>()
const emit = defineEmits<{ close: []; next: []; prev: [] }>()

const dialog = ref<HTMLElement | null>(null)
const loading = ref(true)
const hasPrev = computed(() => (props.index ?? 0) > 0)
const hasNext = computed(() => (props.index ?? 0) < props.loaded - 1)

const swipe = useSwipe({
  onLeft: () => hasNext.value && emit('next'),
  onRight: () => hasPrev.value && emit('prev'),
  onDown: () => emit('close'),
})

watch(
  () => props.photo?._id,
  () => (loading.value = true),
)

watch(
  () => props.photo !== null,
  async (open) => {
    if (!open) return
    await nextTick()
    dialog.value?.focus()
  },
)

// Teclado solo mientras está abierto; las flechas no se animan, cambian al instante.
function onKey(event: KeyboardEvent) {
  if (!props.photo) return
  if (event.key === 'Escape') emit('close')
  else if (event.key === 'ArrowRight' && hasNext.value) emit('next')
  else if (event.key === 'ArrowLeft' && hasPrev.value) emit('prev')
  else return
  event.preventDefault()
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

// fl_attachment hace que Cloudinary responda como descarga en lugar de abrir la imagen.
const download = computed(() =>
  props.photo ? `https://res.cloudinary.com/${site.cloudinaryCloud}/image/upload/fl_attachment/${props.photo.publicId}` : '#',
)
const formatter = new Intl.NumberFormat('es-EC')
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="photo && index !== null"
        ref="dialog"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="`Foto ${index + 1} de ${total}`"
        tabindex="-1"
      >
        <header class="lightbox__bar">
          <p class="lightbox__counter" aria-live="polite">
            <strong>{{ formatter.format(index + 1) }}</strong> / {{ formatter.format(total) }}
          </p>
          <div class="lightbox__tools">
            <a :href="download" class="lightbox__tool" aria-label="Descargar la foto">
              <i class="fa-solid fa-download"></i>
            </a>
            <a :href="photo.url" class="lightbox__tool" target="_blank" rel="noopener" aria-label="Abrir la foto original">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            <button type="button" class="lightbox__tool" aria-label="Cerrar" @click="emit('close')">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </header>

        <div
          class="lightbox__stage"
          @click.self="emit('close')"
          @pointerdown="swipe.onPointerDown"
          @pointermove="swipe.onPointerMove"
          @pointerup="swipe.onPointerUp"
          @pointercancel="swipe.onPointerCancel"
        >
          <i v-if="loading" class="fa-solid fa-spinner fa-spin lightbox__spinner" aria-hidden="true"></i>
          <img
            :key="photo._id"
            class="lightbox__img"
            :class="{ 'lightbox__img--loading': loading }"
            :src="lightboxSrc(photo)"
            :alt="photoAlt(photo, index + 1)"
            :width="photo.width"
            :height="photo.height"
            :style="swipe.offset.value ? { transform: `translateX(${swipe.offset.value}px)`, transition: 'none' } : undefined"
            draggable="false"
            @load="loading = false"
          />
        </div>

        <button v-if="hasPrev" type="button" class="lightbox__nav lightbox__nav--prev" aria-label="Foto anterior" @click="emit('prev')">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <button v-if="hasNext" type="button" class="lightbox__nav lightbox__nav--next" aria-label="Foto siguiente" @click="emit('next')">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba(#050608, 0.96);
  @include flex(column, stretch, flex-start);
  outline: none;

  &__bar {
    @include flex(row, center, space-between, 1rem);
    padding: 0.75rem 0.75rem 0.75rem 1.25rem;
    flex-shrink: 0;
  }

  &__counter {
    font-family: $font-mono;
    font-size: 0.85rem;
    color: $bone-soft;
    font-variant-numeric: tabular-nums;

    strong {
      color: $bone;
      font-weight: 500;
    }
  }

  &__tools {
    @include flex(row, center, flex-end, 0.25rem);
  }

  &__tool {
    @include flex(row, center, center);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    color: $bone;
    font-size: 1.1rem;
    transition: background-color 0.2s ease;

    &:hover {
      background: rgba($white, 0.1);
    }
  }

  &__stage {
    position: relative;
    flex: 1;
    min-height: 0;
    @include flex(row, center, center);
    padding: 0 0.5rem 5rem;
    touch-action: pan-y;

    @include from('md') {
      padding: 0 5.5rem 1.5rem;
    }
  }

  &__img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    user-select: none;
    transition:
      opacity 0.25s ease,
      transform 0.3s $ease;

    &--loading {
      opacity: 0.25;
    }
  }

  &__spinner {
    position: absolute;
    color: $bone-soft;
    font-size: 1.5rem;
  }

  // Móvil: flechas abajo, al alcance del pulgar. Desktop: a los lados, centradas.
  &__nav {
    position: absolute;
    bottom: 1rem;
    @include flex(row, center, center);
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 1px solid $line-strong;
    background: rgba($night, 0.6);
    color: $bone;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease,
      transform 0.15s ease-out;

    @include from('md') {
      bottom: auto;
      top: 50%;
      width: 56px;
      height: 56px;
      margin-top: -28px;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: $accent;
        border-color: $accent;
      }
    }

    &:active {
      transform: scale(0.95);
    }

    &--prev {
      left: calc(50% - 64px);

      @include from('md') {
        left: 1rem;
      }
    }

    &--next {
      right: calc(50% - 64px);

      @include from('md') {
        right: 1rem;
      }
    }
  }
}

.lightbox-enter-active {
  transition: opacity 0.25s ease;

  .lightbox__img {
    transition: transform 0.35s $ease;
  }
}

.lightbox-leave-active {
  transition: opacity 0.18s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;

  .lightbox__img {
    transform: scale(0.96);
  }
}
</style>
