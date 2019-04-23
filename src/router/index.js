import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

let baseRoute = [{
  path: '/login',
  name: 'Login',
  meta: {
    name: 'Авторизация'
  },
  component: (resolve) => require(['../views/login.vue'], resolve)
}, {
  path: '/401',
  name: 'AccessDenided',
  component: (resolve) => require(['../views/common/401.vue'], resolve)
}, {
  path: '/404',
  name: 'NotFound',
  component: (resolve) => require(['../views/common/404.vue'], resolve)
}];

let router = new Router({
  routes: baseRoute
});

router.beforeEach((to, from, next) => {
  let routeName = to.meta.name || to.name;
  window.document.title = (routeName ? routeName + ' - ' : '') + 'АИС ЛПУ «Городская больница №38 им. Н.А. Семашко»';
  next();
});

export default router;
