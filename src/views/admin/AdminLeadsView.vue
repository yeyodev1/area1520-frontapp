<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AdminPageHead from '@/components/admin/AdminPageHead.vue'
import AdminPager from '@/components/admin/AdminPager.vue'
import LeadItem from '@/components/admin/LeadItem.vue'
import StatusPills from '@/components/admin/StatusPills.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import { useAdminLeads } from '@/composables/admin/useAdminLeads'
import { useAdminStats } from '@/composables/admin/useAdminStats'
import type { Lead } from '@/types'

const { items, total, page, pages, loading, status, search, load, changeStatus, saveNotes, remove } =
  useAdminLeads()
const { stats } = useAdminStats()

// El API no da conteos por estado: se muestran los que sí se conocen.
const counts = computed(() => ({
  '': stats.value?.leads.total,
  nuevo: stats.value?.leads.nuevo,
}))

const toDelete = ref<Lead | null>(null)

async function confirmDelete() {
  if (!toDelete.value) return
  const lead = toDelete.value
  toDelete.value = null
  await remove(lead)
}

onMounted(load)
</script>

<template>
  <section class="leads">
    <AdminPageHead
      eyebrow="Primer día gratis"
      title="Interesados"
      :subtitle="`${total} ${total === 1 ? 'resultado' : 'resultados'}`"
    />

    <div class="leads__filters">
      <div class="leads__search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input v-model="search" type="search" placeholder="Buscar por nombre, teléfono o correo" aria-label="Buscar" />
      </div>
      <StatusPills v-model="status" :counts="counts" />
    </div>

    <div class="leads__head" aria-hidden="true">
      <span class="leads__col leads__col--who">Interesado</span>
      <span class="leads__col">Sede y horario</span>
      <span class="leads__col">Objetivo</span>
      <span class="leads__col leads__col--date">Llegó</span>
      <span class="leads__col leads__col--actions">Estado</span>
    </div>

    <p v-if="loading && !items.length" class="leads__empty">
      <i class="fa-solid fa-spinner fa-spin"></i> Cargando interesados…
    </p>
    <p v-else-if="!items.length" class="leads__empty">
      <i class="fa-regular fa-folder-open"></i>
      {{ search || status ? 'Nada coincide con ese filtro.' : 'Todavía no llega ningún interesado.' }}
    </p>

    <div v-else class="leads__list" :class="{ 'is-loading': loading }">
      <LeadItem
        v-for="lead in items"
        :key="lead._id"
        :lead="lead"
        @status="changeStatus(lead, $event)"
        @notes="saveNotes(lead, $event)"
        @remove="toDelete = lead"
      />
    </div>

    <AdminPager :page="page" :pages="pages" @change="page = $event" />

    <BaseModal
      :open="!!toDelete"
      danger
      title="¿Eliminar interesado?"
      :message="toDelete ? `Se borrará a ${toDelete.name} y sus notas. No se puede deshacer.` : ''"
      confirm-label="Eliminar"
      @cancel="toDelete = null"
      @confirm="confirmDelete"
    />
  </section>
</template>

<style scoped lang="scss">
.leads {
  &__filters {
    @include flex(column, stretch, flex-start, 0.75rem);
    margin-bottom: 1rem;
  }

  &__search {
    position: relative;

    i {
      position: absolute;
      left: 0.95rem;
      top: 50%;
      transform: translateY(-50%);
      color: $bone-muted;
      pointer-events: none;
    }

    input {
      padding-left: 2.6rem;
      min-height: 46px;
    }

    @include from('md') {
      max-width: 420px;
    }
  }

  // Cabecera de "tabla": solo en desktop, con los mismos flex que LeadItem.
  &__head {
    display: none;

    @include from('lg') {
      @include flex(row, center, flex-start, 1.2rem);
      padding: 0 1rem 0.5rem calc(1rem + 3px);
      font-family: $font-mono;
      font-size: 0.64rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: $bone-muted;
    }
  }

  &__col {
    flex: 1 1 0;

    &--who {
      flex: 1.4 1 0;
    }

    &--date {
      flex: 0 0 110px;
    }

    &--actions {
      flex: 0 0 15.5rem;
    }
  }

  &__list {
    @include flex(column, stretch, flex-start, 0.6rem);
    @include transition(opacity);

    &.is-loading {
      opacity: 0.55;
    }
  }

  &__empty {
    @include card;
    padding: 2rem 1rem;
    text-align: center;
    color: $bone-soft;

    i {
      margin-right: 0.4rem;
    }
  }
}
</style>
