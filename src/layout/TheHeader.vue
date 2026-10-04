<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { site, whatsappLink } from '@/config/site'
import BrandMark from '@/components/brand/BrandMark.vue'
import { useBodyScroll } from '@/composables/useBodyScroll'
import { useScrolled } from '@/composables/useScrolled'

const route = useRoute()
const open = ref(false)
const scrolled = useScrolled(40)

useBodyScroll(open)

// Al navegar se cierra el menú móvil.
watch(() => route.fullPath, () => (open.value = false))

const solid = computed(() => scrolled.value || open.value)

// Los anchors de la home (/#box) no marcan activo: vue-router los daría por activos en "/".
const isActive = (to: string) => !to.includes('#') && route.path.startsWith(to)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false
}
</script>

<template>
  <header class="header" :class="{ 'header--solid': solid, 'header--open': open }" @keydown="onKeydown">
    <div class="header__inner">
      <RouterLink to="/" class="header__brand" aria-label="AREA1520, ir al inicio">
        <BrandMark :size="30" />
        <span class="header__name">{{ site.shortName }}</span>
      </RouterLink>

      <nav class="header__nav" aria-label="Principal">
        <RouterLink
          v-for="link in site.nav"
          :key="link.to"
          :to="link.to"
          class="header__link"
          :class="{ 'header__link--active': isActive(link.to) }"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="header__actions">
        <RouterLink :to="site.cta.to" class="btn btn--primary btn--sm header__cta">
          {{ site.cta.label }}
        </RouterLink>
        <button
          class="header__burger"
          type="button"
          :aria-label="open ? 'Cerrar menú' : 'Abrir menú'"
          :aria-expanded="open"
          aria-controls="menu-movil"
          @click="open = !open"
        >
          <span class="header__burger-line"></span>
          <span class="header__burger-line"></span>
        </button>
      </div>
    </div>

    <Transition name="menu">
      <div v-if="open" id="menu-movil" class="menu">
        <nav class="menu__nav" aria-label="Menú móvil">
          <RouterLink
            v-for="(link, i) in site.nav"
            :key="link.to"
            :to="link.to"
            class="menu__link"
            :class="{ 'menu__link--active': isActive(link.to) }"
            :style="{ '--i': i }"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
        <div class="menu__foot" :style="{ '--i': site.nav.length }">
          <RouterLink :to="site.cta.to" class="btn btn--primary">{{ site.cta.label }}</RouterLink>
          <a :href="whatsappLink()" class="btn btn--ghost" target="_blank" rel="noopener">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  transition:
    background-color 0.35s ease,
    border-color 0.35s ease,
    backdrop-filter 0.35s ease;
  border-bottom: 1px solid transparent;

  // Sobre el hero: un velo muy leve para que el logo se lea sobre fotos claras.
  &::before {
    content: '';
    position: absolute;
    inset: 0 0 -40px;
    background: linear-gradient(rgba($night, 0.55), transparent);
    pointer-events: none;
    transition: opacity 0.35s ease;
    z-index: -1;
  }

  &--solid {
    background: rgba($night, 0.78);
    backdrop-filter: blur(14px) saturate(1.4);
    border-color: $line;

    &::before {
      opacity: 0;
    }
  }

  // Sin backdrop-filter: si no, el menú fijo quedaría encerrado en la caja del header.
  &--open {
    background: $night;
    backdrop-filter: none;
  }

  &__inner {
    @include container(1320px);
    @include flex(row, center, space-between, 1rem);
    height: 64px;

    @include from('lg') {
      height: 76px;
    }
  }

  &__brand {
    @include flex(row, center, flex-start, 0.65rem);
    position: relative;
    z-index: 2;
  }

  &__name {
    font-family: $font-display;
    font-size: 1.35rem;
    letter-spacing: 0.04em;
    line-height: 1;
  }

  &__nav {
    display: none;

    @include from('lg') {
      @include flex(row, center, center, 2rem);
    }
  }

  &__link {
    font-family: $font-mono;
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: $bone-soft;
    padding-block: 0.4rem;
    position: relative;
    transition: color 0.2s ease;

    &::after {
      content: '';
      position: absolute;
      inset: auto 0 0;
      height: 2px;
      background: $accent;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s $ease;
    }

    &:hover,
    &--active {
      color: $bone;

      &::after {
        transform: scaleX(1);
      }
    }
  }

  &__actions {
    @include flex(row, center, flex-end, 0.75rem);
    position: relative;
    z-index: 2;
  }

  &__cta {
    display: none;

    @include from('sm') {
      display: inline-flex;
    }
  }

  &__burger {
    width: 44px;
    height: 44px;
    @include flex(column, center, center, 7px);

    @include from('lg') {
      display: none;
    }
  }

  &__burger-line {
    display: block;
    width: 24px;
    height: 2px;
    background: $bone;
    transition: transform 0.3s $ease;
  }

  &--open &__burger-line:first-child {
    transform: translateY(4.5px) rotate(45deg);
  }

  &--open &__burger-line:last-child {
    transform: translateY(-4.5px) rotate(-45deg);
  }
}

.menu {
  position: fixed;
  inset: 0;
  top: 0;
  z-index: 1;
  background: $night;
  padding: 96px 1.25rem 2rem;
  @include flex(column, stretch, space-between, 2rem);
  overflow-y: auto;

  &__nav {
    @include flex(column, flex-start, flex-start, 0.25rem);
  }

  &__link {
    font-family: $font-display;
    font-size: clamp(2.6rem, 12vw, 4.5rem);
    line-height: 1.05;
    text-transform: uppercase;
    color: $bone;
    transition: color 0.2s ease;

    &--active,
    &:hover {
      color: $accent;
    }
  }

  &__foot {
    @include flex(column, stretch, flex-start, 0.75rem);
  }

  &__link,
  &__foot {
    transition:
      opacity 0.45s $ease,
      transform 0.45s $ease;
    transition-delay: calc(var(--i) * 45ms + 60ms);
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s ease;
}

.menu-leave-active {
  transition-duration: 0.2s;

  .menu__link,
  .menu__foot {
    transition-delay: 0ms;
  }
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;

  .menu__link,
  .menu__foot {
    opacity: 0;
    transform: translateY(24px);
  }
}
</style>
