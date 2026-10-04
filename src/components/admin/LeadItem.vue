<script setup lang="ts">
import { ref, watch } from 'vue'
import LeadStatusSelect from './LeadStatusSelect.vue'
import { locationName, timeAgo, whatsappUrl } from '@/composables/admin/leadHelpers'
import type { Lead, LeadStatus } from '@/types'

const props = defineProps<{ lead: Lead }>()
const emit = defineEmits<{ status: [value: LeadStatus]; notes: [value: string]; remove: [] }>()

const notes = ref(props.lead.notes)
watch(
  () => props.lead.notes,
  (value) => (notes.value = value),
)
</script>

<template>
  <article class="lead" :class="`lead--${lead.status}`">
    <div class="lead__row">
      <div class="lead__cell lead__cell--who">
        <p class="lead__name">{{ lead.name }}</p>
        <a :href="`tel:${lead.phone}`" class="lead__phone">{{ lead.phone }}</a>
        <p v-if="lead.email" class="lead__email">{{ lead.email }}</p>
      </div>

      <div class="lead__cell">
        <span class="lead__k">Sede</span>
        <p><i class="fa-solid fa-location-dot"></i> {{ locationName(lead.location) }}</p>
        <p v-if="lead.preferredSchedule" class="lead__muted">
          <i class="fa-regular fa-clock"></i> {{ lead.preferredSchedule }}
        </p>
      </div>

      <div class="lead__cell">
        <span class="lead__k">Objetivo</span>
        <p>{{ lead.goal || '—' }}</p>
        <p v-if="lead.experience" class="lead__muted">{{ lead.experience }}</p>
      </div>

      <div class="lead__cell lead__cell--date">
        <span class="lead__k">Llegó</span>
        <time :datetime="lead.createdAt" :title="new Date(lead.createdAt).toLocaleString('es-EC')">
          {{ timeAgo(lead.createdAt) }}
        </time>
      </div>

      <div class="lead__cell lead__cell--actions">
        <LeadStatusSelect
          :model-value="lead.status"
          :label="`Estado de ${lead.name}`"
          @update:model-value="emit('status', $event)"
        />
        <a
          :href="whatsappUrl(lead)"
          target="_blank"
          rel="noopener"
          class="lead__icon-btn lead__icon-btn--wa"
          :aria-label="`Escribir por WhatsApp a ${lead.name}`"
        >
          <i class="fa-brands fa-whatsapp"></i>
        </a>
        <button
          type="button"
          class="lead__icon-btn lead__icon-btn--danger"
          :aria-label="`Eliminar a ${lead.name}`"
          @click="emit('remove')"
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>

    <div class="lead__notes">
      <textarea
        :aria-label="`Notas sobre ${lead.name}`"
        v-model="notes"
        rows="1"
        placeholder="Agregar una nota (se guarda al salir del campo)"
        @blur="emit('notes', notes.trim())"
      ></textarea>
    </div>
  </article>
</template>

<style scoped lang="scss">
.lead {
  @include card;
  padding: 1rem;
  border-left: 3px solid $line-strong;

  &--nuevo {
    border-left-color: $accent;
  }

  &--contactado {
    border-left-color: $info;
  }

  &--agendado {
    border-left-color: $warning;
  }

  &--inscrito {
    border-left-color: $success;
  }

  &__row {
    @include flex(row, flex-start, flex-start, 0.9rem 1.2rem);
    flex-wrap: wrap;

    @include from('lg') {
      flex-wrap: nowrap;
      align-items: center;
    }
  }

  &__cell {
    flex: 1 1 140px;
    min-width: 0;
    font-size: $text-sm;

    i {
      color: $bone-muted;
      width: 1rem;
    }

    &--who {
      flex: 1 1 100%;

      @include from('lg') {
        flex: 1.4 1 0;
      }
    }

    &--date {
      flex: 0 0 auto;

      @include from('lg') {
        flex: 0 0 110px;
      }
    }

    &--actions {
      flex: 1 1 100%;
      @include flex(row, center, flex-start, 0.5rem);

      @include from('lg') {
        flex: 0 0 auto;
      }
    }

    @include from('lg') {
      flex: 1 1 0;
    }
  }

  &__k {
    display: block;
    font-family: $font-mono;
    font-size: 0.64rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: $bone-muted;
    margin-bottom: 0.15rem;

    // En desktop la cabecera de la tabla ya nombra cada columna.
    @include from('lg') {
      display: none;
    }
  }

  &__name {
    font-weight: 700;
    font-size: $text-base;
  }

  &__phone {
    font-family: $font-mono;
    font-size: $text-sm;
    color: $bone-soft;
  }

  &__email,
  &__muted {
    color: $bone-muted;
    font-size: $text-xs;
    overflow-wrap: anywhere;
  }

  &__icon-btn {
    @include flex(row, center, center);
    flex: 0 0 auto;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid $line-strong;
    color: $bone-soft;
    @include transition(background);

    &--wa {
      margin-left: auto;
      color: #25d366;
      border-color: rgba(#25d366, 0.4);

      &:hover {
        background: rgba(#25d366, 0.12);
      }

      @include from('lg') {
        margin-left: 0;
      }
    }

    &--danger:hover {
      color: $danger;
      border-color: $danger;
      background: $danger-bg;
    }

    i {
      color: inherit;
    }
  }

  &__notes {
    margin-top: 0.8rem;

    textarea {
      resize: vertical;
      min-height: 40px;
      font-size: $text-sm;
      padding: 0.55rem 0.8rem;
      background: rgba($white, 0.025);
    }
  }
}
</style>
