// const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')

// const isDev = process.env.NODE_ENV === 'development'
module.exports = withLess({
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    // console.log('webpack--->', buildId, dev, isServer, defaultLoaders)
    // config.output.publicPath = `http://dev.ksc009.cn/ssr/`
    // config.output.publicPath = '/ssr/'
    // config.output.assetPrefix = '/ssr/'
    // console.log('webpack modify after--->', config.module.rules[0].use.options)
    return config
  },
  // cssModules: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]'
  },
  // generateEtags: false,
  // assetPrefix: isDev ? '' : '/site/',
  assetPrefix: '/',
  publicRuntimeConfig: {
    // preFixPath: isDev ? '/' : '/site/',
    // staticFolder: isDev ? '/static' : '/site/static'
    preFixPath: '/',
    staticFolder: '/static'
  },
  distDir: 'build'
})
