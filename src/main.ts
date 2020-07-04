import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
Vue.config.productionTip = false
import Api from '@/plugins/api';

Vue.use(Api);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
