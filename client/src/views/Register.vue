<template>
  <!-- <video autoplay muted loop>
      <source src="../../public/video/video-register.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video> -->
  <v-card class="mx-auto" max-width="344" title="User Registration">
    <v-container>
      <v-text-field
        v-model="first"
        color="primary"
        label="First name"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="last"
        color="primary"
        label="Last name"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="email"
        color="primary"
        label="Email"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="password"
        color="primary"
        label="Password"
        placeholder="Enter your password"
        variant="underlined"
      ></v-text-field>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success" @click="handleRegister">
        Complete Registration

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const first = ref(null)
const last = ref(null)
const email = ref(null)
const password = ref(null)

function handleRegister() {
  console.log(first.value)
  console.log(last.value)
  console.log(email.value)
  console.log(password.value)

  const user = {
    firstName: first.value,
    lastName: last.value,
    email: email.value,
    password: password.value,
    liked: []
  }

  const userString = JSON.stringify(user)
  window.localStorage.setItem('user', userString)
}
</script>

<style scoped></style>
