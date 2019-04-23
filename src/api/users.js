import instance from './index';
import CryptoJS from "crypto-js";
const preUrlPath = '';
//获取账户列表
const request = {
  p: ['get,/users'],
  r: params => {
    return instance.get(`${preUrlPath}/users`, {params})
  }
};
const add = {
  p: ['post,/users'],
  r: params => {
    let words = CryptoJS.enc.Utf8.parse(params.password);
    let base64 = CryptoJS.enc.Base64.stringify(words);
    params.password = base64;
    return instance.post(`${preUrlPath}/users`, params)
  }
};
//删除账户
const remove = {
  p: ['delete,/user/**'],
  r: params => {
    return instance.delete(`${preUrlPath}/user/${params.id}`)
  }
};

//修改账户
const edit = {
  p: ['put,/user/**'],
  r: params => {
    let words = CryptoJS.enc.Utf8.parse(params.password);
    let base64 = CryptoJS.enc.Base64.stringify(words);
    params.password = base64;
    return instance.put(`${preUrlPath}/user/${params.id}`, params)
  }
};
//越权请求
const notAllowed = {
  p: ['get,/roles/notAllowed'],
  r: params => {
    return instance.get(`${preUrlPath}/roles/notAllowed`, {params})
  }
}

export {
  request,
  add,
  remove,
  edit,
  notAllowed
}
