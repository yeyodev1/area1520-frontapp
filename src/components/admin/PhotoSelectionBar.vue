<script setup lang="ts">
defineProps<{ count: number; batch: { done: number; total: number } | null }>()
const emit = defineEmits<{ hide: []; show: []; clear: [] }>()
</script>

<template>
  <Transition name="rise">
    <div v-if="count || batch" class="selbar" role="region" aria-label="Acciones en lote">
      <template v-if="batch">
        <p class="selbar__text">
          <i class="fa-solid fa-spinner fa-spin"></i> Actualizando {{ batch.done }} de {{ batch.total }}…
        </p>
        <div class="selbar__bar"><span :style="{ width: `${(batch.done / batch.total) * 100}%` }"></span></div>
      </template>
      <template v-else>
        <p class="selbar__text"><strong>{{ count }}</strong> seleccionada(s)</p>
        <div class="selbar__actions">
          <button type="button" class="btn btn--sm btn--ghost" @click="emit('hide')">
            <i class="fa-solid fa-eye-slash"></i> Ocultar
          </button>
          <button type="button" class="btn btn--sm btn--ghost" @click="emit('show')">
            <i class="fa-regular fa-eye"></i> Mostrar
          </button>
          <button type="button" class="selbar__close" aria-label="Quitar selección" @click="emit('clear')">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </template>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
// Flota sobre la barra inferior del panel en móvil y al pie en desktop.
.selbar {
  position: fixed;
  left: 0.75rem;
  right: 0.75rem;
  bottom: calc(72px + env(safe-area-inset-bottom));
  z-index: 60;
  @include flex(row, center, space-between, 0.6rem);
  flex-wrap: wrap;
  padding: 0.6rem 0.75rem;
  border-radius: $radius-lg;
  background: $iron;
  border: 1px solid $line-strong;
  box-shadow: $shadow-md;

  @include from('md') {
    left: calc(232px + 2rem);
    right: 2rem;
    bottom: 1.25rem;
    max-width: 640px;
  }

  &__text {
    font-size: $text-sm;
    color: $bone-soft;

    strong {
      color: $bone;
    }
  }

  &__actions {
    @include flex(row, center, flex-end, 0.4rem);
  }

  &__close {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    color: $bone-soft;
  }

  &__bar {
    flex: 1 1 100%;
    height: 5px;
    border-radius: $radius-pill;
    background: $steel;
    overflow: hidden;

    span {
      display: block;
      height: 100%;
      background: $accent;
      transition: width 0.2s ease;
    }
  }
}
</style>
