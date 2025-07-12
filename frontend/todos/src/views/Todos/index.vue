<template>
  <a-layout>
    <Header />

    <a-layout-content style="padding: 2rem">
      <TaskForm v-if="editing" :task="editing" @cancel="editing = null" />
      <TaskForm v-else />

      <a-divider />
      <a-radio-group v-model:value="filter" style="margin-bottom: 1rem">
        <a-radio-button value="all">Tất cả</a-radio-button>
        <a-radio-button value="pending">Chưa hoàn thành</a-radio-button>
        <a-radio-button value="completed">Đã hoàn thành</a-radio-button>
      </a-radio-group>

      <TaskList :filter="filter" @edit="editing = $event" />
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import TaskForm from './component/TaskForm.vue'
import TaskList from './component/TaskList.vue'
import { useTaskStore } from '@/store/taskStore'

const filter = ref('all')
const editing = ref(null)
const store = useTaskStore()

onMounted(() => {
  store.loadTasks()
})
</script>

