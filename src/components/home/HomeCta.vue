<script setup lang="ts">
import { site, whatsappLink, firstDayMessage } from '@/config/site'
import LeadForm from '@/components/lead/LeadForm.vue'
</script>

<template>
  <section class="cta" aria-labelledby="cta-title">
    <div class="cta__inner">
      <div class="cta__copy">
        <p class="cta__eyebrow">{{ site.lead.eyebrow }}</p>
        <h2 id="cta-title" class="cta__title" v-reveal>{{ site.lead.title }}</h2>
        <p class="cta__text">{{ site.lead.text }}</p>
        <a :href="whatsappLink(firstDayMessage)" class="cta__wa" target="_blank" rel="noopener">
          <i class="fa-brands fa-whatsapp"></i> {{ site.hero.secondary }}
        </a>
      </div>
      <div class="cta__card" v-reveal="120">
        <LeadForm />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cta {
  padding: $space-section 0.75rem;

  @include from('md') {
    padding-inline: 1.5rem;
  }

  &__inner {
    position: relative;
    max-width: 1320px;
    margin-inline: auto;
    background: $accent;
    color: $night;
    border-radius: $radius-lg;
    overflow: hidden;
    padding: 2.5rem 1rem 1rem;
    @include flex(column, stretch, flex-start, 2rem);

    @include from('md') {
      padding: 3.5rem;
    }

    @include from('lg') {
      flex-direction: row;
      align-items: flex-start;
      gap: 4rem;
      padding: 4.5rem;
    }

    // El techo del escudo, gigante y casi invisible, como marca de agua.
    &::before {
      content: '';
      position: absolute;
      left: -10%;
      bottom: -18%;
      width: 80%;
      aspect-ratio: 2;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Cpath d='M10 100V45L100 8L190 45V100' fill='none' stroke='%230a0b0e' stroke-opacity='0.08' stroke-width='16'/%3E%3C/svg%3E")
        no-repeat center / contain;
      pointer-events: none;
    }
  }

  &__copy {
    position: relative;
    flex: 1 1 45%;
    min-width: 0;
    @include flex(column, flex-start, flex-start, 1.1rem);
    padding-inline: 0.5rem;

    @include from('lg') {
      position: sticky;
      top: 120px;
    }
  }

  &__eyebrow {
    @include eyebrow;
    color: $night;
  }

  &__title {
    @include display($display-lg);
    font-size: clamp(2.6rem, 1.4rem + 4vw, 5rem);
    color: $night;
  }

  &__text {
    font-size: $text-lg;
    line-height: 1.5;
    max-width: 30rem;
    color: rgba($night, 0.85);
  }

  &__wa {
    @include flex(row, center, flex-start, 0.5rem);
    font-weight: 700;
    border-bottom: 2px solid $night;
    padding-block: 0.4rem 0.2rem;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.7;
    }
  }

  &__card {
    position: relative;
    flex: 1 1 55%;
    min-width: 0;
    background: $night;
    color: $bone;
    border-radius: $radius-md;
    padding: 1.5rem 1.1rem;
    box-shadow: $shadow-lg;

    @include from('md') {
      padding: 2.2rem;
    }
  }
}
</style>
