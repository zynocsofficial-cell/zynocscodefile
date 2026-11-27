/**
 * ZYNOCS ENTERPRISE DATABASE SEEDER (PostgreSQL 18)
 * Hashes passwords with bcrypt (cost factor 10) on the backend
 * and inserts the initial root personnel into the live database.
 */

import pg from 'pg';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

// Automatically parse .env in production if present
try {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = match[2] || '';
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val.trim();
      }
    }
  }
} catch (_) {
  // Ignore
}

const { Pool } = pg;

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false },
    }
    : {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '8800', 10),
      user: process.env.DB_USER || 'mohammedkhajamoinuddin',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'zynocs_enterprise',
    }
);

// Initial Single Enterprise User
const ACCOUNTS = [
  {
    email: 'mohammedkhaja@zynocs.com',
    fullName: 'Mohammed Khaja Moinuddin',
    password: '651433',
    roles: [
      { subdomain: 'directors', role: 'CHAIRPERSON_FOUNDER', department: 'Executive Board' },
      { subdomain: 'work', role: 'DIRECTOR', department: 'Executive Board' },
      { subdomain: 'main', role: 'SUPER_ADMIN', department: 'Central Identity' },
      { subdomain: 'client', role: 'CLIENT_ENTERPRISE_EXECUTIVE', department: 'Executive Board' },
      { subdomain: 'sponsors', role: 'SPONSOR_DIRECTOR', department: 'Executive Board' },
      { subdomain: 'ads', role: 'ADOPS_OPERATOR', department: 'Executive Board' }
    ]
  }
];

async function seed() {
  console.log('⚡ Connecting to PostgreSQL at localhost:8800 (zynocs_enterprise)...');

  // 1. Ensure core tables exist
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(150) NOT NULL,
        phone VARCHAR(50),
        is_2fa_enabled BOOLEAN DEFAULT FALSE,
        two_factor_secret VARCHAR(255),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS user_roles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        subdomain VARCHAR(50) NOT NULL,
        role VARCHAR(50) NOT NULL,
        department VARCHAR(100),
        status VARCHAR(20) DEFAULT 'ACTIVE',
        assigned_at TIMESTAMPTZ DEFAULT NOW(),
        revoked_at TIMESTAMPTZ,
        UNIQUE(user_id, subdomain, role)
    );
  `);

  console.log('✅ Core tables verified.');

  // 2. Remove all previous users as requested
  console.log('🧹 Purging all previous users and roles from database...');
  await pool.query('DELETE FROM user_roles;');
  await pool.query('DELETE FROM users;');
  console.log('✅ All previous accounts removed.');

  // 3. Insert sole root user
  for (const acc of ACCOUNTS) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(acc.password, salt);

    // Insert user
    const userRes = await pool.query(
      `INSERT INTO users (email, password_hash, full_name, is_2fa_enabled)
       VALUES ($1, $2, $3, TRUE)
       ON CONFLICT (email) DO UPDATE 
       SET password_hash = EXCLUDED.password_hash,
           full_name = EXCLUDED.full_name,
           updated_at = NOW()
       RETURNING id, email, full_name;`,
      [acc.email.toLowerCase().trim(), passwordHash, acc.fullName]
    );

    const user = userRes.rows[0];
    console.log(`\n👤 Created Sole Enterprise User:`);
    console.log(`   - Name: ${user.full_name}`);
    console.log(`   - Email: ${user.email}`);
    console.log(`   - User ID: ${user.id}`);

    // Insert user roles
    for (const r of acc.roles) {
      await pool.query(
        `INSERT INTO user_roles (user_id, subdomain, role, department, status)
         VALUES ($1, $2, $3, $4, 'ACTIVE')
         ON CONFLICT (user_id, subdomain, role) DO UPDATE 
         SET status = 'ACTIVE', department = EXCLUDED.department;`,
        [user.id, r.subdomain, r.role, r.department]
      );
      console.log(`   - Role granted: ${r.role} on ${r.subdomain}.zynocs.com`);
    }
  }

  console.log('\n🔒 SUCCESS: mohammedkhaja@zynocs.com created and secured in PostgreSQL database!');
  await pool.end();
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Database seeding error:', err);
  process.exit(1);
});
