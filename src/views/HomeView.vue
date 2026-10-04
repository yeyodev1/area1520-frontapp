<script setup lang="ts">
import HomeHero from '@/components/home/HomeHero.vue'
import HomeTicker from '@/components/home/HomeTicker.vue'
import HomeBox from '@/components/home/HomeBox.vue'
import HomePrograms from '@/components/home/HomePrograms.vue'
import HomeCoach from '@/components/home/HomeCoach.vue'
import HomeGames from '@/components/home/HomeGames.vue'
import HomeLocations from '@/components/home/HomeLocations.vue'
import HomeCommunity from '@/components/home/HomeCommunity.vue'
import HomeFaq from '@/components/home/HomeFaq.vue'
import HomeCta from '@/components/home/HomeCta.vue'
</script>

<template>
  <div class="home">
    <HomeHero />
    <HomeTicker />
    <HomeBox />
    <HomePrograms />
    <HomeCoach />
    <HomeGames />
    <HomeLocations />
    <HomeCommunity />
    <HomeFaq />
    <HomeCta />
  </div>
</template>

<style scoped lang="scss">
.home {
  // La cinta inclinada sobresale por los lados: se recorta sin crear scroll horizontal.
  overflow-x: clip;
}
</style>
