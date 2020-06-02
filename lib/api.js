const axios = require('axios')
const uuidV5 = require('uuid/v5')
const config = require('../config')
const { defaultRequestInfo } = require('./storageUtils')
const isServer = typeof window === 'undefined'

async function requestPsb(method, url, data, headers) {
  let uuid = uuidV5(`my_pyb_pc`, uuidV5.DNS)
  uuid = uuid.replace(/-/g, '')
  data = Object.assign({}, defaultRequestInfo, { DeviceId: uuid }, data)
  try {
    let psbResponse = await axios({
      method,
      baseURL: config.ApiPath,
      url,
      data,
      headers
    })
    if (psbResponse.status === 200) {
      return psbResponse.data
    } else {
      return {
        ResCode: -200,
        Msg: psbResponse.statusText
      }
    }
  } catch (error) {
    return {
      ResCode: -1,
      Msg: error.message
    }
  }
}
async function Get(url) {
  return await axios({
    method: 'GET',
    url: `/psb${url}`
  })
}
async function Post({ url, data = {}, headers = {}, option = {} }) {
  if (!url) {
    throw Error('url must provide')
  }
  let method = 'POST'
  if (isServer) {
    return requestPsb(method, url, data, headers)
  } else {
    let { message } = require('antd')
    const { _PSB_NEXT_REDUX_STORE } = require('../config/constantData')
    const { MODIFY_LOADING_STATUS } = require('../store/actionTypes')
    try {
      !option.noShowLoading &&
        window[_PSB_NEXT_REDUX_STORE].dispatch({
          type: MODIFY_LOADING_STATUS,
          tip: '...'
        })
      if (option && option.__IsLogin) {
        data = Object.assign({}, data, {
          __IsLogin: (option && option.__IsLogin) || false
        })
      }
      let clientRes = await axios({
        method,
        url: `/psb${url}`,
        data,
        withCredentials: true
      })
      window[_PSB_NEXT_REDUX_STORE].dispatch({ type: MODIFY_LOADING_STATUS })
      if (clientRes.status === 200) {
        if (clientRes.data.ResCode !== 1000 && clientRes.data.Msg) {
          if (option.customErrorMsg) {
            option.customErrorMsg(clientRes.data.Msg)
          } else {
            message.error(clientRes.data.Msg)
          }
        }
        return clientRes.data
      } else {
        message.error(clientRes.statusText)
        return {
          ResCode: -200,
          Msg: clientRes.statusText
        }
      }
    } catch (error) {
      message.error(error.message)
      return {
        ResCode: -1,
        Msg: error.message
      }
    } finally {
      window[_PSB_NEXT_REDUX_STORE].dispatch({ type: MODIFY_LOADING_STATUS })
    }
  }
}

module.exports = {
  Get,
  Post,
  requestPsb
}
