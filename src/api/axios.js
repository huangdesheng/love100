import axios from 'axios';


const service = axios.create({
  baseURL: process.env.BASE_API,
  // timeout: 60000,
  // withCredentials: true //允许携带cookie
});

axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

//request
service.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

//response
service.interceptors.response.use(response => {
  return response;
}, error => {
  // toast.clear();
  return Promise.reject(error);
});



export default service;
