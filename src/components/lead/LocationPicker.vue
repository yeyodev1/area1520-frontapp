<script setup lang="ts">
import { site } from '@/config/site'
import type { LocationSlug } from '@/types'

defineProps<{ error?: string }>()
const model = defineModel<LocationSlug | ''>({ required: true })
</script>

<template>
  <fieldset class="picker" :aria-invalid="Boolean(error)" :aria-describedby="error ? 'sede-error' : undefined">
    <legend class="picker__legend">Sede</legend>
    <div class="picker__options">
      <label v-for="loc in site.locations.items" :key="loc.slug" class="picker__card" :class="{ 'picker__card--on': model === loc.slug }">
        <input v-model="model" class="visually-hidden" type="radio" name="sede" :value="loc.slug" />
        <span class="picker__check" aria-hidden="true"><i class="fa-solid fa-check"></i></span>
        <span class="picker__name">{{ loc.name.replace('Sede ', '') }}</span>
        <span class="picker__area">{{ loc.area }}</span>
      </label>
    </div>
    <p v-if="error" id="sede-error" class="picker__error">{{ error }}</p>
  </fieldset>
</template>

<style scoped lang="scss">
.picker {
  border: none;
  min-width: 0;

  &__legend {
    font-family: $font-mono;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $bone-soft;
    margin-bottom: 0.5rem;
  }

  &__options {
    @include flex(row, stretch, flex-start, 0.6rem);
  }

  &__card {
    position: relative;
    flex: 1 1 0;
    min-width: 0;
    @include flex(column, flex-start, flex-start, 0.2rem);
    margin: 0;
    padding: 0.9rem 1rem;
    background: $iron;
    border: 1px solid $line;
    border-radius: $radius-sm;
    cursor: pointer;
    text-transform: none;
    letter-spacing: normal;
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease,
      transform 0.15s ease-out;

    &:hover {
      border-color: $line-strong;
    }

    &:active {
      transform: scale(0.98);
    }

    &:has(input:focus-visible) {
      outline: 2px solid $accent;
      outline-offset: 2px;
    }

    &--on {
      border-color: $accent;
      background: rgba($accent, 0.1);
    }
  }

  &__check {
    position: absolute;
    top: 0.7rem;
    right: 0.7rem;
    @include flex(row, center, center);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid $line-strong;
    font-size: 0.6rem;
    color: transparent;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
  }

  &__card--on &__check {
    background: $accent;
    border-color: $accent;
    color: $white;
  }

  &__name {
    font-family: $font-display;
    font-size: 1.5rem;
    line-height: 1;
    text-transform: uppercase;
    color: $bone;
  }

  &__area {
    font-family: $font-principal;
    font-size: 0.75rem;
    color: $bone-muted;
    line-height: 1.3;
  }

  &__error {
    margin-top: 0.4rem;
    font-size: $text-sm;
    color: $danger;
  }
}
</style>
