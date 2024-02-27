<script setup lang="ts">
import AppLink from '@/components/AppLink.vue'
</script>
<template>
  <v-app-bar flat underline class="d-flex">
    <v-icon class="ml-2" icon="mdi-earth" />
    <v-toolbar-title>
      <router-link to="/" class="text-decoration-none text-black">
        <span>Travel Companion</span>
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <!-- 
    <v-text-field
      label="Location"
      prepend-inner-icon="mdi-magnify"
      density="compact"
      class="mt-5"
    ></v-text-field> -->

    <v-btn icon>
      <router-link to="/maps" class="text-decoration-none"
        ><v-icon class="text-black">mdi-map</v-icon>
      </router-link>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon id="profile-activator">
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-menu activator="#profile-activator">
      <v-list>
        <v-list-item>
          <v-btn flat block><app-link to="/login">Login/Logout</app-link></v-btn>
          <v-btn flat block><app-link to="/register">Profile</app-link></v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
