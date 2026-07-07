<template>
  <form class="task-form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="title">Título</label>
      <input id="title" v-model="form.title" type="text" maxlength="150" required />
    </div>

    <div class="form-group">
      <label for="description">Descrição</label>
      <textarea id="description" v-model="form.description" rows="3" maxlength="1000"></textarea>
    </div>

    <div class="form-group">
      <label for="dueDate">Prazo</label>
      <input id="dueDate" v-model="form.dueDate" type="date" />
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn-primary">{{ submitLabel }}</button>
      <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Cancelar</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  initialTask: {
    type: Object,
    default: null
  },
  submitLabel: {
    type: String,
    default: 'Salvar'
  }
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  title: '',
  description: '',
  dueDate: '',
  completed: false
})

watch(
  () => props.initialTask,
  (task) => {
    form.title = task?.title ?? ''
    form.description = task?.description ?? ''
    form.dueDate = task?.dueDate ?? ''
    form.completed = task?.completed ?? false
  },
  { immediate: true }
)

function handleSubmit() {
  emit('submit', { ...form })
}
</script>

<style scoped>
.form-actions {
  display: flex;
  gap: 12px;
}
</style>
