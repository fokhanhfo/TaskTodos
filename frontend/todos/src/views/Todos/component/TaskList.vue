<template>
  <a-list
    :data-source="filtered"
    bordered
    item-layout="horizontal"
  >
    <template #renderItem="{ item }">
      <TaskItem :task="item" @edit="$emit('edit', item)" />
    </template>
  </a-list>
</template>


<script setup>
import { computed, watch } from 'vue'
import { useTaskStore } from '@/store/taskStore'
import TaskItem from './TaskItem.vue'

const props = defineProps({ filter: String })
const store = useTaskStore()

const filtered = computed(() => {
  switch (props.filter) {
    case 'completed': return store.completedTasks
    case 'pending': return store.pendingTasks
    default: return store.tasks
  }
})

watch(filtered, (newValue) => {
  console.log('Filtered tasks:', newValue)
}, { immediate: true })
</script>

