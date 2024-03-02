<script setup lang="ts">
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})
</script>
<template>
  <router-link :to="to" class="text-light-blue text-decoration-none">
    <slot></slot>
  </router-link>
</template>
