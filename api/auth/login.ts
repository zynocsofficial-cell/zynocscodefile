import type { IncomingMessage, ServerResponse } from 'http';
import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;

// Singleton connection pool for serverless execution
let poolInstance: any = null;

function getPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }
  if (!poolInstance) {
    poolInstance = new Pool({
      connectionString,
      ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 5000,
    });
  }
  return poolInstance;
}

const parseBody = (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
};

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  try {
    const body = await parseBody(req);
    const { email, password, subdomain = 'directors' } = body;

    if (!email || !password) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Email and password are required.' }));
      return;
    }

    const pool = getPool();
    if (!pool) {
      console.error('DATABASE_URL environment variable is not defined.');
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ 
        error: 'Database connection is not configured. Please add DATABASE_URL to your environment settings.' 
      }));
      return;
    }

    const normalizedEmail = (email || '').toLowerCase().trim();

    // Query user record from secure PostgreSQL database
    const userRes = await pool.query(
      'SELECT id, email, password_hash, full_name FROM users WHERE email = $1',
      [normalizedEmail]
    );

    if (userRes.rows.length === 0) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Authentication failed: Invalid credentials or account not found.' }));
      return;
    }

    const user = userRes.rows[0];

    // Cryptographic comparison using bcrypt against salted database hash
    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatches) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Authentication failed: Invalid credentials.' }));
      return;
    }

    // Verify role permissions for requested subdomain
    const roleRes = await pool.query(
      'SELECT role, department, status FROM user_roles WHERE user_id = $1 AND subdomain = $2 AND status = $3',
      [user.id, subdomain, 'ACTIVE']
    );

    if (subdomain === 'directors' && roleRes.rows.length === 0) {
      res.statusCode = 403;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Access Denied: You do not hold an active Executive Board Director clearance.' }));
      return;
    }

    const activeRole = roleRes.rows[0]?.role || (subdomain === 'directors' ? 'DIRECTOR' : 'STAFF');
    const department = roleRes.rows[0]?.department || (subdomain === 'directors' ? 'Executive Board' : 'General');

    res.statusCode = 200;
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
        department
      }
    }));
  } catch (err: any) {
    console.error('Authentication Error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 
      error: 'Authentication service error', 
      details: err?.message || 'Database query error' 
    }));
  }
}
