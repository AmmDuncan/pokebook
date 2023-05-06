<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <Noise />
</template>


<style lang="scss">
@import "assets/styles/main.scss";

.bound {
  max-width: 1200px;
  width: calc(100% - 64px);
  margin-inline: auto;
}

button {
  transition: transform 200ms ease;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .slide-up-in-enter-from, .slide-up-in-leave-to {
    transform: translateY(12px);
    opacity: 0;
  }

  .slide-up-in-enter-to, .slide-up-in-leave-from {
    transform: translateY(0);
    opacity: 1;
  }

  .slide-up-in-enter-active, .slide-up-in-leave-active {
    transition: opacity 300ms ease,
    transform 300ms ease;
  }
}
</style>


<script lang="ts" setup>
import { usePokemonList } from "~/composables/usePokemonList";

usePokemonList();
</script>