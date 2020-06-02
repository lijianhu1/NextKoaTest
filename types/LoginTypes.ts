export interface IPasswordLoginModel {
  MobilePhone: string
  Password: string
}
export interface ICaptchaLoginModel {
  MobilePhone: string
  CaptchaCode: string
}
export interface ILoginModel extends IPasswordLoginModel, ICaptchaLoginModel {}

export interface ILoginBasicsProps {
  showMask: boolean
  opacity?: number
  backgroundColor?: string
  registerAddr?: string
  isPc?: boolean
  customHeader?: () => void
  customLoginAction?: (loginInfo: ILoginModel) => void
  closeDialog?: () => void
  loginSuccess?: (res?: any) => void
}

export interface IPersonalRegisterModel extends IPasswordLoginModel {
  ValidCode: string
}

export interface IResetPasswordModel extends IPasswordLoginModel {
  ValidCode: string
}

export interface IResetPwdModel {
  FlagType: number //区分来源（0-验证码登陆,1-注册,2-找回密码,3-手机或邮箱验证）
  Account: string
  CaptchaCode?: string
}

export interface ILoginActionProps<T = IPasswordLoginModel | ICaptchaLoginModel> {
  data: T
  success: (data: any) => void
  fail: (errMsg: string) => void
}
