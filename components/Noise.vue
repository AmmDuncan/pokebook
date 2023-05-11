<script lang="ts" setup></script>

<template>
  <div class="noise"></div>
</template>

<style lang="scss" scoped>
.noise {
  position: fixed;
  z-index: 9999;
  inset: 0;
  background-image: url("assets/images/noise.png");
  opacity: 0.05;
  pointer-events: none;
  background-size: 300px;
}
</style>