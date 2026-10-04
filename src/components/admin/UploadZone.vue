<script setup lang="ts">
import { ref } from 'vue'
import { MAX_FILES } from '@/composables/admin/usePhotoUpload'

defineProps<{ uploading: boolean; progress: number; count: number }>()
const emit = defineEmits<{ files: [files: FileList] }>()

const dragging = ref(false)
const input = ref<HTMLInputElement | null>(null)

function onDrop(event: DragEvent) {
  dragging.value = false
  if (event.dataTransfer?.files.length) emit('files', event.dataTransfer.files)
}

function onPick(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files?.length) emit('files', target.files)
  // Permite volver a elegir los mismos archivos si el lote falló.
  target.value = ''
}
</script>

<template>
  <div
    class="upload"
    :class="{ 'upload--drag': dragging, 'upload--busy': uploading }"
    @dragover.prevent="dragging = true"
    @dragleave.prevent="dragging = false"
    @drop.prevent="onDrop"
  >
    <template v-if="uploading">
      <p class="upload__text">
        <i class="fa-solid fa-spinner fa-spin"></i>
        {{ progress < 100 ? `Subiendo ${count} foto(s)… ${progress}%` : 'Procesando en Cloudinary…' }}
      </p>
      <div class="upload__bar" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
        <span :style="{ width: `${progress}%` }"></span>
      </div>
    </template>
    <template v-else>
      <i class="fa-solid fa-cloud-arrow-up upload__icon"></i>
      <p class="upload__text">
        <span class="upload__desktop">Arrastra fotos aquí o </span>
        <button type="button" class="upload__pick" @click="input?.click()">elige desde tu equipo</button>
      </p>
      <p class="upload__hint">Hasta {{ MAX_FILES }} por lote · JPG, PNG o WebP · máx. 10 MB c/u</p>
    </template>
    <input ref="input" type="file" accept="image/*" multiple hidden @change="onPick" />
  </div>
</template>

<style scoped lang="scss">
.upload {
  @include flex(column, center, center, 0.4rem);
  padding: 1.4rem 1rem;
  border: 2px dashed $line-strong;
  border-radius: $radius-lg;
  background: rgba($white, 0.015);
  text-align: center;
  @include transition(border-color);

  &--drag {
    border-color: $accent;
    background: $accent-soft;
  }

  &__icon {
    font-size: 1.6rem;
    color: $accent;
  }

  &__text {
    font-size: $text-sm;
    color: $bone-soft;
  }

  &__desktop {
    display: none;

    @include from('md') {
      display: inline;
    }
  }

  &__pick {
    color: $accent;
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 3px;
    min-height: 40px;

    &::first-letter {
      text-transform: uppercase;

      @include from('md') {
        text-transform: none;
      }
    }
  }

  &__hint {
    font-size: $text-xs;
    color: $bone-muted;
  }

  &__bar {
    width: 100%;
    max-width: 420px;
    height: 6px;
    border-radius: $radius-pill;
    background: $iron;
    overflow: hidden;

    span {
      display: block;
      height: 100%;
      background: $accent;
      transition: width 0.2s ease;
    }
  }
}
</style>
