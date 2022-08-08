import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { initializeFirebase } from './firebase';

import "bootstrap/dist/css/bootstrap.min.css"

initializeFirebase();

createApp(App).use(router).mount('#app');
