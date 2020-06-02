import { CallbackOption, SuccessAndFailCb } from './OptionTypes'

/**
 * 企业注册model
 */
export type EnterpriseModel = {
  EnterpriseName: string
  Administrator: string
  MobilePhone: string
  CaptchaCode: string
  Password: string
  StaffSize: string
  IndustryCode: string
  IsAgency: boolean
}
/**
 * 自动注册企业model
 */
export type AutoRegisterModel = {
  Name: string
  StaffSize: string
  IndustryCode?: string
  IsAgency: boolean
}
/**
 * 表单数据通知器
 */
export type EnterpriseRegisterFormProps<T> = {
  isAutoRegister?: boolean
  title?: string
  enterpriseName?: string
  compDataChanged: (currentCompData: T) => void
  notify?: (data: any) => void
}
/**
 * 企业注册选项
 */
export type RegisterEnterpriseOptions<T> = {
  /**
   * 是否需要重置登录信息，如果是财税机构代为开通的话不能重置
   */
  isResetLoginInfo: boolean
  data: T
  callback: SuccessAndFailCb
}
/**
 * 传入注册组件的选项数据
 */
export type RegisterProps = {
  isResetLoginInfo: boolean
  infoTitle?: string
  enterpriseName?: string
  isAgency: boolean
  loginRouter: string
  success: CallbackOption
  fail: CallbackOption
}
/**
 * 财税机构代理开通的客户信息
 */
export type ProxyCustomInfo = {
  CustomerEnterpriseName: string
}
/**
 * 财税机构邀请客户的注册
 */
export type InviteCustomInfo = {
  EnterpriseName: string
  CustomerEnterpriseId: string
}

export type AgencyCustomInfo = {
  data: ProxyCustomInfo | InviteCustomInfo
  complete: () => void
}

