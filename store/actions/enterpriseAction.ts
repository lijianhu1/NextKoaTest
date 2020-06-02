import * as ActionTypes from '../actionTypes'
import * as ApiInterface from '../../lib/interface'
import {
  RegisterEnterpriseOptions,
  AgencyCustomInfo,
  EnterpriseModel,
  AutoRegisterModel
} from '../../types/EnterpriseTypes'
import * as Types from '../../types/LoginTypes'
import { message } from 'antd'
/**
 * 设置行业类型
 */
export const setIndustryType = types => ({
  type: ActionTypes.SET_INDUSTRY_TYPES,
  industryTypes: types
})
/**
 * 设置企业人员规模
 */
export const setStaffSize = staffSize => ({
  type: ActionTypes.SET_STAFF_SIZE,
  staffSize
})

export default {
  passwordLoginEnterprise: (options: Types.ILoginActionProps) => {
    return async dispatch => {
      let res = await ApiInterface.AccountPwdLogin(options.data)
      if (res.ResCode === 1000) {
        dispatch({ type: ActionTypes.SET_USERINFO, userInfo: res.User })
        dispatch({
          type: ActionTypes.SET_AUTHINFO,
          authInfo: { token: res.Token }
        })
        options.success && options.success(res)
      } else {
        options.fail && options.fail(res.Msg)
      }
    }
  },
  captchaCodeLoginEnterprise: (options: Types.ILoginActionProps) => {
    return async dispatch => {
      let res = await ApiInterface.CaptchaCodeLogin(options.data)
      if (res.ResCode === 1000) {
        dispatch({ type: ActionTypes.SET_USERINFO, userInfo: res.User })
        dispatch({
          type: ActionTypes.SET_AUTHINFO,
          authInfo: { token: res.Token }
        })
        options.success && options.success(res)
      } else {
        options.fail && options.fail(res.Msg)
      }
    }
  },
  //注册企业
  registerEnterprise: (options: RegisterEnterpriseOptions<EnterpriseModel>) => {
    return async dispatch => {
      let res = await ApiInterface.RegisterEnterprise(options.data)
      if (res.ResCode === 1000) {
        // if (options.isResetLoginInfo) {
        //有可能是注册以后单独登录
        dispatch({ type: ActionTypes.SET_USERINFO, userInfo: res.User })
        dispatch({
          type: ActionTypes.SET_AUTHINFO,
          authInfo: { token: res.Token }
        })
        // }
        if (options.callback.success) {
          options.callback.success(res)
        }
      } else {
        if (options.callback) {
          options.callback.fail(res.Msg)
        } else {
          message.error(res.Msg)
        }
      }
    }
  },
  //有可能是在个人版注册的，进入企业中心需要自动注册
  createEnterprise: (options: RegisterEnterpriseOptions<AutoRegisterModel>) => {
    return async dispatch => {
      let res = await ApiInterface.CreateEnterprise(options.data)
      if (res.ResCode === 1000) {
        // if (options.isResetLoginInfo) {
        //有可能是注册以后单独登录
        dispatch({ type: ActionTypes.SET_USERINFO, userInfo: res.User })
        dispatch({
          type: ActionTypes.SET_AUTHINFO,
          authInfo: { token: res.Token }
        })
        // }
        if (options.callback.success) {
          options.callback.success(res)
        }
      } else {
        if (options.callback) {
          options.callback.fail(res.Msg)
        } else {
          message.error(res.Msg)
        }
      }
    }
  },
  //绑定客户关系
  createEnterpriseCustomer: (options: AgencyCustomInfo) => {
    return async () => {
      let res = await ApiInterface.CreateEnterpriseCustomer(options.data)
      console.log(res)
      if (res.ResCode === 1000) {
        options.complete && options.complete()
      } else {
        message.error(res.Msg)
      }
    }
  }
}
