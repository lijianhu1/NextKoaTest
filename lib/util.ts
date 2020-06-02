/**
 * 校验手机号码是否合法
 * @param {*} mobilePhone 手机号码
 */
export const verifyMobilePhone = (mobilePhone: string): string | null => {
  if (!mobilePhone || !/^1\d{10}$/.test(mobilePhone)) {
    return '请填写正确的手机号'
  }
  return null
}
/**
 * 校验是否含有中文
 * @param msg 校验字符串
 */
export const verifyIsChinese = (msg: string): boolean => {
  // return /\p{Unified_Ideograph}/u.test(msg)
  return /[\u4e00-\u9fa5]/.test(msg)
}

module.exports = {
  verifyMobilePhone,
  verifyIsChinese
}
