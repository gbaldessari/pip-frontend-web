import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      APP_ENV: JSON.stringify(env.APP_ENV)
    },
    plugins: [react()],
  }
},
)