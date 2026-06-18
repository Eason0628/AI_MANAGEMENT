import './styles/index.less'
import { createApp } from 'vue'
import App from './App.vue'
import router from './route/index.js'
import { store } from './store/index.js'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import VueI18n from './common/locale/index.js'

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Antd);
app.use(VueI18n);
app.mount('#app');
