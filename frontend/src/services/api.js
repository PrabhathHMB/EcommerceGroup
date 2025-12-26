import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth APIs
export const authAPI = {
  signup: (userData) => api.post('/auth/signup', userData),
  signin: (credentials) => api.post('/auth/signin', credentials),
}

// Product APIs
export const productAPI = {
  getAllProducts: (params) => api.get('/api/products', { params }),
  getProductById: (id) => api.get(`/api/products/id/${id}`),
  searchProducts: (query) => api.get(`/api/products/search?q=${query}`),
  createProduct: (data) => api.post('/api/admin/products/', data),
  updateProduct: (id, data) => api.put(`/api/admin/products/${id}/update`, data),
  deleteProduct: (id) => api.delete(`/api/admin/products/${id}/delete`),
}

// Cart APIs
export const cartAPI = {
  getCart: () => api.get('/api/cart/'),
  addToCart: (data) => api.put('/api/cart/add', data),
  updateCartItem: (id, data) => api.put(`/api/cart_items/${id}`, data),
  removeCartItem: (id) => api.delete(`/api/cart_items/${id}`),
}

// Order APIs
export const orderAPI = {
  createOrder: (address) => api.post('/api/orders/', address),
  getUserOrders: () => api.get('/api/orders/user'),
  getAllOrders: () => api.get('/api/admin/orders/'),
  confirmOrder: (orderId) => api.put(`/api/admin/orders/${orderId}/confirmed`),
  shipOrder: (orderId) => api.put(`/api/admin/orders/${orderId}/ship`),
  deliverOrder: (orderId) => api.put(`/api/admin/orders/${orderId}/deliver`),
  cancelOrder: (orderId) => api.put(`/api/admin/orders/${orderId}/cancel`),
  deleteOrder: (orderId) => api.delete(`/api/admin/orders/${orderId}/delete`),
  getOrderById: (id) => api.get(`/api/orders/${id}`),
}

// User APIs
export const userAPI = {
  getProfile: () => api.get('/api/users/profile'),
  getAllUsers: () => api.get('/api/admin/users/'),
}

// Rating APIs
export const ratingAPI = {
  createRating: (data) => api.post('/api/ratings/create', data),
  getProductRatings: (productId) => api.get(`/api/ratings/product/${productId}`),
}

// Review APIs
export const reviewAPI = {
  createReview: (data) => api.post('/api/reviews/create', data),
  getProductReviews: (productId) => api.get(`/api/reviews/product/${productId}`),
}

export default api

