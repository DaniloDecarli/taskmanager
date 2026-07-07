import api from './api'

export default {
  async login(username, password) {
    const { data } = await api.post('/auth/login', { username, password })
    return data
  },

  async register(username, email, password) {
    const { data } = await api.post('/auth/register', { username, email, password })
    return data
  }
}
