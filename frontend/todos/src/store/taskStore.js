import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as taskService from '../services/todoServices'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([])

  const loadTasks = async () => {
    try {
      const res = await taskService.getTodos()
      tasks.value = res.data
    } catch (err) {
      console.error('Lỗi khi tải tasks:', err)
    }
  }

  const addTask = async (task) => {
    try {
      const res = await taskService.createTodo(task)
      tasks.value.push(res.data)
    } catch (err) {
      console.error('Lỗi khi thêm task:', err)
    }
  }

  const updateTask = async (task) => {
    try {
      console.log('task:', task);
      const res = await taskService.updateTodo(task.id,task)
      const idx = tasks.value.findIndex(t => t.id === task.id)
      if (idx !== -1) {
        tasks.value.splice(idx, 1, res.data)
      }
    } catch (err) {
      console.error('Lỗi khi cập nhật task:', err)
    }
  }

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTodo(id)
      tasks.value = tasks.value.filter(t => t.id !== id)
    } catch (err) {
      console.error('Lỗi khi xoá task:', err)
    }
  }

  const completedTasks = computed(() =>
    tasks.value.filter(t => t.is_completed === 1)
  )

  const pendingTasks = computed(() =>
    tasks.value.filter(t => t.is_completed === 0)
  )


  return {
    tasks,
    completedTasks,
    pendingTasks,
    loadTasks,
    addTask,
    updateTask,
    deleteTask,
  }
})
