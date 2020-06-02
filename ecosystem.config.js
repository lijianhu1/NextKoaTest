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
        HOST: 'http://dev.mypsb.cn',
        DOMAIN: 'dev.mypsb.cn',
        RedisHost: 'dev.mypsb.cn',
        RedisPort: 6379,
        RedisPwd: 'Redis_VanvyPsb2018'
      }
    },
    {
      name: 'PSB_TEST',
      script: './server.js',
      time: true,
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_test: {
        NODE_ENV: 'production',
        RUNTIME_ENV: 'test',
        PORT: 6017,
        PROTOCOL: 'http',
        HOST: 'http://test.mypsb.cn',
        DOMAIN: 'test.mypsb.cn',
        RedisHost: 'test.mypsb.cn',
        RedisPort: 6380,
        RedisPwd: 'Redis_VanvyPsb2018'
      }
    },
    {
      name: 'PSB',
      script: './server.js',
      time: true,
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_prod: {
        NODE_ENV: 'production',
        RUNTIME_ENV: 'prod',
        PORT: 6060,
        PROTOCOL: 'https',
        HOST: 'https://mypsb.cn',
        DOMAIN: 'mypsb.cn',
        RedisHost: 'redis-ddbb608-redis.dcs.huaweicloud.com',
        RedisPort: 6379,
        RedisPwd: 'redis_eip_product_pass_important'
      }
    }
  ],

  deploy: {
    dev: {
      user: 'root',
      host: 'dev.mypsb.cn',
      ref: 'origin/master',
      repo: 'git@git.vanvy.cn:chenfuye/NextPsb.git',
      path: '/root/NextPsb',
      'post-deploy':
        'npm install && npm run build && pm2 reload ecosystem.config.js --only PSB_DEV --env dev'
    },
    test: {
      user: 'root',
      host: 'test.mypsb.cn',
      ref: 'origin/master',
      repo: 'git@git.vanvy.cn:chenfuye/NextPsb.git',
      path: '/data/eip/test/NextPsb',
      'post-deploy':
        'npm install && npm run build && pm2 reload ecosystem.config.js --only PSB_TEST --env test'
    }
  }
}
