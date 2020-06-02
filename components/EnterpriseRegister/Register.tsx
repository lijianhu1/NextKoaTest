import { useState, useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col, Divider, Button, message } from 'antd'
import { NormalSubHeaderProps, NormalSubHeaderLoginProps } from '../../types/NormalSubHeader'
import NormalSubHeader from '../NormalSubHeader'
import Info from './Info'
import AdminComp from './AdminComp'
import ServiceProtocol from './ServiceProtocol'
import { RegisterFormErrorConfig } from '../../constant/EnterpriseConfig'
import { withRouter } from 'next/router'
import enterpriseActions from '../../store/actions/enterpriseAction'
import { preRequestDeal } from '../../pagesUtils/loginBasicUtil'
import {
  AutoRegisterModel,
  EnterpriseModel,
  RegisterEnterpriseOptions,
  RegisterProps
} from '../../types/EnterpriseTypes'

type Props = {
  toRegisterProps: RegisterProps
}
//这里的props可能是来自router 或是redux
type OtherProps = {
  authInfo: any
  router: any
  registerEnterprise?: (info: RegisterEnterpriseOptions<EnterpriseModel>) => void
  createEnterprise?: (info: RegisterEnterpriseOptions<AutoRegisterModel>) => void
}
type registerProps = Props & OtherProps

let enterpriseModel: EnterpriseModel = {
  EnterpriseName: '',
  IndustryCode: '',
  StaffSize: '',
  Administrator: '',
  MobilePhone: '',
  CaptchaCode: '',
  Password: '',
  IsAgency: false
}

const Register = ({
  registerEnterprise,
  createEnterprise,
  toRegisterProps,
  router,
  authInfo
}: registerProps) => {
  const {
    isResetLoginInfo,
    infoTitle,
    enterpriseName,
    isAgency,
    loginRouter,
    success,
    fail
  } = toRegisterProps
  const [enterpriseInfo, setEnterpriseInfo] = useState(
    Object.assign({}, enterpriseModel, { IsAgency: isAgency })
  )
  const [serviceProtocolState, setServiceProtocolState] = useState({
    errMsg: ''
  })
  const [adminCompState, setAdminCompState] = useState({ errMsg: '' })
  //这里有一种情况是自动注册
  const [autoRegister, setAutoRegister] = useState(false)

  useEffect(() => {
    let autoReg = router.query.auto !== undefined
    if (autoReg) {
      setAutoRegister(true)
    }
  }, [])
  const normalSubHeaderProps: NormalSubHeaderProps = {
    styleMode: 0,
    loginRouter: loginRouter,
    backgroundColor: '#ffffff'
  }

  const normalSubHeaderLoginProps: NormalSubHeaderLoginProps = {
    showLoginBtn: true,
    loginStyle: 1
  }
  useEffect(() => {
    preRequestDeal()
  }, [])

  const infoDataChanged = useCallback(
    data => {
      setEnterpriseInfo(Object.assign({}, enterpriseInfo, data))
    },
    [enterpriseInfo]
  )

  const adminCompChanged = useCallback(
    data => {
      setEnterpriseInfo(Object.assign({}, enterpriseInfo, data))
    },
    [enterpriseInfo]
  )

  const serviceProtoColChanged = useCallback(data => {
    setServiceProtocolState(data)
  }, [])

  const checkForm = useCallback(() => {
    let excludeKeys = []
    let autoRegisterFields = ['EnterpriseName', 'IndustryCode', 'StaffSize']
    if (enterpriseInfo.IsAgency) {
      //财税机构没有行业类型
      excludeKeys = ['IndustryCode']
    }
    for (const key in enterpriseInfo) {
      if (excludeKeys.indexOf(key) === -1 && enterpriseInfo.hasOwnProperty(key) && key !== 'IsAgency') {
        const value = enterpriseInfo[key]
        let config = RegisterFormErrorConfig[key]
        if (typeof config === 'string') {
          if (!value) {
            if (autoRegister) {
              if (autoRegisterFields.indexOf(key) > -1) {
                return config
              }
            } else {
              return config
            }
          }
        } else {
          let r = config.fn(value)
          if (r) {
            if (autoRegister) {
              if (autoRegisterFields.indexOf(key) > -1) {
                return r
              }
            } else {
              return r
            }
          }
        }
      }
    }
    return null
  }, [enterpriseInfo, isAgency])

  const adminCompNotify = useCallback(
    errMsg => {
      setAdminCompState({ errMsg })
    },
    [adminCompState]
  )

  const register = useCallback(() => {
    let infoErrMsg = checkForm()
    if (!infoErrMsg) {
      infoErrMsg = adminCompState.errMsg
    }
    if (!infoErrMsg) {
      infoErrMsg = serviceProtocolState.errMsg
    }
    if (infoErrMsg) {
      message.error(infoErrMsg)
      return
    }
    if (autoRegister) {
      let newData = {
        Name: enterpriseInfo.EnterpriseName,
        StaffSize: enterpriseInfo.StaffSize,
        IndustryCode: enterpriseInfo.IndustryCode,
        IsAgency: enterpriseInfo.IsAgency,
        Token: authInfo.token
      }
      createEnterprise({
        //默认是true
        isResetLoginInfo: isResetLoginInfo,
        data: newData,
        callback: {
          success,
          fail
        }
      })
    } else {
      registerEnterprise({
        //默认是true
        isResetLoginInfo: isResetLoginInfo,
        data: enterpriseInfo,
        callback: {
          success,
          fail
        }
      })
    }

    //开始走注册
  }, [enterpriseInfo, adminCompState, serviceProtocolState])

  return (
    <>
      <NormalSubHeader
        normalSubHeaderProps={normalSubHeaderProps}
        normalSubHeaderLoginProps={normalSubHeaderLoginProps}
      />
      <Row type="flex" justify="center" style={{ marginTop: 50, marginBottom: 60 }}>
        <Col
          xs={{ span: 23 }}
          sm={{ span: 22 }}
          md={{ span: 19 }}
          lg={{ span: 19 }}
          xl={{ span: 14 }}
          xxl={{ span: 10 }}
          style={{
            boxShadow: '0 4px 20px 0 rgba(0,0,0,.1)',
            borderRadius: 6,
            backgroundColor: '#ffffff'
          }}>
          <div className="container">
            <Info
              isAgency={isAgency}
              regFormProps={{ enterpriseName, title: infoTitle, compDataChanged: infoDataChanged }}
            />
            <Divider />
            <AdminComp
              isAutoRegister={autoRegister}
              compDataChanged={adminCompChanged}
              notify={adminCompNotify}
            />
            <ServiceProtocol compDataChanged={serviceProtoColChanged} />
            <Button
              type="primary"
              style={{ marginTop: 20, height: 40, fontSize: 16, width: '100%' }}
              onClick={register}>
              注册
            </Button>
          </div>
        </Col>
      </Row>
      <style jsx>{`
        @media (max-width: 576px) {
          .container {
            padding: 32px 10px 56px !important;
          }
        }
        @media (min-width: 576px) {
          .container {
            padding: 32px 50px 56px !important;
          }
        }
      `}</style>
    </>
  )
}

export default connect(
  state => state,
  dispatch => bindActionCreators(enterpriseActions, dispatch)
)(withRouter(Register))
