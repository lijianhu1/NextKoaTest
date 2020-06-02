const Koa = require('koa')
const Router = require('koa-router')
const Next = require('next')
const config = require('./config')
const api = require('./server/api')
const koaBody = require('koa-body')
const session = require('koa-session')
const redisSessionStore = require('./server/session-store')
const Redis = require('ioredis')

//判断是否处于开发模式
const dev = process.env.NODE_ENV !== 'production'
console.log(14, process.env.RedisHost)
console.log(14, process.env.RedisPort)
console.log(14, process.env.RedisPwd)
const app = Next({ dev })

const handler = app.getRequestHandler()
const redisClient = new Redis({
  port: process.env.RedisPort,
  host: process.env.RedisHost,
  password: process.env.RedisPwd
})

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  server.keys = ['PSB WEB SITE SESSION INFO']
  const SESSION_CONFIG = {
    key: 'psb:sid',
    maxAge: 5 * 86400000,
    // rolling: true,
    store: new redisSessionStore(redisClient)
  }
  server.use(session(SESSION_CONFIG, server))

  server.use(koaBody())

  api(server)

  server.use(router.routes())

  server.use(async (ctx, next) => {
    // if (ctx.session.userInfo) {
    //   console.log(new Date(), ctx.session.userInfo.UserId)
    // } else {
    //   console.log(new Date(), '未登录')
    // }
    ctx.req.session = ctx.session
    await handler(ctx.req, ctx.res)
    ctx.response = false
  })

  server.listen(config.Port, () => {
    console.log(`start successful port is ${config.Port}`)
  })
})
