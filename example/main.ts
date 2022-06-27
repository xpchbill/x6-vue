import { createApp } from 'vue'
import Antd from "ant-design-vue"
import App from './App.vue'
import Graph from '../src/index'

import "ant-design-vue/dist/antd.css"

const app = createApp(App)

app.use(Antd)
// ts模式下会报错vue3支持use直接传递PluginInstallFunction
// app.use(Graph)
app.use(Graph.install)

app.mount('#app')
