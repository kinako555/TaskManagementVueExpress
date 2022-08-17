import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { initializeFirebase } from './firebase';
import { defineRule } from 'vee-validate';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap";

initializeFirebase();

createApp(App).use(router).mount('#app');

/* Global Validates */
defineRule('endDateValidate', (endDate: Date, [startDate]: [Date]) => {
  if (!endDate || !startDate) return true;
  if (endDate < startDate) return '終了日は開始日以降を入力してください';
  return true;
});