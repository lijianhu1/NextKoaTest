import * as ApiInterface from '../../lib/interface'
import * as Types from '../../types/LoginTypes'
import * as ActionTypes from '../actionTypes'

export const setUserInfo = userInfo => ({
  type: ActionTypes.SET_USERINFO,
  userInfo
})

const UserActions = {
  registerPersonalAccount: (options: {
    data: Types.IPersonalRegisterModel
    cb: (data: any) => void
  }) => {
    return async dispatch => {
      let res = await ApiInterface.RegisterPersonalAccount(options.data)
      if (res.ResCode === 1000) {
        dispatch({ type: ActionTypes.SET_USERINFO, userInfo: res.User })
        dispatch({
          type: ActionTypes.SET_AUTHINFO,
          authInfo: { token: res.Token }
        })
        options.cb && options.cb(res)
      }
    }
  },
  loginPersonalAccount: (options: Types.ILoginActionProps) => {
    return async dispatch => {
      let { MobilePhone, Password } = options.data as Types.IPersonalRegisterModel
      let postData = {
        UserName: MobilePhone,
        Password
      }
      let res = await ApiInterface.LoginPersonalAccount(postData)
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
  logout: () => {
    return async dispatch => {
      let res = await ApiInterface.Logout()
      if (res.ResCode === 1000) {
        dispatch({ type: ActionTypes.SET_USERINFO, userInfo: null })
        dispatch({
          type: ActionTypes.SET_AUTHINFO,
          authInfo: null
        })
      }
    }
  },
  resetPassword: (options: Types.ILoginActionProps<Types.IResetPwdModel>) => {
    return async () => {
      let res = await ApiInterface.ResetPassword(options.data)
      if (res.ResCode === 1000) {
        options.success && options.success(res)
      } else {
        options.fail && options.fail(res.Msg)
      }
    }
  }
}

export default UserActions
