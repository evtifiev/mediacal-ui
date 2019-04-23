import instance from './index';
const preUrlPath = '';
// Получить список ролей
const request = {
  p: ['get,/roles'],
  r: params => {
    return instance.get(`${preUrlPath}/roles`, {params})
  }
};
// Добавить роль
const add = {
  p: ['post,/roles'],
  r: params => {
    return instance.post(`${preUrlPath}/roles`, params)
  }
}
// Редактировать роль
const edit = {
  p: ['put,/role/**'],
  r: params => {
    return instance.put(`${preUrlPath}/role/${params.id}`, params)
  }
};
// Удалить роль
const remove = {
  p: ['delete,/role/**'],
  r: params => {
    return instance.get(`${preUrlPath}/role/${params.id}`)
  }
};
// Получить настройки для текущей роли
const view = {
  p: ['get, /role/**'],
  r: params => {
    return instance.get(`${preUrlPath}/role/${params.id}`)
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
  add,
  edit,
  remove,
  view,
  notAllowed
}
