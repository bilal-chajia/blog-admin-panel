import axios from 'axios';

// API Base URL - Update this to match your Astro backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4321/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('admin_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================
// ARTICLES API
// ============================================

export const articlesAPI = {
  // Get all articles with pagination and filters
  getAll: (params = {}) => api.get('/articles', { params }),
  
  // Get single article by slug
  getBySlug: (slug) => api.get(`/articles/${slug}`),
  
  // Create new article
  create: (data) => api.post('/articles', data),
  
  // Update article
  update: (slug, data) => api.put(`/articles/${slug}`, data),
  
  // Delete article
  delete: (slug) => api.delete(`/articles/${slug}`),
  
  // Toggle online status
  toggleOnline: (slug) => api.patch(`/articles/${slug}/toggle-online`),
  
  // Toggle favorite status
  toggleFavorite: (slug) => api.patch(`/articles/${slug}/toggle-favorite`),
};

// ============================================
// CATEGORIES API
// ============================================

export const categoriesAPI = {
  getAll: (params = {}) => api.get('/categories', { params }),
  getBySlug: (slug) => api.get(`/categories/${slug}`),
  create: (data) => api.post('/categories', data),
  update: (slug, data) => api.put(`/categories/${slug}`, data),
  delete: (slug) => api.delete(`/categories/${slug}`),
};

// ============================================
// AUTHORS API
// ============================================

export const authorsAPI = {
  getAll: (params = {}) => api.get('/authors', { params }),
  getBySlug: (slug) => api.get(`/authors/${slug}`),
  create: (data) => api.post('/authors', data),
  update: (slug, data) => api.put(`/authors/${slug}`, data),
  delete: (slug) => api.delete(`/authors/${slug}`),
};

// ============================================
// TAGS API
// ============================================

export const tagsAPI = {
  getAll: (params = {}) => api.get('/tags', { params }),
  getBySlug: (slug) => api.get(`/tags/${slug}`),
  create: (data) => api.post('/tags', data),
  update: (slug, data) => api.put(`/tags/${slug}`, data),
  delete: (slug) => api.delete(`/tags/${slug}`),
};

// ============================================
// MEDIA API
// ============================================

export const mediaAPI = {
  // Get all media files
  getAll: (params = {}) => api.get('/media', { params }),
  
  // Upload file to R2
  upload: (file, metadata = {}) => {
    const formData = new FormData();
    formData.append('file', file);
    Object.keys(metadata).forEach(key => {
      formData.append(key, metadata[key]);
    });
    
    return api.post('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Delete media file
  delete: (id) => api.delete(`/media/${id}`),
};

// ============================================
// SETTINGS API
// ============================================

export const settingsAPI = {
  getAll: () => api.get('/settings'),
  get: (key) => api.get(`/settings/${key}`),
  update: (key, value) => api.put(`/settings/${key}`, { value }),
};

// ============================================
// AUTH API
// ============================================

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  verify: () => api.get('/auth/verify'),
};

// ============================================
// PINTEREST BOARDS API
// ============================================

export const pinterestBoardsAPI = {
  getAll: (params = {}) => api.get('/pinterest-boards', { params }),
  getBySlug: (slug) => api.get(`/pinterest-boards?slug=${slug}`),
  create: (data) => api.post('/pinterest-boards', data),
  update: (id, data) => api.put('/pinterest-boards', { id, ...data }),
  delete: (id) => api.delete(`/pinterest-boards?id=${id}`),
};

// ============================================
// PINTEREST PINS API
// ============================================

export const pinterestPinsAPI = {
  getAll: (params = {}) => api.get('/pins', { params }),
  getByArticle: (articleId) => api.get(`/pins?article_id=${articleId}`),
  create: (data) => api.post('/pins', data),
  update: (id, data) => api.put('/pins', { id, ...data }),
  delete: (id) => api.delete(`/pins?id=${id}`),
};

// ============================================
// STATS API (Dashboard)
// ============================================

export const statsAPI = {
  getDashboard: () => api.get('/stats/dashboard'),
  getArticleStats: () => api.get('/stats/articles'),
  getPopularArticles: (limit = 10) => api.get(`/stats/popular?limit=${limit}`),
};

export default api;

