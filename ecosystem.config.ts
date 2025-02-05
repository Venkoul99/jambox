module.exports = {
  apps: [
    {
      name: "backend",
      script: "npm",
      args: "run start:prod",
      cwd: "/var/www/jambox/apps/api",
      env: {
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
    },
  ],
};
