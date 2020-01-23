import Vue from 'vue';
import Notifications from 'vue-notification';

import router from './router';
import store from './store';

import 'materialize-css/dist/js/materialize.min';

import App from './App.vue';

Vue.use(Notifications);

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
