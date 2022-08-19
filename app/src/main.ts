import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { initializeFirebase } from './firebase';
import { defineRule } from 'vee-validate';
import { store, key } from './store'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap";

import "@fortawesome/fontawesome-free/css/fontawesome.css"
import "@fortawesome/fontawesome-free/css/brands.css"
import "@fortawesome/fontawesome-free/css/solid.css"

initializeFirebase();

const app = createApp(App);
app.use(store, key);
app.use(router).mount('#app');

/* Global Validates
  複数項目から入力チェックを行う場合はGlobal validatesから行う
*/
defineRule('endDateValidate', (endDate: Date, [startDate]: [Date]) => {
  if (!endDate || !startDate) return true;
  if (endDate < startDate) return '終了日は開始日以降を入力してください';
  return true;
});