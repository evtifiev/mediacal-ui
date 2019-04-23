import instance from './index';
const preUrlPath = '';
// Получить список расписаний
const request = {
  p: ['get,/schedules'],
  r: params => {
    return instance.get(`${preUrlPath}/schedules`, {params})
  }
};
// Добавить расписание работы
const add = {
  p: ['post,/schedules'],
  r: params => {
    return instance.post(`${preUrlPath}/schedules`, params)
  }
}
// Редактировать расписание
const edit = {
    p: ['put,/schedule/**'],
    r: params => {
      return instance.put(`${preUrlPath}/schedule/${params.id}`, params)
    }
  };
// Удалить расписание
const remove = {
  p: ['delete,/schedule/**'],
  r: params => {
    return instance.delete(`${preUrlPath}/schedule/${params.id}`)
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
