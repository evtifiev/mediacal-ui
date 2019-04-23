import instance from './index';
const preUrlPath = '';
// Получить все записи на текущий
const request = {
  p: ['get,/visits'],
  r: params => {
    return instance.get(`${preUrlPath}/visits`, {params})
  }
};
// Добавить запись на прием
const add = {
  p: ['post,/visits'],
  r: params => {
    return instance.post(`${preUrlPath}/visits`, params)
  }
}
// Редактировать прием
const edit = {
    p: ['put,/visit/**'],
    r: params => {
      return instance.put(`${preUrlPath}/visit/${params.id}`, params)
    }
  };
// Удалить прием
const remove = {
  p: ['delete,/visit/**'],
  r: params => {
    return instance.delete(`${preUrlPath}/visit/${params.id}`)
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
