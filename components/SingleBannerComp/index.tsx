import { useCallback } from 'react'
import LoginBasic from '../../components/LoginBasic'
import { ILoginBasicsProps } from '../../types/LoginTypes'
import { connect } from 'react-redux'

import OnLine from '../LoginBasic/OnLine'

type LoginCompOption = {
  /**
   * 是否显示登录组件
   */
  showLoginComp: boolean
  /**
   * 登录组件自定义样式
   */
  loginCompStyle?: any
  /**
   * 注册地址
   */
  registerAddr: string
  /**
   * 登录成功回调
   */
  successCallback: (data?: any) => boolean
}
interface Props {
  image: string
  /**
   * 分辨率大于576对应的高度
   */
  smHeight: number
  /**
   * 分辨率小于576对应的高度
   */
  xsHeight: number

  /**
   * 登录选项
   */
  loginCompOption?: LoginCompOption
  /**
   * banner底图上面的自定义渲染
   */
  customComp?: any
  userInfo?: any
  onLineTitle?: string
  isPc?: boolean
  onLineCallback?: () => {}
}
const SingleBannerComp = ({
  image,
  smHeight,
  xsHeight,
  loginCompOption,
  customComp: CustomComp,
  userInfo,
  onLineTitle,
  isPc = false,
  onLineCallback
}: Props) => {
  const {
    showLoginComp = false,
    loginCompStyle = {},
    registerAddr = '',
    successCallback = () => false
  } = loginCompOption || {}
  const loginSuccessCb = useCallback(res => {
    successCallback(res)
  }, [])

  const loginOption: ILoginBasicsProps = {
    showMask: false,
    opacity: 1,
    registerAddr,
    loginSuccess: loginSuccessCb,
    isPc
  }

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(/static/images/${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
      {CustomComp ? CustomComp : null}
      {showLoginComp && (
        <div className="login-style" style={loginCompStyle}>
          {userInfo.UserId ? (
            <OnLine onLineTitle={onLineTitle} onLineCallback={onLineCallback} />
          ) : (
            <LoginBasic loginOption={loginOption} />
          )}
        </div>
      )}
      <style jsx>
        {`
          .login-style {
            z-index: 10;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          @media (min-width: 576px) {
            .login-style {
              left: 80%;
            }
            .banner {
              position: relative;
              height: ${smHeight}px;
            }
          }
          @media (max-width: 576px) {
            .login-style {
              left: 50%;
            }
            .banner {
              height: ${xsHeight}px;
            }
          }
        `}
      </style>
    </div>
  )
}

export default connect(state => state)(SingleBannerComp)
