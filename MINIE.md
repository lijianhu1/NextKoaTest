
### 项目说明
- 本项目早期是通过webpack构建的多页面应用，由于里面涉及到的登录跳转比较复杂，bug较多，体验不好。后期改造成了服务端渲染的方式，用到的框架主要是基于react的next.js. 本项目是服务端渲染里面涉及到了koa部分内容。redis主要是为了存储登录信息


### 部署相关
- 介绍
> [pm2官方文档](https://pm2.keymetrics.io/docs/usage/quick-start/#ecosystem-file)
- 全局安装pm2
```
 npm install pm2 -g
```
- 发布前请先仔细查看ecosystem.config.js文件,此文件为pm2配置文件
#### 文档结构说明
- apps 里面配置了三个环境，分别是PSB_DEV、PSB_TEST、PSB 在xshell里面通过pm2 list可以看到
  ![pm2_list管理界面展示](http://dev.mypsb.cn/api/web/static/img/deployDes/pm2_list.png)
- 下面是对env_dev的说明，其它的env_test,env_prod雷同，别的参数目前没什么用，如果修改可以参考pm2官方文档
```
  env_dev: {                          这里面主要是配置了一些项目中用到的环境变量
    NODE_ENV: 'production',           -----> 表示是生产环境
    RUNTIME_ENV: 'dev',               -----> 表示运行环境
    PORT: 6016,                       -----> 表示部署到服务器后的端口号
    PROTOCOL: 'http',                 -----> 协议
    HOST: 'http://dev.mypsb.cn',      -----> 主机地址
    DOMAIN: 'dev.mypsb.cn',           -----> 域名
    RedisHost: 'dev.mypsb.cn',        -----> redis主机
    RedisPort: 6379,                  -----> redis端口
    RedisPwd: 'Redis_VanvyPsb2018'    -----> redis密码
  }
```
- deploy对象里面是pm2发布需要的命令
  - 下面配置的作用就是在你发布的时候会从git仓库拉取代码到远程服务器然后自动编译部署
  ```
   dev: {                                               //表示要发部的环境                             
      user: 'root',                                     //远程服务器用户名 
      host: 'dev.mypsb.cn',                             //远程服务器主机
      ref: 'origin/master',                             //拉取代码的分支
      repo: 'git@git.vanvy.cn:chenfuye/NextPsb.git',    //代码仓库地址
      path: '/data/eip/dev/NextPsb',                    //部署的远程服务器目录名
      'post-deploy':                                    //编译后执行的命令
        'npm install && npm run build && pm2 reload ecosystem.config.js --only PSB_DEV --env dev'
    },
  ```
  - 关于发布生产环境说明
    - 目前公司生产环境是三台服务器集群部署的，部署代码的目录是链接过去的，因此拉取代码和编译代码只需要在一台服务器完成就好了，在另外两台服务器只需要重启就可以了
  ```
  prod_mode1 这种模式是当项目有第三方模块安装，也就是package.json文件发生变化的时候运行
  prod_mode2 这种模式是没有第三方模块安装只是单纯的代码拉取编译部署
  prod_mode3 这个模式是表示运行了上面两种模式其中一个后需要再次运行的模式，因为上面两种模式只是部署了其中一台机器，另外两台机器虽然都是最新代码了，但是服务器没有重启，这个命令其实就是重启另外两台服务器。

  因此正式发布的时候其实只有两种发布命令：
  第一种：安装过插件
    pm2 deploy ecosystem.config.js prod_mode1
    pm2 deploy ecosystem.config.js prod_mode3
  第二种：没有安装过插件
    pm2 deploy ecosystem.config.js prod_mode2
    pm2 deploy ecosystem.config.js prod_mode3
  ```
#### 部署步骤
- 下面的操作建议都在gitbash里面去操作

- 用git 提交代码到git仓库

- 将本地的公钥放到linux服务器认证的keys里面，目的是免密登录
```
cat C:\Users\Administrator\.ssh\id_rsa.pub
获取到本地公钥后，登录远程服务器打开cat ~/.ssh/authorized_keys
将上面的本地公钥拷贝到上面的目录下
```
- 第一次发布需要用下面的命令生成一个目录到远程,因为是已经有这个目录了所以下次不需要执行这个命令 
```
pm2 deploy ecosystem.config.js dev setup
```
- 发布
```
pm2 deploy ecosystem.config.js dev
```

