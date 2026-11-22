import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;

const pool = new Pool({
  host: 'localhost',
  port: 8800,
  user: 'mohammedkhajamoinuddin',
  password: '',
  database: 'zynocs_enterprise',
});

async function run() {
  console.log('Testing live PostgreSQL on port 8800...');
  const res = await pool.query('SELECT NOW() as now, current_database() as db');
  console.log('Database connected:', res.rows[0]);

  // Clean test user if exists
  await pool.query('DELETE FROM users WHERE email = $1', ['director@zynocs.com']);

  // Create real bcrypt hash
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('DirectorPass2026!', salt);

  // Insert real Director
  const uRes = await pool.query(
    'INSERT INTO users (email, password_hash, full_name, is_2fa_enabled) VALUES ($1, $2, $3, $4) RETURNING id, email, full_name',
    ['director@zynocs.com', hash, 'Mohammed Khaja Moinuddin (Director)', true]
  );
  console.log('Created Director Account:', uRes.rows[0]);

  // Assign Director Role in user_roles
  await pool.query(
    'INSERT INTO user_roles (user_id, subdomain, role, department, status) VALUES ($1, $2, $3, $4, $5)',
    [uRes.rows[0].id, 'directors', 'DIRECTOR', 'Executive Board', 'ACTIVE']
  );
  console.log('Assigned Executive Boardroom Role!');

  // Verify login matching
  const match = await bcrypt.compare('DirectorPass2026!', hash);
  console.log('Bcrypt Password Match Verified:', match);

  // Verify wrong password fails
  const wrongMatch = await bcrypt.compare('WrongPassword!', hash);
  console.log('Wrong Password Rejected Verified:', !wrongMatch);

  await pool.end();
}

run().catch(console.error);
