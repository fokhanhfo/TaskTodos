<template>
  <a-card :title="isEdit ? 'Cập nhật công việc' : 'Thêm công việc mới'">
    <a-form
      :model="form"
      :rules="rules"
      layout="vertical"
      @finish="handleSubmit"
    >
      <a-form-item label="Tiêu đề" name="title">
        <a-input v-model:value="form.title" placeholder="Nhập tiêu đề..." />
      </a-form-item>

      <a-form-item label="Mô tả" name="description">
        <a-textarea :rows="2" v-model:value="form.description" />
    </a-form-item>


      <a-form-item label="Hạn chót" name="due_date">
        <a-date-picker
          v-model:value="form.due_date"
          style="width: 100%"
          format="DD/MM/YYYY"
        />
      </a-form-item>

      <a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit">{{ isEdit ? 'Lưu' : 'Thêm' }}</a-button>
          <a-button v-if="isEdit" @click="$emit('cancel')">Huỷ</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import { useTaskStore } from '@/store/taskStore'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'

const props = defineProps({ task: Object })
const emit = defineEmits(['cancel'])
const store = useTaskStore()

const isEdit = computed(() => !!props.task)

const blank = () => ({
  id: null,
  title: '',
  description: '',
  due_date: null,
  completed: false,
})

const form = reactive(blank())

watch(() => props.task, (t) => {
  Object.assign(form, t ? {
    ...t,
    due_date: t.due_date ? dayjs(t.due_date) : null 
  } : blank())
}, { immediate: true })


const rules = {
  title: [{ required: true, message: 'Bắt buộc nhập tiêu đề!' }],
}

async function handleSubmit () {
  const payload = {
    ...form,
    due_date: form.due_date ? dayjs(form.due_date).toISOString() : null,
  }

  console.log(payload)

  if (isEdit.value) {
    await store.updateTask(payload)
    await store.loadTasks() 
    message.success('Cập nhật thành công')
    emit('cancel')
  } else {
    await store.addTask(payload)
    await store.loadTasks() 
    message.success('Thêm thành công')
    Object.assign(form, blank())
  }
}
</script>

