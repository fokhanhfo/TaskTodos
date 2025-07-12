<template>
  <a-list-item
    :class="{ done: task.is_completed }"
    @click="toggleDone"
    style="cursor: pointer"
  >
    <template #actions>
      <a @click.stop="$emit('edit', task)">Sửa</a>
      <a-popconfirm
        title="Xoá công việc này?"
        ok-text="Xoá"
        cancel-text="Huỷ"
        @confirm="deleteTask"
      >
        <a @click.stop style="color: red">Xoá</a>
      </a-popconfirm>
    </template>

    <a-list-item-meta
      :title="task.title"
      :description="desc"
    />
  </a-list-item>
</template>

<script setup>
import { computed } from 'vue'
import { useTaskStore } from '@/store/taskStore'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'

const props = defineProps({ task: Object })
console.log(props)
const emit = defineEmits(['edit'])
const store = useTaskStore()

const desc = computed(() => {
  const date = props.task.due_date ? dayjs(props.task.due_date).format('DD/MM/YYYY') : 'Không hạn'
  return `${props.task.description || 'Không mô tả'} · Hạn: ${date}`
})

async function toggleDone () {
  const newCompleted = props.task.is_completed === 1 ? 0 : 1
  await store.updateTask({ ...props.task, is_completed: newCompleted })
  await store.loadTasks()

  const statusText = newCompleted === 1 ? 'Đã hoàn thành' : 'Chưa hoàn thành'
  message.success(`Cập nhật: ${statusText}`)
}



async function deleteTask () {
  await store.deleteTask(props.task.id)
  message.success('Xóa thành công')
}
</script>

<style scoped>
.done :deep(.ant-list-item-meta-title) {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>

