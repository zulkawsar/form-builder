// main.js
import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Import your store

createApp(App).use(store).mount('#app');
