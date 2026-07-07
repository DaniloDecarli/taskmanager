import { defineStore } from 'pinia'
import taskService from '../services/taskService'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchTasks() {
      this.loading = true
      this.error = null
      try {
        this.tasks = await taskService.list()
      } catch (err) {
        this.error = 'Não foi possível carregar as tarefas.'
      } finally {
        this.loading = false
      }
    },

    async createTask(task) {
      const created = await taskService.create(task)
      this.tasks.unshift(created)
    },

    async updateTask(id, task) {
      const updated = await taskService.update(id, task)
      const index = this.tasks.findIndex((t) => t.id === id)
      if (index !== -1) {
        this.tasks[index] = updated
      }
    },

    async toggleCompleted(task) {
      await this.updateTask(task.id, { ...task, completed: !task.completed })
    },

    async deleteTask(id) {
      await taskService.remove(id)
      this.tasks = this.tasks.filter((t) => t.id !== id)
    }
  }
})
