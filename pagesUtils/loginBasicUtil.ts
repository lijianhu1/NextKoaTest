const sha256 = require('sha256')
const md5 = require('md5')
const { sec } = require('../lib/celper')
const {
  PreReqUrl,
  GetProtectionToken,
  SendSmsCode
} = require('../lib/interface')
const { getPreRequestTime, setPreRequestTime } = require('../lib/storageUtils')

const sendPreDeal = async () => {
  let res = await PreReqUrl()
  if (res.ResCode == 1000) {
    setPreRequestTime(new Date(Date.now()).toLocaleDateString())
  }
}

export const generateSecAfter = async () => {
  let secRes = await GetProtectionToken()
  let callBackData = {}
  if (secRes.ResCode === 1000) {
    callBackData = getSecObj(secRes)
  } else if (secRes.ResCode === 1007) {
    //服务端提示需要调用前置接口 //此处代码不会进入，后续跟进
    await this.preRequestDeal()
  }
  return callBackData
}
const getSecObj = data => {
  let address = JSON.parse(sec()).Secs,
    secondTotal =
      (Date.parse(data.Timestamp.replace(/-/g, '/')) -
        Date.parse('1990/01/01 00:00:00')) /
      1000,
    mod = Math.floor(secondTotal % address.length),
    curSecret = address[mod]
  let dealSec = {
    ProtectionToken: data.ProtectionToken,
    Timestamp: data.Timestamp,
    Secret: curSecret
  }
  let secJson = `${dealSec.ProtectionToken},${dealSec.Timestamp},${dealSec.Secret}`
  let shaRes = sha256(secJson)
  let md5Res = md5(shaRes).toUpperCase()
  let Protection = {
    Version: 1,
    ProtectionToken: data.ProtectionToken,
    Timestamp: data.Timestamp,
    Signature: md5Res
  }
  return Protection
}

export const preRequestDeal = async () => {
  let preTime = getPreRequestTime()
  if (preTime) {
    let currDate = new Date().getTime() / 1000,
      weeHoursTime =
        new Date(new Date(preTime).setHours(0, 0, 0, 0)).getTime() / 1000,
      afterDayTime = weeHoursTime + 86400
    if (currDate > weeHoursTime && currDate < afterDayTime) {
      // console.log('time ok');
    } else {
      await sendPreDeal()
    }
  } else {
    await sendPreDeal()
  }
}

export const sendSms = async ({
  FlagType = 0,
  MobilePhone = '',
  CaptchaCode = ''
}) => {
  // （0-验证码登陆,1-注册,2-找回密码,3-手机或邮箱验证） 4-单位账号注册
  let protectionTokenRes = await generateSecAfter()
  let requestData = {
    FlagType,
    CaptchaCode,
    Account: MobilePhone,
    Protection: protectionTokenRes
  }
  let sendSmsRes = await SendSmsCode(requestData)
  return sendSmsRes
}

export const getGraphCodeImage = async () => {}
