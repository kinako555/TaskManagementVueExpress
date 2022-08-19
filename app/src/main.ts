import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { initializeFirebase } from './firebase';
import { store, key } from './store';
import { defineGlobalRules } from '@/services/validates';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/brands.css";
import "@fortawesome/fontawesome-free/css/solid.css";

initializeFirebase();
defineGlobalRules();

const app = createApp(App);
app.use(store, key);
app.use(router).mount('#app');