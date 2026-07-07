<template>
  <div class="auth-page container">
    <div class="card auth-card">
      <h1>Criar conta</h1>
      <p v-if="error" class="error-message">{{ error }}</p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Usuário</label>
          <input id="username" v-model="username" type="text" required autofocus />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" required />
        </div>

        <div class="form-group">
          <label for="password">Senha</label>
          <input id="password" v-model="password" type="password" minlength="6" required />
        </div>

        <button class="btn btn-primary" type="submit" :disabled="loading">
          {{ loading ? 'Criando...' : 'Criar conta' }}
        </button>
      </form>

      <p class="switch-link">
        Já tem conta?
        <router-link to="/login">Entrar</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const authStore = useAuthStore()
const router = useRouter()

async function handleSubmit() {
  error.value = ''
  loading.value = true
  try {
    await authStore.register(username.value, email.value, password.value)
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || 'Não foi possível criar a conta.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.auth-card {
  width: 100%;
  max-width: 380px;
}

.auth-card h1 {
  margin-top: 0;
  font-size: 22px;
}

.switch-link {
  margin-top: 16px;
  font-size: 14px;
  text-align: center;
}
</style>
