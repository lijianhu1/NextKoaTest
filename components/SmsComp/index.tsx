import { useState, useCallback, useEffect } from 'react'
import { Input, Button, message } from 'antd'
import { SmsCompProps } from '../../types/SmsTypes'
import CaptchaComp from '../CaptchaComp'
import { sendSms } from '../../pagesUtils/loginBasicUtil'
const { verifyMobilePhone } = require('../../lib/util')

const SmsComp = (props: SmsCompProps) => {
  const {
    flagType,
    mobilePhone,
    smsCompStyle = {
      captchaInputStyle: {
        width: '100%',
        height: 40
      },
      smsBtnStyle: {
        padding: 0,
        marginLeft: 20,
        width: 100,
        maxWidth: 100,
        height: 40,
        color: '#ffffff'
      }
    },
    errorCallBack,
    captchaCodeChanged,
    keyDown
  } = props

  const [showCaptcha, setShowCaptcha] = useState(false)
  const [captchaImage, setCaptchaImage] = useState('')
  const [count, setCount] = useState(0)
  const [startTimer, setStartTimer] = useState(false)
  const [captchaCodeValue, setCaptchaCodeValue] = useState('')
  useEffect(() => {
    let interval = setInterval(() => {
      setCount(count => count - 1)
    }, 1000)
    return () => {
      setStartTimer(false)
      clearInterval(interval)
    }
  }, [startTimer])

  const sendSmsPre = useCallback(() => {
    startSendSms()
  }, [mobilePhone])
  /**
   * 发送短信验证码
   */
  const startSendSms = useCallback(
    async (captchaCode?: String, cb?: Function) => {
      if (count > 0) {
        return
      }
      const mobileVerifyRes = verifyMobilePhone(mobilePhone)
      if (mobileVerifyRes) {
        message.error('请输入正确的手机号码')
        return
      }
      let reqData = { FlagType: flagType, MobilePhone: mobilePhone }
      if (captchaCode && typeof captchaCode === 'string') {
        reqData = { ...reqData, ...{ CaptchaCode: captchaCode } }
      }
      const smsRes = await sendSms(reqData)
      let errMsg = ''
      if (smsRes.ResCode === 1000) {
        if (captchaCode) {
          cb && cb()
          //关闭验证码对话框
          setShowCaptcha(false)
        }
        setCount(60)
        setStartTimer(true)
      } else if (smsRes.ResCode === 1001) {
        errMsg = smsRes.Msg
      } else if (smsRes.ResCode === 1008) {
        cb && cb()
        setCaptchaImage(smsRes.CaptchaImage)
        if (!captchaCode) {
          //第一次进入会调起图形验证码
          setShowCaptcha(true)
        }
      }
      if (errMsg) {
        errorCallBack && errorCallBack(errMsg)
      }
    },
    [count, mobilePhone]
  )

  /**
   * 取消验证码输入
   */
  const cancelCaptchaInput = useCallback(() => {
    setShowCaptcha(false)
  }, [showCaptcha])

  /**
   * 验证码输入完成的回调
   */
  const captchaInputComplete = useCallback(
    async (captchaCode, cb) => {
      await startSendSms(captchaCode, cb)
    },
    [mobilePhone]
  )


  return (
    <div style={{ display: 'flex' }}>
      {showCaptcha ? (
        <CaptchaComp
          captchaImg={captchaImage}
          visible={showCaptcha}
          cancel={cancelCaptchaInput}
          success={captchaInputComplete}
        />
      ) : null}
      {/* <Search
        size={isLarge ? 'large' : 'default'}
        placeholder="请输入验证码"
        enterButton={count > 0 ? `${count}秒后再次获取` : '获取短信验证码'}
        onSearch={sendSmsPre}
        onChange={captchaCodeChanged}
      /> */}
      <div style={{ flex: '1' }}>
        <Input
          type="number"
          value={captchaCodeValue}
          style={smsCompStyle.captchaInputStyle}
          placeholder="请输入验证码"
          onChange={e => {
            let value = e.target.value
            let temp = value.slice(0, 6)
            setCaptchaCodeValue(temp)
            captchaCodeChanged(temp)
          }}
          onKeyDown = {keyDown}
        />
      </div>

      <Button type="primary" style={smsCompStyle.smsBtnStyle} onClick={sendSmsPre}>
        {count > 0 ? `${count}秒后重新获取` : '获取验证码'}
      </Button>
    </div>
  )
}

export default SmsComp
