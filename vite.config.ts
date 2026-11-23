import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleApiRequest } from './server/api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'zynocs-api-backend',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && req.url.startsWith('/api')) {
            try {
              const handled = await handleApiRequest(req, res);
              if (handled) return;
            } catch (err: any) {
              console.error('API Error:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err?.message || 'Internal Server Error' }));
              return;
            }
          }
          next();
        });
      }
    }
  ],
  server: {
    host: true,
    port: 5173
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
