<template>
  <div>
    <header class="topbar">
      <div class="topbar-inner container">
        <span class="brand">📋 Task Manager</span>
        <div class="user-area" v-if="authStore.isAuthenticated">
          <span class="username">Olá, {{ authStore.user?.username }}</span>
          <button class="btn btn-secondary" @click="handleLogout">Sair</button>
        </div>
      </div>
    </header>
    <main class="container">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.topbar {
  background: #fff;
  border-bottom: 1px solid #dfe6e9;
}

.topbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  padding-bottom: 16px;
}

.brand {
  font-weight: 700;
  font-size: 18px;
}

.user-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.username {
  font-size: 14px;
  color: #636e72;
}
</style>
