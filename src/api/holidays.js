import instance from './index';
const preUrlPath = '';
// Получить список всех праздничных дней
const request = {
  p: ['get,/holidays'],
  r: params => {
    return instance.get(`${preUrlPath}/holidays`, {params})
  }
};
// Добавить праздничный день
const add = {
  p: ['post,/holidays'],
  r: params => {
    return instance.post(`${preUrlPath}/holidays`, params)
  }
}
// Редактировать праздничный день
const edit = {
    p: ['put,/holiday/**'],
    r: params => {
      return instance.put(`${preUrlPath}/holiday/${params.id}`, params)
    }
  };
// Удалить праздничный день
const remove = {
  p: ['delete,/holiday/**'],
  r: params => {
    return instance.delete(`${preUrlPath}/holiday/${params.id}`)
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
