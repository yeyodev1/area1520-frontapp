<script setup lang="ts">
import { site } from '@/config/site'

defineProps<{ whatsappUrl: string }>()
</script>

<template>
  <div class="success" role="status">
    <span class="success__icon" aria-hidden="true"><i class="fa-solid fa-check"></i></span>
    <p class="success__eyebrow">{{ site.lead.eyebrow }}</p>
    <h3 class="success__title">{{ site.lead.success }}</h3>
    <a :href="whatsappUrl" class="btn btn--primary success__cta" target="_blank" rel="noopener">
      <i class="fa-brands fa-whatsapp"></i> Confirmar por WhatsApp
    </a>
  </div>
</template>

<style scoped lang="scss">
.success {
  @include flex(column, flex-start, flex-start, 1rem);
  padding-block: 1rem;

  &__icon {
    @include flex(row, center, center);
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: $success;
    color: $night;
    font-size: 1.4rem;
    animation: pop 0.5s $ease both;
  }

  &__eyebrow {
    @include eyebrow;
  }

  &__title {
    @include display($display-sm);
    line-height: 1.05;
  }

  &__cta {
    margin-top: 0.5rem;
  }
}

@keyframes pop {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
}
</style>
