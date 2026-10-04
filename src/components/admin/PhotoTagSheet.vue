<script setup lang="ts">
import { computed } from 'vue'
import { photoTags } from './adminCopy'
import { useBodyScroll } from '@/composables/useBodyScroll'
import { cloudinaryThumb } from '@/utils/cloudinary'
import type { Photo, PhotoTag } from '@/types'

const props = defineProps<{ photo: Photo | null }>()
const emit = defineEmits<{ close: []; toggle: [tag: PhotoTag] }>()

useBodyScroll(computed(() => !!props.photo))
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="photo" class="sheet" @click.self="emit('close')" @keydown.esc="emit('close')">
        <section class="sheet__box" role="dialog" aria-modal="true" aria-label="Etiquetas de la foto">
          <header class="sheet__head">
            <img :src="cloudinaryThumb(photo.publicId, 120)" alt="" class="sheet__thumb" />
            <div>
              <h2 class="sheet__title">Etiquetas</h2>
              <p class="sheet__hint">Deciden en qué parte del sitio aparece esta foto.</p>
            </div>
            <button type="button" class="sheet__close" aria-label="Cerrar" @click="emit('close')">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </header>

          <ul class="sheet__list">
            <li v-for="tag in photoTags" :key="tag.value">
              <button
                type="button"
                role="switch"
                class="sheet__option"
                :class="{ 'is-on': photo.tags.includes(tag.value) }"
                :aria-checked="photo.tags.includes(tag.value)"
                @click="emit('toggle', tag.value)"
              >
                <span class="sheet__box-check"><i class="fa-solid fa-check"></i></span>
                <span>
                  <strong>{{ tag.label }} <code>{{ tag.value }}</code></strong>
                  <small>{{ tag.help }}</small>
                </span>
              </button>
            </li>
          </ul>

          <button type="button" class="btn btn--ghost sheet__done" @click="emit('close')">Listo</button>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.sheet {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: $overlay;
  @include flex(column, stretch, flex-end);

  @include from('sm') {
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  &__box {
    @include card;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 1.1rem 1rem calc(1.1rem + env(safe-area-inset-bottom));
    border-radius: $radius-lg $radius-lg 0 0;
    box-shadow: $shadow-lg;

    @include from('sm') {
      max-width: 460px;
      border-radius: $radius-lg;
      padding: 1.4rem;
    }
  }

  &__head {
    @include flex(row, center, flex-start, 0.8rem);
    margin-bottom: 0.9rem;

    > div {
      flex: 1;
      min-width: 0;
    }
  }

  &__thumb {
    width: 52px;
    height: 52px;
    border-radius: $radius-sm;
    object-fit: cover;
  }

  &__title {
    @include display($text-lg);
  }

  &__hint {
    font-size: $text-xs;
    color: $bone-muted;
  }

  &__close {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: $bone-soft;
  }

  &__list {
    list-style: none;
    @include flex(column, stretch, flex-start, 0.4rem);
  }

  &__option {
    width: 100%;
    @include flex(row, center, flex-start, 0.8rem);
    text-align: left;
    padding: 0.7rem 0.8rem;
    border-radius: $radius-md;
    border: 1px solid $line;
    @include transition(border-color);

    strong {
      display: block;
      font-size: $text-sm;
    }

    code {
      font-family: $font-mono;
      font-size: 0.66rem;
      color: $bone-muted;
      margin-left: 0.3rem;
    }

    small {
      display: block;
      font-size: $text-xs;
      color: $bone-soft;
      line-height: 1.35;
    }

    &.is-on {
      border-color: rgba($accent, 0.6);
      background: $accent-soft;
    }
  }

  &__box-check {
    @include flex(row, center, center);
    flex: 0 0 auto;
    width: 22px;
    height: 22px;
    border-radius: 6px;
    border: 2px solid $line-strong;
    color: transparent;
    font-size: 0.7rem;
  }

  .is-on &__box-check {
    background: $accent;
    border-color: $accent;
    color: $white;
  }

  &__done {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>
