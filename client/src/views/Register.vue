<template>
  <!-- <video autoplay muted loop>
    <source src="../../public/video/video-register.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video> -->
  <v-img
    src="https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
              "
    class="my-4 d-flex justify-center align-center"
    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    cover
  >
    <v-card class="mx-auto" max-width="344" title="User Registration">
      <v-container>
        <v-text-field
          v-model="name"
          color="primary"
          label="Display Name"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="username"
          color="primary"
          label="Username"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="password"
          color="primary"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
          type="password"
        ></v-text-field>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="success" @click="handleRegister" :loading="isLoading">
          Complete Registration

          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-img>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const name = ref(null)
const username = ref(null)
const password = ref(null)
const isLoading = ref(false)

async function handleRegister() {
  console.log(name.value)
  console.log(username.value)
  console.log(password.value)

  try {
    const user = {
      displayName: name.value,
      username: username.value,
      password: password.value
    }

    await axios.post('http://localhost:3000/api/users', user, { withCredentials: true })
    isLoading.value = true
    setTimeout(() => {
      isLoading.value = false
      window.location.href = '/'
    }, 2000)
  } catch (error) {
    console.error('Error creating user:', error.response?.data || error)
  }
}
</script>

<style scoped></style>
