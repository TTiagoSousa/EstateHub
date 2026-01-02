// src/Services/httpService.ts

import axios from 'axios';
import { BASE_URL } from '../config/urls';

const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const fullUrl = error.config?.url || '';
    const normalizedUrl = fullUrl.replace(BASE_URL, ''); 

    if (status === 401 && normalizedUrl === '/user/me') {
      console.log('ℹ️ [Axios] Ignorado 401 esperado em /user/me');
      return Promise.reject(error);
    }

    // Outros tratamentos
    // if (status === 401) {
    //   console.warn('🔒 Não autorizado.');
    // } else if (status === 429) {
    //   console.warn('⏳ Muitas requisições!');
    // } else if (status && status >= 500) {
    //   console.warn('💥 Erro do servidor.');
    // } else {
    //   console.error(`❌ [Axios] Erro [${status}] em: ${fullUrl}`);
    // }

    return Promise.reject(error);
  }
);

export default http;