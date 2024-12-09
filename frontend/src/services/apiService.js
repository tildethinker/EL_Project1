// Service for making API calls to backend

import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for adding token to request
apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export { apiService };
