import instance from './index';
const preUrlPath = '';
// Получить список модулей
const request_modules = {
  p: ['get,/modules'],
  r: params => {
    return instance.get(`${preUrlPath}/modules`, {params})
  }
};
// Получить список разрешений
const request = {
  p: ['get,/permissions'],
  r: params => {
    return instance.get(`${preUrlPath}/permissions`, {params})
  }
};
// Добавить модуль
const add = {
  p: ['post,/permissions'],
  r: params => {
    return instance.post(`${preUrlPath}/permissions`, params)
  }
}
// Редактировать модуль
const edit = {
    p: ['put,/permission/**'],
    r: params => {
      return instance.put(`${preUrlPath}/permission/${params.id}`, params)
    }
  };
// Удалить модуль
const remove = {
  p: ['delete,/permission/**'],
  r: params => {
    return instance.delete(`${preUrlPath}/permission/${params.id}`)
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
  request_modules,
  notAllowed
}
