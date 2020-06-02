import App, { Container } from 'next/app'
import '@babel/polyfill'
import 'antd/dist/antd.less'
import Head from 'next/head'
import PsbLayout from '../components/Layout'
import { Provider } from 'react-redux'
import WithRedux from '../components/WithRedux'
const {
  getRefreshTimes,
  setRefreshTimes,
  clearRefreshTimes
} = require('../lib/storageUtils')
// import { setAuthInfo } from '../store/actions/authAction'
const isServer = typeof window === 'undefined'

class MyApp extends App {
  constructor(props) {
    super(props)
    if (!isServer) {
      let res = getRefreshTimes()
      if (!res) {
        setRefreshTimes()
        location.reload()
      } else {
        clearRefreshTimes()
      }
    }
  }

  // initAuthInfoToStore() {
  //   const props: any = this.props
  //   const authInfo = props.reduxStore.getState()
  //   if (!authInfo.Token) {
  //     let pcAuthInfo = getAuthInfo()
  //     if (pcAuthInfo) {
  //       props.reduxStore.dispatch(setAuthInfo(pcAuthInfo))
  //     }
  //   }
  // }
  static async getInitialProps(ctx) {
    const { Component } = ctx
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  render() {
    const props: any = this.props
    const { Component, pageProps, reduxStore, router } = props
    //扫描仪登录不需要布局整体样式
    const isScanLogin = /^\/scan\/login$/.test(router.route)
    return (
      <Container>
        <Provider store={reduxStore}>
          <Head>
            <title>
              票税宝——电子发票管理工具与家庭财税机器人，为你提供电子发票打印、电子发票管理、个税管理（个税筹划），方便企业电子报销与家庭税赋管理
            </title>
          </Head>
          {isScanLogin ? (
            <Component {...pageProps} />
          ) : (
            <PsbLayout>
              <Component {...pageProps} />
              {router.route}
            </PsbLayout>
          )}
        </Provider>
      </Container>
    )
  }
}

export default WithRedux(MyApp)
