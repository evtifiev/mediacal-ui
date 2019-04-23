import instance from './index';
const preUrlPath = '';
// Получить список всех пациентов
const request = {
  p: ['get,/patients'],
  r: params => {
    return instance.get(`${preUrlPath}/patients`, {params})
  }
};
// Добавить пациента
const add = {
  p: ['post,/patients'],
  r: params => {
    return instance.post(`${preUrlPath}/patients`, params)
  }
}
// Редактировать модуль
const edit = {
    p: ['put,/patient/**'],
    r: params => {
      return instance.put(`${preUrlPath}/patient/${params.id}`, params)
    }
  };
// Удалить пациента
const remove = {
  p: ['delete,/patient/**'],
  r: params => {
    return instance.delete(`${preUrlPath}/patient/${params.id}`)
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
