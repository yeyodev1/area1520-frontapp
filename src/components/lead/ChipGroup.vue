<script setup lang="ts">
// Opciones como chips: radios reales por dentro (teclado y lector de pantalla gratis).
// Volver a pulsar el chip elegido lo desmarca, porque estos campos son opcionales.
defineProps<{ legend: string; name: string; options: readonly string[] }>()
const model = defineModel<string>({ required: true })

function onClick(option: string, event: MouseEvent) {
  if (model.value === option) {
    event.preventDefault()
    model.value = ''
  }
}
</script>

<template>
  <fieldset class="chips">
    <legend class="chips__legend">{{ legend }} <span>(opcional)</span></legend>
    <div class="chips__list">
      <label v-for="option in options" :key="option" class="chips__chip" :class="{ 'chips__chip--on': model === option }">
        <input v-model="model" class="visually-hidden" type="radio" :name="name" :value="option" @click="onClick(option, $event)" />
        {{ option }}
      </label>
    </div>
  </fieldset>
</template>

<style scoped lang="scss">
.chips {
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

    span {
      color: $bone-muted;
      text-transform: none;
      letter-spacing: 0;
    }
  }

  &__list {
    @include flex(row, center, flex-start, 0.45rem);
    flex-wrap: wrap;
  }

  &__chip {
    margin: 0;
    padding: 0.55rem 0.9rem;
    min-height: 40px;
    @include flex(row, center, center);
    font-family: $font-principal;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0;
    text-transform: none;
    color: $bone-soft;
    background: $iron;
    border: 1px solid $line;
    border-radius: $radius-pill;
    cursor: pointer;
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease,
      color 0.2s ease,
      transform 0.15s ease-out;

    &:hover {
      border-color: $line-strong;
      color: $bone;
    }

    &:active {
      transform: scale(0.97);
    }

    &:has(input:focus-visible) {
      outline: 2px solid $accent;
      outline-offset: 2px;
    }

    &--on {
      background: $bone;
      border-color: $bone;
      color: $night;

      &:hover {
        color: $night;
      }
    }
  }
}
</style>
