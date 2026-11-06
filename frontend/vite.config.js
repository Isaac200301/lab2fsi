import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// En desarrollo, las llamadas a /airline/** se reenvían al backend del Laboratorio 2 (Spring Boot),
// así el navegador no necesita CORS. Cambie el destino con VITE_API_URL en el archivo .env.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: { '/airline': { target: env.VITE_API_URL || 'http://localhost:8080', changeOrigin: true } },
    },
  };
});
