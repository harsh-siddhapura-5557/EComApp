// src/api/index.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10_000,
});

// helpers
export const getProducts = () => api.get('/products');
export const getProductById = id => api.get(`/products/${id}`);
export const getByCategory = cat => api.get(`/products/category/${cat}`);
