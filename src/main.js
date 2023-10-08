// main.js
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import store from './store'; // Import your store

createApp(App).use(ElementPlus).use(store).mount('#app');
