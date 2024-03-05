<template>
  <v-sheet class="pa-12" rounded>
    <v-img
      src="https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
              "
      class="my-4 d-flex justify-center align-center"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      cover
    >
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <v-form v-model="form" @submit.prevent="login">
          <v-card-title>LOGIN</v-card-title>
          <v-text-field
            v-model="username"
            :readonly="loading"
            class="mb-2"
            clearable
            label="username"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :readonly="loading"
            clearable
            label="Password"
            type="password"
            placeholder="Enter your password"
          ></v-text-field>

          <br />

          <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
          >
            Sign In
          </v-btn>
        </v-form>
      </v-card>
    </v-img>
  </v-sheet>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref(true)
const loading = ref(false)
const username = ref('')
const password = ref('')

async function login() {
  loading.value = true

  const credentials = {
    username: username.value,
    password: password.value
  }

  try {
    const response = await axios.post('http://localhost:3000/api/auth', credentials, {
      withCredentials: true
    })

    console.log('Login successful', response.data)

    window.localStorage.setItem('user', JSON.stringify(response.data))

    username.value = ''
    password.value = ''
    form.value = false

    window.location.href = '/'
  } catch (err) {
    console.error('Login failed:', err)
  } finally {
    loading.value = false
  }
}
</script>
