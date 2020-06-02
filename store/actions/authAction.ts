import * as ActionTypes from '../actionTypes'
/**
 * 设置账户信息
 * @param authInfo 登录信息
 */
export const setAuthInfo = authInfo => ({
  type: ActionTypes.SET_AUTHINFO,
  authInfo: authInfo
})
/**
 * 设置前置时间
 * @param preTime 前置时间
 */
export const setPreRequestTime = preTime => ({
  type: ActionTypes.SET_PREREQUESTTIME,
  preTime
})