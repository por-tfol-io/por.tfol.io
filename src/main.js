import './styles/main.scss';
import Vuex from 'vuex';
import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Vuex);

new Vue({
  router,
  store: new Vuex.Store(store),
  render: h => h(App),
}).$mount('#app');
