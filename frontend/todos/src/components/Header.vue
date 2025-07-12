<template>
  <a-layout-header class="header">
    <h1>📝 Vue To‑do</h1>
    <a-menu mode="horizontal" :selectedKeys="[active]">
      <a-menu-item key="home" @click="$router.push('/')">Trang chủ</a-menu-item>
      <a-menu-item key="todos" @click="$router.push('/todos')">Quản lý công việc</a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route  = useRoute()
const active = computed(() => (route.path.startsWith('/todos') ? 'todos' : 'home'))
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: #fff;
  border-bottom: 1px solid #eee;
}
h1 {
  margin: 0;
  font-size: 20px;
}
</style>
