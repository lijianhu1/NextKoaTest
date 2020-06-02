export interface inputStyle {
  width?: number | string
  height?: number
}
export interface smsBtnStyle {
  marginLeft?: number
  width?: number
  height?: number
  backgroundColor?: string
}
export interface SmsCompStyle {
  captchaInputStyle?: inputStyle
  smsBtnStyle?: smsBtnStyle
}
/**
 * 发送短信传入参数配置
 */
export interface SmsCompProps {
  flagType: number
  /**
   * 电话号码
   */
  mobilePhone: string
  /**
   * 组件样式配置
   */
  smsCompStyle?: SmsCompStyle
  /**
   * 错误回调
   */
  errorCallBack: (errMsg: string | null) => void
  /**
   * 验证码输入改变回调
   */
  captchaCodeChanged: (event: any) => void,

  /* 键盘按下事件 */
  keyDown?:(event:any) => void
}
/**
 * 验证码超过次数后的弹框
 */
export interface CaptchaCompProps {
  captchaImg: string
  visible: boolean
  cancel: () => void
  success: (captchaInput: string, cb: () => void) => void
}
