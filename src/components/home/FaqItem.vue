<script setup lang="ts">
import { ref, useId } from 'vue'

defineProps<{ question: string; answer: string }>()

const open = ref(false)
const panel = ref<HTMLElement | null>(null)
const id = useId()

// La altura se anima entre 0 y la medida real del contenido (no se anima "auto").
function heightStyle() {
  if (!open.value) return { height: '0px' }
  return { height: `${panel.value?.scrollHeight ?? 0}px` }
}
</script>

<template>
  <div class="faq-item" :class="{ 'faq-item--open': open }">
    <h3 class="faq-item__heading">
      <button
        :id="`${id}-btn`"
        class="faq-item__button"
        type="button"
        :aria-expanded="open"
        :aria-controls="`${id}-panel`"
        @click="open = !open"
      >
        <span>{{ question }}</span>
        <span class="faq-item__icon" aria-hidden="true"></span>
      </button>
    </h3>
    <div
      :id="`${id}-panel`"
      ref="panel"
      class="faq-item__panel"
      role="region"
      :aria-labelledby="`${id}-btn`"
      :style="heightStyle()"
      :inert="!open"
    >
      <p class="faq-item__answer">{{ answer }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.faq-item {
  border-bottom: 1px solid $line;

  &__heading {
    font-family: $font-principal;
    text-transform: none;
  }

  &__button {
    width: 100%;
    @include flex(row, center, space-between, 1.5rem);
    padding-block: 1.4rem;
    text-align: left;
    font-size: $text-lg;
    font-weight: 600;
    line-height: 1.35;
    text-wrap: pretty;
    color: $bone;
    transition: color 0.2s ease;

    &:hover {
      color: $accent;
    }
  }

  &__icon {
    position: relative;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border: 1px solid $line-strong;
    border-radius: 50%;
    transition:
      background-color 0.25s ease,
      border-color 0.25s ease;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12px;
      height: 2px;
      margin: -1px 0 0 -6px;
      background: currentColor;
      transition: transform 0.3s $ease;
    }

    &::after {
      transform: rotate(90deg);
    }
  }

  &--open &__icon {
    background: $accent;
    border-color: $accent;
    color: $white;

    &::after {
      transform: rotate(0deg);
    }
  }

  &__panel {
    overflow: hidden;
    transition: height 0.35s $ease;
  }

  &__answer {
    color: $bone-soft;
    padding-bottom: 1.5rem;
    max-width: 44rem;
  }
}
</style>
