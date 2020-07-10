import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueSidebarMenu from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
import router from './router';
import '@/assets/scss/custom.scss';
import 'vue2-datepicker/index.css';
import BootstrapVue from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueNativeSock from "vue-native-websocket";
import VueConfetti from 'vue-confetti';


Vue.use(VueConfetti)
Vue.use(VueSidebarMenu)
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue);
library.add(fas);
Vue.use(VueNativeSock, "wss://geo.gwyrin.ch:7777", {
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  connectManually: true
});


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
