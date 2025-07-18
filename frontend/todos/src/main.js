import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './store'
import Antd from 'ant-design-vue'


import './style.css'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(Antd)
app.mount('#app')
