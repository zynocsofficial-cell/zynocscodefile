module.exports = {
  apps: [
    {
      name: 'zynocs-enterprise-backend',
      script: 'server/server.ts',
      interpreter: 'node',
      node_args: '--experimental-strip-types',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8800,
        HOST: '0.0.0.0',
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_PORT: process.env.DB_PORT || 8800,
        DB_USER: process.env.DB_USER || 'zynocs_admin',
        DB_PASSWORD: process.env.DB_PASSWORD || '',
        DB_NAME: process.env.DB_NAME || 'zynocs_enterprise'
      }
    }
  ]
};
