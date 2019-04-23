import instance from './index';
const preUrlPath = '';
// Получить список всех модулей
const request = {
  p: ['get,/modules'],
  r: params => {
    return instance.get(`${preUrlPath}/modules`, {params})
  }
};
// Добавить модуль
const add = {
  p: ['post,/modules'],
  r: params => {
    return instance.post(`${preUrlPath}/modules`, params)
  }
}
// Редактировать модуль
const edit = {
    p: ['put,/module/**'],
    r: params => {
      return instance.put(`${preUrlPath}/module/${params.id}`, params)
    }
  };
// Удалить модуль
const remove = {
  p: ['delete,/module/**'],
  r: params => {
    return instance.delete(`${preUrlPath}/module/${params.id}`)
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
