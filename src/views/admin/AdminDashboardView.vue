<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AdminPageHead from '@/components/admin/AdminPageHead.vue'
import StatCard from '@/components/admin/StatCard.vue'
import { useAdminStats } from '@/composables/admin/useAdminStats'
import { locationName, timeAgo, whatsappUrl } from '@/composables/admin/leadHelpers'
import { adminService } from '@/services/admin.service'
import type { Lead } from '@/types'

const { stats, refreshStats } = useAdminStats()
const latest = ref<Lead[]>([])
const loadingLeads = ref(true)

const shortcuts = [
  { to: { name: 'AdminLeads' }, icon: 'fa-solid fa-user-plus', title: 'Interesados', text: 'Cambia estados, deja notas y escribe por WhatsApp.' },
  { to: { name: 'AdminAlbums' }, icon: 'fa-solid fa-cloud-arrow-up', title: 'Subir fotos', text: 'Crea un álbum o agrega fotos a uno existente.' },
  { to: { name: 'AdminAlbums' }, icon: 'fa-solid fa-tags', title: 'Fotos de la home', text: 'Etiqueta fotos como portada, destacadas o comunidad.' },
]

onMounted(async () => {
  refreshStats()
  try {
    latest.value = (await adminService.leads({ status: 'nuevo', limit: 5 })).items
  } catch {
    latest.value = []
  } finally {
    loadingLeads.value = false
  }
})
</script>

<template>
  <section class="dash">
    <AdminPageHead eyebrow="Panel" title="Así va el box" />

    <div class="dash__stats">
      <StatCard label="Nuevos sin atender" icon="fa-solid fa-bell" highlight :value="stats?.leads.nuevo ?? '–'" />
      <StatCard label="Últimos 7 días" icon="fa-solid fa-calendar-week" :value="stats?.leads.last7Days ?? '–'" />
      <StatCard label="Interesados en total" icon="fa-solid fa-users" :value="stats?.leads.total ?? '–'" />
      <StatCard
        label="Fotos"
        icon="fa-solid fa-camera"
        :value="stats?.photos.total ?? '–'"
        :hint="stats ? `${stats.photos.hidden} ocultas · ${stats.albums} álbumes` : undefined"
      />
    </div>

    <div class="dash__cols">
      <section class="dash__panel">
        <header class="dash__panel-head">
          <h2 class="dash__h2">Nuevos interesados</h2>
          <RouterLink :to="{ name: 'AdminLeads' }" class="dash__more">
            Ver todos <i class="fa-solid fa-arrow-right"></i>
          </RouterLink>
        </header>

        <p v-if="loadingLeads" class="dash__empty"><i class="fa-solid fa-spinner fa-spin"></i> Cargando…</p>
        <p v-else-if="!latest.length" class="dash__empty">
          <i class="fa-solid fa-circle-check"></i> No hay interesados nuevos pendientes.
        </p>
        <ul v-else class="dash__leads">
          <li v-for="lead in latest" :key="lead._id" class="dash__lead">
            <div class="dash__lead-info">
              <p class="dash__lead-name">{{ lead.name }}</p>
              <p class="dash__lead-meta">
                {{ locationName(lead.location) }} · {{ timeAgo(lead.createdAt) }}
              </p>
            </div>
            <a :href="whatsappUrl(lead)" target="_blank" rel="noopener" class="btn btn--sm dash__wa">
              <i class="fa-brands fa-whatsapp"></i> WhatsApp
            </a>
          </li>
        </ul>
      </section>

      <section class="dash__panel dash__panel--shortcuts">
        <h2 class="dash__h2">Accesos directos</h2>
        <RouterLink v-for="s in shortcuts" :key="s.title" :to="s.to" class="dash__shortcut">
          <span class="dash__shortcut-icon"><i :class="s.icon"></i></span>
          <span>
            <strong>{{ s.title }}</strong>
            <small>{{ s.text }}</small>
          </span>
        </RouterLink>
        <a href="/" target="_blank" rel="noopener" class="dash__shortcut">
          <span class="dash__shortcut-icon"><i class="fa-solid fa-globe"></i></span>
          <span>
            <strong>Ver el sitio</strong>
            <small>Revisa cómo lo ven los visitantes.</small>
          </span>
        </a>
      </section>
    </div>
  </section>
</template>

<style scoped lang="scss">
.dash {
  &__stats {
    @include flex-cards(150px, 0.75rem);

    @include from('md') {
      gap: 1rem;
    }
  }

  &__cols {
    @include flex(column, stretch, flex-start, 1rem);
    margin-top: 1.25rem;

    @include from('lg') {
      flex-direction: row;
      align-items: flex-start;
    }
  }

  &__panel {
    @include card;
    flex: 1.6 1 0;
    min-width: 0;
    padding: 1.1rem;

    &--shortcuts {
      flex: 1 1 0;
      @include flex(column, stretch, flex-start, 0.6rem);
    }
  }

  &__panel-head {
    @include flex(row, center, space-between, 1rem);
    margin-bottom: 0.75rem;
  }

  &__h2 {
    @include display($text-xl);
  }

  &__more {
    font-size: $text-xs;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $accent;
    white-space: nowrap;
  }

  &__empty {
    color: $bone-soft;
    font-size: $text-sm;
    padding: 1rem 0;

    i {
      color: $success;
      margin-right: 0.3rem;
    }
  }

  &__leads {
    list-style: none;
  }

  &__lead {
    @include flex(row, center, space-between, 0.75rem);
    padding: 0.75rem 0;
    border-top: 1px solid $line;
  }

  &__lead-info {
    min-width: 0;
  }

  &__lead-name {
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__lead-meta {
    font-size: $text-xs;
    color: $bone-muted;
  }

  &__wa {
    flex: 0 0 auto;
    background: rgba(#25d366, 0.14);
    color: #25d366;
    border: 1px solid rgba(#25d366, 0.35);
    letter-spacing: 0.06em;
  }

  &__shortcut {
    @include flex(row, center, flex-start, 0.85rem);
    padding: 0.8rem;
    border-radius: $radius-md;
    background: $iron;
    border: 1px solid transparent;
    @include transition(border-color);

    &:hover {
      border-color: $line-strong;
    }

    strong {
      display: block;
      font-size: $text-sm;
    }

    small {
      display: block;
      color: $bone-muted;
      font-size: $text-xs;
      line-height: 1.4;
    }
  }

  &__shortcut-icon {
    @include flex(row, center, center);
    flex: 0 0 auto;
    width: 40px;
    height: 40px;
    border-radius: $radius-md;
    background: $accent-soft;
    color: $accent;
  }
}
</style>
