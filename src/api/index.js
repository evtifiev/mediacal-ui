import axios from 'axios';
import * as util from '../assets/util.js';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5000/v1/',
  timeout: 10000
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
// Обработка ошибок
instance.interceptors.response.use(function(response) {
  return response;
}, util.catchError);

export default instance;