<script setup lang="ts">
import { site, whatsappLink, firstDayMessage } from '@/config/site'
import BrandMark from '@/components/brand/BrandMark.vue'

const year = new Date().getFullYear()

// Crédito del estudio: no vive en site.ts porque no es copy de la marca.
const CREDIT = { label: 'Sitio por Bakano', url: 'https://bakano.ec' }

const socials = [
  { label: 'Instagram', icon: 'fa-brands fa-instagram', url: site.social.instagram },
  { label: 'Facebook', icon: 'fa-brands fa-facebook-f', url: site.social.facebook },
  { label: 'Linktree', icon: 'fa-solid fa-link', url: site.social.linktree },
].filter((item) => item.url)
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <a :href="whatsappLink(firstDayMessage)" class="footer__headline" target="_blank" rel="noopener">
        <span v-for="word in site.hero.title" :key="word" class="footer__word">{{ word }}</span>
        <span class="footer__arrow" aria-hidden="true"><i class="fa-solid fa-arrow-right"></i></span>
        <span class="visually-hidden">: escríbenos por WhatsApp</span>
      </a>

      <div class="footer__cols">
        <div class="footer__col footer__col--brand">
          <BrandMark :size="56" />
          <p class="footer__text">{{ site.footer.text }}</p>
        </div>

        <div class="footer__col">
          <p class="footer__label">Sedes</p>
          <a
            v-for="loc in site.locations.items"
            :key="loc.slug"
            :href="loc.mapsUrl"
            class="footer__link"
            target="_blank"
            rel="noopener"
          >
            <strong>{{ loc.name }}</strong>
            <span>{{ loc.area }}</span>
          </a>
        </div>

        <div class="footer__col">
          <p class="footer__label">Contacto</p>
          <a :href="whatsappLink()" class="footer__link" target="_blank" rel="noopener">
            <strong><i class="fa-brands fa-whatsapp"></i> WhatsApp</strong>
            <span>+{{ site.whatsapp.slice(0, 3) }} {{ site.whatsapp.slice(3) }}</span>
          </a>
          <div class="footer__socials">
            <a
              v-for="item in socials"
              :key="item.label"
              :href="item.url"
              class="footer__social"
              target="_blank"
              rel="noopener"
              :aria-label="item.label"
            >
              <i :class="item.icon"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© {{ year }} {{ site.name }}. {{ site.footer.legal }}</p>
        <div class="footer__meta">
          <a :href="CREDIT.url" target="_blank" rel="noopener">{{ CREDIT.label }}</a>
          <RouterLink to="/login" class="footer__admin">Acceso admin</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: $night;
  border-top: 1px solid $line;
  overflow: hidden;

  &__inner {
    @include container(1320px);
    padding-block: $space-xl 1.5rem;
  }

  &__headline {
    @include flex(row, flex-end, flex-start, 0 0.3em);
    flex-wrap: wrap;
    font-family: $font-display;
    font-size: clamp(3.2rem, 1rem + 12vw, 13rem);
    line-height: 0.88;
    text-transform: uppercase;
    color: $bone;
    padding-bottom: $space-lg;
    border-bottom: 1px solid $line;

    &:hover .footer__word:last-of-type,
    &:focus-visible .footer__word:last-of-type {
      color: $accent;
    }

    &:hover .footer__arrow {
      transform: translateX(0.12em) rotate(-45deg);
      background: $accent;
    }
  }

  &__word {
    transition: color 0.3s ease;
  }

  &__arrow {
    display: none;
    align-items: center;
    justify-content: center;
    width: 0.62em;
    height: 0.62em;
    margin-bottom: 0.06em;
    border-radius: 50%;
    background: $iron;
    transition:
      transform 0.4s $ease,
      background-color 0.3s ease;

    @include from('md') {
      display: flex;
    }

    i {
      font-size: 0.3em;
    }
  }

  &__cols {
    @include flex-cards(220px, 2.5rem);
    padding-block: $space-lg;
  }

  &__col {
    @include flex(column, flex-start, flex-start, 0.9rem);

    &--brand {
      flex-grow: 1.4;
    }
  }

  &__text {
    color: $bone-soft;
    max-width: 22rem;
  }

  &__label {
    @include eyebrow;
  }

  &__link {
    @include flex(column, flex-start, flex-start, 0.1rem);
    transition: color 0.2s ease;

    strong {
      font-weight: 600;
      color: $bone;
    }

    span {
      font-size: $text-sm;
      color: $bone-muted;
    }

    &:hover strong {
      color: $accent;
    }
  }

  &__socials {
    @include flex(row, center, flex-start, 0.5rem);
    margin-top: 0.4rem;
  }

  &__social {
    @include flex(row, center, center);
    width: 44px;
    height: 44px;
    border: 1px solid $line-strong;
    border-radius: 50%;
    color: $bone;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease;

    &:hover {
      background: $accent;
      border-color: $accent;
    }
  }

  &__bottom {
    @include flex(column, flex-start, space-between, 0.75rem);
    padding-top: 1.5rem;
    border-top: 1px solid $line;
    font-family: $font-mono;
    font-size: 0.7rem;
    letter-spacing: 0.04em;
    color: $bone-muted;

    @include from('md') {
      flex-direction: row;
      align-items: center;
    }

    a:hover {
      color: $bone;
    }
  }

  &__meta {
    @include flex(row, center, flex-start, 1.5rem);
  }

  &__admin {
    opacity: 0.6;
  }
}
</style>
