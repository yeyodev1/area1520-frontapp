<script setup lang="ts">
defineProps<{ page: number; pages: number; total?: number }>()
const emit = defineEmits<{ change: [page: number] }>()
</script>

<template>
  <nav v-if="pages > 1" class="pager" aria-label="Paginación">
    <button class="btn btn--ghost btn--sm" :disabled="page <= 1" @click="emit('change', page - 1)">
      <i class="fa-solid fa-chevron-left"></i>
      <span class="pager__word">Anterior</span>
    </button>
    <span class="pager__info">Página {{ page }} de {{ pages }}</span>
    <button class="btn btn--ghost btn--sm" :disabled="page >= pages" @click="emit('change', page + 1)">
      <span class="pager__word">Siguiente</span>
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  </nav>
</template>

<style scoped lang="scss">
.pager {
  @include flex(row, center, center, 1rem);
  margin-top: 1.5rem;

  &__info {
    font-family: $font-mono;
    font-size: $text-xs;
    color: $bone-soft;
  }

  &__word {
    display: none;

    @include from('sm') {
      display: inline;
    }
  }
}
</style>
