import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeFirebase } from './firebase'

initializeFirebase()

createApp(App).use(router).mount('#app')
