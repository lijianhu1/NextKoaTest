const { ZHANLANAUTHINFO, PREREQUESTTIME } = require('../constant')

const defaultRequestInfo = {
  AppId: 100000,
  DeviceId: '',
  Latlng: '',
  LoginId: '',
  Platform: 'PC',
  ApiVersion: 23
}

/**
 * 获取localStorage
 * @param {any} name
 * @returns {any} localStorage
 */
const getStore = name => {
  if (!name) throw new Error('store name 不能为空')
  let res = window.localStorage.getItem(name)
  if (res) {
    try {
      let temp = JSON.parse(res)
      return temp
    } catch {
      return null
    }
  }
  return null
}
/**
 * 存储localStorage
 * @param {any} name
 * @param {any} content
 */
const setStore = (name, content) => {
  if (!name) throw new Error('store name 不能为空')
  if (typeof content !== 'object') throw new Error('store 只能设置对象值')
  let store = getStore(name)
  if (store) {
    content = Object.assign({}, defaultRequestInfo, store, content)
  } else {
    content = Object.assign({}, defaultRequestInfo, content)
  }
  content = JSON.stringify(content)
  window.localStorage.setItem(name, content)
}
/**
 * 获取缓存中的用户信息
 */
const getAuthInfo = () => {
  let oldAuthInfo = getStore(ZHANLANAUTHINFO)
  if (oldAuthInfo) {
    return Object.assign({}, defaultRequestInfo, oldAuthInfo)
  }
  return defaultRequestInfo
}
/**
 * 缓存用户信息
 * @param authInfo 新的用户信息
 */
const setAuthInfo = authInfo => {
  setStore(ZHANLANAUTHINFO, authInfo)
}
/**
 * 获取请求预处理时间
 */
const getPreRequestTime = () => {
  let res = getStore(PREREQUESTTIME)
  if (res) {
    return res.time
  }
  return null
}
/**
 * 设置请求与处理时间
 * @param time 新的时间
 */
const setPreRequestTime = time => {
  setStore(PREREQUESTTIME, { time })
}

const setRefreshTimes = () => {
  window.sessionStorage.setItem('$$psb_ref_times', 1)
}

const getRefreshTimes = () => {
  return window.sessionStorage.getItem('$$psb_ref_times')
}

const clearRefreshTimes = () => {
  window.sessionStorage.removeItem('$$psb_ref_times')
}

module.exports = {
  defaultRequestInfo,
  getAuthInfo,
  setAuthInfo,
  getPreRequestTime,
  setPreRequestTime,
  setRefreshTimes,
  getRefreshTimes,
  clearRefreshTimes
}
