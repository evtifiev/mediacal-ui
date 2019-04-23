import Abstract from '../views/common/abstract.vue';

export default [{
  path: '/',
  name: 'Main',
  meta: {
    name: 'Главная'
  },
  component: (resolve) => require(['../views/index.vue'], resolve),
  children: [{
    path: '/tickets',
    name: 'Tickets',
    meta: {
      name: 'Поддержка'
    },
    component: (resolve) => require(['../views/goods-list.vue'], resolve)
  }, {
      path: '/reception',
      name: 'Reception',
      meta: {
        name: 'Регистратура'
      },
      component: (resolve) => require(['../views/ako/reception.vue'], resolve)
    },{
      path: '/schedule',
      name: 'Schedule',
      meta: {
        name: 'Расписание'
      },
      component: (resolve) => require(['../views/ako/schedule.vue'], resolve)
    },{
    path: '/telephony',
    name: 'Telephony',
    meta: {
      name: 'Телефонный справочник'
    },
    component: (resolve) => require(['../views/goods-list.vue'], resolve)
  }, {
    path: '/settings',
    name: 'Settings',
    meta: {
      name: 'Настройки',
      icon: '&#xe62e;'
    },
    component: Abstract,
    children: [
      {
        path: 'modules',
        name: 'Modules',
        meta: {
          name: 'Список модулей'
        },
        component: (resolve) => require(['../views/settings/module-list.vue'], resolve)
      },
      {
        path: 'permissions',
        name: 'ModulePermissions',
        meta: {
          name: 'Разрешение модулей'
        },
        component: (resolve) => require(['../views/settings/module-permissions.vue'], resolve)
      },
      {
        path: 'roles',
        name: 'Roles',
        meta: {
          name: 'Роли'
        },
        component: (resolve) => require(['../views/settings/roles.vue'], resolve)
      }, {
        path: 'users',
        name: 'Users',
        meta: {
          name: 'Пользователи'
        },
        component: (resolve) => require(['../views/settings/users.vue'], resolve)
      },
      {
        path: 'menu',
        name: 'Menu',
        meta: {
          name: 'Меню'
        },
        component: (resolve) => require(['../views/settings/menu.vue'], resolve)
      },
      {
        path: 'departments',
        name: 'Department',
        meta: {
          name: 'Подразделения'
        },
        component: (resolve) => require(['../views/settings/departments.vue'], resolve)
      },
      {
        path: 'positions',
        name: 'Positions',
        meta: {
          name: 'Должности'
        },
        component: (resolve) => require(['../views/settings/positions.vue'], resolve)
      },{
        path: 'doctors',
        name: 'Doctors',
        meta: {
          name: 'Врачи'
        },
        component: (resolve) => require(['../views/settings/doctors.vue'], resolve)
      },{
        path: 'specializations',
        name: 'Specializations',
        meta: {
          name: 'Специализации врачей'
        },
        component: (resolve) => require(['../views/settings/specializations.vue'], resolve)
      },  
      {
        path: 'holidays',
        name: 'Holidays',
        meta: {
          name: 'Праздничные дни'
        },
        component: (resolve) => require(['../views/settings/holidays.vue'], resolve)
      },
      {
        path: 'patients',
        name: 'Patients',
        meta: {
          name: 'Пациенты'
        },
        component: (resolve) => require(['../views/settings/patients.vue'], resolve)
      }
    ]
  }, {
    path: '/goods',
    name: 'Goods',
    meta: {
      icon: '&#xe62e;',
      name: 'Товары'
    },
    component: Abstract,
    children: [{
      path: 'list',
      name: 'GoodsList',
      meta: {
        name: 'Список товаров'
      },
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }]
  }]
}];