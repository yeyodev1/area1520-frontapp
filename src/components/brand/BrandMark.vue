<script setup lang="ts">
// Escudo de AREA1520 redibujado en SVG: techo naranja, "ÁREA" sobre "1520" y
// tres estrellas. Sobre fondo oscuro el número va en hueso; `tone="navy"` lo
// devuelve al azul original para fondos claros.
withDefaults(defineProps<{ size?: number | string; tone?: 'bone' | 'navy' }>(), {
  size: 40,
  tone: 'bone',
})

const STAR = '0,-5 1.18,-1.62 4.76,-1.55 1.9,0.62 2.94,4.05 0,2 -2.94,4.05 -1.9,0.62 -4.76,-1.55 -1.18,-1.62'
</script>

<template>
  <svg
    class="brand-mark"
    :class="`brand-mark--${tone}`"
    viewBox="0 0 100 120"
    :width="size"
    :height="typeof size === 'number' ? size * 1.2 : undefined"
    role="img"
    aria-label="Escudo de AREA1520 CrossFit"
  >
    <path
      class="brand-mark__roof"
      d="M12 44 V24 L50 6 L88 24 V44"
      fill="none"
      stroke-width="9"
      stroke-linejoin="miter"
      stroke-linecap="square"
    />
    <text class="brand-mark__area" x="50" y="44" text-anchor="middle">ÁREA</text>
    <text class="brand-mark__number" x="50" y="96" text-anchor="middle" textLength="84" lengthAdjust="spacingAndGlyphs">
      1520
    </text>
    <g class="brand-mark__stars">
      <polygon :points="STAR" transform="translate(36 110)" />
      <polygon class="brand-mark__star--accent" :points="STAR" transform="translate(50 110) scale(1.2)" />
      <polygon :points="STAR" transform="translate(64 110)" />
    </g>
  </svg>
</template>

<style scoped lang="scss">
.brand-mark {
  display: block;
  flex-shrink: 0;
  height: auto;
  overflow: visible;

  &__roof {
    stroke: $accent;
  }

  &__area {
    font-family: $font-display;
    font-size: 15px;
    letter-spacing: 0.08em;
  }

  &__number {
    font-family: $font-display;
    font-size: 54px;
  }

  &__star--accent {
    fill: $accent;
  }

  &--bone {
    .brand-mark__area,
    .brand-mark__number,
    .brand-mark__stars polygon:not(.brand-mark__star--accent) {
      fill: $bone;
    }
  }

  &--navy {
    .brand-mark__area,
    .brand-mark__number,
    .brand-mark__stars polygon:not(.brand-mark__star--accent) {
      fill: $navy;
    }
  }
}
</style>
