import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Configuración para desarrollo local
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  },

  // 👇 ESTO ES LO QUE TE FALTA PARA QUE FUNCIONE EN LA NUBE
  preview: {
    host: '0.0.0.0', // Escuchar en todas las direcciones (necesario para Docker/Railway)
    port: 4173,      // Puerto estándar de preview
    allowedHosts: true, // <--- LA CLAVE: Permite cualquier dominio de Railway
  }
})