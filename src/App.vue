<template>
  <header></header>
  <Maps />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Maps from './views/Maps.vue'
</script>
<style scoped></style>
