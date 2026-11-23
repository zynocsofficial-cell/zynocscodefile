import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleApiRequest, pool } from './api.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

const PORT = parseInt(process.env.PORT || '8800', 10);
const HOST = process.env.HOST || '0.0.0.0';

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // 1. API routes
  if (pathname.startsWith('/api')) {
    try {
      const handled = await handleApiRequest(req, res);
      if (handled) return;
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'API endpoint not found' }));
      return;
    } catch (err: any) {
      console.error('Unhandled API error:', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Internal Server Error', details: err?.message }));
      return;
    }
  }

  // 2. Static files from dist
  let filePath = path.join(DIST_DIR, pathname === '/' ? 'index.html' : pathname);

  // Security check: prevent path traversal outside dist
  if (!filePath.startsWith(DIST_DIR)) {
    res.statusCode = 403;
    res.end('Access Denied');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.setHeader('Content-Type', contentType);
      
      // Cache static assets with hash in filename
      if (pathname.startsWith('/assets/')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }

      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // 3. SPA Fallback: serve index.html for client-side routing on all subdomains
    const indexPath = path.join(DIST_DIR, 'index.html');
    fs.readFile(indexPath, 'utf-8', (readErr, content) => {
      if (readErr) {
        res.statusCode = 500;
        res.end('Application not built. Please run `npm run build` first.');
        return;
      }
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache');
      res.end(content);
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`====================================================`);
  console.log(`🚀 ZYNOCS ENTERPRISE PRODUCTION BACKEND RUNNING 24/7`);
  console.log(`📡 URL: http://${HOST}:${PORT}`);
  const dbTarget = process.env.DATABASE_URL ? 'Connected via DATABASE_URL (Supabase / Remote)' : (process.env.DB_NAME || 'zynocs_enterprise');
  console.log(`🛡️  Database: PostgreSQL (${dbTarget})`);
  console.log(`🌐 Subdomains: directors, client, work, ads, sponsors`);
  console.log(`====================================================`);
});

// Graceful Shutdown
const shutdown = async () => {
  console.log('\n🛑 Shutting down backend gracefully...');
  server.close(async () => {
    try {
      await pool.end();
      console.log('✅ PostgreSQL connection pool closed.');
    } catch (e) {
      // Ignore
    }
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
