<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useToastStore } from '@/stores/toast'
import BrandMark from '@/components/brand/BrandMark.vue'
import type { ApiError } from '@/types'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const toast = useToastStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function submit() {
  error.value = ''
  loading.value = true
  try {
    const user = await userStore.login(email.value.trim(), password.value)
    toast.success(`Hola, ${user.name || user.email}`)
    // Solo rutas internas: un ?next= externo no debe sacar a nadie del sitio.
    const next = typeof route.query.next === 'string' && route.query.next.startsWith('/') ? route.query.next : '/admin'
    router.replace(next)
  } catch (e) {
    error.value = (e as ApiError).message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="login">
    <form class="login__card" @submit.prevent="submit">
      <BrandMark :size="52" class="login__mark" />
      <p class="login__eyebrow">Panel del box</p>
      <h1 class="login__title">Ingresar</h1>

      <div class="login__field">
        <label for="email">Correo</label>
        <input id="email" v-model="email" type="email" autocomplete="email" required />
      </div>

      <div class="login__field">
        <label for="password">Contraseña</label>
        <input id="password" v-model="password" type="password" autocomplete="current-password" required />
      </div>

      <Transition name="rise">
        <p v-if="error" class="login__error" role="alert">
          <i class="fa-solid fa-circle-exclamation"></i> {{ error }}
        </p>
      </Transition>

      <button class="btn btn--primary login__submit" type="submit" :disabled="loading">
        <i v-if="loading" class="fa-solid fa-spinner fa-spin"></i>
        {{ loading ? 'Ingresando…' : 'Ingresar' }}
      </button>
    </form>
  </section>
</template>

<style scoped lang="scss">
.login {
  @include container(460px);
  @include flex(column, stretch, center);
  flex: 1;
  min-height: 100svh;
  padding-block: calc(76px + #{$space-lg}) $space-xl;

  &__card {
    @include flex(column, stretch, flex-start, 1.1rem);
    padding: 2.2rem 1.6rem;
    background: $steel;
    border: 1px solid $line;
    border-top: 3px solid $accent;
    border-radius: $radius-md;
    box-shadow: $shadow-lg;

    @include from('sm') {
      padding: 2.6rem 2.2rem;
    }
  }

  &__mark {
    margin-bottom: 0.4rem;
  }

  &__eyebrow {
    @include eyebrow;
  }

  &__title {
    @include display($display-md);
    margin-bottom: 0.4rem;
  }

  &__field input {
    min-height: 48px;
  }

  &__error {
    @include flex(row, center, flex-start, 0.5rem);
    font-size: $text-sm;
    color: $danger;
    background: $danger-bg;
    padding: 0.7rem 0.9rem;
    border-radius: $radius-sm;
  }

  &__submit {
    margin-top: 0.4rem;
  }
}
</style>
