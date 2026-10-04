<script setup lang="ts">
import { site } from '@/config/site'
import SectionHead from '@/components/common/SectionHead.vue'
import FaqItem from './FaqItem.vue'
</script>

<template>
  <section class="faq" aria-labelledby="faq-title">
    <div class="faq__inner">
      <div class="faq__head">
        <SectionHead :eyebrow="site.faq.eyebrow" :title="site.faq.title" size="md" title-id="faq-title" />
      </div>
      <div class="faq__list" v-reveal>
        <FaqItem v-for="item in site.faq.items" :key="item.q" :question="item.q" :answer="item.a" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq {
  padding-block: $space-section;

  &__inner {
    @include container(1320px);
    @include flex(column, stretch, flex-start, $space-lg);

    @include from('lg') {
      flex-direction: row;
      gap: 5rem;
    }
  }

  &__head {
    flex: 0 0 auto;

    @include from('lg') {
      flex-basis: 34%;
      position: sticky;
      top: 110px;
      align-self: flex-start;
    }
  }

  &__list {
    flex: 1;
    min-width: 0;
    border-top: 1px solid $line;
  }
}
</style>
