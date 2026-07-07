<template>
  <div class="task-item" :class="{ completed: task.completed }">
    <div class="task-main">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="$emit('toggle', task)"
      />
      <div class="task-text">
        <p class="title">{{ task.title }}</p>
        <p v-if="task.description" class="description">{{ task.description }}</p>
        <p v-if="task.dueDate" class="due-date">Prazo: {{ formattedDueDate }}</p>
      </div>
    </div>
    <div class="task-actions">
      <button class="btn btn-secondary" @click="$emit('edit', task)">Editar</button>
      <button class="btn btn-danger" @click="$emit('delete', task)">Excluir</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle', 'edit', 'delete'])

const formattedDueDate = computed(() => {
  if (!props.task.dueDate) return ''
  const [year, month, day] = props.task.dueDate.split('-')
  return `${day}/${month}/${year}`
})
</script>

<style scoped>
.task-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid #f0f1f4;
}

.task-item:last-child {
  border-bottom: none;
}

.task-main {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  flex: 1;
}

.task-main input[type='checkbox'] {
  margin-top: 4px;
  width: 18px;
  height: 18px;
}

.title {
  margin: 0;
  font-weight: 600;
  font-size: 15px;
}

.description {
  margin: 4px 0 0;
  font-size: 13px;
  color: #636e72;
}

.due-date {
  margin: 4px 0 0;
  font-size: 12px;
  color: #b2bec3;
}

.task-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.completed .title {
  text-decoration: line-through;
  color: #b2bec3;
}
</style>
