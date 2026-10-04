<script setup lang="ts">
import { site } from '@/config/site'
import { useLeadForm } from '@/composables/useLeadForm'
import LocationPicker from './LocationPicker.vue'
import ChipGroup from './ChipGroup.vue'
import LeadSuccess from './LeadSuccess.vue'

const { form, errors, touched, sending, error, sent, scheduleBlocks, hasSchedule, whatsappUrl, submit } =
  useLeadForm()

// Los errores aparecen después del primer intento de envío, no mientras se escribe.
const show = (key: keyof typeof errors.value) => (touched.value ? errors.value[key] : '')
</script>

<template>
  <Transition name="rise" mode="out-in">
    <LeadSuccess v-if="sent" :whatsapp-url="whatsappUrl" />

    <form v-else class="lead" novalidate @submit.prevent="submit">
      <div class="lead__row">
        <div class="lead__field">
          <label for="lead-name">Nombre</label>
          <input
            id="lead-name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            placeholder="Tu nombre y apellido"
            :aria-invalid="Boolean(show('name'))"
            aria-describedby="lead-name-error"
          />
          <p v-if="show('name')" id="lead-name-error" class="lead__error">{{ show('name') }}</p>
        </div>
        <div class="lead__field">
          <label for="lead-phone">WhatsApp</label>
          <input
            id="lead-phone"
            v-model="form.phone"
            type="tel"
            inputmode="tel"
            autocomplete="tel"
            placeholder="099 123 4567"
            :aria-invalid="Boolean(show('phone'))"
            aria-describedby="lead-phone-error"
          />
          <p v-if="show('phone')" id="lead-phone-error" class="lead__error">{{ show('phone') }}</p>
        </div>
      </div>

      <div class="lead__field">
        <label for="lead-email">Correo <span class="lead__optional">(opcional)</span></label>
        <input
          id="lead-email"
          v-model="form.email"
          type="email"
          autocomplete="email"
          placeholder="tu@correo.com"
          :aria-invalid="Boolean(show('email'))"
          aria-describedby="lead-email-error"
        />
        <p v-if="show('email')" id="lead-email-error" class="lead__error">{{ show('email') }}</p>
      </div>

      <LocationPicker v-model="form.location" :error="show('location')" />

      <div v-if="form.location" class="lead__field">
        <label for="lead-schedule">Horario preferido <span class="lead__optional">(opcional)</span></label>
        <select v-if="hasSchedule" id="lead-schedule" v-model="form.preferredSchedule" class="lead__select">
          <option value="">Elige un horario</option>
          <optgroup v-for="block in scheduleBlocks" :key="block.days" :label="block.days">
            <option v-for="hour in block.hours" :key="hour" :value="`${block.days} · ${hour}`">{{ hour }}</option>
          </optgroup>
        </select>
        <input
          v-else
          id="lead-schedule"
          v-model="form.preferredSchedule"
          type="text"
          placeholder="Ej. lunes y miércoles en la noche"
        />
      </div>

      <ChipGroup v-model="form.goal" legend="Objetivo" name="goal" :options="site.lead.goals" />
      <ChipGroup v-model="form.experience" legend="Experiencia" name="experience" :options="site.lead.experience" />

      <!-- Honeypot: invisible para personas, tentador para bots. -->
      <div class="lead__trap" aria-hidden="true">
        <label for="lead-website">Sitio web</label>
        <input id="lead-website" v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
      </div>

      <Transition name="rise">
        <p v-if="error" class="lead__api-error" role="alert">
          <i class="fa-solid fa-circle-exclamation"></i> {{ error }}
        </p>
      </Transition>

      <button class="btn btn--primary lead__submit" type="submit" :disabled="sending">
        <i v-if="sending" class="fa-solid fa-spinner fa-spin"></i>
        {{ sending ? 'Reservando…' : site.hero.primary }}
        <i v-if="!sending" class="fa-solid fa-arrow-right"></i>
      </button>
    </form>
  </Transition>
</template>

<style scoped lang="scss">
.lead {
  @include flex(column, stretch, flex-start, 1.25rem);

  &__row {
    @include flex-cards(200px, 1.25rem);
  }

  &__field {
    @include flex(column, stretch, flex-start);
    min-width: 0;

    input,
    select {
      min-height: 48px;
    }

    [aria-invalid='true'] {
      border-color: $danger;
    }
  }

  &__optional {
    color: $bone-muted;
    text-transform: none;
    letter-spacing: 0;
  }

  &__select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23b8b2a8' stroke-width='2'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 2.5rem;
  }

  &__error {
    margin-top: 0.35rem;
    font-size: $text-sm;
    color: $danger;
  }

  &__trap {
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  &__api-error {
    @include flex(row, center, flex-start, 0.5rem);
    font-size: $text-sm;
    color: $danger;
    background: $danger-bg;
    padding: 0.8rem 1rem;
    border-radius: $radius-sm;
  }

  &__submit {
    width: 100%;
    min-height: 56px;
    margin-top: 0.25rem;
    letter-spacing: 0.08em;

    &:active {
      transform: scale(0.98);
    }
  }
}
</style>
