import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
});

export const getBricks = () => api.get('/bricks');
export const createBrick = (brick: any) => api.post('/bricks', brick);
export const createRandomBrick = () => api.post('/bricks/random');
export const getBrickById = (id: number) => api.get(`/bricks/${id}`);
export const updateBrickStatus = (id: number, status: string) => api.put(`/bricks/${id}/status`, status);
export const deleteBrick = (id: number) => api.delete(`/bricks/${id}`);