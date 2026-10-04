<script setup lang="ts">
import { site } from '@/config/site'
</script>

<template>
  <section class="not-found">
    <p class="not-found__code" aria-hidden="true">404</p>
    <p class="not-found__eyebrow">Página no encontrada</p>
    <h1 class="not-found__title">Este WOD no existe</h1>
    <p class="not-found__text">Puede que el enlace esté mal escrito o que la página se haya movido.</p>
    <div class="not-found__actions">
      <RouterLink to="/" class="btn btn--primary">Volver al inicio</RouterLink>
      <RouterLink :to="site.cta.to" class="btn btn--ghost">{{ site.cta.label }}</RouterLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.not-found {
  @include container(720px);
  @include flex(column, center, center, 1rem);
  flex: 1;
  min-height: 90svh;
  text-align: center;
  padding-top: 76px;
  padding-bottom: $space-xl;

  &__code {
    font-family: $font-display;
    font-size: clamp(8rem, 40vw, 16rem);
    line-height: 0.8;
    color: transparent;
    -webkit-text-stroke: 2px $accent;
  }

  &__eyebrow {
    @include eyebrow;
    margin-top: 1rem;
  }

  &__title {
    @include display($display-md);
  }

  &__text {
    color: $bone-soft;
    max-width: 30rem;
  }

  &__actions {
    @include flex(row, center, center, 0.75rem);
    flex-wrap: wrap;
    margin-top: 0.8rem;
  }
}
</style>
