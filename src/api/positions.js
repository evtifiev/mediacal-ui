import instance from './index';
const preUrlPath = '';
// Получить список всех модулей
const request = {
  p: ['get,/positions'],
  r: params => {
    return instance.get(`${preUrlPath}/positions`, {params})
  }
};
// Добавить модуль
const add = {
  p: ['post,/positions'],
  r: params => {
    return instance.post(`${preUrlPath}/positions`, params)
  }
}
// Редактировать модуль
const edit = {
    p: ['put,/position/**'],
    r: params => {
      return instance.put(`${preUrlPath}/position/${params.id}`, params)
    }
  };
// Удалить модуль
const remove = {
  p: ['delete,/position/**'],
  r: params => {
    return instance.delete(`${preUrlPath}/position/${params.id}`)
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
