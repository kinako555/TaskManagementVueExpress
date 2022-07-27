import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeFirebase } from './firebase'
import Axios from 'axios'

initializeFirebase()
Axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

createApp(App).use(router).mount('#app')
