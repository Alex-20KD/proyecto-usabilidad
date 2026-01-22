import axios from 'axios'

// 1. Configuración de la URL
// Eliminamos '/api' del final porque tus componentes ya lo incluyen (ej: /api/auth/login)
const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '')

const api = axios.create({
  baseURL: API_BASE, // <--- Solo la raíz (ej: localhost:8000 o railway.app)
  headers: {
    'Content-Type': 'application/json'
  }
})

// 2. Interceptor: Pegar el Token si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 3. Interceptor: Manejar Sesión Caducada (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el error es 401 (No autorizado)
    if (error.response?.status === 401) {
      
      // TRUCO IMPORTANTE: 
      // Solo forzamos logout si NO estamos intentando loguearnos.
      // Si estamos en la página de login (/usuarios) y falla la contraseña, 
      // NO queremos recargar la página, queremos ver el error.
      if (!window.location.pathname.includes('/usuarios')) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/usuarios'
      }
    }
    return Promise.reject(error)
  }
)

export default api