import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4111/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Chat API endpoints
export const chatApi = {
  sendMessage: (message: string) =>
    api.post('/chat/message', { message }),
  
  getChatHistory: () =>
    api.get('/chat/history'),
  
  submitFeedback: (messageId: string, feedback: 'positive' | 'negative') =>
    api.post('/chat/feedback', { messageId, feedback }),
};

// Document API endpoints
export const documentApi = {
  uploadDocument: (file: File) => {
    const formData = new FormData();
    formData.append('files', file);
    return api.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  getDocuments: () =>
    api.get('/documents'),
  
  deleteDocument: (id: string) =>
    api.delete(`/documents/${id}`),
};

// Analytics API endpoints
export const analyticsApi = {
  getChatLogs: () =>
    api.get('/analytics/chat-logs'),
  
  getSatisfactionRatings: () =>
    api.get('/analytics/satisfaction'),
  
  getDashboardStats: () =>
    api.get('/analytics/stats'),
};

// Auth API endpoints
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  logout: () =>
    api.post('/auth/logout'),
  
  getCurrentUser: () =>
    api.get('/auth/me'),
};

export default api;
