import { memo, useState, useCallback, useEffect } from 'react'
import { Row, Col, Input, message } from 'antd'
import SmsComp from '../SmsComp'
import { EnterpriseRegisterFormProps } from '../../types/EnterpriseTypes'
import { connect } from 'react-redux'
import MobilePhoneComp from '../Base/MobilePhoeComp'
const SmsComponent = memo(SmsComp)

interface IAdminModel {
  Administrator: string
  MobilePhone: string
  CaptchaCode: string
  Password: string
}

let adminInitial: IAdminModel = {
  Administrator: '',
  MobilePhone: '',
  CaptchaCode: '',
  Password: ''
}

const AdminComp = ({
  isAutoRegister = false,
  compDataChanged,
  notify,
  userInfo
}: EnterpriseRegisterFormProps<IAdminModel> & { userInfo?: any }) => {
  const [adminModel, setAdminModel] = useState(adminInitial)
  const [rePwd, setRePwd] = useState('')
  useEffect(() => {
    compDataChanged(adminModel)
  }, [adminModel])

  const captchaCodeChanged = useCallback(
    value => {
      setAdminModel(Object.assign({}, adminModel, { CaptchaCode: value }))
    },
    [adminModel]
  )
  const captchaErrorCallback = useCallback(errMsg => {
    message.error(errMsg)
  }, [])

  const adminNameChanged = useCallback(
    e => {
      setAdminModel(Object.assign({}, adminModel, { Administrator: e.target.value }))
    },
    [adminModel]
  )

  const phoneChanged = useCallback(
    value => {
      // let value = e.target.value
      // let temp = value.slice(0, 11)
      setAdminModel(Object.assign({}, adminModel, { MobilePhone: value }))
    },
    [adminModel]
  )

  const passwordChanged = useCallback(
    e => {
      setAdminModel(Object.assign({}, adminModel, { Password: e.target.value }))
      verifyPwd(adminModel.Password, rePwd)
    },
    [adminModel, rePwd]
  )

  const verifyPwd = useCallback((pwd, rePwd) => {
    notify(pwd !== rePwd ? '两次密码输入不一致' : '')
  }, [])

  const rePwdChanged = useCallback(
    e => {
      const { value } = e.target
      setRePwd(value)
      verifyPwd(adminModel.Password, value)
    },
    [adminModel, rePwd]
  )

  return (
    <>
      <p style={{ color: '#333333', fontSize: 18 }}>管理员信息</p>
      <Row type="flex" gutter={[0, 20]}>
        {isAutoRegister ? null : (
          <Col span={24}>
            <Row type="flex" justify="space-between" align="middle">
              <Col xs={{ span: 5 }} sm={{ span: 4 }}>
                <span>管理员姓名</span>
              </Col>
              <Col xs={{ span: 18 }} sm={{ span: 20 }}>
                <Input
                  style={{ height: 36 }}
                  placeholder="请填写企业管理员的姓名"
                  onChange={adminNameChanged}
                />
              </Col>
            </Row>
          </Col>
        )}
        <Col span={24}>
          <Row type="flex" justify="space-between" align="middle">
            <Col xs={{ span: 6 }} sm={{ span: 4 }}>
              <span>管理员手机号</span>
            </Col>
            <Col xs={{ span: 18 }} sm={{ span: 20 }}>
              {isAutoRegister ? (
                <span>{userInfo.MobilePhone}</span>
              ) : (
                // <Input
                //   type="number"
                //   value={adminModel.MobilePhone}
                //   style={{ height: 36 }}
                //   addonBefore="+86"
                //   placeholder="请输入你的手机号码"
                //   onChange={phoneChanged}
                // />
                <MobilePhoneComp
                  hasPreFix={false}
                  MobilePhone={adminModel.MobilePhone}
                  valueChanged={phoneChanged}
                />
              )}
            </Col>
          </Row>
        </Col>
        {isAutoRegister ? null : (
          <>
            <Col span={24}>
              <Row type="flex" justify="space-between" align="middle">
                <Col xs={{ span: 5 }} sm={{ span: 4 }}>
                  <span>短信验证码</span>
                </Col>
                <Col xs={{ span: 18 }} sm={{ span: 20 }}>
                  <SmsComponent
                    flagType={4}
                    mobilePhone={adminModel.MobilePhone}
                    errorCallBack={captchaErrorCallback}
                    captchaCodeChanged={captchaCodeChanged}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row type="flex" justify="space-between" align="middle">
                <Col xs={{ span: 5 }} sm={{ span: 4 }}>
                  <span>设置密码</span>
                </Col>
                <Col xs={{ span: 18 }} sm={{ span: 20 }}>
                  <Input
                    type="password"
                    maxLength={30}
                    style={{ height: 36 }}
                    placeholder="请输入6-30个非汉字密码"
                    onChange={passwordChanged}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row type="flex" justify="space-between" align="middle">
                <Col xs={{ span: 5 }} sm={{ span: 4 }}>
                  <span>确认密码</span>
                </Col>
                <Col xs={{ span: 18 }} sm={{ span: 20 }}>
                  <Input
                    type="password"
                    maxLength={30}
                    style={{ height: 36 }}
                    placeholder="请再次输入6-30个非汉字密码"
                    onChange={rePwdChanged}
                  />
                </Col>
              </Row>
            </Col>
          </>
        )}
      </Row>
    </>
  )
}

export default connect(state => state)(AdminComp)
