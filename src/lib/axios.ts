import axios from 'axios';

// TODO: this is the initial axios setup. Not finished
const api = axios.create();

api.interceptors.request.use();

api.interceptors.response.use();

export default api;
