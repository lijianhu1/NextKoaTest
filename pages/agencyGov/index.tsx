import './index.less'
import { useCallback } from 'react'
import NormalSubHeader from '../../components/NormalSubHeader'
import { NormalSubHeaderProps } from '../../types/NormalSubHeader'
import { Row, Col, Button, message } from 'antd'
import AgencyConfig from '../../constant/AgencyConfig'
import getConfig from 'next/config'
import SingleBannerComp from '../../components/SingleBannerComp'
import { connect } from 'react-redux'
import userAction from '../../store/actions/userAction'
import { bindActionCreators } from 'redux'
import * as ApiInterface from '../../lib/interface'
import Router from 'next/router'
import { AgencyCustomListSite } from '../../config/constantData'
import StorageUtils from '../../lib/storageUtils'
const isServer = typeof window === 'undefined'

const { publicRuntimeConfig } = getConfig()
const Agency = ({ logout, BindEnterprises, userInfo, authInfo }) => {
  const normalSubHeader: NormalSubHeaderProps = {
    styleMode: 0,
    activePath: 'agencyGov'
  }

  const ServiceItemClick = useCallback(e => {
    let index = e.currentTarget.dataset.id
    location.href = `${publicRuntimeConfig.preFixPath}agencyGov/desc?id=${index}`
  }, [])

  const jumpBefore = useCallback(
    (info?) => {
      let CurrentUserId = '',
        CurrentUserName = '',
        Token = '',
        EnterpriseId = ''
      if (info) {
        let firstAgency = info.BindEnterprises[0]
        CurrentUserId = info.User.UserId
        CurrentUserName = firstAgency.CurrentUserName
        EnterpriseId = firstAgency.Id
        Token = info.Token
      } else {
        if (!BindEnterprises.length) {
          Router.push('/register/agency')
        } else {
          let firstAgency = BindEnterprises[0]
          CurrentUserId = userInfo.UserId
          CurrentUserName = firstAgency.CurrentUserName
          Token = authInfo.token
          EnterpriseId = firstAgency.Id
        }
      }
      if (Token) {
        StorageUtils.setAuthInfo({
          EnterpriseId,
          CurrentUserId,
          CurrentUserName,
          Token
        })
        setTimeout(
          () => {
            location.replace(`${AgencyCustomListSite}?financialIns=1`)
          },
          info ? 500 : 0
        )
      }
    },
    [BindEnterprises]
  )

  const onLineCallback = useCallback(() => {
    if (BindEnterprises.length === 0) {
      message.error('您还未注册财税机构账号')
      Router.push('/register/agency?auto=1')
    } else {
      jumpBefore()
    }
  }, [])

  const registerPsb = useCallback(() => {
    Router.push(`/register/agency${authInfo.token ? '?auto=2' : ''}`)
  }, [])
  const joinPsb = useCallback(() => {
    jumpBefore()
  }, [])

  return (
    <>
      <NormalSubHeader normalSubHeaderProps={normalSubHeader} />
      <SingleBannerComp
        image={'agency/banner.jpg'}
        smHeight={500}
        xsHeight={150}
        onLineTitle={'财税机构登录'}
        loginCompOption={{
          showLoginComp: true,
          registerAddr: '/register/agency',
          successCallback: res => {
            //找到财税机构和审批通过的财税机构
            // Status	：企业状态 0 = None(默认) 1 = Approving(审批中) 2 = Approved(已通过) 3 = Reject(已拒绝)
            res.BindEnterprises = res.BindEnterprises.filter(
              item => item.IsAgency && item.Status == 2
            )
            if (!res.BindEnterprises.length) {
              message.error('您未注册财税机构')
              logout()
              Router.push('/register/agency')
              return false
            } else {
              jumpBefore(res)
              return true
            }
          }
        }}
        onLineCallback={onLineCallback}
      />
      <Row type="flex" justify="center">
        <Col>
          <p className="service-title">服务能力</p>
        </Col>
      </Row>
      <Row type="flex" justify="center" gutter={[20, 20]}>
        {AgencyConfig.serviceConfig.map((item, index) => {
          return (
            <Col
              xs={{ span: 20 }}
              sm={{ span: 11 }}
              xl={{ span: 5 }}
              xxl={{ span: 4 }}
              key={item.title}>
              <div className="service-item" data-id={index} onClick={ServiceItemClick}>
                <img src={item.src} alt={item.title} />
                <span>{item.title}</span>
                <span>{item.subTitle}</span>
              </div>
            </Col>
          )
        })}
      </Row>
      <Row type="flex" justify="center">
        <Col>
          <p className="service-title">财税机构接入</p>
        </Col>
      </Row>
      <Row type="flex" justify="center" align="middle" gutter={[20, 20]}>
        {AgencyConfig.interveneConfig.map((item, index) => {
          return (
            <Col
              xs={{ span: index % 2 === 0 ? 14 : 14 }}
              sm={{ span: index % 2 === 0 ? 6 : 2 }}
              md={{ span: index % 2 === 0 ? 7 : 1 }}
              lg={{ span: index % 2 === 0 ? 7 : 1 }}
              xl={{ span: index % 2 === 0 ? 5 : 1 }}
              key={index}
              style={{ textAlign: 'center' }}>
              <img
                style={{ width: '100%' }}
                className={index % 2 === 0 ? '' : 'flow-arrow'}
                src={item}
                alt={`接入流程图-${index}`}
              />
            </Col>
          )
        })}
      </Row>
      <Row
        type="flex"
        justify="center"
        gutter={[10, 50]}
        style={{ marginTop: 40, marginBottom: 176 }}>
        <Col>
          <Button
            style={{
              width: 240,
              height: 46,
              border: '1px solid #108ee9',
              color: '#108ee9'
            }}
            onClick={registerPsb}>
            注册票税宝
          </Button>
        </Col>
        <Col>
          <Button
            style={{
              width: 240,
              height: 46,
              backgroundColor: '#0289ff',
              boxShadow: '0 3px 7px 0 rgba(25,113,190,.24)',
              color: '#ffffff'
            }}
            onClick={joinPsb}>
            接入票税宝
          </Button>
        </Col>
      </Row>
    </>
  )
}

Agency.getInitialProps = async ctx => {
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
      Token: token,
      IsAgency: true
    })
    if (res.ResCode === 1000 && res.BindEnterprises.length) {
      //审批通过的
      let temp = res.BindEnterprises.filter(item => item.Status == 2)
      return {
        BindEnterprises: temp
      }
    }
  }
  return { BindEnterprises: [] }
}

export default connect(
  state => state,
  dispatch => bindActionCreators(userAction, dispatch)
)(Agency)
