import instance from './index';
const preUrlPath = '';
// Получить список всех модулей
const request = {
  p: ['get,/departments'],
  r: params => {
    return instance.get(`${preUrlPath}/departments`, {params})
  }
};
// Добавить модуль
const add = {
  p: ['post,/departments'],
  r: params => {
    return instance.post(`${preUrlPath}/departments`, params)
  }
}
// Редактировать модуль
const edit = {
    p: ['put,/department/**'],
    r: params => {
      return instance.put(`${preUrlPath}/department/${params.id}`, params)
    }
  };
// Удалить модуль
const remove = {
  p: ['delete,/department/**'],
  r: params => {
    return instance.delete(`${preUrlPath}/department/${params.id}`)
  }
};
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
  notAllowed
}
