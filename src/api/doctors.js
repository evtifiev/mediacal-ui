import instance from './index';
const preUrlPath = '';
// Получить список врачей ведущих прием
const requestDoctors = {
  p: ['get,/doctors'],
  r: params => {
    return instance.get(`${preUrlPath}/doctors`, {params})
  }
};
// Добавить доктора
const addDoctor = {
  p: ['post,/doctors'],
  r: params => {
    return instance.post(`${preUrlPath}/doctors`, params)
  }
}
// Редактировать информацию о докторе
const editDoctor = {
  p: ['put,/doctor/**'],
  r: params => {
    return instance.put(`${preUrlPath}/doctor/${params.id}`, params)
  }
};
// Удалить доктора
const removeDoctor = {
  p: ['delete,/doctor/**'],
  r: params => {
    return instance.delete(`${preUrlPath}/doctor/${params.id}`)
  }
};
// Получить информацию о докторе
const viewDoctor = {
  p: ['get, /doctor/**'],
  r: params => {
    return instance.get(`${preUrlPath}/doctor/${params.id}`)
  }
}
const requestSpecializations = {
    p: ['get,/specializations'],
    r: params => {
      return instance.get(`${preUrlPath}/specializations`, {params})
    }
  };
  // Добавить меню
  const addSpecialization = {
    p: ['post,/specializations'],
    r: params => {
      return instance.post(`${preUrlPath}/specializations`, params)
    }
  }
  // Редактировать ьеню
  const editSpecialization = {
    p: ['put,/specialization/**'],
    r: params => {
      return instance.put(`${preUrlPath}/specialization/${params.id}`, params)
    }
  };
  // Удалить меню
  const removeSpecialization = {
    p: ['delete,/specialization/**'],
    r: params => {
      return instance.delete(`${preUrlPath}/specialization/${params.id}`)
    }
  };
  // Получить настройки для текущего меню
  const viewSpecialization = {
    p: ['get, /specialization/**'],
    r: params => {
      return instance.get(`${preUrlPath}/specialization/${params.id}`)
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
  requestDoctors,
  viewDoctor,
  addDoctor,
  editDoctor,
  removeDoctor,
  requestSpecializations,
  viewSpecialization,
  addSpecialization,
  editSpecialization,
  removeSpecialization,
  notAllowed
}