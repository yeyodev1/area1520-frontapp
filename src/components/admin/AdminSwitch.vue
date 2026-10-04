<script setup lang="ts">
defineProps<{ modelValue: boolean; label: string; showLabel?: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<template>
  <button
    type="button"
    role="switch"
    class="switch"
    :class="{ 'switch--on': modelValue }"
    :aria-checked="modelValue"
    :aria-label="showLabel ? undefined : label"
    @click="emit('update:modelValue', !modelValue)"
  >
    <span class="switch__track"><span class="switch__thumb"></span></span>
    <span v-if="showLabel" class="switch__label">{{ label }}</span>
  </button>
</template>

<style scoped lang="scss">
.switch {
  @include flex(row, center, flex-start, 0.55rem);
  min-height: 38px;
  font-size: $text-xs;
  font-weight: 600;
  color: $bone-soft;

  &__track {
    position: relative;
    flex: 0 0 auto;
    width: 40px;
    height: 22px;
    border-radius: $radius-pill;
    background: $iron;
    border: 1px solid $line-strong;
    @include transition(background);
  }

  &__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: $bone-muted;
    @include transition(transform);
  }

  &--on &__track {
    background: $success;
    border-color: $success;
  }

  &--on &__thumb {
    transform: translateX(18px);
    background: $white;
  }

  &--on &__label {
    color: $success;
  }
}
</style>
