import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});


api.interceptors.request.use(config => {
  console.log(`Enviando ${config.method?.toUpperCase()} para: ${config.url}`);
  return config;
});


api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro na requisição:', {
      URL: error.config.url,
      Status: error.response?.status,
      Mensagem: error.message,
      Resposta: error.response?.data
    });
    return Promise.reject(error);
  }
);

// Funções da API
export const getBricks = (p0: number, p1: number) => api.get('/bricks');
export const getBrickById = (id: number) => api.get(`/bricks/${id}`);
export const createBrick = (data: any) => api.post('/bricks', data);
export const createRandomBrick = () => api.post('/bricks/random');
export const updateBrickStatus = (id: number, status: string) => api.patch(`/bricks/${id}`, { status });
export const deleteBrick = (id: number) => api.delete(`/bricks/${id}`);

export default api;