<template>
  <DefaultLayout>
    <div class="tasks-header">
      <h1>Minhas tarefas</h1>
      <button class="btn btn-primary" @click="openCreateForm">+ Nova tarefa</button>
    </div>

    <p v-if="taskStore.error" class="error-message">{{ taskStore.error }}</p>

    <div v-if="showForm" class="card form-card">
      <h2>{{ editingTask ? 'Editar tarefa' : 'Nova tarefa' }}</h2>
      <TaskForm
        :initial-task="editingTask"
        :submit-label="editingTask ? 'Salvar alterações' : 'Criar tarefa'"
        @submit="handleSubmit"
        @cancel="closeForm"
      />
    </div>

    <div class="card">
      <p v-if="taskStore.loading">Carregando tarefas...</p>
      <p v-else-if="taskStore.tasks.length === 0" class="empty-state">
        Nenhuma tarefa cadastrada ainda. Crie a primeira!
      </p>
      <TaskItem
        v-for="task in taskStore.tasks"
        :key="task.id"
        :task="task"
        @toggle="handleToggle"
        @edit="openEditForm"
        @delete="handleDelete"
      />
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '../stores/task'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import TaskItem from '../components/TaskItem.vue'
import TaskForm from '../components/TaskForm.vue'

const taskStore = useTaskStore()

const showForm = ref(false)
const editingTask = ref(null)

onMounted(() => {
  taskStore.fetchTasks()
})

function openCreateForm() {
  editingTask.value = null
  showForm.value = true
}

function openEditForm(task) {
  editingTask.value = task
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  editingTask.value = null
}

async function handleSubmit(formData) {
  const payload = {
    ...formData,
    dueDate: formData.dueDate || null
  }

  if (editingTask.value) {
    await taskStore.updateTask(editingTask.value.id, payload)
  } else {
    await taskStore.createTask(payload)
  }
  closeForm()
}

async function handleToggle(task) {
  await taskStore.toggleCompleted(task)
}

async function handleDelete(task) {
  if (confirm(`Excluir a tarefa "${task.title}"?`)) {
    await taskStore.deleteTask(task.id)
  }
}
</script>

<style scoped>
.tasks-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.tasks-header h1 {
  font-size: 22px;
  margin: 0;
}

.form-card {
  margin-bottom: 16px;
}

.form-card h2 {
  margin-top: 0;
  font-size: 17px;
}

.empty-state {
  color: #636e72;
  text-align: center;
  padding: 24px 0;
}
</style>
