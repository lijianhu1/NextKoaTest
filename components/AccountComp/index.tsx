import { useState, useCallback, memo } from 'react'
import { Row, Col, Icon, Input, Divider, Button, message } from 'antd'
import SmsComp from '../SmsComp'
import { verifyMobilePhone, verifyIsChinese } from '../../lib/util'
import PersonConfig from '../../constant/PersonalConfig'
import { NormalSubHeaderProps, NormalSubHeaderLoginProps } from '../../types/NormalSubHeader'
import NormalSubHeader from '../NormalSubHeader'
import MobilePhoneComp from '../Base/MobilePhoeComp'

interface IAccountModel {
  MobilePhone: string
  Password: string
  ValidCode: string
}

let initialAccountModel: IAccountModel = {
  MobilePhone: '',
  Password: '',
  ValidCode: ''
}

interface IAccountProps {
  flagType: number
  CustomHeaderComp: any
  btnText: string
  handler: (data?: any) => void
  isPc?: boolean
}

const SmsComponent = memo(SmsComp)

const AccountComp = (props: IAccountProps) => {
  const { flagType, CustomHeaderComp, btnText, handler, isPc = false } = props
  const [accountModel, setAccountModel] = useState(initialAccountModel)
  const [validPwd, setValidPwd] = useState('')
  const [captchaErrorMsg, setCaptchaErrorMsg] = useState('')
  const normalSubHeaderProps: NormalSubHeaderProps = {
    styleMode: 2,
    backgroundColor: '#ffffff',
    activePath: '',
    menuItems: isPc ? [] : PersonConfig.menuItems,
    loginRouter: null,
    registerRouter: null
  }

  const normalSubHeaderLoginProps: NormalSubHeaderLoginProps = {
    showLoginBtn: false
  }
  /**
   * 电话号码修改
   */
  const mobilePhoneChanged = useCallback(
    value => {
      setAccountModel(Object.assign({}, accountModel, { MobilePhone: value }))
    },
    [accountModel]
  )
  /**
   * 设置错误信息
   */
  const captchaErrorCallback = useCallback(msg => {
    setCaptchaErrorMsg(msg)
  }, [])
  /**
   * 验证码输入
   */
  const captchaCodeChanged = useCallback(
    value => {
      setAccountModel(Object.assign({}, accountModel, { ValidCode: value }))
    },
    [accountModel]
  )
  /**
   * 初始密码输入变化
   */
  const initPwdChanged = useCallback(
    e => {
      setAccountModel(Object.assign({}, accountModel, { Password: e.target.value }))
    },
    [accountModel, validPwd]
  )
  /**
   * 确认密码
   */
  const validPwdChanged = useCallback(
    e => {
      setValidPwd(e.target.value)
    },
    [accountModel, validPwd]
  )

  const verifyModel = useCallback(() => {
    let mobilePhoneRes = verifyMobilePhone(accountModel.MobilePhone)
    if (mobilePhoneRes) {
      return message.error(mobilePhoneRes)
    }
    if (captchaErrorMsg) {
      return message.error(captchaErrorMsg)
    }
    if (accountModel.ValidCode.length < 6) {
      return message.error('请输入6位数验证码')
    }
    if (
      !accountModel.Password ||
      accountModel.Password.length < 6 ||
      accountModel.Password.length > 30 ||
      verifyIsChinese(accountModel.Password)
    ) {
      return message.error('请输入6-30个非汉字密码')
    }
    if (accountModel.Password !== validPwd) {
      return message.error('前后两次密码输入不一致')
    }
    return true
  }, [accountModel, captchaErrorMsg, validPwd])

  const btnHandler = useCallback(() => {
    let flag = verifyModel()
    if (typeof flag !== 'boolean') {
      return
    }
    handler(accountModel)
  }, [accountModel, validPwd])

  return (
    <>
      <NormalSubHeader
        normalSubHeaderProps={normalSubHeaderProps}
        normalSubHeaderLoginProps={normalSubHeaderLoginProps}
      />
      <Row type="flex" align="middle" justify="center" style={{ marginTop: 120 }}>
        <Col
          xs={{ span: 20 }}
          sm={{ span: 16 }}
          md={{ span: 12 }}
          lg={{ span: 10 }}
          xl={{ span: 8 }}
          xxl={{ span: 7 }}>
          <div className="content-header">
            <CustomHeaderComp />
            <Divider style={{ color: '#e9e9e9' }} />
            <Row type="flex" gutter={[0, 20]}>
              <Col span={24}>
                <MobilePhoneComp
                  MobilePhone={accountModel.MobilePhone}
                  valueChanged={mobilePhoneChanged}
                />
              </Col>
              <Col span={24}>
                <SmsComponent
                  flagType={flagType}
                  mobilePhone={accountModel.MobilePhone}
                  errorCallBack={captchaErrorCallback}
                  captchaCodeChanged={captchaCodeChanged}
                />
              </Col>
              <Col span={24}>
                <Input
                  type="password"
                  maxLength={30}
                  style={{ height: 40, marginTop: 10 }}
                  value={accountModel.Password}
                  prefix={<Icon type="lock" />}
                  placeholder="请输入6-30个非汉字密码"
                  onChange={initPwdChanged}
                />
              </Col>
              <Col span={24}>
                <Input
                  type="password"
                  maxLength={30}
                  style={{ height: 40, marginTop: 10 }}
                  value={validPwd}
                  prefix={<Icon type="lock" />}
                  placeholder="请再次输入6-30个非汉字密码"
                  onChange={validPwdChanged}
                />
              </Col>
              <Col span={24}>
                <Button
                  className="row_top"
                  size="large"
                  block={true}
                  type="primary"
                  onClick={btnHandler}>
                  {btnText}
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <style jsx>{`
        .content-header {
          padding: 15px 15px 50px;
          background-color: #ffffff;
          box-shadow: 0 -4px 20px 0 rgba(0, 0, 0, 0.1);
          border-radius: 6px;
        }
      `}</style>
    </>
  )
}

export default AccountComp
