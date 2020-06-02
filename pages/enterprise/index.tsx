import './index.less'
import { useCallback } from 'react'
import EnterpriseComp from '../../components/EnterpriseComp'
import { Row, Col, Divider } from 'antd'
import EnterpriseConfig from '../../constant/EnterpriseConfig'
import getConfig from 'next/config'
import Link from 'next/link'
import SingleBannerComp from '../../components/SingleBannerComp'
import { BillcenterSite } from '../../config/constantData'
import { connect } from 'react-redux'
import * as ApiInterface from '../../lib/interface'
import Router from 'next/router'
const isServer = typeof window === 'undefined'
import StorageUtils from '../../lib/storageUtils'

const { publicRuntimeConfig } = getConfig()
const Enterprise = ({ BindEnterprises, userInfo, authInfo }) => {
  const enterBgMgrBefore = useCallback(() => {
    if (BindEnterprises.length === 0) {
      Router.push('/register/enterprise?auto=1')
    } else {
      let firstEnterprise = BindEnterprises[0]
      StorageUtils.setAuthInfo({
        CurrentUserId: userInfo.UserId,
        CurrentUserName: firstEnterprise.CurrentUserName,
        Token: authInfo.token
      })
      // if (BindEnterprises.length > 1) {
      //   window.location.replace(SelectEnterpriseHref)
      // } else {
      window.location.replace(BillcenterSite)
      // }
    }
  }, [])
  return (
    <div className="enterprise">
      <EnterpriseComp
        activePath={'enterprise'}
        loginRouter={'/login/enterprise'}
        registerRouter={'/register/enterprise'}
        enterBackgroundMgrBefore={enterBgMgrBefore}
        loginSuccessTitle={'进入电子报销后台'}
      />
      <SingleBannerComp
        image={'enterprise/banner.png'}
        smHeight={400}
        xsHeight={150}
        // loginCompOption={{
        //   showLoginComp: true,
        //   registerAddr: '/register/enterprise',
        //   successCallback: () => {
        //     window.location.href = ''
        //   }
        // }}
      />
      <div className="content-title-row">
        <Row type="flex" justify="center" className="content-title">
          <Col>
            <span className="title">全方位满足你企业的报销费控需求</span>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col>
            <img style={{ width: '100%' }} src="static/images/enterprise/1.png" />
          </Col>
        </Row>
      </div>
      <div className="content-main-row">
        <Row type="flex" justify="center" className="content-title">
          <Col>
            <span className="title">以连接为核心，提升报销新体验</span>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col className="content-img">
            <img style={{ width: '100%' }} src="static/images/enterprise/2.png" />
            <span>了解更多</span>
          </Col>
        </Row>
      </div>
      <div className="enterprise-bottom">
        <Row type="flex" justify="center">
          <Col>
            <span className="platform-service">平台服务商</span>
            <Divider style={{ backgroundColor: '#108ee9', height: '3px' }} />
          </Col>
        </Row>
        <Row type="flex" justify="center" className="platforms" gutter={50}>
          {EnterpriseConfig.EnterprisePlatforms.map(item => {
            return (
              <Col key={item.title} xs={{ span: 10 }} md={{ span: 5 }}>
                <div className="item platform-item">
                  <img src={item.src} />
                  <span>{item.title}</span>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
      <div className="enterprise-bottom oa-content">
        <Row type="flex" justify="center" className="oa-service">
          <Col>
            <span className="platform-service">电子报销和OA服务商</span>
            <Divider style={{ backgroundColor: '#108ee9', height: '3px' }} />
          </Col>
        </Row>
        <Row type="flex" justify="center" className="platforms" gutter={[10, 20]}>
          {EnterpriseConfig.EnterpriseOAServices.map(item => {
            return (
              <Col key={item.title} xs={{ span: 10 }} md={{ span: 5 }}>
                <Link href={item.href}>
                  <a className="item oa-item">
                    <img src={item.src} />
                    <span>{item.title}</span>
                    <span>{item.subTitle}</span>
                  </a>
                </Link>
              </Col>
            )
          })}
        </Row>
      </div>

      <style jsx>
        {`
          .enterprise-bottom {
            background: url(${publicRuntimeConfig.staticFolder}/images/bg.png) center no-repeat;
            background-color: #f6f6f7;
          }
        `}
      </style>
    </div>
  )
}

Enterprise.getInitialProps = async ctx => {
  // console.log('enterprise getinitialprops', ctx)
  let token = ''
  if (isServer) {
    // console.log('server enterprise getinitialprops')
    const { req } = ctx.ctx
    const session = req.session
    token = session.authInfo && session.authInfo.token
  } else {
    let state = ctx.reduxStore.getState()
    token = state.authInfo.token
    // console.log('client enterprise getinitialprops', state.authInfo)
  }
  if (token) {
    let res = await ApiInterface.GetUserEnterpriseList({
      Token: token
    })
    if (res.ResCode === 1000 && res.BindEnterprises.length) {
      return {
        BindEnterprises: res.BindEnterprises
      }
    }
  }
  return { BindEnterprises: [] }
}

export default connect(state => state)(Enterprise)
