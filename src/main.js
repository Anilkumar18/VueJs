// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.component('text-input', require('./components/form-fields/TextInput.vue').default);
Vue.component('product-image', require('./components/form-fields/Image.vue').default);
Vue.component('product-price', require('./components/form-fields/Price.vue').default);
Vue.component('product-attribute', require('./components/ProductAttribute.vue').default);
Vue.component('ProductListDisplay', require('./components/ProductListDisplay.vue').default);
Vue.component('modal', require('./components/Modal.vue').default);

Vue.config.productionTip = false


window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
