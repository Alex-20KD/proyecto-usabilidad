import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Configuración para desarrollo local (npm run dev)
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  },

  // 👇 ESTO ES LO QUE NECESITAS PARA RAILWAY (npm run preview)
  preview: {
    allowedHosts: true, // Permite que Railway muestre la página sin bloquearla
    host: '0.0.0.0',    // Escucha en todas las interfaces de red
    port: 4173          // Puerto por defecto (Railway usará el suyo automáticamente)
  }
})