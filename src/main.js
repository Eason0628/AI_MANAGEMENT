import './styles/index.less'
import { createApp } from 'vue'
import App from './App.vue'
import router from './route/index.js'
import {store} from './store/index.js'

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
