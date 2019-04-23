import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/ru-RU'

import App from './App.vue';
import router from './router';
import * as filters from './filters'; // global filters
import './icons' // icon



Vue.use(ElementUI, {
  locale
});
/**
 * Calendar
 */
import FullCalendar from 'vue-full-calendar';
Vue.use(FullCalendar)

/*
* v-has
*/

Vue.directive('has', {
  inserted: function(el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el);
    }
  }
});
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

