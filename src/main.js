import './lib-vue';
import './lib-window';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VForm from '@components/VForm';
import VFormField from '@components/VFormField';

Vue.component('VForm', VForm);
Vue.component('VFormField', VFormField);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
