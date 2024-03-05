<template>
  <v-app-bar
    underline
    class="d-flex rounded-lg"
    color="teal-darken-4"
    image="https://images.pexels.com/photos/6847584/pexels-photo-6847584.jpeg?auto=compress&cs=tinysrgb&w=800"
  >
    <v-icon class="ml-2 text-black" icon="mdi-earth" />
    <v-toolbar-title>
      <router-link to="/" class="text-decoration-none text-black">
        <h1 class="">TRAVEL PAL</h1>
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

    <v-btn icon v-if="isAuthenticated">
      <router-link to="/saved" class="text-decoration-none"
        ><v-icon class="text-black">mdi-heart</v-icon>
      </router-link>
    </v-btn>

    <v-btn icon id="profile-activator">
      <v-icon class="text-black">mdi-account</v-icon>
    </v-btn>
    <v-menu activator="#profile-activator">
      <v-list>
        <v-list-item v-if="!isAuthenticated">
          <v-btn flat block><app-link to="/login">Login</app-link></v-btn>
          <v-btn flat block><app-link to="/register">Sign up</app-link></v-btn>
        </v-list-item>
        <v-list-item v-else>
          <v-btn flat block @click="logout">Logout</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AppLink from '@/components/AppLink.vue'

const isAuthenticated = ref(false)

const checkAuthStatus = () => {
  isAuthenticated.value = !!localStorage.getItem('user')
}

onMounted(() => {
  checkAuthStatus()
})

const logout = async () => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/auth/logout',
      {},
      {
        withCredentials: true
      }
    )
    console.log('Logout successful:', response.data)

    clearCookies()
    isAuthenticated.value = false

    window.location.href = '/'
  } catch (error) {
    console.error('Logout failed:', error.response ? error.response.data : error)
  }
}

function clearCookies() {
  localStorage.clear()

  var cookies = document.cookie.split(';')

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i]
    var eqPos = cookie.indexOf('=')
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
  }
}
</script>

<style scoped></style>
