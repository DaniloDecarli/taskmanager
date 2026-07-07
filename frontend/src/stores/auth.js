import { defineStore } from 'pinia'
import authService from '../services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null')
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    async login(username, password) {
      const response = await authService.login(username, password)
      this._setSession(response)
    },

    async register(username, email, password) {
      const response = await authService.register(username, email, password)
      this._setSession(response)
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    _setSession(response) {
      this.token = response.token
      this.user = { username: response.username, email: response.email }
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(this.user))
    }
  }
})
