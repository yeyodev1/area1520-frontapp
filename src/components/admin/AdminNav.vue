<script setup lang="ts">
import { useRoute } from 'vue-router'
import { adminNav } from './adminCopy'

defineProps<{ newLeads: number }>()
const emit = defineEmits<{ logout: [] }>()

const route = useRoute()
const isActive = (match: string[]) => match.includes(String(route.name))
</script>

<template>
  <nav class="admin-nav" aria-label="Panel de administración">
    <RouterLink :to="{ name: 'AdminDashboard' }" class="admin-nav__brand">
      AREA<span>1520</span>
      <small>Panel</small>
    </RouterLink>

    <ul class="admin-nav__list">
      <li v-for="item in adminNav" :key="item.label" class="admin-nav__item">
        <RouterLink
          :to="{ name: item.name }"
          class="admin-nav__link"
          :class="{ 'is-active': isActive(item.match) }"
          :aria-current="isActive(item.match) ? 'page' : undefined"
        >
          <span class="admin-nav__icon">
            <i :class="item.icon"></i>
            <span v-if="item.badge && newLeads" class="admin-nav__badge">
              {{ newLeads > 99 ? '99+' : newLeads }}
            </span>
          </span>
          <span class="admin-nav__label">{{ item.label }}</span>
        </RouterLink>
      </li>
      <li class="admin-nav__item admin-nav__item--push">
        <a href="/" target="_blank" rel="noopener" class="admin-nav__link">
          <span class="admin-nav__icon"><i class="fa-solid fa-arrow-up-right-from-square"></i></span>
          <span class="admin-nav__label">Ver sitio</span>
        </a>
      </li>
      <li class="admin-nav__item">
        <button type="button" class="admin-nav__link" @click="emit('logout')">
          <span class="admin-nav__icon"><i class="fa-solid fa-right-from-bracket"></i></span>
          <span class="admin-nav__label">Salir</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
// Móvil: barra inferior fija al alcance del pulgar. Desde md: sidebar.
.admin-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  background: rgba($carbon, 0.96);
  backdrop-filter: blur(10px);
  border-top: 1px solid $line;
  padding-bottom: env(safe-area-inset-bottom);

  @include from('md') {
    top: 0;
    right: auto;
    width: 232px;
    @include flex(column, stretch, flex-start, 2rem);
    border-top: none;
    border-right: 1px solid $line;
    padding: 1.6rem 1rem;
  }

  &__brand {
    display: none;

    @include from('md') {
      display: block;
      font-family: $font-display;
      font-size: 1.7rem;
      letter-spacing: 0.02em;
      padding-inline: 0.7rem;

      span {
        color: $accent;
      }

      small {
        display: block;
        @include eyebrow;
        color: $bone-muted;
        margin-top: 0.3rem;
      }
    }
  }

  &__list {
    list-style: none;
    @include flex(row, stretch, space-around);

    @include from('md') {
      flex: 1;
      flex-direction: column;
      justify-content: flex-start;
      gap: 0.25rem;
    }
  }

  &__item {
    flex: 1;

    @include from('md') {
      flex: 0 0 auto;

      &--push {
        margin-top: auto;
      }
    }
  }

  &__link {
    width: 100%;
    min-height: 60px;
    @include flex(column, center, center, 0.2rem);
    color: $bone-muted;
    font-size: 0.66rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    @include transition(color);

    @include from('md') {
      min-height: 44px;
      flex-direction: row;
      justify-content: flex-start;
      gap: 0.8rem;
      padding: 0 0.8rem;
      border-radius: $radius-md;
      font-size: $text-sm;
      letter-spacing: 0;
      @include transition(background);

      &:hover {
        background: rgba($white, 0.04);
        color: $bone;
      }
    }

    &.is-active {
      color: $accent;

      @include from('md') {
        background: $accent-soft;
      }
    }
  }

  &__icon {
    position: relative;
    font-size: 1.1rem;
    width: 1.4rem;
    text-align: center;
  }

  &__badge {
    position: absolute;
    top: -0.45rem;
    left: 0.85rem;
    min-width: 1.15rem;
    height: 1.15rem;
    padding: 0 0.3rem;
    border-radius: $radius-pill;
    background: $accent;
    color: $white;
    font-family: $font-mono;
    font-size: 0.62rem;
    font-weight: 700;
    line-height: 1.15rem;
  }
}
</style>
