import Vue from 'vue';
import App from './App.vue';

import store from './store';
import router from './router';

import i18n from './i18n';
import './registerServiceWorker';

import Toast from 'vue-toast-notification';

import '@/assets/css/tailwind.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(Toast);
Vue.config.productionTip = false;

new Vue({
    router,
    i18n,
    store,
    render: h => h(App),
}).$mount('#app');