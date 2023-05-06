<script setup lang="ts">
  import {weight} from "postcss-minify-font-values/types/lib/keywords";

  const {variant, asVariant, as, weight} = defineProps({
    variant: {
      type: String,
      default: 'p'
    },
    asVariant: {
      type: Boolean,
      default: false,
    },
    as: {
      type: String,
      default: 'p'
    },
    weight: {
      type: String,
      default: ''
    },
    asHeading: {
      type: Boolean,
      default: false,
    }
  })

  const tag = asVariant ? variant : as;

  const textClasses = {
    h1: 'text-5xl font-semibold',
    h2: 'text-2xl font-semibold',
    h3: 'text-xl font-semibold',
    p: 'text-lg',
    span: 'text-base'
  }

  const weightClasses = {
    normal: '!font-normal',
    medium: '!font-medium',
    semibold: '!font-semibold',
    bold: '!font-bold',
  }
</script>

<template>
  <Component :is="tag!" :class="[textClasses[variant], {
    [weightClasses[weight]]: weight,
    'font-heading': asHeading,
  }]"><slot /></Component>
</template>

<style scoped>

</style>