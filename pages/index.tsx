import React, { useState, useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import userAction from '../store/actions/userAction'
import Link from 'next/link'
import { Row, Col, Divider } from 'antd'
import './index.less'
import FooterContent from '../components/FooterContent'
import LoginBasic from '../components/LoginBasic'
import getConfig from 'next/config'
import { ILoginBasicsProps } from '../types/LoginTypes'
import { PersonalSite } from '../config/constantData'
import HomeConfig from '../constant/HomeConfig'
import StorageUtils from '../lib/storageUtils'

const { publicRuntimeConfig } = getConfig()
const isServer = typeof window === 'undefined'

const controls = true
// const autoPlay = 'autoplay'
const Index = ({ authInfo, userInfo, logout, loginPersonalAccount }) => {
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [playIndex, setPlayIndex] = useState(0)
  const [videoSource, setVideoSource] = useState('')
  const [videoOption, setVideoOption] = useState({ width: 0, height: 0 })

  useEffect(() => {
    let cw = document.documentElement.clientWidth
    let ch = document.documentElement.clientHeight
    if (cw <= 576) {
      setVideoOption({ width: cw * 0.95, height: ch * 0.35 })
    } else {
      setVideoOption({ width: cw * 0.7, height: ch * 0.8 })
    }
  }, [playIndex])
  const setVideoIndex = useCallback(
    e => {
      let index = Number(e.currentTarget.dataset.index)
      setPlayIndex(index)
      if (index > 0) {
        setVideoSource(index === 1 ? HomeConfig.videoSource.video1 : HomeConfig.videoSource.video2)
      }
    },
    [playIndex]
  )

  const loginOption: ILoginBasicsProps = {
    showMask: true,
    registerAddr: '/register/personal',
    /* customHeader: () => {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 20,
            paddingBottom: 15
          }}>
          <span
            style={{
              fontSize: 18,
              color: '#ffffff'
            }}>
            登录票税宝
          </span>
        </div>
      )
    }, */
    customLoginAction: data => {
      loginPersonalAccount({
        data,
        success: res => {
          setShowLoginDialog(false)
          toPersonalSite(res.Token)
        }
      })
    },
    closeDialog: () => {
      setShowLoginDialog(false)
    },
    loginSuccess(res){
      setShowLoginDialog(false)
      toPersonalSite(res.Token)
    },
  }

  const quickLogin = useCallback(() => {
    setShowLoginDialog(true)
  }, [])

  const toPersonalSite = useCallback(token => {
    StorageUtils.setAuthInfo({
      Token: authInfo.token || token
    })
    setTimeout(() => {
      location.replace(`${PersonalSite}`)
    }, 300)
  }, [])

  const logoutPsb = useCallback(e => {
    e.preventDefault()
    logout()
  }, [])

  return (
    <>
      {showLoginDialog ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}>
          <LoginBasic loginOption={loginOption} />
        </div>
      ) : null}
      <Row>
        <Col span={24}>
          <Row type="flex" justify="start" className="header-style">
            <Col
              xs={{ span: 2, offset: 1 }}
              sm={{ span: 2, offset: 2 }}
              md={{ span: 2, offset: 2 }}
              lg={{ span: 2, offset: 3 }}>
              <img className="index-logo" src="static/images/home/index-logo.png" />
            </Col>
            <Col
              xs={{ span: 15, offset: 6 }}
              sm={{ span: 10, offset: 9 }}
              md={{ span: 8, offset: 11 }}
              lg={{ span: 6, offset: 13 }}
              xl={{ span: 5, offset: 14 }}>
              <div className="no-login">
                {userInfo.UserId ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                    <span>您好</span>
                    <Divider type="vertical" />
                    <span>{userInfo.MobilePhone}</span>
                    <Divider type="vertical" />
                    <span
                      style={{
                        cursor: 'pointer'
                      }}
                      onClick={toPersonalSite}>
                      我的票税宝
                    </span>
                    <Divider type="vertical" />
                    <a
                      style={{
                        color: '#ffffff'
                      }}
                      onClick={logoutPsb}>
                      退出
                    </a>
                  </div>
                ) : (
                  <div>
                    <span>我已有票税宝账号，</span>
                    <span style={{ cursor: 'pointer' }} onClick={quickLogin}>
                      快速登录
                    </span>
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <div className="banner-content">
            <Row
              className="banner-content-row"
              style={{ margin: 0 }}
              type="flex"
              justify="center"
              align="middle"
              gutter={5}>
              <Col
                xs={{ span: 8 }}
                sm={{ span: 7 }}
                md={{ span: 5 }}
                lg={{ span: 4 }}
                xl={{ span: 3 }}
                xxl={{ span: 2 }}>
                <div className="banner-content-item">
                  <img src="static/images/home/man.png" />
                  <a href={`${publicRuntimeConfig.preFixPath}personal`}>我是个人用户</a>
                </div>
              </Col>
              <Col
                xs={{ span: 8 }}
                sm={{ span: 7 }}
                md={{ span: 5 }}
                lg={{ span: 4 }}
                xl={{ span: 3 }}
                xxl={{ span: 2 }}>
                <div className="banner-content-item">
                  <div className="banner-content-item-content">
                    <div className="enterprise-user">
                      <img src="static/images/home/enterprise.png" />
                      <span>我是企业用户</span>
                    </div>
                    <div className="enterprise-user-detail">
                      <img src="static/images/home/enterprise.png" />
                      <div className="detail-content">
                        <Link href={`${publicRuntimeConfig.preFixPath}financial`}>
                          <a>企业票夹</a>
                        </Link>
                        <div className="divide" />
                        <Link href={`${publicRuntimeConfig.preFixPath}enterprise`}>
                          <a>电子报销</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col
                xs={{ span: 8 }}
                sm={{ span: 7 }}
                md={{ span: 5 }}
                lg={{ span: 4 }}
                xl={{ span: 3 }}
                xxl={{ span: 2 }}>
                <div className="banner-content-item">
                  <img src="static/images/home/interconnect.png" />
                  <Link href={`${publicRuntimeConfig.preFixPath}agencyGov`}>
                    <a>我是财税机构</a>
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
          <img style={{ width: '100%' }} src={`static/images/home/banner1.png`} />
        </Col>
      </Row>
      <p className="des-title-style">你的发票助手，你的个税管家</p>
      <Row
        type="flex"
        justify="center"
        className="des-row"
        gutter={[{ xs: 8, sm: 16, md: 24, lg: 32, xl: 40 }, 20]}>
        {HomeConfig.desArr.map(item => {
          return (
            <Col
              key={item.id}
              xs={{ span: 22 }}
              sm={{ span: 10 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 5 }}>
              <div className="des-col-content">
                <img src={item.img} />
                <div className="content">
                  <div>
                    <div className="content-title">{item.title}</div>
                    <p>{item.subTitle}</p>
                  </div>
                  <Link href={`${publicRuntimeConfig.preFixPath}${item.href}`}>
                    <a className="more">
                      <img src={`static/images/home/more.png`} />
                      <span>了解更多</span>
                    </a>
                  </Link>
                </div>
              </div>
            </Col>
          )
        })}
      </Row>
      <Row type="flex" justify="center" className="video-banner">
        <Col
          xs={{ span: 20 }}
          sm={{ span: 11 }}
          md={{ span: 10 }}
          lg={{ span: 8 }}
          xl={{ span: 6 }}>
          <div className="video">
            <div className="video1" data-index={1} onClick={setVideoIndex}>
              <img src="static/images/home/play.png" alt="" />
            </div>
            <p>生活中的票税宝</p>
          </div>
        </Col>
        <Col
          xs={{ span: 20 }}
          sm={{ span: 11, offset: 1 }}
          md={{ span: 10, offset: 2 }}
          lg={{ span: 8, offset: 4 }}
          xl={{ span: 6, offset: 4 }}>
          <div className="video">
            <div className="video2" data-index={2} onClick={setVideoIndex}>
              <img src="static/images/home/play.png" alt="" />
            </div>
            <p>工作中的票税宝</p>
          </div>
        </Col>
      </Row>
      {playIndex > 0 ? (
        <div className="video-row" data-index={0} onClick={setVideoIndex}>
          <div className="video-content">
            <video
              controls={controls}
              autoPlay
              height={videoOption.height}
              width={videoOption.width}>
              <source src={videoSource} />
            </video>
          </div>
        </div>
      ) : null}
      <Row>
        <Col span={24}>
          <img className="app-des" style={{ width: '100%' }} src="static/images/home/banner2.png" />
        </Col>
      </Row>
      <FooterContent />
    </>
  )
}

Index.getInitialProps = async () => {
  // console.log('index getInitialProps invoked')
  if (!isServer) {
    // console.log('index getInitialProps')
  }
  return {}
}

export default connect(
  state => state,
  dispatch => bindActionCreators(userAction, dispatch)
)(Index)
