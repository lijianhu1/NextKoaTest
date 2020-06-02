const api = require('../lib/api')
const fs = require('fs')
const url = require('url')
const path = require('path')
const mime = require('mime')

module.exports = server => {
  server.use(async (ctx, next) => {
    const path = ctx.path
    if (path.startsWith('/psb/')) {
      if (path.indexOf('Logout') > -1) {
        ctx.session = null
        ctx.body = { ResCode: 1000 }
      } else {
        const method = ctx.method
        let requestData = ctx.request.body || {}
        let isLogin = requestData.__IsLogin || false
        delete requestData.__IsLogin
        let headers = {
          'Content-Type': 'application/json;charset=UTF-8',
          Token: (ctx.session.authInfo && ctx.session.authInfo.token) || ''
        }
        let res = await api.requestPsb(method, ctx.url.replace('/psb/', '/'), requestData, headers)
        //这里设置登录成功的信息到session
        if (isLogin && res.ResCode === 1000 && res.Token) {
          ctx.session.userInfo = res.User
          ctx.session.authInfo = { token: res.Token }
        }
        ctx.body = res
      }
    } else {
      await next()
    }
  })

  server.use(async (ctx, next) => {
    try {
      let { pathname } = url.parse(ctx.req.url)
      pathname = decodeURIComponent(pathname)
      let absPath = path.join(__dirname, '../verifyFile', pathname)
      let stateObj = fs.statSync(absPath)
      if (stateObj.isFile()) {
        let contentType = mime.getType(absPath) || 'text/plain'
        let extName = path.extname(absPath)
        contentType = `${contentType};charset=utf-8`
        ctx.set('Content-Type', contentType)
        ctx.body = fs.readFileSync(absPath)
      } else {
        await next()
      }
    } catch {
      await next()
    }
  })
}
