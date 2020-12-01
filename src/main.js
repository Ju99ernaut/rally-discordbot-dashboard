import Vue from 'vue';
import App from './App.vue';

import store from './store';
import router from './router';

import i18n from "./i18n"
import './registerServiceWorker'

import '@/assets/css/tailwind.css';

Vue.config.productionTip = false;

new Vue({
    router,
    i18n,
    store,
    render: h => h(App),
}).$mount('#app');