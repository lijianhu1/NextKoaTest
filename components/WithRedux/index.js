import React, { Component } from 'react'
import CreateStore from '../../store'
import { _PSB_NEXT_REDUX_STORE } from '../../config/constantData'
const isServer = typeof window === 'undefined'

function getOrCreateStore(initialState) {
  if (isServer) {
    return CreateStore(initialState)
  }
  if (!window[_PSB_NEXT_REDUX_STORE]) {
    // console.log('client store create')
    window[_PSB_NEXT_REDUX_STORE] = CreateStore(initialState)
  }
  return window[_PSB_NEXT_REDUX_STORE]
}

export default Comp => {
  class WithReduxStore extends React.Component {
    constructor(props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxStore)
    }

    render() {
      const { Component, pageProps, ...rest } = this.props
      return (
        <Comp Component={Component} pageProps={pageProps} reduxStore={this.reduxStore} {...rest} />
      )
    }
  }

  WithReduxStore.getInitialProps = async ctx => {
    // console.log('---withReduxStore---')
    let reduxStore
    if (isServer) {
      const { req } = ctx.ctx
      const session = req.session

      if (session && session.authInfo && session.userInfo) {
        reduxStore = getOrCreateStore({
          userInfo: session.userInfo,
          authInfo: session.authInfo
        })
      } else {
        reduxStore = getOrCreateStore()
      }
    } else {
      //客户端
      reduxStore = getOrCreateStore()
    }

    ctx.reduxStore = reduxStore
    let appProps = {}
    if (typeof Comp.getInitialProps === 'function') {
      appProps = await Comp.getInitialProps(ctx)
    }
    return {
      ...appProps,
      initialReduxStore: reduxStore.getState()
    }
  }
  return WithReduxStore
}
