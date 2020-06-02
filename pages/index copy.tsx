import React from 'react'
import Router, { withRouter } from 'next/router'

const isServer = typeof window === 'undefined'
const AUTHINFO = 'AUTHINFO'

const Index = () => (
  <div>
    <button
      onClick={() => {
        window.localStorage.setItem(
          AUTHINFO,
          JSON.stringify({ Token: 'fsdjflsdfi32o32' })
        )
        Router.push(`/scan/login`)
      }}>
      设置localstorage
    </button>
    <button
      onClick={() => {
        // console.log(window.localStorage.getItem(AUTHINFO))
      }}>
      获取localstorage
    </button>
  </div>
)

Index.getInitialProps = async () => {
  // console.log('index getInitialProps invoked')
  if (!isServer) {
    // console.log('index getInitialProps', window.localStorage.getItem(AUTHINFO))
  }
  return {}
}

export default withRouter(Index)
