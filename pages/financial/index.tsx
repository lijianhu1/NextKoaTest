import { useState, useCallback } from 'react'
import EnterpriseConfig from '../../constant/EnterpriseConfig'
import { Row, Col, Tabs, Button } from 'antd'
const { TabPane } = Tabs
import './index.less'
import SingleBannerComp from '../../components/SingleBannerComp'
import EnterpriseComp from '../../components/EnterpriseComp'
import { EnterpriseFolderSite } from '../../config/constantData'
import * as ApiInterface from '../../lib/interface'
import Router from 'next/router'
import StorageUtils from '../../lib/storageUtils'
import { connect } from 'react-redux'
const isServer = typeof window === 'undefined'
const { GetDownloadConfig } = require('../../lib/interface')
const { EnterpriseDownloadOrigin } = require('../../config/constantData')
const firstItemTitle = EnterpriseConfig.EnterpriseFolder[0]

const getHrefSuffix = () => {
  let isProduction = location.href.indexOf('https') > -1
  return isProduction ? `http://cdn.mypsb.cn` : location.origin
}

const DownloadComp = () => {
  const download = useCallback(async () => {
    let res = await GetDownloadConfig()
    if (res.status == 200) {
      let versionConfig = res.data
      if (versionConfig.name) {
        window.open(
          `${getHrefSuffix()}${EnterpriseDownloadOrigin}/${versionConfig.name}`
        )
      } else {
        throw new Error('配置文件出错')
      }
    }
  }, [])
  return (
    <div
      className="financial-header"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <div className="title">企业票夹</div>
      <div className="sub-title">一键收取员工票，管存查打抵税妙</div>
      <Button
        className="download-btn"
        style={{ height: 80, width: 266, fontSize: 30, marginTop: 60 }}
        type="primary"
        shape="round"
        icon="download"
        size="large"
        onClick={download}>
        下载PC版
      </Button>
    </div>
  )
}

const Financial = ({ BindEnterprises, authInfo, userInfo }) => {
  const [activeItem, setActiveItem] = useState('')

  const mouseEnter = useCallback(e => {
    setActiveItem(e.currentTarget.dataset.title)
  }, [])
  const mouseLeave = useCallback(() => {
    setActiveItem('')
  }, [])

  const enterFinancialMgr = useCallback(() => {
    if (BindEnterprises.length === 0) {
      Router.push('/register/financial?auto=1')
    } else {
      StorageUtils.setAuthInfo({
        CurrentUserId: userInfo.UserId,
        CurrentUserName: userInfo.UserName,
        Token: authInfo.token
      })
      window.location.replace(EnterpriseFolderSite)
    }
  }, [])
  return (
    <>
      <EnterpriseComp
        activePath={'financial'}
        loginRouter={'/login/financial'}
        registerRouter={'/register/financial'}
        loginSuccessTitle={'进入企业票夹后台'}
        enterBackgroundMgrBefore={enterFinancialMgr}
      />
      <div style={{ backgroundColor: '#ffffff' }}>
        <SingleBannerComp
          image={'enterprise/folder/bg.png'}
          smHeight={476}
          xsHeight={240}
          customComp={<DownloadComp />}
        />
        <Row type="flex" justify="center">
          <Col>
            <p style={{ fontSize: '36px', margin: '34px auto 40px' }}>
              功能说明
            </p>
          </Col>
        </Row>
        <Row
          className="function-des sm-function-tabs"
          type="flex"
          justify="center">
          <Col sm={{ span: 1 }} lg={{ span: 0 }} xl={{ span: 1 }} />
          <Col sm={{ span: 22 }} lg={{ span: 24 }} xl={{ span: 18 }}>
            <Tabs
              defaultActiveKey={firstItemTitle.title}
              tabPosition="top"
              size="large"
              tabBarStyle={{
                color: '#999999'
              }}
              style={{ height: 500 }}>
              {EnterpriseConfig.EnterpriseFolder.map(item => (
                <TabPane tab={item.title} key={item.title}>
                  <img src={item.src} alt={item.title} />
                </TabPane>
              ))}
            </Tabs>
          </Col>
          <Col sm={{ span: 1 }} lg={{ span: 0 }} xl={{ span: 1 }} />
        </Row>
        <Row className="function-des xs-function-tabs">
          {EnterpriseConfig.EnterpriseFolder.map(item => (
            <Col span={24} key={item.title} style={{ marginTop: '20px' }}>
              <img style={{ width: '100%' }} src={item.src} alt={item.title} />
            </Col>
          ))}
        </Row>
        <Row type="flex" justify="center">
          <Col>
            <p style={{ fontSize: '36px', margin: '34px auto 92px' }}>
              商业合作
            </p>
          </Col>
        </Row>
        <Row className="financial-content" gutter={[30, 30]}>
          <Col
            xs={{ span: 0 }}
            sm={{ span: 1 }}
            lg={{ span: 1 }}
            xl={{ span: 1 }}
            xxl={{ span: 4 }}
          />
          {EnterpriseConfig.EnterpriseFolderDesc.map(col => {
            return (
              <Col
                key={col.name}
                xs={{ span: 22 }}
                sm={{ span: 20 }}
                lg={{ span: 15 }}
                xl={{ span: 11 }}
                xxl={{ span: 8 }}>
                <div className="financial-desc-item">
                  <div className="financial-desc-item-top">
                    <img src="static/images/bg3.png" />
                    <p>{col.name}</p>
                  </div>
                  <Row
                    gutter={[20, 20]}
                    type="flex"
                    justify="space-around"
                    className="financial-desc-item-bottom">
                    {col.items.map(item => {
                      return (
                        <Col
                          xs={{ span: 12 }}
                          sm={{ span: 6 }}
                          key={item.title}
                          data-title={item.title}
                          onMouseEnter={mouseEnter}
                          onMouseLeave={mouseLeave}>
                          {activeItem === item.title ? (
                            <img src={item.activeSrc} alt={item.title} />
                          ) : (
                            <img src={item.src} alt={item.title} />
                          )}

                          <span
                            style={
                              activeItem === item.title
                                ? { color: '#29abe2' }
                                : null
                            }>
                            {item.title}
                          </span>
                        </Col>
                      )
                    })}
                  </Row>
                </div>
              </Col>
            )
          })}
          <Col
            xs={{ span: 0 }}
            sm={{ span: 1 }}
            lg={{ span: 1 }}
            xl={{ span: 1 }}
            xxl={{ span: 4 }}
          />
        </Row>
        <Row type="flex" justify="center">
          <Col>
            <div className="financial-bottom">
              {/* 注：企业用户拥有200张发票的免费体验额度，可体验发票录入、鉴伪查重及提交给财税机构等所有功能,
              <br />
              如需继续使用，请联系相关的财税机构购买 */}
            </div>
          </Col>
        </Row>
      </div>
      <style jsx>{`
        .ant-menu-item-active {
          border-bottom: 4px solid #3c8ae7;
        }
      `}</style>
    </>
  )
}
Financial.getInitialProps = async ctx => {
  let token = ''
  if (isServer) {
    const { req } = ctx.ctx
    const session = req.session
    token = session.authInfo && session.authInfo.token
  } else {
    let state = ctx.reduxStore.getState()
    token = state.authInfo.token
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
export default connect(state => state)(Financial)
