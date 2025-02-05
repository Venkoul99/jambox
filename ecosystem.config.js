module.exports = {
  apps: [
    {
      name: "backend",
      script: "npm",
      args: "run start:prod",
      cwd: "/var/www/jambox/apps/server",
      env: {
        NODE_ENV: "production",
      },
      log_file: "/var/log/pm2/backend-out.log",
      error_file: "/var/log/pm2/backend-error.log",
      watch: false,
      autorestart: true,
      max_restarts: 5,
      instances: 1,
      exec_mode: "cluster",
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "frontend",
      script: "npm",
      args: "run start:prod",
      cwd: "/var/www/jambox/apps/web",
      env: {
        NODE_ENV: "production",
      },
      log_file: "/var/log/pm2/frontend-out.log",
      error_file: "/var/log/pm2/frontend-error.log",
      watch: false,
      autorestart: true,
      max_restarts: 5,
      instances: 1,
      exec_mode: "cluster",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
