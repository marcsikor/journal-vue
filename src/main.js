import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueDOMPurifyHTML from 'vue-dompurify-html';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import withUUID from "vue-uuid";

const app = withUUID(createApp(App))

app.use(router);
app.use(VueDOMPurifyHTML);

app.mount('#app')
