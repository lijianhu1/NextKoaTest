const { Post, Get } = require('./api')
/**
 * 格式化formData数据
 * @param {*} model 待格式化的对象
 */
const generateFormData = model => {
  if (!model || Object.keys(model).length <= 0) {
    throw new Error('格式化FormData数据，必须传入对象')
  }
  let formData = new FormData()
  Object.keys(formData).forEach(key => {
    formData.append(key, model[key])
  })
  return formData
}
/**
 * 请求的前置接口
 */
const PreReqUrl = async data => {
  return Post({
    url: '/Ticket/Invoice',
    data,
    option: {
      noShowLoading: true
    }
  })
}
/**
 * 前置接口token
 */
const GetProtectionToken = async data => {
  return await Post({
    url: '/ApiProtection/GetProtectionToken',
    data,
    option: {
      noShowLoading: true
    }
  })
}
/**
 * 发送短信验证码
 */
const SendSmsCode = async data => {
  return await Post({
    url: '/Sms/SendSms',
    data
  })
}
/**
 * 创建图形验证码
 */
const CreateCaptchaImage = async data => {
  return await Post({
    url: '/Captcha/CreateImageCaptcha',
    data
  })
}
/*=================================注册相关==================================*/
/**
 * 注册个人账号
 * @param {*} data 请求数据
 */
const RegisterPersonalAccount = async data => {
  return await Post({
    url: '/Ticket/Register',
    data,
    option: {
      __IsLogin: true
    }
  })
}
/**
 * 单位注册
 * @param {*} data 参数
 * @returns {promise} promise对象
 */
const RegisterEnterprise = async data => {
  return await Post({
    url: '/EnterpriseAccount/RegisterEnterprise',
    data,
    option: {
      __IsLogin: true
    }
  })
}

/**
 * 创建企业
 * @return {promise} promise
 */
const CreateEnterprise = async data => {
  return await Post({
    url: `/Enterprise/CreateEnterpriseFromJson`,
    data,
    option: {
      __IsLogin: true
    }
  })
}
/*===============================登录相关================================== */
/**
 * 账号密码登陆
 */
const AccountPwdLogin = async data => {
  return await Post({
    url: '/EnterpriseAccount/PasswordLogin',
    data,
    option: {
      __IsLogin: true
    }
  })
}
/**
 * 验证码登录
 */
const CaptchaCodeLogin = async data => {
  return await Post({
    url: '/EnterpriseAccount/CaptchaCodeLogin',
    data,
    option: {
      __IsLogin: true
    }
  })
}
/**
 * 个人登录
 * @param {*} data
 */
const LoginPersonalAccount = async data => {
  return await Post({
    url: '/Ticket/Login',
    data,
    option: {
      __IsLogin: true
    }
  })
}
/*=================================登出相关====================================*/
/**
 * 退出登录
 */
const Logout = async () => {
  return await Post({
    url: '/Logout'
  })
}
/*=================================其他接口=====================================*/
/**
 * 重置密码
 * @param {*} data 请求信息
 */
const ResetPassword = async data => {
  return await Post({
    url: '/Ticket/ResetPassword',
    data
  })
}
/**
 * 获取注册企业账号的配置信息
 */
const GetClientConfig = async () => {
  return await Post({
    url: '/Config/GetClientConfig',
    data: {
      Types: ['enterpriseStaffSize', 'enterpriseIndustryCode']
    },
    option: {
      noShowLoading: true
    }
  })
}
/**
 * 获取下载企业票夹的版本号
 */
const GetDownloadConfig = async () => {
  return await Get('/web/enterpriseFolder_msi/package.json')
}

/**
 * 搜索抬头列表
 * @param {*} keyword
 */
const SearchInvoiceTitles = async data => {
  return await Post({
    url: '/InvoiceTitle/SearchInvoiceTitles',
    data: data,
    option: {
      noShowLoading: true,
      customErrorMsg: () => {}
    }
  })
}

/**
 * 添加企业客户关系
 * @return {promise} promise
 */
const CreateEnterpriseCustomer = async data => {
  return await Post({
    url: `/Enterprise/CreateEnterpriseCustomer`,
    data
  })
}
/**
 * 获取当前用户下的企业列表
 * @param {*} data 数据
 */
const GetUserEnterpriseList = async data => {
  return await Post({
    url: '/Enterprise/GetAdminEnterprises',
    data
  })
}

module.exports = {
  PreReqUrl,
  GetProtectionToken,
  SendSmsCode,
  CreateCaptchaImage,
  Logout,
  AccountPwdLogin,
  CaptchaCodeLogin,
  GetClientConfig,
  GetDownloadConfig,
  SearchInvoiceTitles,
  RegisterEnterprise,
  CreateEnterprise,
  CreateEnterpriseCustomer,
  GetUserEnterpriseList,
  RegisterPersonalAccount,
  LoginPersonalAccount,
  ResetPassword
}
