<script setup lang="ts">
import { tagLabel } from './adminCopy'
import { cloudinaryThumb } from '@/utils/cloudinary'
import type { Photo } from '@/types'

defineProps<{ photo: Photo; selected: boolean; isCover: boolean }>()
const emit = defineEmits<{ select: []; hide: []; tags: []; cover: []; remove: [] }>()
</script>

<template>
  <figure class="tile" :class="{ 'tile--hidden': photo.isHidden, 'tile--selected': selected }">
    <button
      type="button"
      class="tile__image"
      :aria-pressed="selected"
      :aria-label="`${selected ? 'Quitar de' : 'Agregar a'} la selección: ${photo.originalName}`"
      @click="emit('select')"
    >
      <img :src="cloudinaryThumb(photo.publicId, 300)" :alt="photo.originalName" loading="lazy" width="300" height="300" />
      <span class="tile__check"><i class="fa-solid fa-check"></i></span>
      <span v-if="photo.isHidden" class="tile__flag"><i class="fa-solid fa-eye-slash"></i> Oculta</span>
      <span v-if="isCover" class="tile__flag tile__flag--cover"><i class="fa-solid fa-star"></i> Portada</span>
    </button>

    <p v-if="photo.tags.length" class="tile__tags">
      <span v-for="tag in photo.tags" :key="tag" class="tile__tag">{{ tagLabel(tag) }}</span>
    </p>

    <figcaption class="tile__actions">
      <button
        type="button"
        class="tile__btn"
        :class="{ 'is-on': photo.isHidden }"
        :aria-label="photo.isHidden ? 'Mostrar en el sitio' : 'Ocultar del sitio'"
        :title="photo.isHidden ? 'Mostrar en el sitio' : 'Ocultar del sitio'"
        @click="emit('hide')"
      >
        <i :class="photo.isHidden ? 'fa-solid fa-eye-slash' : 'fa-regular fa-eye'"></i>
      </button>
      <button
        type="button"
        class="tile__btn"
        :class="{ 'is-on': photo.tags.length }"
        aria-label="Etiquetas"
        title="Etiquetas"
        @click="emit('tags')"
      >
        <i class="fa-solid fa-tag"></i>
      </button>
      <button
        type="button"
        class="tile__btn"
        :class="{ 'is-on': isCover }"
        :disabled="isCover"
        aria-label="Usar como portada del álbum"
        title="Usar como portada del álbum"
        @click="emit('cover')"
      >
        <i :class="isCover ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i>
      </button>
      <button
        type="button"
        class="tile__btn tile__btn--danger"
        aria-label="Eliminar foto"
        title="Eliminar foto"
        @click="emit('remove')"
      >
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </figcaption>
  </figure>
</template>

<style scoped lang="scss">
.tile {
  @include card;
  overflow: hidden;
  @include flex(column, stretch, flex-start);
  @include transition(border-color);

  &--selected {
    border-color: $accent;
    box-shadow: 0 0 0 1px $accent;
  }

  &__image {
    position: relative;
    display: block;
    aspect-ratio: 1;
    background: $iron;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      @include transition(opacity);
    }
  }

  &--hidden &__image img {
    opacity: 0.35;
    filter: grayscale(1);
  }

  &__check {
    position: absolute;
    top: 0.45rem;
    left: 0.45rem;
    @include flex(row, center, center);
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 2px solid rgba($white, 0.85);
    background: rgba($night, 0.35);
    color: transparent;
    font-size: 0.72rem;
  }

  &--selected &__check {
    background: $accent;
    border-color: $accent;
    color: $white;
  }

  &__flag {
    position: absolute;
    bottom: 0.4rem;
    left: 0.4rem;
    padding: 0.15rem 0.5rem;
    border-radius: $radius-pill;
    background: rgba($night, 0.85);
    font-family: $font-mono;
    font-size: 0.6rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $bone-soft;

    &--cover {
      bottom: auto;
      top: 0.45rem;
      left: auto;
      right: 0.4rem;
      color: $tape;
    }
  }

  &__tags {
    @include flex(row, center, flex-start, 0.25rem);
    flex-wrap: wrap;
    padding: 0.45rem 0.45rem 0;
  }

  &__tag {
    padding: 0.1rem 0.45rem;
    border-radius: $radius-pill;
    background: $accent-soft;
    color: $accent-bright;
    font-size: 0.62rem;
    font-weight: 700;
  }

  &__actions {
    @include flex(row, center, space-between);
    margin-top: auto;
    padding: 0.2rem;
  }

  &__btn {
    flex: 1 1 0;
    height: 40px;
    border-radius: $radius-sm;
    color: $bone-muted;
    font-size: 0.92rem;
    @include transition(background);

    &:hover {
      background: rgba($white, 0.06);
      color: $bone;
    }

    &.is-on {
      color: $accent;
    }

    &:disabled {
      cursor: default;
      color: $tape;
    }

    &--danger:hover {
      background: $danger-bg;
      color: $danger;
    }
  }
}
</style>
