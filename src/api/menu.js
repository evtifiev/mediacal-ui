import instance from './index';
const preUrlPath = '';
// Получить список меню
const request = {
  p: ['get,/menus'],
  r: params => {
    return instance.get(`${preUrlPath}/menus`, {params})
  }
};
// Добавить меню
const add = {
  p: ['post,/menus'],
  r: params => {
    return instance.post(`${preUrlPath}/menus`, params)
  }
}
// Редактировать ьеню
const edit = {
  p: ['put,/menu/**'],
  r: params => {
    return instance.put(`${preUrlPath}/menu/${params.id}`, params)
  }
};
// Удалить меню
const remove = {
  p: ['delete,/menu/**'],
  r: params => {
    return instance.delete(`${preUrlPath}/menu/${params.id}`)
  }
};
// Получить настройки для текущего меню
const view = {
  p: ['get, /menu/**'],
  r: params => {
    return instance.get(`${preUrlPath}/menu/${params.id}`)
  }
}
// Несанкционированный запрос
const notAllowed = {
  p: ['get,/roles/notAllowed'],
  r: params => {
    return instance.get(`${preUrlPath}/roles/notAllowed`, {params})
  }
}

export {
  request,
  view,
  add,
  edit,
  remove,
  notAllowed
}