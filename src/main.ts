import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
const app = createApp(App)
            .use(store)
            .use(ElementPlus)
            .use(router)
            .mount('#app')

// router.isReady().then(() => app.mount('#app'))