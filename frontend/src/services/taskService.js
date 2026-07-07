import api from './api'

export default {
  async list() {
    const { data } = await api.get('/tasks')
    return data
  },

  async get(id) {
    const { data } = await api.get(`/tasks/${id}`)
    return data
  },

  async create(task) {
    const { data } = await api.post('/tasks', task)
    return data
  },

  async update(id, task) {
    const { data } = await api.put(`/tasks/${id}`, task)
    return data
  },

  async remove(id) {
    await api.delete(`/tasks/${id}`)
  }
}
