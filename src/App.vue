<template>
  <v-layout>
    <v-container class="main">
      <main>
        <router-view />
      </main>
    </v-container>
    <v-footer app
      ><span class="text-light-blue">Travel Companion</span>&nbsp;- &copy;
      {{ new Date().getFullYear() }}</v-footer
    >
  </v-layout>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<style scoped></style>
