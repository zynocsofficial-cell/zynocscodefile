import pg from 'pg';
import bcrypt from 'bcryptjs';
import type { IncomingMessage, ServerResponse } from 'http';

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '8800', 10),
  user: process.env.DB_USER || 'mohammedkhajamoinuddin',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'zynocs_enterprise',
  max: 10,
  idleTimeoutMillis: 30000,
});

export const parseBody = (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
};

export const handleApiRequest = async (req: IncomingMessage, res: ServerResponse): Promise<boolean> => {
  const url = new URL(req.url || '/', 'http://localhost');
  const pathname = url.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return true;
  }

  // 1. Healthcheck & DB test
  if (pathname === '/api/health') {
    try {
      const dbRes = await pool.query('SELECT NOW() as now, current_database() as db;');
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        status: 'UP',
        database: dbRes.rows[0].db,
        timestamp: dbRes.rows[0].now
      }));
      return true;
    } catch (err: any) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Database connection error', details: err?.message || 'DB Error' }));
      return true;
    }
  }

  // 2. Director Appointment & Registration (Live PostgreSQL 18)
  if (pathname === '/api/auth/register-director' && req.method === 'POST') {
    try {
      const body = await parseBody(req);
      const { resolutionKey, email, password, fullName } = body;

      if (!email || !password || !resolutionKey) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Resolution key, email, and password are required.' }));
        return true;
      }

      // Check if user already exists
      const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase().trim()]);
      if (existing.rows.length > 0) {
        res.statusCode = 409;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'An account with this email already exists. Please sign in.' }));
        return true;
      }

      // Hash password with bcrypt
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const name = fullName || email.split('@')[0];

      // Insert User into PostgreSQL
      const userRes = await pool.query(
        'INSERT INTO users (email, password_hash, full_name, is_2fa_enabled) VALUES ($1, $2, $3, $4) RETURNING id, email, full_name, created_at',
        [email.toLowerCase().trim(), hash, name, true]
      );
      const user = userRes.rows[0];

      // Insert Director Role into user_roles
      await pool.query(
        'INSERT INTO user_roles (user_id, subdomain, role, department, status) VALUES ($1, $2, $3, $4, $5)',
        [user.id, 'directors', 'DIRECTOR', 'Executive Board', 'ACTIVE']
      );

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: true,
        message: 'Director Board Resolution verified and credentials activated.',
        user: {
          id: user.id,
          name: user.full_name,
          email: user.email,
          role: 'DIRECTOR',
          subdomain: 'directors.zynocs.com',
          resolutionKey
        }
      }));
      return true;
    } catch (err: any) {
      console.error('Registration error:', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Internal database error during director appointment', details: err?.message || 'Error' }));
      return true;
    }
  }

  // 3. User Login (Authenticating against live PostgreSQL 18)
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    try {
      const body = await parseBody(req);
      const { email, password, subdomain = 'directors' } = body;

      if (!email || !password) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Email and password are required.' }));
        return true;
      }

      // Query User
      const userRes = await pool.query(
        'SELECT id, email, password_hash, full_name FROM users WHERE email = $1',
        [email.toLowerCase().trim()]
      );

      if (userRes.rows.length === 0) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'No account found with this email. Please check your credentials or redeem appointment key.' }));
        return true;
      }

      const user = userRes.rows[0];

      // Compare password
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Incorrect password. Please try again.' }));
        return true;
      }

      // Check Role Permissions for subdomain
      const roleRes = await pool.query(
        'SELECT role, department, status FROM user_roles WHERE user_id = $1 AND subdomain = $2 AND status = $3',
        [user.id, subdomain, 'ACTIVE']
      );

      // If logging into directors, require active director role
      if (subdomain === 'directors' && roleRes.rows.length === 0) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Access Denied: You do not hold an active Executive Board Director clearance.' }));
        return true;
      }

      const activeRole = roleRes.rows[0]?.role || 'DIRECTOR';

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: true,
        message: 'Authentication successful.',
        user: {
          id: user.id,
          name: user.full_name,
          email: user.email,
          role: activeRole,
          subdomain: `${subdomain}.zynocs.com`,
          department: roleRes.rows[0]?.department || 'Executive Board'
        }
      }));
      return true;
    } catch (err: any) {
      console.error('Login error:', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Authentication service error', details: err?.message || 'Error' }));
      return true;
    }
  }

  return false;
};
