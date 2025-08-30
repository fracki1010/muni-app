import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Acepta conexiones desde cualquier IP
    port: 5174, // Puedes cambiarlo si está en uso
    strictPort: true // Evita que Vite cambie automáticamente el puerto
  }
})
