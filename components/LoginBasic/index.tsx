import { useState, useEffect, useCallback } from 'react'
import { Button } from 'antd'
import { ILoginModel } from '../../types/LoginTypes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import enterpriseAction from '../../store/actions/enterpriseAction'
import { preRequestDeal } from '../../pagesUtils/loginBasicUtil'
import { ILoginBasicsProps } from '../../types/LoginTypes'
import ScanLogin from './ScanLogin'
import MaskComp from '../MaskComp'
import PasswordLogin from './PasswordLogin'
import CaptchaLogin from './CaptchaLogin'
import LoginFooter from './LoginFooter'
import * as Types from '../../types'
const { verifyMobilePhone } = require('../../lib/util')

let loginModel: ILoginModel = {
  MobilePhone: '',
  Password: '',
  CaptchaCode: ''
}

interface ILoginProps {
  passwordLoginEnterprise?: (option: Types.LoginTypes.ILoginActionProps) => Promise<void>
  captchaCodeLoginEnterprise?: (option: Types.LoginTypes.ILoginActionProps) => Promise<void>
  loginOption: ILoginBasicsProps
}

const LoginBasic = ({
  loginOption,
  passwordLoginEnterprise,
  captchaCodeLoginEnterprise
}: ILoginProps) => {
  const [tabKey, setTabKey] = useState(1)
  const [loginInfo, setLoginInfo] = useState(loginModel)
  const [errorMsg, setErrorMsg] = useState('')
  const [count, setCount] = useState(0)
  const [isScanLogin, setIsScanLogin] = useState(false)
  const [loginStyle, setLoginStyle] = useState({})
  useEffect(() => {
    setLoginInfo(Object.assign({}, { MobilePhone: '', Password: '', CaptchaCode: '' }))
    preRequestDeal()
  }, [])

  useEffect(() => {
    if (tabKey == 1) {
      setLoginInfo(Object.assign({}, loginInfo, { Password: '', CaptchaCode: '' }))
    } else {
      setLoginInfo(Object.assign({}, loginInfo, { Password: '', CaptchaCode: '' }))
    }
  }, [tabKey])
  /**
   * 切换tab页面
   */
  const loginTypeChanged = useCallback(
    key => {
      setTabKey(key)
      setErrorMsg('')
    },
    [loginInfo]
  )

  /**
   * 手机号码修改时候触发
   */
  const mobilePhoneChanged = useCallback(
    value => {
      setErrorMsg('')
      setLoginInfo(Object.assign({}, loginInfo, { MobilePhone: value }))
    },
    [loginInfo]
  )
  /**
   * 修改密码时候触发
   */
  const pwdChanged = useCallback(
    e => {
      setErrorMsg('')
      setLoginInfo(Object.assign({}, loginInfo, { Password: e.target.value }))
    },
    [loginInfo]
  )
  /**
   * 密码登录
   */
  const passwordLogin = useCallback(() => {
    passwordLoginEnterprise({
      data: loginInfo,
      success: res => {
        loginOption.loginSuccess(res)
      },
      fail: errMsg => {
        setErrorMsg(errMsg)
      }
    })
  }, [loginInfo, loginOption])
  /**
   * 验证码登录
   */
  const captchaCodeLogin = useCallback(() => {
    captchaCodeLoginEnterprise({
      data: loginInfo,
      success: res => {
        loginOption&&loginOption.loginSuccess&&loginOption.loginSuccess(res)
      },
      fail: errMsg => {
        setErrorMsg(errMsg)
      }
    })
  }, [loginInfo, loginOption])
  /**
   * 登录
   */
  const login = useCallback(async () => {
    const mobilePhoneCheckRes = verifyMobilePhone(loginInfo.MobilePhone)
    if (mobilePhoneCheckRes) {
      setErrorMsg(mobilePhoneCheckRes)
      return
    }
    if (loginOption.customLoginAction) {
      //如果是自定义的登录动作，目前只有账号密码登录
      if(tabKey == 1){
        if (!loginInfo.Password) {
          setErrorMsg('请输入密码')
          return
        }
        passwordLogin()
      }else{
        if (!loginInfo.CaptchaCode) {
          setErrorMsg('请输入验证码')
          return
        }
        captchaCodeLogin()
      }
      
      // loginOption.customLoginAction(loginInfo)
    } else {
      if (tabKey == 1) {
        if (!loginInfo.Password) {
          setErrorMsg('请输入密码')
          return
        }
        passwordLogin()
      } else {
        if (!loginInfo.CaptchaCode) {
          setErrorMsg('请输入验证码')
          return
        }
        captchaCodeLogin()
      }
    }
  }, [loginInfo, tabKey])
  /**
   * 验证码改变时候触发
   */
  const captchaCodeChanged = useCallback(
    value => {
      setErrorMsg('')
      setLoginInfo(Object.assign({}, loginInfo, { CaptchaCode: value }))
    },
    [loginInfo]
  )

  /*
   键盘事件,按ENTER提交
  */
 const handleKeyDown = useCallback((e)=>{
   if(e.keyCode === 13){
    login()
   }
 },[loginInfo])

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => count - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [count])

  const changeLoginType = useCallback(() => {
    setIsScanLogin(!isScanLogin)
  }, [isScanLogin])

  useEffect(() => {
    let style = {
      opacity: loginOption.opacity || 0.7
    }
    //居中style
    let centerStyle = {
      zIndex: 500,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      opacity: 1
    }
    if (loginOption.showMask) {
      style = Object.assign({}, style, centerStyle)
    }
    setLoginStyle(style)
  }, [loginOption])

  return (
    <>
      {loginOption.showMask ? <MaskComp /> : null}
      <div
        className="login-basic"
        style={{
          width: 316,
          height: 284,
          padding: '0 34px',
          backgroundColor: '#000000',
          borderRadius: 7,
          position: 'relative',
          ...loginStyle
        }}>
        {loginOption.showMask ? (
          <img
            style={{
              position: 'absolute',
              left: 5,
              top: 5,
              cursor: 'pointer',
              width: 20,
              height: 20
            }}
            src="static/images/btn_close_normal.png"
            onClick={loginOption.closeDialog}
          />
        ) : null}
        {/* 登录类型切换 */}
        <QrCodeComp isScanLogin={isScanLogin} changeLoginType={changeLoginType} />
        {loginOption.customHeader ? (
          loginOption.customHeader()
        ) : (
          <NormalLoginHeader tabKey={tabKey} loginTypeChanged={loginTypeChanged} />
        )}
        {isScanLogin ? (
          //扫码登录
          <ScanLogin />
        ) : (
          //普通登录（账号密码，短信验证码）
          <>
            <div>
              {tabKey == 1 ? (
                <PasswordLogin
                  loginInfo={loginInfo}
                  mobilePhoneChanged={mobilePhoneChanged}
                  passwordChanged={pwdChanged}
                  keyDown = {handleKeyDown}
                />
              ) : (
                <CaptchaLogin
                  MobilePhone={loginInfo.MobilePhone}
                  mobilePhoneChanged={mobilePhoneChanged}
                  captchaCodeChanged={captchaCodeChanged}
                  captchaErrorCallBack={setErrorMsg}
                  tokeyDown = {handleKeyDown}
                />
              )}
            </div>
            <div style={{ position: 'relative' }}>
              {errorMsg ? (
                <div
                  style={{
                    position: 'absolute',
                    top: 8,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                  <img
                    style={{ width: 16, height: 16, marginRight: 8 }}
                    src="/static/images/tip.png"
                  />
                  <span style={{ color: '#FF8801', fontSize: 14 }}>{errorMsg}</span>
                </div>
              ) : null}
              <Button
                style={{
                  marginTop: 32,
                  width: '100%',
                  height: 40,
                  fontSize: 16,
                  fontWeight: 400
                }}
                type="primary"
                onClick={login}>
                登录
              </Button>
            </div>
            <LoginFooter isPc={loginOption.isPc} registerAddr={loginOption.registerAddr} />
          </>
        )}

        <style jsx>
          {`
            @media (max-width: 576px) {
              .login-basic {
                margin: 0 auto;
              }
              .change-login-type {
                display: none;
              }
            }
          `}
        </style>
      </div>
    </>
  )
}

const QrCodeComp = ({ isScanLogin, changeLoginType }) => {
  return (
    <div
      className="change-login-type"
      onClick={changeLoginType}
      style={{
        display: 'none',
        position: 'absolute',
        top: 0,
        right: 0,
        width: 60,
        height: 60,
        cursor: 'pointer',
        backgroundImage: 'url(/static/images/login-merge.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: isScanLogin ? '-60px -60px' : null,
        transition: 'background-position 0.2s cubic-bezier(0.18, 0.82, 0.2, 0.93) 0s'
      }}
    />
  )
}

const NormalLoginHeader = ({ tabKey, loginTypeChanged }) => {
  const tabChanged = useCallback(
    e => {
      loginTypeChanged(e.currentTarget.dataset.key)
    },
    [loginTypeChanged]
  )
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 31,
        paddingBottom: 25
      }}>
      <span
        data-key="1"
        onClick={tabChanged}
        style={{
          cursor: 'pointer',
          fontSize: 15,
          color: '#ffffff',
          opacity: tabKey == 1 ? 1 : 0.8,
          fontWeight: tabKey == 1 ? 'bold' : 400
        }}>
        密码账号登录
      </span>
      <span
        data-key="2"
        onClick={tabChanged}
        style={{
          cursor: 'pointer',
          fontSize: 15,
          color: '#ffffff',
          opacity: tabKey == 2 ? 1 : 0.8,
          fontWeight: tabKey == 2 ? 'bold' : 400
        }}>
        短信快捷登录
      </span>
    </div>
  )
}

export default connect(
  state => state,
  dispatch => bindActionCreators(enterpriseAction, dispatch)
)(LoginBasic)
