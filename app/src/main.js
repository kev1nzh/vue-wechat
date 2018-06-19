import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
