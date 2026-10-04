<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminNav from '@/components/admin/AdminNav.vue'
import { useAdminStats } from '@/composables/admin/useAdminStats'
import { useUserStore } from '@/stores/user'
import { useToastStore } from '@/stores/toast'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const toast = useToastStore()
const { newLeads, refreshStats } = useAdminStats()

const firstName = computed(() => (userStore.user?.name || userStore.user?.email || '').split(/[\s@]/)[0])

onMounted(refreshStats)
// Al moverse entre secciones se refresca el badge: así un lead que entró
// mientras el dueño miraba la galería aparece sin recargar.
watch(() => route.name, refreshStats)

function logout() {
  userStore.clear()
  toast.info('Sesión cerrada')
  router.replace({ name: 'Login' })
}
</script>

<template>
  <div class="admin">
    <AdminNav :new-leads="newLeads" @logout="logout" />

    <div class="admin__main">
      <header class="admin__top">
        <span class="admin__brand">AREA<span>1520</span></span>
        <p class="admin__hello">
          <i class="fa-solid fa-circle-user"></i>
          Hola, <strong>{{ firstName }}</strong>
        </p>
      </header>

      <div class="admin__content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin {
  min-height: 100vh;
  background: $night;

  &__main {
    padding-bottom: calc(80px + env(safe-area-inset-bottom));

    @include from('md') {
      margin-left: 232px;
      padding-bottom: 3rem;
    }
  }

  &__top {
    @include flex(row, center, space-between, 1rem);
    padding: 0.9rem 1rem;
    border-bottom: 1px solid $line;
    background: $carbon;

    @include from('md') {
      justify-content: flex-end;
      padding: 1rem 2rem;
      background: transparent;
    }
  }

  &__brand {
    font-family: $font-display;
    font-size: 1.35rem;

    span {
      color: $accent;
    }

    @include from('md') {
      display: none;
    }
  }

  &__hello {
    @include flex(row, center, flex-start, 0.45rem);
    font-size: $text-sm;
    color: $bone-soft;

    i {
      font-size: 1.15rem;
      color: $bone-muted;
    }

    strong {
      color: $bone;
    }
  }

  &__content {
    padding: 1.25rem 1rem;

    @include from('md') {
      padding: 2rem;
      max-width: 1240px;
    }
  }
}
</style>
