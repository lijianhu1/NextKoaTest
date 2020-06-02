module.exports = {
  apps: [
    {
      name: 'PSB_DEV', //  每次发布要修改这个名字PSB_DEV  PSB_TEST  PSB,
      script: './server.js',
      time: true,
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_dev: {
        NODE_ENV: 'production',
        RUNTIME_ENV: 'dev',
        PORT: 6016,
        PROTOCOL: 'http',
        HOST: '119.23.50.196',
        DOMAIN: '119.23.50.196',
        RedisHost: '119.23.50.196',
        RedisPort: 6379,
        RedisPwd: 'Redis_VanvyPsb2018'
      }
    }
  ],

  deploy: {
    dev: {
      user: 'root',
      host: '119.23.50.196',
      ref: 'origin/master',
      repo: 'git@github.com:lijianhu1/NextKoaTest.git',
      path: '/root/NextPsb',
      'post-deploy':
        'npm install && npm run build && pm2 reload ecosystem.config.js --only PSB_DEV --env dev'
    }
  }
}
