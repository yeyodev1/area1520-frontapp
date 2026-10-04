<script setup lang="ts">
defineProps<{ eyebrow?: string; title: string; subtitle?: string }>()
</script>

<template>
  <header class="page-head">
    <div class="page-head__text">
      <p v-if="eyebrow" class="page-head__eyebrow">{{ eyebrow }}</p>
      <h1 class="page-head__title">{{ title }}</h1>
      <p v-if="subtitle" class="page-head__subtitle">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.default" class="page-head__actions">
      <slot />
    </div>
  </header>
</template>

<style scoped lang="scss">
.page-head {
  @include flex(row, flex-end, space-between, 1rem);
  flex-wrap: wrap;
  margin-bottom: 1.5rem;

  &__text {
    flex: 1 1 240px;
    min-width: 0;
  }

  &__eyebrow {
    @include eyebrow;
    margin-bottom: 0.5rem;
  }

  &__title {
    @include display($display-sm);
    overflow-wrap: anywhere;
  }

  &__subtitle {
    margin-top: 0.5rem;
    color: $bone-soft;
    font-size: $text-sm;
  }

  &__actions {
    @include flex(row, center, flex-start, 0.5rem);
    flex-wrap: wrap;
  }
}
</style>
