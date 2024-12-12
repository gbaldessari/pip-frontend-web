import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      APP_ENV: JSON.stringify(env.APP_ENV),
    },
    plugins: [react()],
    base: '/',
    optimizeDeps: {
      exclude: ['@react-pdf/renderer'], // Excluye react-pdf de la optimización
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true, // Maneja módulos mezclados de CommonJS y ES
      },
      rollupOptions: {
        output: {
          inlineDynamicImports: true, // Desactiva la fragmentación de módulos
        },
      },
      chunkSizeWarningLimit: 1000, // Ajusta el límite según tus necesidades
    },
    server: {
      host: '0.0.0.0', // Escucha en todas las interfaces
      port: parseInt(process.env.PORT || '3000'), // Usa el puerto asignado por Render
    },
  };
});
